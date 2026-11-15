
const { expect } = require("@playwright/test");
const BasePage = require("./BasePage");

class CartPage extends BasePage {
  constructor(page) {
    super(page);

    this.cartTable = this.page.locator("#cart_info_table");
    this.cartRows = this.page.locator("#cart_info_table tbody tr");
    this.deleteButtons = this.page.locator(".cart_quantity_delete");
    this.cartEmptyMessage = this.page.getByText("Cart is empty!");
  }

  async openCartPage() {
    await this.navigateTo("/view_cart");
  }

  async verifyCartIsVisible() {
    await expect(this.cartTable).toBeVisible();
  }

  async verifyCartContainsProducts() {
    await expect(this.cartRows.first()).toBeVisible();
  }

  async verifyProductQuantity(productName, quantity) {
    const productRow = this.cartRows.filter({ hasText: productName });

    await expect(
      productRow.locator(".cart_quantity button")
    ).toHaveText(String(quantity));
  }

  async getProductUnitPrice(productName) {
    const productRow = this.cartRows.filter({ hasText: productName });

    return productRow.locator(".cart_price").innerText();
  }

  async getProductQuantity(productName) {
    const productRow = this.cartRows.filter({ hasText: productName });
    const quantityText = await productRow
      .locator(".cart_quantity button")
      .innerText();

    return Number(quantityText);
  }

  async getProductLineTotal(productName) {
    const productRow = this.cartRows.filter({ hasText: productName });

    return productRow.locator(".cart_total_price").innerText();
  }

  async verifyProductLineTotal(productName, expectedTotal) {
    const productRow = this.cartRows.filter({ hasText: productName });

    await expect(
      productRow.locator(".cart_total_price")
    ).toHaveText(expectedTotal);
  }

  async verifyProductIsRemoved(productName) {
    const productRow = this.cartRows.filter({ hasText: productName });

    await expect(productRow).toHaveCount(0);
  }

  async removeFirstProduct() {
    await this.deleteButtons.first().click();
  }

  async verifyCartIsEmpty() {
    await expect(this.cartEmptyMessage).toBeVisible();
  }
}

module.exports = CartPage;

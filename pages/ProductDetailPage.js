
const { expect } = require("@playwright/test");
const BasePage = require("./BasePage");

class ProductDetailPage extends BasePage {
  constructor(page) {
    super(page);

    this.productName = this.page.locator(".product-information h2");

    this.category = this.page
      .locator(".product-information p")
      .filter({ hasText: "Category:" });

    this.price = this.page.locator(".product-information span span");

    this.availability = this.page
      .locator(".product-information p")
      .filter({ hasText: "Availability:" });

    this.condition = this.page
      .locator(".product-information p")
      .filter({ hasText: "Condition:" });

    this.brand = this.page
      .locator(".product-information p")
      .filter({ hasText: "Brand:" });

    this.quantityInput = this.page.locator("#quantity");

    this.addToCartButton = this.page.getByRole("button", {
      name: "Add to cart",
    });

    this.viewCartLink = this.page.getByRole("link", {
      name: "View Cart",
    });

    this.continueShoppingButton = this.page.getByText(
      "Continue Shopping",
      { exact: true }
    );
  }

  async verifyProductNameIsVisible() {
    await expect(this.productName).toBeVisible();
  }

  async verifyCategoryIsVisible() {
    await expect(this.category).toBeVisible();
  }

  async verifyPriceIsVisible() {
    await expect(this.price).toBeVisible();
  }

  async verifyAvailabilityIsVisible() {
    await expect(this.availability).toBeVisible();
  }

  async verifyConditionIsVisible() {
    await expect(this.condition).toBeVisible();
  }

  async verifyBrandIsVisible() {
    await expect(this.brand).toBeVisible();
  }

  async setProductQuantity(quantity) {
    await this.quantityInput.fill(String(quantity));
  }

  async addProductToCart() {
    await this.addToCartButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async openCartFromModal() {
    await this.viewCartLink.click();
  }
}

module.exports = ProductDetailPage;

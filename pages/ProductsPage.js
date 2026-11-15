
const { expect } = require("@playwright/test");
const BasePage = require("./BasePage");

class ProductsPage extends BasePage {
  constructor(page) {
    super(page);

    this.searchInput = this.page.getByRole("textbox", {
      name: "Search Product",
    });

    this.searchButton = this.page.locator("#submit_search");

    this.searchedProductsHeading = this.page.getByRole("heading", {
      name: "Searched Products",
    });

    this.productCards = this.page.locator(".product-image-wrapper");
  }

  async openProductsPage() {
    await this.navigateTo("/products");
  }

  async searchForProduct(searchTerm) {
    await this.searchInput.fill(searchTerm);
    await this.searchButton.click();
  }

  async verifySearchResultsAreVisible() {
    await expect(this.searchedProductsHeading).toBeVisible();
    await expect(this.productCards.first()).toBeVisible();
  }

  async verifyProductNamesContain(searchTerm) {
    const productNames = this.page.locator(".productinfo p");
    const count = await productNames.count();

    for (let i = 0; i < count; i++) {
      const productName = await productNames.nth(i).innerText();

      expect(productName.toLowerCase()).toContain(searchTerm.toLowerCase());
    }
  }

  async openFirstProduct() {
    await this.page.getByRole("link", { name: "View Product" }).first().click();
  }

  async openProductByName(productName) {
    const productCard = this.productCards.filter({
      hasText: productName,
    });

    await expect(productCard).toHaveCount(1);

    await productCard.getByRole("link", {
      name: "View Product",
    }).click();
  }

  async addProductToCart(productName) {
    const productCard = this.productCards.filter({
      hasText: productName,
    });

    await expect(productCard).toHaveCount(1);

    await productCard.getByRole("button", {
      name: "Add to cart",
    }).click();
  }
}

module.exports = ProductsPage;

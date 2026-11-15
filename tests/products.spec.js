

const { test } = require("@playwright/test");
const searchData = require("../test-data/searchTerms.json");

const HeaderComponent = require("../pages/HeaderComponent");
const ProductsPage = require("../pages/ProductsPage");
const ProductDetailPage = require("../pages/ProductDetailPage");

test.describe("Product Tests", () => {
  let header;
  let products;
  let productDetail;

  test.beforeEach(async ({ page }) => {
    header = new HeaderComponent(page);
    products = new ProductsPage(page);
    productDetail = new ProductDetailPage(page);
  });

  test("should search for a product successfully", async () => {
    await products.openProductsPage();
    await products.searchForProduct(searchData.searchTerm);
    await products.verifySearchResultsAreVisible();
    await products.verifyProductNamesContain(searchData.searchTerm);
  });

  test("should display product details successfully", async () => {
    await products.openProductsPage();
    await products.openFirstProduct();

    await productDetail.verifyProductNameIsVisible();
    await productDetail.verifyCategoryIsVisible();
    await productDetail.verifyPriceIsVisible();
    await productDetail.verifyAvailabilityIsVisible();
    await productDetail.verifyConditionIsVisible();
    await productDetail.verifyBrandIsVisible();
  });
});


const { test } = require("@playwright/test");
const cartData = require("../test-data/cartProducts.json");

const ProductsPage = require("../pages/ProductsPage");
const ProductDetailPage = require("../pages/ProductDetailPage");
const CartPage = require("../pages/CartPage");

const {
  parsePriceText,
  calculateLineTotal,
  calculateCartTotal,
} = require("../utils/cartPriceCalculator");

test.describe("Shopping Cart Tests", () => {
  let products;
  let productDetail;
  let cart;

  test.beforeEach(async ({ page }) => {
    products = new ProductsPage(page);
    productDetail = new ProductDetailPage(page);
    cart = new CartPage(page);
  });

  test("should add two products and verify cart totals", async () => {
    for (let i = 0; i < cartData.products.length; i++) {
      const product = cartData.products[i];

      await products.openProductsPage();
      await products.openProductByName(product.name);

      if (product.quantity > 1) {
        await productDetail.setProductQuantity(product.quantity);
      }

      await productDetail.addProductToCart();

      if (i < cartData.products.length - 1) {
        await productDetail.continueShopping();
      } else {
        await productDetail.openCartFromModal();
      }
    }

    await cart.verifyCartIsVisible();
    await cart.verifyCartContainsProducts();

    const cartItems = [];

    for (const product of cartData.products) {
      const unitPriceText = await cart.getProductUnitPrice(product.name);
      const quantity = await cart.getProductQuantity(product.name);

      const unitPrice = parsePriceText(unitPriceText);
      const lineTotal = calculateLineTotal(unitPrice, quantity);

      const displayedLineTotal = await cart.getProductLineTotal(product.name);

      await cart.verifyProductQuantity(product.name, product.quantity);

      cartItems.push({ unitPrice, quantity });

      if (parsePriceText(displayedLineTotal) !== lineTotal) {
        throw new Error(`Incorrect line total for ${product.name}`);
      }
    }

    const expectedCartTotal = calculateCartTotal(cartItems);
    const displayedLineTotals = [];

    for (const product of cartData.products) {
      const displayedTotal = await cart.getProductLineTotal(product.name);
      displayedLineTotals.push(parsePriceText(displayedTotal));
    }

    const displayedCartTotal = displayedLineTotals.reduce(
      (total, amount) => total + amount,
      0
    );

    if (displayedCartTotal !== expectedCartTotal) {
      throw new Error(
        "Calculated cart total does not match displayed line totals"
      );
    }
  });

  test("should remove a product from the cart", async () => {
    const product = cartData.products[0];

    await products.openProductsPage();
    await products.openProductByName(product.name);
    await productDetail.addProductToCart();
    await productDetail.openCartFromModal();

    await cart.verifyCartContainsProducts();
    await cart.removeFirstProduct();
    await cart.verifyProductIsRemoved(product.name);
  });
});

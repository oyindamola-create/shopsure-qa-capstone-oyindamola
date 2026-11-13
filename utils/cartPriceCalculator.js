
    function parsePriceText(priceText) {
  const cleanedPrice = priceText.replace("Rs.", "").replace(/,/g, "").trim();

  if (cleanedPrice === "") {
    throw new Error("Invalid price text");
  }

  const price = Number(cleanedPrice);

  if (!Number.isFinite(price)) {
    throw new Error("Invalid price text");
  }

  return price;
}



function calculateLineTotal(unitPrice, quantity) {
  if (quantity < 1) {
    throw new Error("Quantity must be at least 1");
  }

  return unitPrice * quantity;
}


function calculateCartTotal(cartItemList) {
  if (!Array.isArray(cartItemList)) {
    throw new Error("Cart items must be an array");
  }

  let total = 0;

  for (const item of cartItemList) {
    total = total + calculateLineTotal(item.unitPrice, item.quantity);
  }

  return total;
}

module.exports = {
  parsePriceText,
  calculateLineTotal,
  calculateCartTotal
};
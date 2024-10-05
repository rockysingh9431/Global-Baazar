export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};
export const updateCart = (state) => {
  //calculate Items price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
  );

  //calculate Shipping Price if order is over $100 then free else $10 is shipping
  state.shippingPrice = addDecimals(state.itemsPrice > 100 ? 0 : 10);

  // Tax Price
  state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));

  //TOtal Price
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  localStorage.setItem("cart", JSON.stringify(state));
  return state;
};

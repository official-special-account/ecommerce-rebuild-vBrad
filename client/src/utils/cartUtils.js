// Notes: only rounds up the num value - preferred option
export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

// Notes: returns a rounded up value
// export const addDecimals = (num) => {
//   return Math.round((num * 100) / 100).toFixed(2);
// };

export const updateCart = (state) => {
  // Calculate the items price
  state.itemsPrice = state.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  // Calculate the shipping price
  state.shippingPrice = state.itemsPrice > 100 ? 0 : 10;

  // Calculate the tax price
  state.taxPrice = Number((state.itemsPrice * 0.15).toFixed(2));

  // Calculate the total price
  state.totalPrice = addDecimals(
    state.itemsPrice + state.shippingPrice + state.taxPrice
  );

  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};

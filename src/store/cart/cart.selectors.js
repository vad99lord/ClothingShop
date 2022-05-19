import { createSelector } from "reselect";

const selectCartReducer = (state) => state.cart;

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
);

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartOpen
)

export const selectCartTotal = createSelector(
  [selectCartItems],
  (cartItems) => getCartTotal(cartItems)
)

export const selectCartCount = createSelector(
  [selectCartItems],
  (cartItems) => getItemsCount(cartItems)
)

const getCartTotal = (cartItems) => {
  return cartItems.reduce(
    (currentTotal, cartItem) =>
      currentTotal + cartItem.quantity * cartItem.price,
    0
  );
};

const getItemsCount = (cartItems) => {
  return cartItems.reduce(
    (itemsCount, currentValue) => itemsCount + currentValue.quantity,
    0
  );
};
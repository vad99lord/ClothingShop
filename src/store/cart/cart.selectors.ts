import { createSelector } from "reselect";
import { CartState } from "./cart.reducer";
import { CartItem } from "./cart.types";

const selectCartReducer = (state: any): CartState => state.cart;

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

const getCartTotal = (cartItems: CartItem[]) => {
  return cartItems.reduce(
    (currentTotal, cartItem) =>
      currentTotal + cartItem.quantity * cartItem.price,
    0
  );
};

const getItemsCount = (cartItems: CartItem[]) => {
  return cartItems.reduce(
    (itemsCount, currentValue) => itemsCount + currentValue.quantity,
    0
  );
};
import {
  createAction,
  withMatcher,
} from "../../utils/reducer/reducer.utils";
import { CartItem, CART_ACTION_TYPES } from "./cart.types";

export const setIsCartOpen = withMatcher((isCartOpen: boolean) => {
  return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isCartOpen);
});

export const addItemToCart = withMatcher(
  (cartItems: CartItem[], productToAdd: CartItem) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(
      CART_ACTION_TYPES.SET_CART_ITEMS,
      newCartItems
    );
  }
);
export const decreaseItemFromCart = withMatcher(
  (cartItems: CartItem[], productToDecrease: CartItem) => {
    const newCartItems = decreaseCartItem(
      cartItems,
      productToDecrease
    );
    return createAction(
      CART_ACTION_TYPES.SET_CART_ITEMS,
      newCartItems
    );
  }
);
export const removeItemFromCart = withMatcher(
  (cartItems: CartItem[], productToRemove: CartItem) => {
    const newCartItems = removeCartItem(cartItems, productToRemove);
    return createAction(
      CART_ACTION_TYPES.SET_CART_ITEMS,
      newCartItems
    );
  }
);

const productEquals = (
  thisProduct: CartItem,
  thatProduct: CartItem
) => thisProduct.id === thatProduct.id;

const addCartItem = (
  cartItems: CartItem[],
  productToAdd: CartItem
): CartItem[] => {
  let productToAddExists = false;
  const newCartItems = cartItems.map((cartItem) => {
    if (!productEquals(cartItem, productToAdd)) {
      return cartItem;
    }
    productToAddExists = true;
    return { ...cartItem, quantity: cartItem.quantity + 1 };
  });
  if (productToAddExists) {
    return newCartItems;
  } else {
    return [...newCartItems, { ...productToAdd, quantity: 1 }];
  }
};

const decreaseCartItem = (
  cartItems: CartItem[],
  productToDecrease: CartItem
): CartItem[] => {
  const currentProductToDecrease = cartItems.find((cartItem) =>
    productEquals(cartItem, productToDecrease)
  );
  if (!currentProductToDecrease) {
    return cartItems;
  }
  if (currentProductToDecrease.quantity > 1) {
    return cartItems.map((cartItem) => {
      if (!productEquals(cartItem, productToDecrease)) {
        return cartItem;
      }
      return { ...cartItem, quantity: cartItem.quantity - 1 };
    });
  } else {
    return removeCartItem(cartItems, currentProductToDecrease);
  }
};

const removeCartItem = (
  cartItems: CartItem[],
  productToRemove: CartItem
): CartItem[] => {
  return cartItems.filter(
    (cartItem) => !productEquals(cartItem, productToRemove)
  );
};

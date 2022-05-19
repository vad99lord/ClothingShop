import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

export const setIsCartOpen = (isCartOpen) => {
  return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isCartOpen);
};

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};
export const decreaseItemFromCart = (cartItems, productToDecrease) => {
  const newCartItems = decreaseCartItem(cartItems, productToDecrease);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS,newCartItems);
};
export const removeItemFromCart = (cartItems, productToRemove) => {
  const newCartItems = removeCartItem(cartItems, productToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS,newCartItems);
};

const productEquals = (thisProduct, thatProduct) =>
  thisProduct.id === thatProduct.id;

const addCartItem = (cartItems, productToAdd) => {
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

const decreaseCartItem = (cartItems, productToDecrease) => {
  const currentProductToDecrease = cartItems.find((cartItem) =>
    productEquals(cartItem, productToDecrease)
  );
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

const removeCartItem = (cartItems, productToRemove) => {
  return cartItems.filter(
    (cartItem) => !productEquals(cartItem, productToRemove)
  );
};

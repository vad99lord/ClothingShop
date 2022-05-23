import {
  ActionWithPayload,
  createAction,
  withMatcher,
} from "../../utils/reducer/reducer.utils";
import { CategoryItem } from "../categories/category.types";
import { CartItem, CART_ACTION_TYPES } from "./cart.types";

export type SetCartIsOpen = ActionWithPayload<
  CART_ACTION_TYPES.SET_IS_CART_OPEN,
  boolean
>;

export type SetCartItems = ActionWithPayload<
  CART_ACTION_TYPES.SET_CART_ITEMS,
  CartItem[]
>;

export const setIsCartOpen = withMatcher(
  (isCartOpen: boolean): SetCartIsOpen =>
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isCartOpen)
);

export const setCartItems = withMatcher(
  (cartItems: CartItem[]): SetCartItems =>
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
);

export const addItemToCart = withMatcher(
  (cartItems: CartItem[], productToAdd: CartItem) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return setCartItems(newCartItems);
  }
);
export const decreaseItemFromCart = withMatcher(
  (cartItems: CartItem[], productToDecrease: CartItem) => {
    const newCartItems = decreaseCartItem(
      cartItems,
      productToDecrease
    );
    return setCartItems(newCartItems);
  }
);
export const removeItemFromCart = withMatcher(
  (cartItems: CartItem[], productToRemove: CartItem) => {
    const newCartItems = removeCartItem(cartItems, productToRemove);
    return setCartItems(newCartItems);
  }
);

const productEquals = (
  thisProduct: CartItem | CategoryItem,
  thatProduct: CartItem | CategoryItem
) => thisProduct.id === thatProduct.id;

const addCartItem = (
  cartItems: CartItem[],
  productToAdd: CategoryItem
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
  productToDecrease: CategoryItem
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

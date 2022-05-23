import { AnyAction } from "redux";
import { CartItem } from "./cart.types";
import {
  addItemToCart,
  decreaseItemFromCart,
  removeItemFromCart,
  setIsCartOpen,
} from "./cart.actions";

type MutableCartState = {
  isCartOpen: boolean;
  cartItems: CartItem[];
};

export type CartState = Readonly<MutableCartState>;

export const CART_INITIAL_STATE: CartState = {
  isCartOpen: false,
  cartItems: [],
};

const setCartItemsActions = [
  addItemToCart,
  decreaseItemFromCart,
  removeItemFromCart,
];

export const cartReducer = (
  state = CART_INITIAL_STATE,
  action = {} as AnyAction
): CartState => {
  setCartItemsActions.forEach((actionMatcher) => {
    if (actionMatcher.match(action)) {
      return {
        ...state,
        cartItems: action.payload,
      };
    }
  });
  if (setIsCartOpen.match(action)) {
    return {
      ...state,
      isCartOpen: action.payload,
    };
  }
  return state;
};

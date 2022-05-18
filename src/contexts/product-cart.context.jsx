import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

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

export const ProductCartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  decreaseCartItem: () => {},
  removeCartItem: () => {},
  cartItemsCount: 0,
  cartTotal: 0,
});

export const PRODUCT_CART_ACTION_TYPES = {
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
  SET_CART_ITEMS: "SET_CART_ITEMS",
};

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartItemsCount: 0,
  cartTotal: 0,
};

const productCartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case PRODUCT_CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case PRODUCT_CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in productCartReducer`);
  }
};

export const ProductCartProvider = ({ children }) => {
  const [
    { isCartOpen, cartItems, cartItemsCount, cartTotal },
    dispatch,
  ] = useReducer(productCartReducer, INITIAL_STATE);

  const updateCartItemsReducer = (cartItems) => {
    const newCartItemsCount = getItemsCount(cartItems);
    const newCartTotal = getCartTotal(cartItems);
    const payload = {
      cartItems,
      cartItemsCount: newCartItemsCount,
      cartTotal: newCartTotal,
    };

    dispatch(createAction(PRODUCT_CART_ACTION_TYPES.SET_CART_ITEMS, payload));
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };
  const decreaseItemFromCart = (productToDecrease) => {
    const newCartItems = decreaseCartItem(
      cartItems,
      productToDecrease
    );
    updateCartItemsReducer(newCartItems);
  };
  const removeItemFromCart = (productToRemove) => {
    const newCartItems = removeCartItem(cartItems, productToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const setIsCartOpen = (isCartOpen) => {
    dispatch(
      createAction(
        PRODUCT_CART_ACTION_TYPES.SET_IS_CART_OPEN,
        isCartOpen
      )
    );
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    decreaseItemFromCart,
    removeItemFromCart,
    cartItemsCount,
    cartTotal,
  };

  return (
    <ProductCartContext.Provider value={value}>
      {children}
    </ProductCartContext.Provider>
  );
};

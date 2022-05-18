import { createContext, useState, useReducer } from "react";
import { useEffect } from "react";

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
  ADD_ITEM_TO_CART: "ADD_ITEM_TO_CART",
  DECREASE_CART_ITEM: "DECREASE_CART_ITEM",
  REMOVE_CART_ITEM: "REMOVE_CART_ITEM",
  SET_CART_TOTAL: "SET_CART_TOTAL",
  SET_CART_ITEMS_COUNT: "SET_CART_ITEMS_COUNT",
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
    case PRODUCT_CART_ACTION_TYPES.SET_IS_CART_OPEN: {
      return { ...state, isCartOpen: payload };
    }
    case PRODUCT_CART_ACTION_TYPES.ADD_ITEM_TO_CART: {
      const newCartItems = addCartItem(state.cartItems, payload);
      return { ...state, cartItems: newCartItems };
    }
    case PRODUCT_CART_ACTION_TYPES.DECREASE_CART_ITEM: {
      const newCartItems = decreaseCartItem(state.cartItems, payload);
      return { ...state, cartItems: newCartItems };
    }
    case PRODUCT_CART_ACTION_TYPES.REMOVE_CART_ITEM: {
      const newCartItems = removeCartItem(state.cartItems, payload);
      return { ...state, cartItems: newCartItems };
    }
    case PRODUCT_CART_ACTION_TYPES.SET_CART_TOTAL: {
      const newCartTotal = getCartTotal(payload);
      return { ...state, cartTotal: newCartTotal };
    }
    case PRODUCT_CART_ACTION_TYPES.SET_CART_ITEMS_COUNT: {
      const newCartItemsCount = payload.reduce(
        (itemsCount, currentValue) =>
          itemsCount + currentValue.quantity,
        0
      );
      console.log(newCartItemsCount);
      return { ...state, cartItemsCount: newCartItemsCount };
    }
    default:
      throw new Error(`Unhandled type ${type} in productCartReducer`);
  }
};

export const ProductCartProvider = ({ children }) => {
  const [
    { isCartOpen, cartItems, cartItemsCount, cartTotal },
    dispatch,
  ] = useReducer(productCartReducer, INITIAL_STATE);
  const setIsCartOpen = (isCartOpen) =>
    dispatch({
      type: PRODUCT_CART_ACTION_TYPES.SET_IS_CART_OPEN,
      payload: isCartOpen,
    });
  const setCartItemsCount = (cartItems) =>
    dispatch({
      type: PRODUCT_CART_ACTION_TYPES.SET_CART_ITEMS_COUNT,
      payload: cartItems,
    });
  const setCartTotal = (cartItems) =>
    dispatch({
      type: PRODUCT_CART_ACTION_TYPES.SET_CART_TOTAL,
      payload: cartItems,
    });
  useEffect(() => {
    setCartTotal(cartItems);
  }, [cartItems]);
  useEffect(() => {
    setCartItemsCount(cartItems);
  }, [cartItems]);
  const addItemToCart = (productToAdd) =>
    dispatch({
      type: PRODUCT_CART_ACTION_TYPES.ADD_ITEM_TO_CART,
      payload: productToAdd,
    });
  const decreaseItemFromCart = (productToDecrease) =>
    dispatch({
      type: PRODUCT_CART_ACTION_TYPES.DECREASE_CART_ITEM,
      payload: productToDecrease,
    });
  const removeItemFromCart = (productToRemove) =>
    dispatch({
      type: PRODUCT_CART_ACTION_TYPES.REMOVE_CART_ITEM,
      payload: productToRemove,
    });

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

import { createContext, useState } from "react";
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

export const ProductCartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  useEffect(() => {
    const newCartTotal = getCartTotal(cartItems);
    setCartTotal(newCartTotal);
  }, [cartItems]);
  useEffect(() => {
    const newCartItemsCount = cartItems.reduce(
      (itemsCount, currentValue) =>
        itemsCount + currentValue.quantity,
      0
    );
    setCartItemsCount(newCartItemsCount);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const decreaseItemFromCart = (productToDecrease) => {
    setCartItems(decreaseCartItem(cartItems, productToDecrease));
  };

  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
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

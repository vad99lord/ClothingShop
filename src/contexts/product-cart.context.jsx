import { createContext, useState } from "react";
import { useEffect } from "react";

const addCartItem = (cartItems, productToAdd) => {
  let productToAddExists = false;
  const newCartItems = cartItems.map((cartItem) => {
    if (cartItem.id !== productToAdd.id) {
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

export const ProductCartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartItemsCount: 0,
});

export const ProductCartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartItemsCount, setCartItemsCount] = useState(0);
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

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartItemsCount,
  };

  return (
    <ProductCartContext.Provider value={value}>
      {children}
    </ProductCartContext.Provider>
  );
};

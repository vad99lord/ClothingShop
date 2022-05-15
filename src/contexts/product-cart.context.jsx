import { createContext, useState } from "react";

export const ProductCartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
});

export const ProductCartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const value = { isCartOpen, setIsCartOpen };

  return (
    <ProductCartContext.Provider value={value}>
      {children}
    </ProductCartContext.Provider>
  );
};

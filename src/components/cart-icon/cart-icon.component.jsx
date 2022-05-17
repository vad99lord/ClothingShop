import {
  ShoppingIcon,
  CartIconContainer,
  ItemCount,
} from "./cart-icon.styles";
import { useContext } from "react";

import { ProductCartContext } from "../../contexts/product-cart.context";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartItemsCount } = useContext(
    ProductCartContext
  );
  const toggleIsCartOpen = () => {
    setIsCartOpen(!isCartOpen);
  };
  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon className="shopping-icon" />
      <ItemCount>{cartItemsCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;

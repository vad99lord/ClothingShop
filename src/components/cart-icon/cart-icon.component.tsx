import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsCartOpen } from "../../store/cart/cart.actions";
import { selectCartCount, selectIsCartOpen } from "../../store/cart/cart.selectors";
import {
  CartIconContainer,
  ItemCount, ShoppingIcon
} from "./cart-icon.styles";


const CartIcon = () => {
  const dispatch = useDispatch();
  const isCartOpen = useSelector(selectIsCartOpen);
  const cartItemsCount = useSelector(selectCartCount);
  
  const toggleIsCartOpen = () => {
    dispatch(setIsCartOpen(!isCartOpen));
  };
  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
      <ShoppingIcon className="shopping-icon" />
      <ItemCount>{cartItemsCount}</ItemCount>
    </CartIconContainer>
  );
};

export default CartIcon;

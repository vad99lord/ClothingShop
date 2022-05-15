import "./cart-icon.styles.scss";
import { useContext } from "react";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

import { ProductCartContext } from "../../contexts/product-cart.context";

const CartIcon = () => {
  const { isCartOpen, setIsCartOpen, cartItemsCount } = useContext(ProductCartContext);
  const toggleIsCartOpen = () => {
    setIsCartOpen(!isCartOpen);
  };
  return (
    <div className="cart-icon-container">
      <ShoppingIcon
        onClick={toggleIsCartOpen}
        className="shopping-icon"
      />
      <span className="item-count">{cartItemsCount}</span>
    </div>
  );
};

export default CartIcon;

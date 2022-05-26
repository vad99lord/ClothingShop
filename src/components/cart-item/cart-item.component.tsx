import { FC, memo } from "react";
import { CartItem as Item } from "../../store/cart/cart.types";
import { CartItemContainer, ItemDetails } from "./cart-item.styles";

export type CartItemProps = {
  cartItem: Item;
};

const CartItem: FC<CartItemProps> = memo(({ cartItem }) => {
  const { imageUrl, price, name, quantity } = cartItem;

  return (
    <CartItemContainer>
      <img src={imageUrl} alt={`${name}`} />
      <ItemDetails>
        <span>{name}</span>
        <span>
          {quantity} x ${price}
        </span>
      </ItemDetails>
    </CartItemContainer>
  );
});

export default CartItem;

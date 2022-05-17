import {
  ProductCartContainer,
  Footer,
  Name,
  Price,
} from "./product-card.styles";

import Button, {
  BUTTON_TYPE_CLASSES,
} from "../button/button.component";
import { useContext } from "react";
import { ProductCartContext } from "../../contexts/product-cart.context";

const ProductCard = ({ product }) => {
  const { name, price, imageUrl } = product;
  const { addItemToCart } = useContext(ProductCartContext);
  const addProductToCart = () => addItemToCart(product);
  return (
    <ProductCartContainer>
      <img src={imageUrl} alt={`${name}`} />
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </Footer>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={addProductToCart}
      >
        Add to card
      </Button>
    </ProductCartContainer>
  );
};

export default ProductCard;

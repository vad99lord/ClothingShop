import { useContext } from "react";

import "./checkout.style.scss";
import { ProductCartContext } from "../../contexts/product-cart.context";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";

const Checkout = () => {
  const { cartItems, cartTotal } = useContext(ProductCartContext);

  return (
    <div className='checkout-container'>
      <div className='checkout-header'>
        <div className='header-block'>
          <span>Product</span>
        </div>
        <div className='header-block'>
          <span>Description</span>
        </div>
        <div className='header-block'>
          <span>Quantity</span>
        </div>
        <div className='header-block'>
          <span>Price</span>
        </div>
        <div className='header-block'>
          <span>Remove</span>
        </div>
      </div>
      {cartItems.map((cartItem) => (
        <CheckoutItem key={cartItem.id} cartItem={cartItem} />
      ))}
      <div className='total'>TOTAL: ${cartTotal}</div>
    </div>
  );
};

// const Checkout = () => {
//   const {
//     cartItems,
//     addItemToCart,
//     decreaseItemFromCart,
//     removeItemFromCart,
//     cartTotal
//   } = useContext(ProductCartContext);
//   return (
//     <div>
//       <table>
//         <thead>
//           <tr>
//             <th>Product</th>
//             <th>Description</th>
//             <th>Quantity</th>
//             <th>Price</th>
//             <th>Remove</th>
//           </tr>
//         </thead>
//         <tbody>
//           {cartItems.map((cartItem) => (
//             <tr key={cartItem.id}>
//               <td>
//                 <img
//                   src={cartItem.imageUrl}
//                   alt={`${cartItem.name}`}
//                 />
//               </td>
//               <td>{cartItem.name}</td>
//               <td>
//                 <Button
//                   onClick={() => {
//                     decreaseItemFromCart(cartItem);
//                   }}
//                 >
//                   Decrease
//                 </Button>
//                 {cartItem.quantity}
//                 <Button
//                   onClick={() => {
//                     addItemToCart(cartItem);
//                   }}
//                 >
//                   Increase
//                 </Button>
//               </td>
//               <td>{cartItem.price}</td>
//               <td>
//                 <Button
//                   onClick={() => {
//                     removeItemFromCart(cartItem);
//                   }}
//                 >
//                   Remove
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <h2>Total: {cartTotal}</h2>
//     </div>
//   );
// };

export default Checkout;

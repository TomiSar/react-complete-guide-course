import Modal from './UI/Modal';
import { useContext } from 'react';
import CartContext from '../store/CartContext';
import { formatCurrency } from '../utils/helpers';
import Button from './UI/Button';
import UserProgressContext from '../store/UserProgressContext';
import CartItem from './CartItem';

export default function Cart() {
  const cartContext = useContext(CartContext);
  const userProgressContext = useContext(UserProgressContext);

  const cartTotalItems = cartContext.items.reduce(
    (totalNumberOfItems, item) => totalNumberOfItems + item.quantity,
    0
  );

  const cartTotal = cartContext.items.reduce(
    (totalPrice, item) => totalPrice + item.quantity * item.price,
    0
  );

  function handleCloseCart() {
    userProgressContext.hideCart();
  }

  function handleGoToCheckout() {
    userProgressContext.showCheckout();
  }

  return (
    <Modal
      className='cart'
      open={userProgressContext.progress === 'cart'}
      onClose={userProgressContext.progress === 'cart' ? handleCloseCart : null}
    >
      <h2>
        Your Cart has {cartTotalItems}
        {cartTotalItems === 1 ? ' item' : ' items'}
      </h2>
      <ul>
        {cartContext.items.map((item) => (
          <CartItem
            key={item.id}
            name={item.name}
            quantity={item.quantity}
            price={item.price}
            onDecrease={() => cartContext.removeItem(item.id)}
            onIncrease={() => cartContext.addItem(item)}
          />
        ))}
      </ul>
      <p className='cart-total'>{formatCurrency.format(cartTotal)}</p>
      <p className='modal-actions'>
        <Button textOnly onClick={handleCloseCart}>
          Close
        </Button>
        {cartContext.items.length > 0 && (
          <Button onClick={handleGoToCheckout}>Go To Checkout</Button>
        )}
      </p>
    </Modal>
  );
}

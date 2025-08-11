import { useContext } from 'react';
import { BASE_URL } from '../utils/constants';
import { formatCurrency } from '../utils/helpers';
import Button from './UI/Button';
import CartContext from '../store/CartContext';

function MealItem({ meal }) {
  const cartContext = useContext(CartContext);

  function handleAddMealToCart() {
    cartContext.addItem(meal);
  }

  return (
    <>
      <article className='meal-item'>
        <img src={`${BASE_URL}/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className='meal-item-price'>{formatCurrency.format(meal.price)}</p>
          <p className='meal-item-description'>{meal.description}</p>
        </div>
        <p className='meal-item-actions'>
          <Button onClick={handleAddMealToCart}>Add to Cart</Button>
        </p>
      </article>
    </>
  );
}

export default MealItem;

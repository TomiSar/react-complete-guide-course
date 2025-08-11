import { API_MEALS_URL } from '../utils/constants';
import MealItem from './MealItem';
import useHttp from '../hooks/useHttp';
import Error from './Error';

const requestConfig = {};

export default function Meals() {
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp(API_MEALS_URL, requestConfig, []);

  if (isLoading) {
    return <p>Fetching Meals ...</p>;
  }

  if (error) {
    return <Error title='Failed to fetch meals' message={message} />;
  }

  return (
    <ul id='meals'>
      {loadedMeals.map((meal) => (
        <li key={meal.id}>
          <MealItem meal={meal} />
        </li>
      ))}
    </ul>
  );
}

import { useDispatch, useSelector } from 'react-redux';
import classes from './Counter.module.css';
import { counterActions } from '../store/counterReducer';

const Counter = () => {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter.counter);
  const showCounter = useSelector((state) => state.counter.showCounter);

  const incrementHandler = () => {
    dispatch(counterActions.increment());
  };
  const increaseHandler = () => {
    dispatch(counterActions.increase(5));
  };

  const resetHandler = () => {
    dispatch(counterActions.reset());
  };

  const decrementHandler = () => {
    dispatch(counterActions.decrement());
  };

  const toggleCounterHandler = () => {
    dispatch(counterActions.toggleCounter());
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {showCounter && (
        <div className={classes.value}> COUNTER VALUE: {counter}</div>
      )}
      <div>
        <button className={classes.increment} onClick={incrementHandler}>
          Increment
        </button>
        <button className={classes.increment} onClick={increaseHandler}>
          Increase 5
        </button>
        <button className={classes.reset} onClick={resetHandler}>
          Reset
        </button>
        <button className={classes.decrement} onClick={decrementHandler}>
          Decrement
        </button>
      </div>
      <button onClick={toggleCounterHandler}>
        {showCounter ? 'Hide Counter' : 'Show Counter'}
      </button>
    </main>
  );
};

export default Counter;

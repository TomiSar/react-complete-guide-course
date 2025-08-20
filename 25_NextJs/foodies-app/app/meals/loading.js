import { HashLoader } from 'react-spinners';
import classes from './page.module.css';

export default function MealsLoadingPage() {
  return (
    <div className={classes.loading}>
      <HashLoader color='#ff7400' speedMultiplier={2} />
      <p>Fetching meals...</p>
    </div>
  );
}

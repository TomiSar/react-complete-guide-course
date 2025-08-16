import { Link } from 'react-router-dom';
import PageContent from '../components/PageContent';

function HomePage() {
  return (
    <PageContent title='Welcome!'>
      <p>Browse all our amazing events!</p>

      <p>
        Explore all <Link to='/events'>events</Link>
      </p>
    </PageContent>
  );
}

export default HomePage;

import { Link } from 'react-router-dom';
import PageContent from '../components/PageContent';

function HomePage() {
  return (
    <>
      <PageContent title='Welcome!'>
        <p>
          Browse all our amazing events or start by adding your own event to the
          list.
        </p>
      </PageContent>
      <p>
        Go to <Link to='/events'>events page</Link>
      </p>
    </>
  );
}

export default HomePage;

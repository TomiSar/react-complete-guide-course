import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <>
      <h1>Home Page</h1>
      <p>
        Go to <Link to='/events'>events page</Link>
      </p>
    </>
  );
}

export default HomePage;

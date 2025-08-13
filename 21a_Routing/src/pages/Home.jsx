import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  function navigateToProducts() {
    navigate('/products');
  }

  return (
    <>
      <h1>Home Page</h1>
      <p>
        Go to <Link to='/products'>the list of products</Link>
      </p>
      <p>
        <button onClick={navigateToProducts}>Products</button>
      </p>
    </>
  );
}

export default Home;

import { Link, useNavigate } from 'react-router-dom';

const DUMMY_PRODUCTS = [
  {
    id: 'product1',
    title: 'First Product',
  },
  {
    id: 'product2',
    title: 'Second Product',
  },
  {
    id: 'product3',
    title: 'Third Product',
  },
];

function Products() {
  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate('/');
  };

  return (
    <>
      <h1>Products Page</h1>
      <ul>
        {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Link to={product.id}>{product.title}</Link>
          </li>
        ))}
      </ul>
      <p>
        Go to <Link to='/'>the home page</Link>
      </p>
      <p>
        <button onClick={navigateToHome}>Home</button>
      </p>
    </>
  );
}

export default Products;

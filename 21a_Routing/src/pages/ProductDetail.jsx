import { Link, useParams } from 'react-router-dom';

function ProductDetail() {
  const params = useParams();

  return (
    <>
      <h1>ProductDetail page</h1>
      <p>{params.id}</p>
      <p>
        Go <Link to='/products'>Back</Link>
      </p>
    </>
  );
}

export default ProductDetail;

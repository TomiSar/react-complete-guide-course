import { RingLoader } from 'react-spinners';

function LoadingSpinner() {
  return (
    <>
      <h2>Loading...</h2>
      <RingLoader className='loader' color='#36d7b7' />
    </>
  );
}

export default LoadingSpinner;

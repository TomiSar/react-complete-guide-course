import { useState } from 'react';

export default function ClientDemo({ children }) {
  const [count, setCount] = useState(0);
  return (
    <div className='client-cmp'>
      <h2>React Client Component</h2>
      <p>
        Will be rendered on the client side <b>AND</b> the server.
      </p>
      <button onClick={() => setCount((prevCount) => prevCount + 1)}>+</button>
      <button onClick={() => setCount((prevCount) => prevCount - 1)}>-</button>
      <span> Count: {count}</span>
      {children}
    </div>
  );
}

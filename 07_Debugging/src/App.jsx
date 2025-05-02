import { useState } from 'react';

import Header from './components/Header.jsx';
import UserInput from './components/UserInput.jsx';
import Results from './components/Results.jsx';

function App() {
  const [userInput, setUserInput] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10,
  });

  const validYear = userInput.duration >= 1;

  function handleChange(event) {
    const { name, value } = event.target;
    setUserInput((prevUserInput) => {
      return {
        ...prevUserInput,
        [name]: Number(value),
      };
    });
  }

  const handleSubmit = () => {
    console.log('Submit');
  };

  return (
    <>
      <Header />
      <UserInput userInput={userInput} onChange={handleChange} />
      {!validYear && (
        <p className='error'>Please enter positive year duration</p>
      )}
      {validYear && <Results inputData={userInput} />}
    </>
  );
}

export default App;

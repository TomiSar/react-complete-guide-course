import { useState } from 'react';
import Header from './components/Header';
import UserInput from './components/UserInput';
import Results from './components/Results';

function App() {
  const [userInput, setUserInput] = useState({
    initialInvestment: 10000,
    annualInvestment: 1200,
    expectedReturn: 6,
    duration: 10,
  });

  const yearIsValid = userInput.duration >= 1;

  function handleInputChange(event) {
    const { name, value } = event.target;
    setUserInput((prevUserInput) => {
      return {
        ...prevUserInput,
        [name]: Number(value),
      };
    });
  }

  return (
    <>
      <Header />
      <UserInput userInput={userInput} onChange={handleInputChange} />
      {!yearIsValid && (
        <p className='error'>Please enter positive year duration</p>
      )}
      {yearIsValid && <Results inputData={userInput} />}
    </>
  );
}

export default App;

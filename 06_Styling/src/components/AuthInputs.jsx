import { useState } from 'react';
import { validationSchema } from '../helpers/validation';
import { styled } from 'styled-components';
import Button from './Button';

export default function AuthInputs() {
  const [enteredData, setEnteredData] = useState({
    email: '',
    password: '',
    forename: '',
    surname: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  function handleInputChange(event) {
    const { name, value } = event.target;
    setEnteredData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  // // Validation on blur input
  // async function handleInputBlur(event) {
  //   const { name } = event.target;
  //   try {
  //     await validationSchema.validateAt(name, enteredData);

  //     setErrors((prevErrors) => ({
  //       ...prevErrors,
  //       [name]: undefined, //No errors
  //     }));
  //   } catch (error) {
  //     setErrors((prevErrors) => ({
  //       ...prevErrors,
  //       [name]: error.message,
  //     }));
  //   }
  // }

  // Validation in login function
  async function handleLogin() {
    setSubmitted(true);
    try {
      await validationSchema.validate(enteredData, { abortEarly: false });
      setErrors({});
    } catch (validationErrors) {
      const formattedErrors = {};
      validationErrors.inner.forEach((error) => {
        formattedErrors[error.path] = error.message;
      });
      setErrors(formattedErrors);
    }
    setSubmitted(false);
  }

  return (
    <div id='auth-inputs'>
      <div className='controls'>
        <div>
          <label>Email</label>
          <input
            className={errors.email ? 'invalid' : undefined}
            type='email'
            name='email'
            placeholder='email'
            onChange={handleInputChange}
            // onBlur={handleInputBlur}
          />
          {errors.email && <p className='inputError'>{errors.email}</p>}
        </div>
        <div>
          <label>Password</label>
          <input
            className={errors.password ? 'invalid' : undefined}
            type='password'
            name='password'
            placeholder='password'
            onChange={handleInputChange}
            // onBlur={handleInputBlur}
          />
          {errors.password && <p className='inputError'>{errors.password}</p>}
        </div>
        <div>
          <label>Forename</label>
          <input
            className={errors.forename ? 'invalid' : undefined}
            type='text'
            name='forename'
            placeholder='forename'
            onChange={handleInputChange}
            // onBlur={handleInputBlur}
          />
          {errors.forename && <p className='inputError'>{errors.forename}</p>}
        </div>
        <div>
          <label>Surname</label>
          <input
            className={errors.surname ? 'invalid' : undefined}
            type='text'
            name='surname'
            placeholder='surname'
            onChange={handleInputChange}
            // onBlur={handleInputBlur}
          />
          {errors.surname && <p className='inputError'>{errors.surname}</p>}
        </div>
      </div>
      <div className='actions'>
        <button type='button' className='text-button'>
          Create a new account
        </button>
        <Button className='button' onClick={handleLogin}>
          Sign In
        </Button>
      </div>
    </div>
  );
}

// Styled components
const ControlContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const Label = styled.div`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #6b7280;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  line-height: 1.5;
  background-color: ${({ invalid }) => (invalid ? '#fed2d2' : '#d1d5db')};
  /* color: #374151; */
  color: ${({ invalid }) => (invalid ? '#ef4444' : '#374151')};
  border: 1px solid ${({ invalid }) => (invalid ? '#f73f3f' : 'transparent')};
  /* margin-bottom: 1.2rem; */
  border-radius: 0.25rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
`;

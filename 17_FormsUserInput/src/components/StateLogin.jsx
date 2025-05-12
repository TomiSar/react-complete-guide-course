import Input from './Input';
import { hasMinLength, isEmail, isNotEmpty } from '../util/validation';
import { useInput } from '../hooks/useInput';

export default function Login() {
  const {
    value: emailValue,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailBlur,
    hasError: emailHasError,
    handleReset: handleResetEmail,
  } = useInput('', (value) => isEmail(value) && isNotEmpty(value));

  const {
    value: passwordValue,
    handleInputChange: handlePasswordChange,
    handleInputBlur: handlePasswordBlur,
    hasError: passwordHasError,
    handleReset: handleResetPassword,
  } = useInput('', (value) => hasMinLength(value, 4));

  const handleSubmit = (event) => {
    event.preventDefault();
    if (emailHasError && passwordHasError) return;
    console.log(emailValue, passwordValue);
  };

  const handleReset = () => {
    handleResetEmail();
    handleResetPassword();
    console.log(emailValue, passwordValue);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>

      <div className='control-row'>
        <Input
          id='email'
          label='Email'
          error={emailHasError && 'Please enter a valid email address.'}
          type='email'
          name='email'
          value={emailValue}
          onChange={handleEmailChange}
          onBlur={handleEmailBlur}
        />
        <Input
          id='password'
          label='Password'
          error={passwordHasError && 'Please enter a valid password.'}
          type='password'
          name='password'
          value={passwordValue}
          onChange={handlePasswordChange}
          onBlur={handlePasswordBlur}
        />
      </div>

      <p className='form-actions'>
        <button className='button button-flat' onClick={handleReset}>
          Reset
        </button>
        <button className='button'>Login</button>
      </p>
    </form>
  );
}

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import classes from './Auth.module.css';
import { API_REGISTER_USER_URL } from '../utils/constants';

function RegisterPage() {
  const router = useRouter();
  const [userdata, setUserdata] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    const response = await fetch(API_REGISTER_USER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: userdata.name,
        email: userdata.email,
        password: userdata.password,
      }),
    });

    const data = await response.json();
    if (!response.ok) {
      setError(data.message || 'Something went wrong with registration!');
    } else {
      setMessage('Registration successful! Redirecting to login...');
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    }
  };

  function handleInputChange(event) {
    const { id, value } = event.target;
    setUserdata((prev) => ({
      ...prev,
      [id]: value,
    }));
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <h1>Register Page To React Meetups</h1>
      <div className={classes.control}>
        <label htmlFor='name'>Name</label>
        <input
          id='name'
          type='text'
          placeholder='Name...'
          value={userdata.name}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className={classes.control}>
        <label htmlFor='email'>Email</label>
        <input
          id='email'
          type='email'
          placeholder='Email...'
          value={userdata.email}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className={classes.control}>
        <label htmlFor='password'>Password</label>
        <input
          id='password'
          type='password'
          placeholder='Password...'
          value={userdata.password}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className={classes.error}>{error && <p>{error}</p>}</div>
      <div className={classes.message}>{message && <p>{message}</p>}</div>
      <div className={classes.actions}>
        <button type='submit'>Create Account</button>
      </div>
      <div className={classes.footer}>
        <h1>
          Already have an account? <Link href='/login'>Login</Link>
        </h1>
      </div>
    </form>
  );
}

export default RegisterPage;

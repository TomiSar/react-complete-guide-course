import Link from 'next/link';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import classes from './Auth.module.css';

function LoginPage() {
  const router = useRouter();
  const [userdata, setUserdata] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const result = await signIn('credentials', {
      redirect: false,
      email: userdata.email,
      password: userdata.password,
    });

    if (result.error) {
      setError(result.error);
    } else {
      router.replace('/');
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
      <h1>Login Page to React Meetups</h1>
      <div className={classes.control}>
        <label htmlFor='email'>Email</label>
        <input
          id='email'
          type='email'
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
          value={userdata.password}
          onChange={handleInputChange}
          required
        />
      </div>
      <div className={classes.error}>{error && <p>{error}</p>}</div>
      <div className={classes.actions}>
        <button type='submit'>Login</button>
      </div>
      <div className={classes.footer}>
        <h1>
          Don't have an account? <Link href='/register'>Register</Link>
        </h1>
      </div>
    </form>
  );
}

export default LoginPage;

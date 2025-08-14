import { useEffect, useState } from 'react';
import { useFetcher } from 'react-router-dom';
import classes from './NewsletterSignup.module.css';

function NewsletterSignup() {
  const fetcher = useFetcher();
  const { data, state } = fetcher;
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (state === 'idle' && data && data.message) {
      window.alert(data.message);
      setEmail('');
    }
  }, [data, state]);

  return (
    <fetcher.Form
      method='post'
      action='/newsletter'
      className={classes.newsletter}
    >
      <input
        type='email'
        placeholder='Sign up for newsletter...'
        aria-label='Sign up for newsletter'
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <button>Sign up</button>
    </fetcher.Form>
  );
}

export default NewsletterSignup;

import Link from 'next/link';
import { useRouter } from 'next/router';
import classes from './MainNavigation.module.css';

function MainNavigation() {
  const router = useRouter();

  function handleLogoClick() {
    router.push('/');
  }

  return (
    <header className={classes.header}>
      <div className={classes.logo} onClick={handleLogoClick}>
        React Meetups
      </div>
      <nav>
        <ul>
          <li>
            <Link href='/'>All Meetups</Link>
          </li>
          <li>
            <Link href='/new-meetup'>Add New Meetup</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;

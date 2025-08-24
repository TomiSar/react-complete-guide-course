import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import Avatar from '@mui/material/Avatar';
import { deepOrange } from '@mui/material/colors';
import classes from './MainNavigation.module.css';

function MainNavigation() {
  const { data: session } = useSession();
  // const isLoading = status === 'loading';

  // Redirect to Register page after logout
  function handleLogout() {
    signOut({ callbackUrl: '/register' });
  }

  function getAvatarName(name) {
    return name.charAt(0).toUpperCase();
  }

  return (
    <header className={classes.header}>
      {session ? (
        <Link href='/'>
          <div className={classes.logo}>React Meetups</div>
        </Link>
      ) : (
        <div className={classes.logoText}>React Meetups</div>
      )}
      <nav>
        <ul>
          {session && session.user && (
            <>
              <li>
                <Link href='/'>All Meetups</Link>
              </li>
              <li>
                <Link href='/new-meetup'>Add New Meetup</Link>
              </li>
            </>
          )}
          {/* Login and Register buttons disabled on main Navigation Header */}
          {/* {!session && !isLoading && (
            <>
              <li>
                <Link href='/login'>Login</Link>
              </li>
              <li>
                <Link href='/register'>Register</Link>
              </li>
            </>
          )} */}
          {session && session.user && (
            <>
              <li>
                <Avatar sx={{ bgcolor: deepOrange[500] }}>
                  {getAvatarName(session.user.name)}
                </Avatar>
              </li>
              <li>
                <button className={classes.logoutButton} onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainNavigation;

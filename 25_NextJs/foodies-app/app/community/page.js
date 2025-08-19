import Image from 'next/image';
import classes from './page.module.css';
import { icons } from '@/utils/constants';

export default function CommunityPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          One shared passion: <span className={classes.highlight}>Food</span>
        </h1>
        <p>Join our community and share your favorite recipes!</p>
      </header>
      <main className={classes.main}>
        <h2>Community Perks</h2>
        <ul className={classes.perks}>
          <li>
            <Image src={icons[0].image} alt={icons[0].alt} />
            <p>Share & discover recipes</p>
          </li>
          <li>
            <Image src={icons[1].image} alt={icons[1].alt} />
            <p>Find new friends & like-minded people</p>
          </li>
          <li>
            <Image src={icons[2].image} alt={icons[2].alt} />
            <p>Participate in exclusive events</p>
          </li>
        </ul>
      </main>
    </>
  );
}

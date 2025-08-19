import Header from '@/components/header';
import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <Header />
      <p>🔥 Let&apos;s get started! 🔥</p>
      <p>
        Go to <Link href='/about'>About page</Link>
      </p>
      <p>
        Go to <Link href='/blog'>Blog page</Link>
      </p>
    </main>
  );
}

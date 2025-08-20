import Link from 'next/link';

function NewsPage() {
  return (
    <>
      <h1>News Page</h1>
      <ul>
        <li>
          <Link href='/news/nextjs-is-a-great-framework'>
            NextJS is a great framework
          </Link>
        </li>
        <li>Something else</li>
      </ul>
    </>
  );
}

export default NewsPage;

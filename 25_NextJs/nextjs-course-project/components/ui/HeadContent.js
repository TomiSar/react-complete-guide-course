import Head from 'next/head';

function HeadContent({ title, content }) {
  return (
    <Head>
      <title>{title}</title>
      <meta name='description' content={content} />
    </Head>
  );
}

export default HeadContent;

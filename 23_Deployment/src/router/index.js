import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../pages/Root';
import HomePage from '../pages/Home';
const BlogPage = lazy(() => import('../pages/Blog'));
const PostPage = lazy(() => import('../pages/Post'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'posts',
        children: [
          {
            index: true,
            element: (
              <Suspense fallbackElement={<p>Loading...</p>}>
                <BlogPage />
              </Suspense>
            ),
            loader: () =>
              import('../pages/Blog').then((module) => module.loader()),
          },
          {
            path: ':id',
            element: (
              <Suspense fallbackElement={<p>Loading...</p>}>
                <PostPage />
              </Suspense>
            ),
            loader: (meta) =>
              import('../pages/Post').then((module) => module.loader(meta)),
          },
        ],
      },
    ],
  },
]);

export default router;

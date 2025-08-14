import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../pages/Root';
import EventsRootLayout from '../pages/EventsRoot';
import HomePage from '../pages/HomePage';
import EventsPage, { loader as eventsLoader } from '../pages/EventsPage';
import EventDetailPage, {
  loader as eventsDetailsLoader,
  action as deleteEventAction,
} from '../pages/EventDetailPage';
import NewEventPage from '../pages/NewEventPage';
import EditEventPage from '../pages/EditEventPage';
import NewsLetterPage, {
  action as newsLetterAction,
} from '../pages/NewsLetterPage';
import ErrorPage from '../pages/ErrorPage';
import { action as changeEventAction } from '../components/EventForm';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'events',
        element: <EventsRootLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader,
          },
          {
            path: ':id',
            id: 'event-detail',
            loader: eventsDetailsLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: deleteEventAction,
              },
              {
                path: 'edit',
                element: <EditEventPage />,
                action: changeEventAction,
              },
            ],
          },
          { path: 'new', element: <NewEventPage />, action: changeEventAction },
        ],
      },
      {
        path: 'newsletter',
        element: <NewsLetterPage />,
        action: newsLetterAction,
      },
    ],
  },
]);

export default router;

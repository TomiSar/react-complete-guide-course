import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../pages/Root';
import EventsRootLayout from '../pages/EventsRoot';
import HomePage from '../pages/Home';
import EventsPage, { loader as eventsLoader } from '../pages/Events';
import EventDetailPage, {
  loader as eventsDetailLoader,
  action as deleteEventAction,
} from '../pages/EventDetail';
import NewEventPage from '../pages/NewEvent';
import EditEventPage from '../pages/EditEvent';
import NewsLetterPage, {
  action as newsLetterAction,
} from '../pages/NewsLetter';
import ErrorPage from '../pages/Error';
import AuthenticationPage, {
  action as authAction,
} from '../pages/Authentication';
import { action as logoutAction } from '../pages/Logout';
import { action as changeEventAction } from '../components/EventForm';
import { checkAuthLoader, tokenLoader } from '../utils/helpers';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: 'root',
    loader: tokenLoader,
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
            loader: eventsDetailLoader,
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
                loader: checkAuthLoader,
              },
            ],
          },
          {
            path: 'new',
            element: <NewEventPage />,
            action: changeEventAction,
            loader: checkAuthLoader,
          },
        ],
      },
      {
        path: 'auth',
        element: <AuthenticationPage />,
        action: authAction,
      },
      {
        path: 'newsletter',
        element: <NewsLetterPage />,
        action: newsLetterAction,
      },
      {
        path: 'logout',
        action: logoutAction,
      },
    ],
  },
]);

export default router;

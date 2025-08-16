import { redirect, useRouteLoaderData } from 'react-router-dom';
import { API_EVENTS_URL } from '../utils/constants';
import EventItem from '../components/EventItem';
import { getAuthToken } from '../utils/helpers';

function EventDetailPage() {
  const data = useRouteLoaderData('event-detail');
  return (
    <>
      <EventItem event={data.event} />
    </>
  );
}

export default EventDetailPage;

export async function loader({ request, params }) {
  const id = params.id;
  const response = await fetch(`${API_EVENTS_URL}/${id}`);

  if (!response.ok) {
    throw new Response(
      JSON.stringify({
        message: 'Could not fetch events.',
      }),
      {
        status: 500,
      }
    );
  } else {
    return response;
  }
}

export async function action({ request, params }) {
  const id = params.id;
  const token = getAuthToken();

  const response = await fetch(`${API_EVENTS_URL}/${id}`, {
    method: request.method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Response(
      JSON.stringify({
        message: 'Could not delete event.',
      }),
      {
        status: 500,
      }
    );
  }

  return redirect('/events');
}

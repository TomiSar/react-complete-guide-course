import { useRouteLoaderData } from 'react-router-dom';
import { API_EVENTS_URL } from '../constants';
import EventItem from '../components/EventItem';

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
        message: 'Could not fetch details for selected event.',
      }),
      {
        status: 500,
      }
    );
  } else {
    return response;
  }
}

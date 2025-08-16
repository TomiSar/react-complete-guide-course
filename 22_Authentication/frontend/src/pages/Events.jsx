import { useLoaderData } from 'react-router-dom';
import EventsList from '../components/EventsList';
import { API_EVENTS_URL } from '../utils/constants';

function EventsPage() {
  const data = useLoaderData();
  const events = data.events;

  return <EventsList events={events} />;
}

export default EventsPage;

export async function loader() {
  const response = await fetch(API_EVENTS_URL);

  if (!response.ok) {
    throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
      status: 500,
    });
    // return { isError: true, message: 'Could not fetch events.' };
    // throw json(
    //   { message: 'Could not fetch events.' },
    //   {
    //     status: 500,
    //   }
    // );
  } else {
    return response;
  }
}

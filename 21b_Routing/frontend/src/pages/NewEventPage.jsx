import { redirect } from 'react-router-dom';
import EventForm from '../components/EventForm';
import { API_EVENTS_URL } from '../constants';

function NewEventPage() {
  return <EventForm />;
}

export default NewEventPage;

export async function action({ request, params }) {
  const data = await request.formData();

  const eventData = {
    title: data.get('title'),
    image: data.get('image'),
    date: data.get('date'),
    description: data.get('description'),
  };

  const response = await fetch(API_EVENTS_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(eventData),
  });

  if (!response.ok) {
    throw new Response(
      JSON.stringify({
        message: 'Could not save the event.',
      }),
      {
        status: 500,
      }
    );
  }

  return redirect('/events');
}

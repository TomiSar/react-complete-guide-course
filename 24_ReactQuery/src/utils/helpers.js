import { QueryClient } from '@tanstack/react-query';
import { API_EVENTS_URL, API_IMAGES_URL } from './constants';

export const queryClient = new QueryClient();

export async function fetchEvents({ signal, searchTerm, max }) {
  let url = API_EVENTS_URL;

  if (searchTerm && max) {
    url = `${API_EVENTS_URL}?search=&max=${max}`;
  } else if (searchTerm) {
    url = `${API_EVENTS_URL}?search=${searchTerm}`;
  } else if (max) {
    url = `${API_EVENTS_URL}?max=${max}`;
  }

  const response = await fetch(url, { signal: signal });

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the events');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { events } = await response.json();
  return events;
}

export async function createNewEvent(eventData) {
  const response = await fetch(`http://localhost:4000/events`, {
    method: 'POST',
    body: JSON.stringify(eventData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = new Error('An error occurred while creating the event');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { event } = await response.json();
  return event;
}

export async function fetchSelectableImages({ signal }) {
  const response = await fetch(API_IMAGES_URL, { signal });

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the images');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { images } = await response.json();
  return images;
}

export async function fetchEvent({ id, signal }) {
  const response = await fetch(`${API_EVENTS_URL}/${id}`, { signal });

  if (!response.ok) {
    const error = new Error('An error occurred while fetching the event');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { event } = await response.json();
  return event;
}

export async function deleteEvent({ id }) {
  const response = await fetch(`${API_EVENTS_URL}/${id}`, { method: 'DELETE' });

  if (!response.ok) {
    const error = new Error('An error occurred while deleting the event');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const { event } = await response.json();
  return event;
}

export async function updateEvent({ id, event }) {
  const response = await fetch(`${API_EVENTS_URL}/${id}`, {
    method: 'PUT',
    body: JSON.stringify({ event }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = new Error('An error occurred while updating the event');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  return response.json();
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString('fi-FI', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

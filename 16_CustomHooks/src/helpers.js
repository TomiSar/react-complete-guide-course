import { BASE_URL } from './constants';
import { sortPlacesByDistance } from './loc';

export const fetchAvailablePlaces = async () => {
  const response = await fetch(`${BASE_URL}/places`);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error('Failed to fetch places');
  }

  return resData.places;
};

export const fetchUserPlaces = async () => {
  const response = await fetch(`${BASE_URL}/user-places`);
  const resData = await response.json();

  if (!response.ok) {
    throw new Error('Failed to fetch user places');
  }

  return resData.places;
};

export const updateUserPlaces = async (places) => {
  const response = await fetch(`${BASE_URL}/user-places`, {
    method: 'PUT',
    body: JSON.stringify({ places }),
    headers: {
      'Content-type': 'application/json',
    },
  });
  const resData = await response.json();

  if (!response.ok) {
    throw new Error('Failed to update user data');
  }

  return resData.places;
};

export const fetchSortedPlaces = async () => {
  const places = await fetchAvailablePlaces();

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        places,
        position.coords.latitude,
        position.coords.longitude
      );

      resolve(sortedPlaces);
    });
  });
};

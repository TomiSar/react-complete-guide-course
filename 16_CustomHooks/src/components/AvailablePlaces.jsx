import Places from './Places.jsx';
import Error from './Error.jsx';

import { fetchSortedPlaces } from '../helpers.js';
import { useFetchData } from '../hooks/useFetchData.js';

export default function AvailablePlaces({ onSelectPlace }) {
  const {
    isFetching,
    error,
    fetchedData: availablePlaces,
  } = useFetchData(fetchSortedPlaces, []);

  if (error) {
    return <Error title='An error occurred!' message={error.message} />;
  }

  return (
    <Places
      title='Available Places'
      places={availablePlaces}
      isLoading={isFetching}
      loadingText='Fetching place data...'
      fallbackText='No places available.'
      onSelectPlace={onSelectPlace}
    />
  );
}

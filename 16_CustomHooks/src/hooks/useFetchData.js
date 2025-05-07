import { useEffect, useState } from 'react';

export const useFetchData = (fetchFnName, dataInitialValue) => {
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();
  const [fetchedData, setFetchedData] = useState(dataInitialValue);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      try {
        const data = await fetchFnName();
        setFetchedData(data);
      } catch (error) {
        setError({ message: error.message || 'Failed to fetch data.' });
      }

      setIsLoading(false);
    }

    fetchData();
  }, [fetchFnName]);

  return {
    isLoading,
    fetchedData,
    setFetchedData,
    error,
  };
};

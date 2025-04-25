import { useState, useEffect } from "react";

/**
 * Custom React hook for fetching data from an API.
 *
 * @param {string} url - The API endpoint to fetch data from.
 *
 * @returns {Object} Contains:
 * - `data` (Array): The fetched data, or an empty array if not yet available.
 * - `isLoading` (boolean): Indicates whether the data is currently being loaded.
 * - `isError` (boolean): Indicates whether an error occurred during the fetch.
 */
export function useFetch(url) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        setIsError(false);
        const response = await fetch(url);
        const json = await response.json();
        const data = json.data;
        setData(data);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, [url]);

  return { data, isLoading, isError };
}

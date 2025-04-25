import { useState, useEffect } from "react";

/**
 * Custom React hook for fetching data from an API with authentication.
 *
 * @param {string} url - The API endpoint to fetch data from.
 * @param {string} token - The authentication token to include in the request headers.
 *
 * @returns {Object} An object containing:
 * - `data` (any): The fetched data, or `null` if not yet available.
 * - `isLoading` (boolean): Indicates whether the data is currently being loaded.
 * - `isError` (boolean): Indicates whether an error occurred during the fetch.
 */
export function useAuthFetch(url, token) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        setIsError(false);
        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            "X-Noroff-API-Key": import.meta.env.VITE_NOROFF_API_KEY,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const json = await response.json();
        setData(json.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    if (token) {
      getData();
    } else {
      setIsError(true);
      setIsLoading(false);
    }
  }, [url, token]);

  return { data, isLoading, isError };
}

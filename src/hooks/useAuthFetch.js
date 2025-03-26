import { useState, useEffect } from "react";

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
      console.error("No token provided");
      setIsError(true);
      setIsLoading(false);
    }
  }, [url, token]);

  return { data, isLoading, isError };
}

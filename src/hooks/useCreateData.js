import { useState } from "react";

export function useCreateData(token) {
  const [isError, setIsError] = useState(false);

  const postData = async (postUrl, postBody) => {
    try {
      const response = await fetch(postUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": import.meta.env.VITE_NOROFF_API_KEY,
        },
        body: JSON.stringify(postBody),
      });

      if (!response.ok) {
        throw new Error("Failed to create data");
      }

      const createdData = await response.json();
      return createdData.data;
    } catch (error) {
      console.error("Error creating data:", error);
      setIsError(true);
      throw error;
    }
  };

  return { isError, postData };
}

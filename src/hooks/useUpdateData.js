import { useState } from "react";

export function useUpdateData(token) {
  const [isError, setIsError] = useState(false);

  const putData = async (putUrl, putBody) => {
    try {
      const response = await fetch(putUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": import.meta.env.VITE_NOROFF_API_KEY,
        },
        body: JSON.stringify(putBody),
      });

      if (!response.ok) {
        throw new Error("Failed to update data");
      }

      const updatedData = await response.json();
      return updatedData.data;
    } catch (error) {
      console.error("Error updating data:", error);
      setIsError(true);
      throw error;
    }
  };

  return { isError, putData };
}

import { useState } from "react";

/**
 * Custom React hook for deleting data via a DELETE request.
 *
 * @param {string} token - The authentication token for the request.
 *
 * @returns {Object} Contains:
 * - `isError` (boolean): Whether an error occurred.
 * - `deleteData` (Function): Sends a DELETE request. Accepts `url` (string) and returns a Promise with the result.
 */
export function useDeleteData(token) {
  const [isError, setIsError] = useState(false);

  const deleteData = async (url) => {
    try {
      const response = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "X-Noroff-API-Key": import.meta.env.VITE_NOROFF_API_KEY,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete data");
      }

      return { success: true, message: "Data deleted successfully" };
    } catch (error) {
      console.error("Error deleting data:", error);
      setIsError(true);
      throw error;
    }
  };

  return { isError, deleteData };
}

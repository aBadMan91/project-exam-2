import { useState, useEffect } from "react";

/**
 * Custom React hook for managing state synchronized with localStorage.
 *
 * @param {string} key - The key to use in localStorage.
 * @param {any} initialValue - The initial value to set if the key does not exist in localStorage.
 *
 * @returns {Array} An array containing:
 * - `storedValue` (any): The current value in localStorage.
 * - `setStoredValue` (Function): A function to update the value in localStorage.
 * - `remove` (Function): A function to remove the key from localStorage and reset the value to the initial value.
 */
export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("Error reading localStorage key:", key, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error("Error saving to localStorage", error);
    }
  }, [key, storedValue]);

  const remove = () => {
    try {
      localStorage.removeItem(key);
      setStoredValue(initialValue);
      if (key === "profile") {
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.error("Error removing localStorage key:", key, error);
    }
  };

  return [storedValue, setStoredValue, remove];
}

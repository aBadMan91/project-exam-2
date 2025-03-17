import { useState, useEffect } from "react";

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
      // window.dispatchEvent(new Event("localStorageChange"));
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
      // window.dispatchEvent(new Event("localStorageChange"));
    } catch (error) {
      console.error("Error removing localStorage key:", key, error);
    }
  };

  return [storedValue, setStoredValue, remove];
}

// export function save(key, value) {
//   localStorage.setItem(key, JSON.stringify(value));
// }

// export function load(key) {
//   try {
//     const value = localStorage.getItem(key);
//     return JSON.parse(value);
//   } catch {
//     return null;
//   }
// }

// export function remove(key) {
//   localStorage.removeItem(key);
// }

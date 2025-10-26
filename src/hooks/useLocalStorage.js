import { useState, useEffect } from 'react';

/**
 * Custom hook that syncs state with localStorage
 *
 * @param {string} key - The localStorage key to store the value under
 * @param {*} initialValue - The initial value to use if no value exists in localStorage
 * @returns {[any, Function]} A stateful value and a function to update it
 *
 * @example
 * // Store a simple value
 * const [name, setName] = useLocalStorage('username', 'Guest');
 *
 * @example
 * // Store an object
 * const [user, setUser] = useLocalStorage('user', { name: '', email: '' });
 *
 * @example
 * // Store an array
 * const [tasks, setTasks] = useLocalStorage('tasks', []);
 */
export function useLocalStorage(key, initialValue) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.warn(`Error loading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage.
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;

      // Save state
      setStoredValue(valueToStore);

      // Save to local storage
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.error(`Error saving localStorage key "${key}":`, error);
    }
  };

  // Sync with localStorage when key changes
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.warn(`Error syncing localStorage key "${key}":`, error);
    }
  }, [key]);

  return [storedValue, setValue];
}

export default useLocalStorage;

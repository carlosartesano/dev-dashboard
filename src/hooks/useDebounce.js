import { useState, useEffect } from 'react';

/**
 * Custom hook that debounces a value
 *
 * This is useful for delaying expensive operations like API calls or search filters
 * until the user has stopped typing for a specified amount of time.
 *
 * @param {*} value - The value to debounce (can be any type)
 * @param {number} delay - The delay in milliseconds (default: 500ms)
 * @returns {*} The debounced value
 *
 * @example
 * // Debounce search input
 * const [searchTerm, setSearchTerm] = useState('');
 * const debouncedSearchTerm = useDebounce(searchTerm, 500);
 *
 * useEffect(() => {
 *   if (debouncedSearchTerm) {
 *     // Perform search API call
 *     searchAPI(debouncedSearchTerm);
 *   }
 * }, [debouncedSearchTerm]);
 *
 * @example
 * // Auto-save form data after user stops typing
 * const [formData, setFormData] = useState({ name: '', email: '' });
 * const debouncedFormData = useDebounce(formData, 1000);
 *
 * useEffect(() => {
 *   // Auto-save to server
 *   saveToServer(debouncedFormData);
 * }, [debouncedFormData]);
 */
export function useDebounce(value, delay = 500) {
  // State to store the debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set up a timeout to update the debounced value after the delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up the timeout if value changes before delay expires
    // This prevents the debounced value from updating too soon
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Re-run effect when value or delay changes

  return debouncedValue;
}

export default useDebounce;

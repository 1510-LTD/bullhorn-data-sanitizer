import { useEffect, useState } from "react";

/**
 * Copied from https://usehooks.com/useDebounce/
 * to avoid adding a new dependency for a single hook
 */
export function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    if (!value) {
      setDebouncedValue(value);
      return;
    }
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

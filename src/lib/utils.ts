import { type ClassValue, clsx } from "clsx";
import { useCallback, useRef } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type CallbackFunction = (...args: string[]) => void;

export const useDebounce = (callback: CallbackFunction, delay: number) => {
  const timeoutRef = useRef<number | null>(null);

  return useCallback(
    (...args: string[]) => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay],
  );
};

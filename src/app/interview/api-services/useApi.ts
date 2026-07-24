import { useState, useEffect, useCallback, useRef } from "react";

/**
 * Generic custom hook for managing API request states.
 * Features:
 * 1. Automatic loading, data, and error state tracking.
 * 2. Race condition prevention (cancels previous unresolved requests if a new one is fired).
 * 3. Automatic cancellation on unmount to prevent memory leaks.
 */
export function useApi<T, Args extends any[]>(
  apiFn: (...args: [...Args, AbortSignal | undefined]) => Promise<T>
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reference to cancel active request in flight
  const abortControllerRef = useRef<AbortController | null>(null);

  const execute = useCallback(
    async (...args: Args): Promise<T | undefined> => {
      // 1. Abort any current in-flight request to avoid race conditions
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // 2. Instantiate a new controller for this request
      const controller = new AbortController();
      abortControllerRef.current = controller;

      setLoading(true);
      setError(null);

      try {
        // Execute API call passing the signal as the final argument
        const result = await apiFn(...args, controller.signal);
        
        // Safety check to ensure we only update state if this request hasn't been aborted
        if (!controller.signal.aborted) {
          setData(result);
        }
        return result;
      } catch (err: any) {
        if (err.name === "AbortError" || err.message === "Aborted") {
          // Ignore state updates for aborted requests
          return;
        }
        
        if (!controller.signal.aborted) {
          setError(err.message || "An unexpected error occurred");
        }
        throw err;
      } finally {
        if (abortControllerRef.current === controller) {
          setLoading(false);
        }
      }
    },
    [apiFn]
  );

  // Manual cancel function
  const cancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
      setLoading(false);
    }
  }, []);

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    data,
    loading,
    error,
    execute,
    cancel,
    setData,
  };
}

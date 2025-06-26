import { useState, useCallback } from "react";
import axios from "axios";

const useGetData = <T = unknown>() => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const getData = useCallback(async (url: string): Promise<T> => {
    setIsLoading(true);
    setError("");

    try {
    const response = await axios.get<T>(url);

    // No need to check response.ok — axios throws on error
    const fetchedData = response.data; // Already parsed JSON
    setData(fetchedData);
    return fetchedData;
  } catch (err: any) {
    setError(err.message || "Something went wrong!");
    throw err;
  } finally {
    setIsLoading(false);
  }
  }, []); 

  return { data, isLoading, error, getData };
};

export default useGetData;

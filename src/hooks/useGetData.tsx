import { useState } from "react";

// Define the return type for the hook
type UseGetDataReturn<T> = {
  data: T | null;
  isLoading: boolean;
  error: string;
  getData: (url: string) => Promise<T>;
};

function useGetData<T = any>(): UseGetDataReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const getData = async (url: string): Promise<T> => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data!");
      }
      const fetchedData: T = await response.json();
      setData(fetchedData);
      return fetchedData;
    } catch (err: any) {
      setError(err.message || "Something went wrong!");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, getData };
}

export default useGetData;

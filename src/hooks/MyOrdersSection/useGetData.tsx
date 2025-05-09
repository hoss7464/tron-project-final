import { useState } from "react";


const useGetData = <T = unknown>() => {

  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");


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
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
        throw err;
      } else {
        setError("Something went wrong!");
        throw new Error("Unknown error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, error, getData };
};

export default useGetData;

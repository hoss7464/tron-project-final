import { useState, useCallback } from "react";

type UseGetDataReturn<T> = {
  data: T[];
  isLoading: boolean;
  error: string;
  getData: (url: string) => Promise<void>;
  totalCount: number;
};

function useGetData<T = any>(): UseGetDataReturn<T> {
  const [data, setData] = useState<T[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [totalCount, setTotalCount] = useState(0);

  const getData = useCallback(async (url: string): Promise<void> => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(url, {
        headers: {
          Accept: "application/json",
          "Cache-Control": "no-cache",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data!");
      }

      const total = response.headers.get("X-Total-Count");
      const fetchedData: T[] = await response.json();
      setData(fetchedData);
      setTotalCount(total ? parseInt(total, 10) : 0);
    } catch (err: any) {
      setError(err.message || "Something went wrong!");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []); //to memoize get data , stable for useEffect 

  return { data, isLoading, error, getData, totalCount };
}

export default useGetData;

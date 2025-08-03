import { useState, useCallback } from "react";
import axios from "axios";

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
  //to get axios timeout :
  const axiosTimeOut = Number(process.env.AXIOS_TIME_OUT)

  const getData = useCallback(async (url: string): Promise<void> => {
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.get<T[]>(url, {
        headers: {
          Accept: "application/json",
          "Cache-Control": "no-cache",
        },
        timeout: axiosTimeOut
      });

      const total = response.headers["x-total-count"];
      setData(response.data);
      setTotalCount(total ? parseInt(total, 10) : 0);
    } catch (err: any) {
      const message =
        err.response?.data?.message || err.message || "Something went wrong!";
      setError(message);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []); //to memoize get data , stable for useEffect 

  return { data, isLoading, error, getData, totalCount };
}

export default useGetData;

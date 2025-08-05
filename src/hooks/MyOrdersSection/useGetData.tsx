import { useState, useCallback } from "react";
import { useLoading } from "../../contexts/LoaderContext";
import axios from "axios";

const useGetData = <T = unknown>() => {
  const {incrementLoading, decrementLoading} = useLoading()
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
    //to get axios timeout :
  const axiosTimeOut = Number(process.env.AXIOS_TIME_OUT)

  const getData = useCallback(async (url: string): Promise<T> => {
    setIsLoading(true);
    setError("");
    incrementLoading()

    try {
    const response = await axios.get<T>(url, {timeout: axiosTimeOut});

    // No need to check response.ok — axios throws on error
    const fetchedData = response.data; // Already parsed JSON
    setData(fetchedData);
    return fetchedData;
  } catch (err: any) {
    setError(err.message || "Something went wrong!");
    throw err;
  } finally {
    setIsLoading(false);
    decrementLoading()
  }
  }, []); 

  return { data, isLoading, error, getData };
};

export default useGetData;

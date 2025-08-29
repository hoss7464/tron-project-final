import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";
import { fetchAllUiData } from "../services/requestService";
import {
  OrdersResponse,
  MyOrdersResponse,
  ResourceResponse,
} from "../services/requestService";
import { useTronWallet } from "./TronWalletContext";

//context type
interface FetchDataContextType {
  orderData: OrdersResponse | null;
  myOrderData: MyOrdersResponse | null;
  resourceData: ResourceResponse | null;
  loading: boolean;
  error: Error | null;
  fetchData: () => Promise<void>;
}

const FetchDataContext = createContext<FetchDataContextType | undefined>(
  undefined
);
// Props for the Provider component
interface FetchDataProviderProps {
  children: ReactNode;
}

export const FetchDataProvider: React.FC<FetchDataProviderProps> = ({
  children,
}) => {
  const { address, disconnectWallet2 } = useTronWallet();
  const [orderData, setOrderData] = useState<OrdersResponse | null>(null);
  const [myOrderData, setMyOrderData] = useState<MyOrdersResponse | null>(null);
  const [resourceData, setResourceData] = useState<ResourceResponse | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [authErrorCount, setAuthErrorCount] = useState(0);
  const [shouldStopPolling, setShouldStopPolling] = useState(false);
  //-----------------------------------------------------------------------------------------------
  // Function to handle authentication failures
  const handleAuthFailure = useCallback(() => {
    setAuthErrorCount((prev) => {
      const newCount = prev + 1;

      // If we get multiple auth errors, disconnect and stop polling
      if (newCount > 1) {
        disconnectWallet2();
        setShouldStopPolling(true); // Stop further polling
        return 0; // Reset counter after disconnect
      }
      return newCount;
    });
  }, [disconnectWallet2]);
  //-----------------------------------------------------------------------------------------------
  //Function to fetch data :
  const fetchData = useCallback(async () => {
    // Stop polling if we've detected auth issues
    if (shouldStopPolling) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const allData = await fetchAllUiData(address, handleAuthFailure);

      setOrderData(allData.orders);
      setMyOrderData(allData.myOrders);
      setResourceData(allData.resources);

      // Reset auth error count on successful request
      if (authErrorCount > 0) {
        setAuthErrorCount(0);
      }
    } catch (error) {
      console.error("Error in global data fetch:", error);
      setError(
        error instanceof Error ? error : new Error("Unknown error occurred")
      );
    } finally {
      setLoading(false);
    }
  }, [address, handleAuthFailure, authErrorCount, shouldStopPolling]);
  //-----------------------------------------------------------------------------------------------
  useEffect(() => {
    // Reset polling state when address changes (new wallet connection)
    setShouldStopPolling(false);
    setAuthErrorCount(0);
  }, [address]);

  useEffect(() => {
    // Fetch data immediately on mount
    fetchData();

    // Don't set up interval if we should stop polling
    if (shouldStopPolling) {
      return;
    }

    // Set up the single, global interval
    const globalReqTime = Number(process.env.REACT_APP_GLOBAL_REQ_TIME)
    const intervalId = setInterval(fetchData, globalReqTime);

    // Cleanup: This ONE clearInterval will stop the global refresh
    return () => clearInterval(intervalId);
  }, [fetchData, shouldStopPolling]); // Add fetchData and shouldStopPolling to dependencies

  const value: FetchDataContextType = {
    orderData,
    myOrderData,
    resourceData,
    fetchData,
    loading,
    error,
  };

  return (
    <FetchDataContext.Provider value={value}>
      {children}
    </FetchDataContext.Provider>
  );
};

// Custom hook to use the context
export const useFetchData = (): FetchDataContextType => {
  const context = useContext(FetchDataContext);
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
};

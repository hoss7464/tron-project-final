import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
  useRef,
} from "react";
import { fetchAllUiData } from "../services/requestService";
import {
  OrdersResponse,
  MyOrdersResponse,
  ResourceResponse,
  AvailableResponse,
  AccountInfoResponse,
  RefundResponse,
} from "../services/requestService";
import { useTronWallet } from "./TronWalletContext";
import { useLoading } from "./LoaderContext";

//context type
interface FetchDataContextType {
  orderData: OrdersResponse | null;
  myOrderData: MyOrdersResponse | null;
  resourceData: ResourceResponse | null;
  availableData: AvailableResponse | null;
  tradingAccountInfo: AccountInfoResponse | null;
  tradingRefundInfo: RefundResponse | null;
  loading: boolean;
  error: Error | null;
  fetchData: (isInitialLoad?: boolean) => Promise<void>;
}

const FetchDataContext = createContext<FetchDataContextType | undefined>(
  undefined
);

// Create a ref to expose resourceData
export const FetchDataResourceRef = React.createRef<ResourceResponse | null>();

interface FetchDataProviderProps {
  children: ReactNode;
}

export const FetchDataProvider: React.FC<FetchDataProviderProps> = ({
  children,
}) => {
  const { address, disconnectWallet2, accessToken, isConnectedTrading } = useTronWallet();
  const { incrementLoading, decrementLoading } = useLoading(); // Get loader functions
  const [orderData, setOrderData] = useState<OrdersResponse | null>(null);
  const [myOrderData, setMyOrderData] = useState<MyOrdersResponse | null>(null);
  const [resourceData, setResourceData] = useState<ResourceResponse | null>(null);
  const [availableData, setAvailableData] = useState<AvailableResponse | null>(null)
  const [tradingAccountInfo, setTradingAccountInfo] = useState<AccountInfoResponse | null>(null)
  const [tradingRefundInfo, setTradingRefundInfo] = useState<RefundResponse | null>(null)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [authErrorCount, setAuthErrorCount] = useState(0);
  const [shouldStopPolling, setShouldStopPolling] = useState(false);
  const initialLoadRef = useRef(true); // Track initial load
  const path1 = window.location.pathname
  
  // Function to handle authentication failures
  const handleAuthFailure = useCallback(() => {
    setAuthErrorCount((prev) => {
      const newCount = prev + 1;
      if (newCount > 1) {
        disconnectWallet2();
        setShouldStopPolling(true);
        return 0;
      }
      return newCount;
    });
  }, [disconnectWallet2]);

  //Function to fetch data :
  const fetchData = useCallback(async (isInitialLoad: boolean = false) => {
    if (shouldStopPolling) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Only show loader for initial load
      if (isInitialLoad) {
        incrementLoading();
      }

      const allData = await fetchAllUiData(address, accessToken,path1,isConnectedTrading, handleAuthFailure );
      

      setOrderData(allData.orders);
      setMyOrderData(allData.myOrders);
      setResourceData(allData.resources);
      setAvailableData(allData.availables);
      setTradingAccountInfo(allData.tradingAccountInfo)
      setTradingRefundInfo(allData.tradingRefundInfo)

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
      // Only decrement for initial load
      if (isInitialLoad) {
        decrementLoading();
      }
    }
  }, [address, handleAuthFailure, authErrorCount, shouldStopPolling, incrementLoading, decrementLoading]);

  useEffect(() => {
    setShouldStopPolling(false);
    setAuthErrorCount(0);
    initialLoadRef.current = true; // Reset initial load flag when address changes
  }, [address]);

  useEffect(() => {
    // For initial load, pass true to show loader
    if (initialLoadRef.current) {
      fetchData(true);
      initialLoadRef.current = false; // Mark initial load as done
    }

    if (shouldStopPolling) {
      return;
    }

    const globalReqTime = Number(process.env.REACT_APP_GLOBAL_REQ_TIME)
    const intervalId = setInterval(() => {
      // Subsequent calls don't show loader
      fetchData(false);
    }, globalReqTime);

    return () => clearInterval(intervalId);
  }, [fetchData, shouldStopPolling]);

    useEffect(() => {
    FetchDataResourceRef.current = resourceData;
  }, [resourceData]);

  const value: FetchDataContextType = {
    orderData,
    myOrderData,
    resourceData,
    availableData,
    tradingAccountInfo,
    tradingRefundInfo,
    fetchData: () => fetchData(false), // Default to not showing loader
    loading,
    error,
  };

  return (
    <FetchDataContext.Provider value={value}>
      {children}
    </FetchDataContext.Provider>
  );
};

export const useFetchData = (): FetchDataContextType => {
  const context = useContext(FetchDataContext);
  if (context === undefined) {
    throw new Error("useFetchData must be used within fetchDataProvider");
  }
  return context;
};
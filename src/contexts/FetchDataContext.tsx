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
import { useTranslation } from "react-i18next";
import {
  OrdersResponse,
  MyOrdersResponse,
  ResourceResponse,
  AvailableResponse,
  AccountInfoResponse,
  RefundResponse,
  GetOrderResoponse,
  SellersOrdersResponse,
  SellersWithdrawResponse,
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
  tradingOrderInfo: GetOrderResoponse | null;
  sellersOrderInfo: SellersOrdersResponse | null;
  sellersWithdrawInfo: SellersWithdrawResponse | null;
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
  const { t } = useTranslation();
  const {
    address,
    disconnectWallet2,
    accessToken,
    isConnectedTrading,
    disconnectWallet,
  } = useTronWallet();
  const { incrementLoading, decrementLoading } = useLoading(); // Get loader functions
  const [orderData, setOrderData] = useState<OrdersResponse | null>(null);
  const [myOrderData, setMyOrderData] = useState<MyOrdersResponse | null>(null);
  const [resourceData, setResourceData] = useState<ResourceResponse | null>(
    null
  );
  const [availableData, setAvailableData] = useState<AvailableResponse | null>(
    null
  );
  const [tradingAccountInfo, setTradingAccountInfo] =
    useState<AccountInfoResponse | null>(null);
  const [tradingRefundInfo, setTradingRefundInfo] =
    useState<RefundResponse | null>(null);
  const [tradingOrderInfo, setTradingOrderInfo] =
    useState<GetOrderResoponse | null>(null);
  const [sellersOrderInfo, setSellersOrderInfo] =
    useState<SellersOrdersResponse | null>(null);
  const [sellersWithdrawInfo, setSellersWithdrawInfo] =
    useState<SellersWithdrawResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [authErrorCount, setAuthErrorCount] = useState(0);
  const [shouldStopPolling, setShouldStopPolling] = useState(false);
  const initialLoadRef = useRef(true); // Track initial load
  const path1 = window.location.pathname;

  // Ref to store last successful data
  const lastSuccessfulData = useRef({
    orders: orderData,
    myOrders: myOrderData,
    resources: resourceData,
    availables: availableData,
    tradingAccountInfo,
    tradingRefundInfo,
    tradingOrderInfo,
    sellersOrderInfo,
    sellersWithdrawInfo,
  });

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
  const fetchData = useCallback(
    async (isInitialLoad: boolean = false) => {
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

        const allData = await fetchAllUiData(
          address,
          accessToken,
          path1,
          isConnectedTrading,
          disconnectWallet,
          handleAuthFailure,
          
        );

              // Update each piece of state if data exists, else fallback to last successful
        setOrderData(allData.orders?.data?.length ? allData.orders : lastSuccessfulData.current.orders);
        
        setMyOrderData(allData.myOrders?.data?.length ? allData.myOrders : lastSuccessfulData.current.myOrders);
        setResourceData(allData.resources?.data ? allData.resources : lastSuccessfulData.current.resources);
        setAvailableData(allData.availables?.energy?.length || allData.availables?.bandwidth?.length ? allData.availables : lastSuccessfulData.current.availables);
        setTradingAccountInfo(allData.tradingAccountInfo?.data ? allData.tradingAccountInfo : lastSuccessfulData.current.tradingAccountInfo);
        setTradingRefundInfo(allData.tradingRefundInfo?.data?.length ? allData.tradingRefundInfo : lastSuccessfulData.current.tradingRefundInfo);
        setTradingOrderInfo(allData.tradingOrderInfo?.data?.length ? allData.tradingOrderInfo : lastSuccessfulData.current.tradingOrderInfo);
        setSellersOrderInfo(allData.sellersOrderInfo?.data?.length ? allData.sellersOrderInfo : lastSuccessfulData.current.sellersOrderInfo);
        setSellersWithdrawInfo(allData.sellersWithdrawInfo?.data?.length ? allData.sellersWithdrawInfo : lastSuccessfulData.current.sellersWithdrawInfo);

            // Update last successful data ref
        lastSuccessfulData.current = {
          orders: allData.orders || lastSuccessfulData.current.orders,
          myOrders: allData.myOrders || lastSuccessfulData.current.myOrders,
          resources: allData.resources || lastSuccessfulData.current.resources,
          availables: allData.availables || lastSuccessfulData.current.availables,
          tradingAccountInfo: allData.tradingAccountInfo || lastSuccessfulData.current.tradingAccountInfo,
          tradingRefundInfo: allData.tradingRefundInfo || lastSuccessfulData.current.tradingRefundInfo,
          tradingOrderInfo: allData.tradingOrderInfo || lastSuccessfulData.current.tradingOrderInfo,
          sellersOrderInfo: allData.sellersOrderInfo || lastSuccessfulData.current.sellersOrderInfo,
          sellersWithdrawInfo: allData.sellersWithdrawInfo || lastSuccessfulData.current.sellersWithdrawInfo,
        };

        if (authErrorCount > 0) {
          setAuthErrorCount(0);
        }
      } catch (error) {
        setError(new Error(`${t("Text222")}`));
        // Fallback to last successful data
        setOrderData(lastSuccessfulData.current.orders);
        setMyOrderData(lastSuccessfulData.current.myOrders);
        setResourceData(lastSuccessfulData.current.resources);
        setAvailableData(lastSuccessfulData.current.availables);
        setTradingAccountInfo(lastSuccessfulData.current.tradingAccountInfo);
        setTradingRefundInfo(lastSuccessfulData.current.tradingRefundInfo);
        setTradingOrderInfo(lastSuccessfulData.current.tradingOrderInfo);
        setSellersOrderInfo(lastSuccessfulData.current.sellersOrderInfo);
        setSellersWithdrawInfo(lastSuccessfulData.current.sellersWithdrawInfo);
      } finally {
        setLoading(false);
        // Only decrement for initial load
        if (isInitialLoad) {
          decrementLoading();
        }
      }
    },
    [
      address,
      handleAuthFailure,
      authErrorCount,
      shouldStopPolling,
      incrementLoading,
      decrementLoading,
    ]
  );

  useEffect(() => {
    setShouldStopPolling(false);
    setAuthErrorCount(0);
    initialLoadRef.current = true; // Reset initial load flag when address changes
  }, [address]);

  /*
old useEffect :


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
  
*/

  useEffect(() => {
    // Fetch immediately when route changes
    fetchData(false);

    if (shouldStopPolling) {
      return;
    }

    const globalReqTime = Number(process.env.REACT_APP_GLOBAL_REQ_TIME);
    const intervalId = setInterval(() => {
      fetchData(false);
    }, globalReqTime);

    return () => clearInterval(intervalId);
  }, [fetchData, shouldStopPolling, path1]); // Add path1 as dependency

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
    tradingOrderInfo,
    sellersOrderInfo,
    sellersWithdrawInfo,
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
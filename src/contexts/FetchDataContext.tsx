import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { fetchAllUiData } from '../services/requestService';
import { OrdersResponse, MyOrdersResponse, ResourceResponse } from '../services/requestService';


//context type
interface FetchDataContextType {
  orderData: OrdersResponse | null; 
  myOrderData: MyOrdersResponse | null; 
  resourceData: ResourceResponse | null; 
  loading: boolean;
  error: Error | null;
}

const FetchDataContext = createContext<FetchDataContextType | undefined>(undefined);
// Props for the Provider component
interface FetchDataProviderProps {
  children: ReactNode;
}

export const FetchDataProvider: React.FC<FetchDataProviderProps> = ({children}) => {
  const [orderData, setOrderData] = useState<OrdersResponse | null>(null);
  const [myOrderData, setMyOrderData] = useState<MyOrdersResponse | null>(null);
  const [resourceData, setResourceData] = useState<ResourceResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  

  const fetchData = async () => {
    try {
        setLoading(true);
        const allData = await fetchAllUiData()
        setOrderData(allData.orders)
        setMyOrderData(allData.myOrders)
        setResourceData(allData.resources)
        setError(null);
    } catch (error) {
      console.error('Error in global data fetch:', error);
        
    }
  }
    useEffect(() => {
    // Fetch data immediately on mount
    fetchData();

    // Set up the single, global interval
    const globalIntervalTime = 3000; // Or read from env
    const intervalId = setInterval(fetchData, globalIntervalTime);

    // Cleanup: This ONE clearInterval will stop the global refresh
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means this runs once on mount and once on unmount

  const value: FetchDataContextType = {
    orderData,
    myOrderData,
    resourceData,
    loading,
    error,
  };

  return <FetchDataContext.Provider value={value}>{children}</FetchDataContext.Provider>;
}

// Custom hook to use the context
export const useFetchData = (): FetchDataContextType => {
  const context = useContext(FetchDataContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};




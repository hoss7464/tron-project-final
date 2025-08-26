import axios from "axios";
//-------------------------------------------------------------------------------------
//Interfaces:
// Interface for orders response :
export interface OrdersResponse {
  success: boolean;
  data: MarketOrder[];
}

interface MarketOrder {
  _id: string;
  createdAt: string;
  durationSec: number;
  freeze: number;
  frozen: number;
  energyPairTrx: number | null;
  lock: boolean;
  options: {
    allow_partial: boolean;
    bulk_order: boolean;
  };
  price: number;
  receiver: string;
  resourceAmount: number;
  resourceType: string;
  status: "pending" | "processing" | "completed" | "failed" | "cancelled";
  totalPrice: number;
  type: string;
}
//Interface for myOrders response :
export interface MyOrdersResponse {
  success: boolean;
  message: string;
  data: MyMarketOrder[];
}

interface MyMarketOrder {
  createdAt: string;
  durationSec: number;
  freeze: number;
  frozen: number;
  energyPairTrx: number | null;
  lock: boolean;
  options: {
    allow_partial: boolean;
    bulk_order: boolean;
  };
  price: number;
  receiver: string;
  resourceAmount: number;
  resourceType: string;
  status: "pending" | "processing" | "completed" | "failed" | "cancelled";
  totalPrice: number;
  type: string;
}
// Interface for resources response :
export interface ResourceResponse {
  success: boolean;
  data: {
    readyResource: {
      energy: number | string;
      bandwidth: number | string;
    };
    dailyRecovery: {
      energy: number | string;
      bandwidth: number | string;
    };
    apy: {
      energy: number | string;
      bandwidth: number | string;
    };
  };
}
//-------------------------------------------------------------------------------------
//to get data from .env :
const baseUrl = process.env.REACT_APP_BASE_URL;
const axiosTimeOut = Number(process.env.AXIOS_TIME_OUT);

// Check if wallet connection data exists in localStorage
const hasWalletConnection = (): boolean => {
  try {
    const walletData = localStorage.getItem("tronWalletAddress");
    return !!walletData; // Returns true if data exists, false otherwise
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return false;
  }
};

export const fetchAllUiData = async () => {
  try {
    const hasConnectedWallet = hasWalletConnection();
    
    // Always fetch orders and resources
    const ordersPromise = axios.get<OrdersResponse>(`${baseUrl}/order/orders`, {
      headers: { "Content-Type": "application/json" },
      timeout: axiosTimeOut,
    });

    const resourcesPromise = axios.get<ResourceResponse>(`${baseUrl}/Setting/UI`, {
      headers: { "Content-Type": "application/json" },
      timeout: axiosTimeOut,
    });

    let myOrdersResponse: MyOrdersResponse;

    if (hasConnectedWallet) {
      const myOrdersRes = await axios.get<MyOrdersResponse>(`${baseUrl}/order/myOrder`, {
        headers: { "Content-Type": "application/json" },
        timeout: axiosTimeOut,
        withCredentials: true,
      });
      myOrdersResponse = myOrdersRes.data;
    } else {
      // Create default data
      myOrdersResponse = {
        success: true,
        message: "No wallet connected",
        data: []
      };
    }

    const [ordersListRes, resourceRes] = await Promise.all([
      ordersPromise,
      resourcesPromise
    ]);

    // Return a single object containing all the data with proper typing
    return {
      orders: ordersListRes.data,
      myOrders: myOrdersResponse,
      resources: resourceRes.data,
    };
  } catch (error) {
    throw error;
  }
};
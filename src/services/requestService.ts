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

interface Hold {
  qty: number;
  txid: string;
  settledAt: string;
}

export interface MyMarketOrder {
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
  holds: Hold[];
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
    minAmount: {
      energy: number;
      bandwidth: number;
    };
    ratesByDuration: RateByDuration[];
  };
}

// Interface for rate by duration items
export interface RateByDuration {
  exactDurationSeconds?: number;
  minDurationSeconds?: number;
  maxDurationSeconds?: number;
  rate: {
    energy: number;
    bandwidth: number;
  };
}
//interface for error response
interface ApiErrorResponse {
  success: boolean;
  message?: string;
  code?: string;
}

//interfaces for available response :
export interface EnergyItem {
  rate: number;
  avilable: number; // Note: This appears to be a typo - should probably be "available"
}

export interface BandwidthItem {
  rate: number;
  avilable: number; // Note: This appears to be a typo - should probably be "available"
}

export interface AvailableResponse {
  success: boolean;
  energy: EnergyItem[];
  bandwidth: BandwidthItem[];
}
//-------------------------------------------------------------------------------------
//to get data from .env :
const baseUrl = process.env.REACT_APP_BASE_URL;
const axiosTimeOut = Number(process.env.AXIOS_TIME_OUT);

export const fetchAllUiData = async (
  walletAddress: string | null,
  onAuthFailure?: () => void
) => {
  try {
    const hasConnectedWallet = !!walletAddress;

    // Always fetch orders and resources, and available resources
    const ordersPromise = axios.get<OrdersResponse>(`${baseUrl}/order/orders`, {
      headers: { "Content-Type": "application/json" },
      timeout: axiosTimeOut,
    });

    const resourcesPromise = axios.get<ResourceResponse>(
      `${baseUrl}/Setting/UI`,
      {
        headers: { "Content-Type": "application/json" },
        timeout: axiosTimeOut,
      }
    );

    const AvailablePromise = axios.get<AvailableResponse>(
      `${baseUrl}/Setting/resource-available`,
      {
        headers: { "Content-Type": "application/json" },
        timeout: axiosTimeOut,
      }
    );


    let myOrdersResponse: MyOrdersResponse;

    if (hasConnectedWallet) {
      try {
        const myOrdersRes = await axios.get<MyOrdersResponse>(
          `${baseUrl}/order/myOrder`,
          {
            headers: { "Content-Type": "application/json" },
            timeout: axiosTimeOut,
            withCredentials: true,
          }
        );

        // Check if the response indicates failure
        if (myOrdersRes.data.success === false) {
          if (onAuthFailure) {
            onAuthFailure();
          }
          myOrdersResponse = {
            success: false,
            message: myOrdersRes.data.message || "Authentication failed",
            data: [],
          };
        } else {
          myOrdersResponse = myOrdersRes.data;
        }
      } catch (error: any) {
        // Check if this is an API error with success: false
        if (error.response?.data?.success === false) {
          console.warn("API returned failure, triggering disconnect");
          if (onAuthFailure) {
            onAuthFailure();
          }
          myOrdersResponse = {
            success: false,
            message: error.response.data.message || "Authentication failed",
            data: [],
          };
        } else {
          // Re-throw other errors (network errors, etc.)
          throw error;
        }
      }
    } else {
      // Create default data
      myOrdersResponse = {
        success: true,
        message: "No wallet connected",
        data: [],
      };
    }

    const [ordersListRes, resourceRes, AvailableRes] = await Promise.all([
      ordersPromise,
      resourcesPromise,
      AvailablePromise,
    ]);

    // Return a single object containing all the data with proper typing
    return {
      orders: ordersListRes.data,
      myOrders: myOrdersResponse,
      resources: resourceRes.data,
      availables: AvailableRes.data,
    };
  } catch (error) {
    throw error;
  }
};

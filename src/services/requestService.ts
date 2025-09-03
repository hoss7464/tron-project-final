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
  accessToken: string | null,
  address : string | null,
  onAuthFailure?: () => void
) => {
  try {
    const hasConnectedWallet = !!walletAddress;

    // Always fetch orders and resources, and available resources
    const ordersPromise = axios.get<OrdersResponse>(`${baseUrl}/order/orders`, {
      headers: { "Content-Type": "application/json" },
      timeout: axiosTimeOut,
      validateStatus: (status: number) => status < 500,
    });

    const resourcesPromise = axios.get<ResourceResponse>(
      `${baseUrl}/Setting/UI`,
      {
        headers: { "Content-Type": "application/json" },
        timeout: axiosTimeOut,
        validateStatus: (status: number) => status < 500,
      }
    );

    const AvailablePromise = axios.get<AvailableResponse>(
      `${baseUrl}/Setting/resource-available`,
      {
        headers: { "Content-Type": "application/json" },
        timeout: axiosTimeOut,
        validateStatus: (status: number) => status < 500,
      }
    );

    let myOrdersResponse: MyOrdersResponse;

    if (hasConnectedWallet) {
      try {
        const myOrdersRes = await axios.get<MyOrdersResponse>(
          `${baseUrl}/order/myOrder`,
          {
            headers: {
              "Content-Type": "application/json",
              //"accessToken": accessToken,
              //"address" : address,
            },
            timeout: axiosTimeOut,
            withCredentials: true,
            validateStatus: (status: number) => status < 500,
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

    // Use Promise.allSettled instead of Promise.all
    const [ordersListResult, resourceResult, AvailableResult] =
      await Promise.allSettled([
        ordersPromise,
        resourcesPromise,
        AvailablePromise,
      ]);

    // Helper function to handle settled promises
    const handleSettledPromise = <T>(
      result: PromiseSettledResult<any>,
      defaultValue: T
    ): T => {
      if (result.status === "fulfilled") {
        return result.value.data;
      } else {
        console.error("Request failed:", result.reason);
        // You might want to handle different types of errors differently
        return defaultValue;
      }
    };

    // Create default responses for each type
    const defaultOrdersResponse: OrdersResponse = {
      success: false,
      data: [],
    };

    const defaultResourceResponse: ResourceResponse = {
      success: false,
      data: {
        readyResource: { energy: 0, bandwidth: 0 },
        dailyRecovery: { energy: 0, bandwidth: 0 },
        apy: { energy: 0, bandwidth: 0 },
        minAmount: { energy: 0, bandwidth: 0 },
        ratesByDuration: [],
      },
    };

    const defaultAvailableResponse: AvailableResponse = {
      success: false,
      energy: [],
      bandwidth: [],
    };

    // Extract data from settled promises
    const orders = handleSettledPromise(
      ordersListResult,
      defaultOrdersResponse
    );
    const resources = handleSettledPromise(
      resourceResult,
      defaultResourceResponse
    );
    const availables = handleSettledPromise(
      AvailableResult,
      defaultAvailableResponse
    );

    // Return a single object containing all the data with proper typing
    return {
      orders,
      myOrders: myOrdersResponse,
      resources,
      availables,
    };
  } catch (error) {
    throw error;
  }
};

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
    DappAddress: string;
    readyResource: {
      energy: number | string;
      bandwidth: number | string;
    };
    dailyRecovery: {
      energy: number | string;
      bandwidth: number | string;
    };
    fastSellRate: {
      energy: number;
      bandwidth: number;
    };
    fastChargeSetting: {
      fastChargeRate: {
        energy: number;
        bandwidth: number;
      };
      fastChargeMin: {
        energy: number;
        bandwidth: number;
      };
      fastChargeMax: {
        energy: number;
        bandwidth: number;
      };
      fastChargeMinUser: {
        energy: number;
        bandwidth: number;
      };
      fastChargeMaxUser: {
        energy: number;
        bandwidth: number;
      };
      fastChargeLimitMin: {
        energy: number;
        bandwidth: number;
      };
      fastChargeLimitMax: {
        energy: number;
        bandwidth: number;
      };
    };
    settingsOrder: {
      partialFill: {
        energy: number;
        bandwidth: number;
      };
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
//Interface for aaccount info in /Buyers or /Sellers :
export interface AccountInfoResponse {
  success: boolean;
  data: {
    buyerCredit: number;
    sellerCredit: number;
    apiKey: string;
  };
}
//-------------------------------------------------------------------------------------
//to get data from .env :
const baseUrl = process.env.REACT_APP_BASE_URL;
const axiosTimeOut = Number(process.env.AXIOS_TIME_OUT);

export const fetchAllUiData = async (
  walletAddress: string | null,
  accessToken: string | null,
  pathname: string,
  isConnectedTrading : boolean,
  onAuthFailure?: () => void,

) => {
  try {
    const hasConnectedWallet = !!walletAddress;

    // Always fetch resources
    const resourcesPromise = axios.get<ResourceResponse>(
      `${baseUrl}/Setting/UI`,
      {
        headers: { "Content-Type": "application/json" },
        timeout: axiosTimeOut,
        validateStatus: (status: number) => status < 500,
      }
    );

    // Only fetch these on "/"
    let ordersPromise: ReturnType<typeof axios.get<OrdersResponse>> | null =
      null;
    let availablePromise: ReturnType<
      typeof axios.get<AvailableResponse>
    > | null = null;

    if (pathname === "/") {
      ordersPromise = axios.get<OrdersResponse>(`${baseUrl}/order/orders`, {
        headers: { "Content-Type": "application/json" },
        timeout: axiosTimeOut,
        validateStatus: (status: number) => status < 500,
      });

      availablePromise = axios.get<AvailableResponse>(
        `${baseUrl}/Setting/resource-available`,
        {
          headers: { "Content-Type": "application/json" },
          timeout: axiosTimeOut,
          validateStatus: (status: number) => status < 500,
        }
      );
    }

    // Handle myOrders (only on "/" + wallet connected)
    let myOrdersResponse: MyOrdersResponse;
    if (hasConnectedWallet && pathname === "/") {
      try {
        const myOrdersRes = await axios.get<MyOrdersResponse>(
          `${baseUrl}/order/myOrder`,
          {
            params: { requester: walletAddress },
            timeout: axiosTimeOut,
            validateStatus: (status: number) => status < 500,
          }
        );

        if (myOrdersRes.data.success === false) {
          if (onAuthFailure) onAuthFailure();
          myOrdersResponse = {
            success: false,
            message: myOrdersRes.data.message || "Authentication failed",
            data: [],
          };
        } else {
          myOrdersResponse = myOrdersRes.data;
        }
      } catch (error: any) {
        if (error.response?.data?.success === false) {
          if (onAuthFailure) onAuthFailure();
          myOrdersResponse = {
            success: false,
            message: error.response.data.message || "Authentication failed",
            data: [],
          };
        } else {
          throw error;
        }
      }
    } else {
      myOrdersResponse = {
        success: true,
        message: "No wallet connected or not on /",
        data: [],
      };
    }

  // Handle account info (ONLY make request when conditions are met)
    let accountInfoResponse: AccountInfoResponse;
    const shouldFetchAccountInfo = isConnectedTrading === true && (pathname === "/Buyers" || pathname === "/Sellers");
    
    if (shouldFetchAccountInfo) {
      try {
        const accountInfoRes = await axios.get<AccountInfoResponse>(
          `${baseUrl}/Buyer/getAccountInfo`,
          {
            headers: { "Content-Type": "application/json", accesstoken: accessToken },
            timeout: axiosTimeOut,
            validateStatus: (status: number) => status < 500,
          }
        );
        
        if (accountInfoRes.data.success === false) {
          if (onAuthFailure) onAuthFailure();
          accountInfoResponse = {
            success: false,
            data: {
              buyerCredit: 0,
              sellerCredit: 0,
              apiKey: "",
            },
          };
        } else {
          accountInfoResponse = accountInfoRes.data;
        }
      } catch (error: any) {
        if (error.response?.data?.success === false) {
          if (onAuthFailure) onAuthFailure();
          accountInfoResponse = {
            success: false,
            data: {
              buyerCredit: 0,
              sellerCredit: 0,
              apiKey: "",
            },
          };
        } else {
          throw error;
        }
      }
    } else {
      // No request made, just return default empty data
      accountInfoResponse = {
        success: true,
        data: {
          buyerCredit: 0,
          sellerCredit: 0,
          apiKey: "",
        },
      };
    }

    // Collect promises dynamically
    const results = await Promise.allSettled(
      [ordersPromise, resourcesPromise, availablePromise].filter(Boolean)
    ); // filter out nulls

    // Helper for settled promises
    const handleSettledPromise = <T>(
      result: PromiseSettledResult<any>,
      defaultValue: T
    ): T => {
      if (result.status === "fulfilled") {
        return result.value.data;
      } else {
        console.error("Request failed:", result.reason);
        return defaultValue;
      }
    };

    // Defaults
    const defaultOrdersResponse: OrdersResponse = { success: false, data: [] };
    const defaultResourceResponse: ResourceResponse = {
      success: false,
      data: {
        DappAddress: "",
        readyResource: { energy: 0, bandwidth: 0 },
        dailyRecovery: { energy: 0, bandwidth: 0 },
        fastSellRate: {
          energy: 0,
          bandwidth: 0,
        },
        fastChargeSetting: {
          fastChargeRate: {
            energy: 0,
            bandwidth: 0,
          },
          fastChargeMin: {
            energy: 0,
            bandwidth: 0,
          },
          fastChargeMax: {
            energy: 0,
            bandwidth: 0,
          },
          fastChargeMinUser: {
            energy: 0,
            bandwidth: 0,
          },
          fastChargeMaxUser: {
            energy: 0,
            bandwidth: 0,
          },
          fastChargeLimitMin: {
            energy: 0,
            bandwidth: 0,
          },
          fastChargeLimitMax: {
            energy: 0,
            bandwidth: 0,
          },
        },
        settingsOrder: {
          partialFill: {
            energy: 0,
            bandwidth: 0,
          },
        },
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

    // Map results back
    let orders = defaultOrdersResponse;
    let resources = defaultResourceResponse;
    let availables = defaultAvailableResponse;

    // results[0] = orders (if pathname === "/")
    // results[1] = resources
    // results[2] = available (if pathname === "/")

    let i = 0;
    if (pathname === "/") {
      orders = handleSettledPromise(results[i++], defaultOrdersResponse);
    }
    resources = handleSettledPromise(results[i++], defaultResourceResponse);
    if (pathname === "/") {
      availables = handleSettledPromise(results[i++], defaultAvailableResponse);
    }

    return {
      orders,
      myOrders: myOrdersResponse,
      resources,
      availables,
      tradingAccountInfo: accountInfoResponse,
    };
  } catch (error) {
    throw error;
  }
};

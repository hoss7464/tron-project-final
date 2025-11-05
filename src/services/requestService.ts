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
    partial_min: number;
    partial_min_trx: number;
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
  code?: string;
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
    minSellersPrice: {
      energy: number;
      bandwidth: number;
    };
    profitSellers: {
      min: number;
      max: number;
    };
    maxSellers: {
      bandwidth: number;
      energy: number;
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
  avilable: number;
}

export interface BandwidthItem {
  rate: number;
  avilable: number;
}

export interface AvailableResponse {
  success: boolean;
  energy: EnergyItem[];
  bandwidth: BandwidthItem[];
}
//Interface for account info in /Buyers :
export interface AccountInfoResponse {
  success: boolean;
  data: {
    buyerCredit: number;
    sellerCredit: number;
    apiKey: string;
    settings: {
      minDurationBandwidth: number;
      minDurationEnergy: number;
      isActive: boolean;
      minPriceBandwidth: number;
      minPriceEnergy: number;
      minUnitBandwidth: number;
      minUnitEnergy: number;
      profit: number;
    };
    seller: {
      delegationedCount: {
        energy: number;
        bandwidth: number;
      };
      delegationedTotal: {
        energy: number;
        bandwidth: number;
      };
    };
  };
  code?: string;
}

//Interfaces for refund request in /Buyers :
export interface RefundResponse {
  success: boolean;
  message: string;
  data: RefundData[];
}

interface RefundData {
  _id: string;
  requester: string;
  depositAmount: number;
  status: string;
  paidAt: any;
  createdAt: string;
  depositTxId: string;
}

//Interface for getOrder request in /Buyers :
export interface GetOrderResoponse {
  success: boolean;
  message: string;
  data: GetOrderData[];
  code?: string;
}

export interface GetOrderData {
  _id: string;
  type: string;
  receiver: string;
  resourceType: string;
  resourceAmount: number;
  price: number;
  totalPrice: number;
  energyPairTrx: number;
  durationSec: number;
  options: {
    allow_partial: boolean;
    partial_min: number;
    partial_min_trx: number;
    bulk_order: boolean;
  };
  freeze: number;
  frozen: number;
  lock: boolean;
  status: string;
  createdAt: string;
  holds: GetHold[];
}

interface GetHold {
  qty: number;
  txid: string;
  settledAt: string;
}

//Interface for order request in /Sellers :
export interface SellersOrdersResponse {
  success: boolean;
  message: string;
  data: SellersOrderData[];
}

interface SellersOrderData {
  _id: string;
  orderId: string;
  userId: string;
  seller: string;
  buyer: string;
  receiver: string;
  resourceType: string;
  amount: number;
  durationSec: number;
  price: number;
  profitSun: number;
  orderType: string;
  snapshot: {
    energyPairUnit: number;
    freeze: number;
  };
  delegatedTxId: string;
  status: string;
  createdAt: string;
  expiredAt: string;
  __v: number;
}

//Interface for withdraw request in /Sellers :
export interface SellersWithdrawResponse {
  success: boolean;
  message: string;
  data: SellersWithdrawData[];
}

interface SellersWithdrawData {
  _id: string;
  parentUserId: string;
  receiver: string;
  withdrawAmount: number;
  withdrawTxId: string;
  status: string;
  paidAt: string;
  createdAt: string;
  __v: number;
}
//Public interface for fetchAllUiData :

//-------------------------------------------------------------------------------------
//to get data from .env :
const baseUrl = process.env.REACT_APP_BASE_URL;
const axiosTimeOut = Number(process.env.AXIOS_TIME_OUT);

export const fetchAllUiData = async (
  walletAddress: string | null,
  accessToken: string | null,
  pathname: string,
  isConnectedTrading: boolean,
  disConnectWallet: () => void,
  onAuthFailure?: () => void
) => {
  try {
    const hasConnectedWallet = !!walletAddress;

    const promises: { key: string; promise: Promise<any> }[] = [];

    // Always fetch resources
    promises.push({
      key: "resources",
      promise: Promise.resolve(
        axios.get<ResourceResponse>(`${baseUrl}/Setting/UI`, {
          headers: { "Content-Type": "application/json" },
          timeout: axiosTimeOut,
          validateStatus: (status: number) => status < 500,
        })
      ),
    });

    // Fetch orders and availables only on "/"
    if (pathname === "/") {
      promises.push({
        key: "orders",
        promise: Promise.resolve(
          axios.get<OrdersResponse>(`${baseUrl}/order/orders`, {
            headers: { "Content-Type": "application/json" },
            timeout: axiosTimeOut,
            validateStatus: (status: number) => status < 500,
          })
        ),
      });

      promises.push({
        key: "availables",
        promise: Promise.resolve(
          axios.get<AvailableResponse>(
            `${baseUrl}/Setting/resource-available`,
            {
              headers: { "Content-Type": "application/json" },
              timeout: axiosTimeOut,
              validateStatus: (status: number) => status < 500,
            }
          )
        ),
      });
    }

    // Fetch myOrders only on "/" with wallet connected
    if (hasConnectedWallet && pathname === "/") {
      promises.push({
        key: "myOrders",
        promise: Promise.resolve(
          axios.get<MyOrdersResponse>(`${baseUrl}/order/myOrder`, {
            params: { requester: walletAddress },
            timeout: axiosTimeOut,
            validateStatus: (status: number) => status < 500,
          })
        ),
      });
    }

    // Fetch account info only on Buyers or Sellers with connected trading
    if (
      isConnectedTrading &&
      (pathname === "/Buyers" || pathname === "/Sellers")
    ) {
      promises.push({
        key: "tradingAccountInfo",
        promise: Promise.resolve(
          axios
            .get<AccountInfoResponse>(`${baseUrl}/Buyer/getAccountInfo`, {
              headers: {
                "Content-Type": "application/json",
                accesstoken: accessToken,
              },
              timeout: axiosTimeOut,
              validateStatus: (status: number) => status < 500,
            })
            .then((response) => {
              // Check for authentication errors based on success flag
              if (response.data && response.data.success === false) {
                if (onAuthFailure) {
                  onAuthFailure();
                }
                disConnectWallet();
                throw new Error("Authentication failed");
              }
              return response;
            })
            .catch((error) => {
              // Handle authentication errors from the catch block as well
              if (
                error.response &&
                error.response.data &&
                error.response.data.success === false
              ) {
                if (onAuthFailure) {
                  onAuthFailure();
                }
                disConnectWallet();
              }
              throw error;
            })
        ),
      });
    }

    // Fetch refund info only for Buyers
    if (isConnectedTrading && pathname === "/Buyers") {
      promises.push({
        key: "tradingRefundInfo",
        promise: Promise.resolve(
          axios
            .get<RefundResponse>(`${baseUrl}/Buyer/getRefund`, {
              headers: {
                "Content-Type": "application/json",
                accesstoken: accessToken,
              },
              timeout: axiosTimeOut,
              validateStatus: (status: number) => status < 500,
            })
            .then((response) => {
              // Check for authentication errors based on success flag
              if (response.data && response.data.success === false) {
                if (onAuthFailure) {
                  onAuthFailure();
                }
                disConnectWallet();
                throw new Error("Authentication failed");
              }
              return response;
            })
            .catch((error) => {
              // Handle authentication errors from the catch block as well
              if (
                error.response &&
                error.response.data &&
                error.response.data.success === false
              ) {
                if (onAuthFailure) {
                  onAuthFailure();
                }
                disConnectWallet();
              }
              throw error;
            })
        ),
      });

      promises.push({
        key: "tradingOrderInfo",
        promise: Promise.resolve(
          axios
            .get<GetOrderResoponse>(`${baseUrl}/Buyer/getOrder`, {
              headers: {
                "Content-Type": "application/json",
                accesstoken: accessToken,
              },
              timeout: axiosTimeOut,
              validateStatus: (status: number) => status < 500,
            })
            .then((response) => {
              // Check for authentication errors based on success flag
              if (response.data && response.data.success === false) {
                if (onAuthFailure) {
                  onAuthFailure();
                }
                disConnectWallet();
                throw new Error("Authentication failed");
              }
              return response;
            })
            .catch((error) => {
              // Handle authentication errors from the catch block as well
              if (
                error.response &&
                error.response.data &&
                error.response.data.success === false
              ) {
                if (onAuthFailure) {
                  onAuthFailure();
                }
                disConnectWallet();
              }
              throw error;
            })
        ),
      });
    }

    // Fetch sellers order and withdraw info only for Sellers
    if (isConnectedTrading && pathname === "/Sellers") {
      promises.push({
        key: "sellersOrderInfo",
        promise: Promise.resolve(
          axios
            .get<SellersOrdersResponse>(`${baseUrl}/Buyer/sellerOrders`, {
              headers: {
                "Content-Type": "application/json",
                accesstoken: accessToken,
              },
              timeout: axiosTimeOut,
              validateStatus: (status: number) => status < 500,
            })
            .then((response) => {
              // Check for authentication errors based on success flag
              if (response.data && response.data.success === false) {
                if (onAuthFailure) {
                  onAuthFailure();
                }
                disConnectWallet();
                throw new Error("Authentication failed");
              }
              return response;
            })
            .catch((error) => {
              // Handle authentication errors from the catch block as well
              if (
                error.response &&
                error.response.data &&
                error.response.data.success === false
              ) {
                if (onAuthFailure) {
                  onAuthFailure();
                }
                disConnectWallet();
              }
              throw error;
            })
        ),
      });

      promises.push({
        key: "sellersWithdrawInfo",
        promise: Promise.resolve(
          axios
            .get<SellersWithdrawResponse>(`${baseUrl}/Buyer/sellerWithdraws`, {
              headers: {
                "Content-Type": "application/json",
                accesstoken: accessToken,
              },
              timeout: axiosTimeOut,
              validateStatus: (status: number) => status < 500,
            })
            .then((response) => {
              // Check for authentication errors based on success flag
              if (response.data && response.data.success === false) {
                if (onAuthFailure) {
                  onAuthFailure();
                }
                disConnectWallet();
                throw new Error("Authentication failed");
              }
              return response;
            })
            .catch((error) => {
              // Handle authentication errors from the catch block as well
              if (
                error.response &&
                error.response.data &&
                error.response.data.success === false
              ) {
                if (onAuthFailure) {
                  onAuthFailure();
                }
                disConnectWallet();
              }
              throw error;
            })
        ),
      });
    }

    // Run all promises in parallel
    const results = await Promise.allSettled(promises.map((p) => p.promise));

    // Helper function for settled promises
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

    // Map results dynamically by key
    const responseMap: any = {};

    promises.forEach((p, index) => {
      responseMap[p.key] = handleSettledPromise(results[index], null);
    });

    // Set defaults if missing
    responseMap.orders ||= { success: false, data: [] };
    responseMap.myOrders ||= {
      success: true,
      message: "No wallet connected or not on /",
      data: [],
    };
    responseMap.resources ||= {
      success: false,
      data: {
        DappAddress: "",
        readyResource: { energy: 0, bandwidth: 0 },
        dailyRecovery: { energy: 0, bandwidth: 0 },
        fastSellRate: { energy: 0, bandwidth: 0 },
        fastChargeSetting: {
          fastChargeRate: { energy: 0, bandwidth: 0 },
          fastChargeMin: { energy: 0, bandwidth: 0 },
          fastChargeMax: { energy: 0, bandwidth: 0 },
          fastChargeMinUser: { energy: 0, bandwidth: 0 },
          fastChargeMaxUser: { energy: 0, bandwidth: 0 },
          fastChargeLimitMin: { energy: 0, bandwidth: 0 },
          fastChargeLimitMax: { energy: 0, bandwidth: 0 },
        },
        settingsOrder: { partialFill: { energy: 0, bandwidth: 0 } },
        apy: { energy: 0, bandwidth: 0 },
        minAmount: { energy: 0, bandwidth: 0 },
        minSellersPrice: { energy: 0, bandwidth: 0 },
        profitSellers: { min: 0, max: 0 },
        maxSellers: { bandwidth: 0, energy: 0 },
        ratesByDuration: [],
      },
    };
    responseMap.availables ||= { success: false, energy: [], bandwidth: [] };

    return responseMap;
  } catch (error) {
    throw error;
  }
};

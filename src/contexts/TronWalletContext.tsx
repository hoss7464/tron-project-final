import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import { TronLinkAdapter } from "@tronweb3/tronwallet-adapters";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showNotification } from "../redux/actions/notifSlice";
import { toggleRefresh } from "../redux/actions/refreshSlice";
import { useLocation } from "react-router-dom";

// Context interface
interface TronWalletContextProps {
  address: string | null;
  setAddress: React.Dispatch<React.SetStateAction<string | null>>;
  balance: string | null;
  allBandwidth: number | null;
  availableBandwidth: number | null;
  allEnergy: number | null;
  availableEnergy: number | null;
  accessToken: string | null;
  adapter: TronLinkAdapter | null;
  connectWallet: () => Promise<void>;
  connectWalletMarket: () => Promise<void>;
  disconnectWallet: () => void;
  disconnectWallet2: () => void;
  transferTrx: (
    toAddress: string,
    amount: number
  ) => Promise<TrxTransferResult>;
  isTransferring: boolean;
  transferError: string | null;
  fillTRX: boolean;
  fillTrxError: string | null;
  fillOrder: (
    receiverAddress: string,
    delegateAmount: number,
    resourceType: string | null,
    requesterAddress: string,
    lock: boolean,
    lockPeriod?: number,
    isMultiSignature?: boolean,
    options?: any
  ) => Promise<fillOrder>;
  isConnected: boolean;
  isConnectedMarket: boolean;
  isConnectedTrading: boolean;
  refreshWalletData: () => Promise<void>;
  getTronWeb: () => Promise<any>;
  sellersPermission: boolean;
}
//Disconnect interface :
interface DisconnectResponse {
  success: boolean;
  code?: string;
  message?: string;
  details?: Array<{
    field: string;
    message: string;
  }>;
}
//Type for TRX transfer :
type TrxTransferResult = {
  success: boolean;
  txId?: string;
  error?: string;
};

type fillOrder = {
  success: boolean;
  txId?: string;
  error?: string;
};

interface TronLinkEventData {
  name: string;
  data: any;
}

// types/tronlink.d.ts (create this file)
export interface TronLinkWallet {
  tronWeb: {
    defaultAddress: {
      base58: string;
      hex: string;
    };
    on: (event: string, callback: (data: any) => void) => void;
    off: (event: string, callback: (data: any) => void) => void;
    ready: boolean;
    // Add commonly used methods
    request?: (args: any) => Promise<any>;
    trx?: {
      getBalance: (address: string) => Promise<number>;
      sendTransaction: (transaction: any) => Promise<any>;
    };
  };
  // Add any other properties you might need
}

// Create context
const TronWalletContext = createContext<TronWalletContextProps | undefined>(
  undefined
);

// Custom hook
export const useTronWallet = () => {
  const context = useContext(TronWalletContext);
  if (!context) {
    throw new Error("useTronWallet must be used within TronWalletProvider");
  }
  return context;
};
//-------------------------------------------------------------------------------------
// Provider component
export const TronWalletProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  //dispatch :
  const dispatch = useDispatch();
  const location = useLocation();
  const tronWebRef = useRef<any>(null);

  //States :
  const [address, setAddress] = useState<string | null>(null);
  const [isConnectedMarket, setIsConnectedMarket] = useState(false);
  const [isConnectedTrading, setIsConnectedTrading] = useState(false);
  const [balance, setBalance] = useState<string | null>(null);
  const [allBandwidth, setAllBandwidth] = useState<number | null>(null);
  const [availableBandwidth, setAvailableBandwidth] = useState<number | null>(
    null
  );
  const [allEnergy, setAllEnergy] = useState<number | null>(null);
  const [availableEnergy, setAvailableEnergy] = useState<number | null>(null);
  //States for Transfering TRX :
  const [isTransferring, setIsTransferring] = useState(false);
  const [transferError, setTransferError] = useState<string | null>(null);
  //States for filling sell button :
  const [fillTRX, setFillTRX] = useState(false);
  const [fillTrxError, setFillTrxError] = useState<string | null>("");
  //states for getting data from server each 3000 ms:
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);
  //state for access token :
  const [accessToken, setAccessToken] = useState<string | null>(null);
    //State for sellers permission : 
  const [sellersPermission, setSellersPermission] = useState<boolean>(false)
  //state for auto connect :
  const [shouldAutoConnect, setShouldAutoConnect] = useState(true);

  //to get axios timeout :
  const axiosTimeOut = Number(process.env.AXIOS_TIME_OUT);
  const accountRefreshDataTime = Number(
    process.env.REACT_APP_ACCOUNT_REFRESH_DATA
  );
  //-------------------------------------------------------------------------------------
  //To initiate TronLinkAdapter
  const adapterRef = useRef<TronLinkAdapter | null>(null);
  if (!adapterRef.current) adapterRef.current = new TronLinkAdapter();
  const adapter = adapterRef.current;
  const eventListenersAdded = useRef(false);
  // Helper function to get or create TronWeb instance
  const getTronWeb = async (): Promise<any> => {
    if (!tronWebRef.current) {
      const tronNileUrl = process.env.REACT_APP_TRON_API;
      const { TronWeb } = await import("tronweb");
      tronWebRef.current = new TronWeb({ fullHost: tronNileUrl });
    }
    return tronWebRef.current;
  };
  //-------------------------------------------------------------------------------------
  //access token functions:
  // Helper function to clear access token
  const clearAccessToken = useCallback(() => {
    setAccessToken(null);
  }, []);
  //-------------------------------------------------------------------------------------
  // Add cleanup on unmount
  const fetchWalletData = async (walletAddress: string) => {
    try {
      const tronWeb = await getTronWeb();

      // Make both requests in parallel
      const [balanceInSun, resource] = await Promise.all([
        // Get balance
        tronWeb.trx.getBalance(walletAddress),
        // Get resources
        tronWeb.trx.getAccountResources(walletAddress),
      ]);

      const balanceTRX = tronWeb.fromSun(balanceInSun);
      setBalance(Number(balanceTRX).toFixed(2));

      const freeNetLimit = resource.freeNetLimit ?? 0;
      const netLimit = resource.NetLimit ?? 0;
      const netUsed = resource.NetUsed ?? 0;
      const freeNetUsed = resource.freeNetUsed ?? 0;
      const energyLimit = resource.EnergyLimit ?? 0;
      const energyUsed = resource.EnergyUsed ?? 0;
      const all_bw = freeNetLimit + netLimit - netUsed - freeNetUsed;
      const totalBw = freeNetLimit + netLimit;
      const all_energy = energyLimit;
      const available_energy = energyLimit - energyUsed;

      setAllBandwidth(all_bw);
      setAvailableBandwidth(totalBw);
      setAllEnergy(all_energy);
      setAvailableEnergy(available_energy);
    } catch (err) {
      console.error("Error fetching wallet data:", err);
      // Optional: show notification for refresh errors
      dispatch(
        showNotification({
          name: "tron-refresh-error",
          message: "Failed to refresh wallet data",
          severity: "warning",
        })
      );
    }
  };

  // Function to start the refresh interval
  const startRefreshInterval = (walletAddress: string) => {
    // Clear any existing interval
    stopRefreshInterval();

    // Make initial call immediately
    fetchWalletData(walletAddress);

    // Set new interval (5000ms = 5 seconds)
    refreshIntervalRef.current = setInterval(async () => {
      await fetchWalletData(walletAddress);
    }, accountRefreshDataTime);
  };

  // Function to stop the refresh interval
  const stopRefreshInterval = () => {
    if (refreshIntervalRef.current) {
      clearInterval(refreshIntervalRef.current);
      refreshIntervalRef.current = null;
    }
  };

  // Manual refresh function
  const refreshWalletData = async () => {
    if (address) {
      await fetchWalletData(address);
    }
  };

  //Function to delete data from localStorage :
  const disconnectWalletFromServer = async (
    currentAccessToken: string | null = accessToken
  ) => {
    const baseURL = process.env.REACT_APP_BASE_URL;

    try {
      if (!address) {
        // No active wallet → nothing to disconnect
        return;
      }

      const response = await axios.post<DisconnectResponse>(
        `${baseURL}/Auth/disconnect`,
        {}, // important: keep the empty object so config isn't misinterpreted
        {
          headers: {
            "Content-Type": "application/json",
            accessToken: currentAccessToken ?? "",
          },
          withCredentials: true,
          timeout: axiosTimeOut,
          validateStatus: (status: number) => status < 500,
        }
      );

      if (response.data.success === false) {
        dispatch(
          showNotification({
            name: "disconnect-error",
            message: `${response.data.message}`,
            severity: "error",
          })
        );
        return;
      }

      //Reset state (clear everything related to wallet)
      setAddress(null);
      setAccessToken(null);
      setBalance(null);
      setAllBandwidth(null);
      setAvailableBandwidth(null);
      setAllEnergy(null);
      setAvailableEnergy(null);
      setIsConnected(false);
      stopRefreshInterval();
    } catch (err) {
      dispatch(
        showNotification({
          name: "tron-error6",
          message: `Error during logout process : ${err}`,
          severity: "error",
        })
      );
    }
  };

  //-------------------------------------------------------------------------------------
  //Function to disconnect wallet :
  const disconnectWallet = async () => {
    try {
      // First try to logout from server
      const currentPath = window.location.pathname;
      await disconnectWalletFromServer();

      setShouldAutoConnect(false);

      // Clear local state only after successful server logout

      eventListenersAdded.current = false;
      clearAccessToken();
      setAddress(null);
      setBalance(null);
      setAllBandwidth(null);
      setAvailableBandwidth(null);
      setAllEnergy(null);
      setAvailableEnergy(null);
      setIsConnected(false);
      stopRefreshInterval();
      setIsConnectedTrading(false);

      dispatch(
        showNotification({
          name: "tron-success6",
          message: "Disconnect successful.",
          severity: "success",
        })
      );
    } catch (err) {
      // If server logout fails, we still clear local state but show an error
      setAddress(null);
      setBalance(null);
      setAllBandwidth(null);
      setAvailableBandwidth(null);
      setAllEnergy(null);
      setAvailableEnergy(null);
      toggleRefresh();
      eventListenersAdded.current = false;

      dispatch(
        showNotification({
          name: "tron-error6",
          message: "Disconnected locally but server logout failed",
          severity: "warning",
        })
      );
    }
  };

  const disconnectWallet2 = async () => {
    try {
      // First try to logout from server

      setShouldAutoConnect(false);

      // Clear local state only after successful server logout

      setAddress(null);
      setBalance(null);
      setAllBandwidth(null);
      setAvailableBandwidth(null);
      setAllEnergy(null);
      setAvailableEnergy(null);
      setIsConnected(false);

      stopRefreshInterval();
      eventListenersAdded.current = false;

      setIsConnectedMarket(false);
    } catch (err) {
      // If server logout fails, we still clear local state but show an error
      setAddress(null);
      setBalance(null);
      setAllBandwidth(null);
      setAvailableBandwidth(null);
      setAllEnergy(null);
      setAvailableEnergy(null);
      toggleRefresh();
      eventListenersAdded.current = false;
    }
  };

  //Function for when network changes :
  const handleNetworkChanged = useCallback(
    (_payload: any) => {
      dispatch(
        showNotification({
          name: "tron-network-changed",
          message: "Network changed, please check your connection",
          severity: "warning",
        })
      );
      if (address) refreshWalletData();
    },
    [address, dispatch, refreshWalletData]
  );

  //Function for switching account :
  // Add this ref to track authentication state
  const isAuthenticating = useRef(false);

  // Modify the handleAccountChanged function
  const handleAccountChanged = useCallback(
    async (payload: any) => {
      if (isAuthenticating.current) return;
      isAuthenticating.current = true;

      try {
        const nextAddress =
          payload?.base58 ??
          (typeof payload === "string" ? payload : null) ??
          window.tronLink?.tronWeb?.defaultAddress?.base58 ??
          null;

        if (!nextAddress) {
          await disconnectWallet2();
          return;
        }

        if (address && address !== nextAddress) {
          // Reset current state
          setAddress(null);
          setBalance(null);
          setAllBandwidth(null);
          setAvailableBandwidth(null);
          setAllEnergy(null);
          setAvailableEnergy(null);
          stopRefreshInterval();
        }

        const isBuyersOrSellers =
          location.pathname === "/Buyers" || location.pathname === "/Sellers";

        if (isBuyersOrSellers) {
          // Require signing in Buyers/Sellers
          const baseURL = process.env.REACT_APP_BASE_URL;
          const window_tronweb = (window as any).tronWeb;

          const generate_msg = await axios.get<{
            success: boolean;
            data: { nonce: string };
          }>(`${baseURL}/Auth/get-message`, {
            headers: { "Content-Type": "application/json" },
            timeout: axiosTimeOut,
            validateStatus: (status: number) => status < 500,
          });

          if (!generate_msg.data.success) {
            dispatch(
              showNotification({
                name: "tron-error2",
                message: "Tron Error : Something went wrong.",
                severity: "error",
              })
            );
            await disconnectWallet();
            return;
          }

          const message = generate_msg.data.data.nonce;
          window_tronweb.toHex(message);

          const signature = await adapter.signMessage(message);
          if (!signature) {
            dispatch(
              showNotification({
                name: "tron-error3",
                message: "User rejected signing message.",
                severity: "error",
              })
            );
            await disconnectWallet();
            return;
          }

          const verifyResp = await axios.post<{
            success: boolean;
            data: { access_token: string };
          }>(
            `${baseURL}/Auth/verify-request`,
            { address: nextAddress, message, signature },
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
              timeout: axiosTimeOut,
              validateStatus: (status: number) => status < 500,
            }
          );

          if (!verifyResp.data.success) {
            dispatch(
              showNotification({
                name: "tron-error4",
                message: "Verification failed.",
                severity: "error",
              })
            );
            await disconnectWallet();
            return;
          }

          setAccessToken(verifyResp.data.data.access_token);
        }

        // Update React state (this is the source of truth!)
        setAddress(nextAddress);
        setIsConnected(true);

        startRefreshInterval(nextAddress);
        fetchWalletData(nextAddress);

        dispatch(
          showNotification({
            name: "tron-account-changed",
            message: "Wallet account changed successfully",
            severity: "success",
          })
        );
      } catch (err) {
        console.error("Error during wallet change:", err);
        await disconnectWallet2();
      } finally {
        isAuthenticating.current = false;
      }
    },
    [
      address,
      dispatch,
      axiosTimeOut,
      adapter,
      disconnectWallet,
      disconnectWallet2,
      location.pathname,
    ]
  );

  //to track listeners :
  useEffect(() => {
    const tw = window.tronLink?.tronWeb;
    if (!isConnected || !tw?.on || !tw?.off) return;

    try {
      tw.on("addressChanged", handleAccountChanged);
      tw.on("networkChanged", handleNetworkChanged);
      eventListenersAdded.current = true;
    } catch (e) {
      console.error("Error setting up TronLink listeners:", e);
    }

    return () => {
      try {
        tw.off("addressChanged", handleAccountChanged);
        tw.off("networkChanged", handleNetworkChanged);
        eventListenersAdded.current = false;
      } catch (e) {
        console.error("Error removing TronLink listeners:", e);
      }
    };
  }, [isConnected, handleAccountChanged, handleNetworkChanged]);

  // useEffect to disconnect wallet when we lock tronLink
  useEffect(() => {
    if (!window.tronLink) return;

    const checkWalletStatus = async () => {
      const tronWeb = (window as any).tronWeb;
      const addr = tronWeb?.defaultAddress?.base58 || null;

      // If previously connected but now no address → wallet is locked
      if (!addr && address) {
        await disconnectWallet2();
      }
    };

    const interval = setInterval(checkWalletStatus, 1000); // check every 1 sec
    return () => clearInterval(interval);
  }, [address, disconnectWallet2]);

  useEffect(() => {
    // If we already have an address in state when the app loads
    if (address) {
      setIsConnected(true);
      startRefreshInterval(address);
    } else {
      setIsConnected(false);
      stopRefreshInterval();
    }
  }, [address, startRefreshInterval, stopRefreshInterval]);

  //Funtion to connect wallet :
  const connectWallet = async () => {
    try {
      await adapter.connect();
      //wallet address :
      const addr = adapter.address;
      if (!addr) {
        dispatch(
          showNotification({
            name: "tron-error1",
            message: "No wallet address found. Please connect your wallet.",
            severity: "error",
          })
        );
        return;
      }

      if (location.pathname === "/Sellers" || sellersPermission === false) {
        dispatch(
          showNotification({
            name: "tron-error20",
            message: "You are not authorized to access this page.",
            severity: "error",
          })
        );
        return 
      }

      //To get data from any network
      const window_tronweb = (window as any).tronWeb;
      //base url :
      const baseURL = process.env.REACT_APP_BASE_URL;
      //Message in signature form based nonce :
      const generate_msg = await axios.get<{
        success: boolean;
        data: { nonce: string };
      }>(`${baseURL}/Auth/get-message`, {
        headers: { "Content-Type": "application/json" },
        timeout: axiosTimeOut,
        validateStatus: (status: number) => status < 500,
      });
      //To convert he message into json :
      const responseBody = generate_msg.data;
      if (responseBody.success === false) {
        dispatch(
          showNotification({
            name: "tron-error2",
            message: "Tron Error : Something went wrong.",
            severity: "error",
          })
        );
        return;
      }

      const message = responseBody.data.nonce;
      //To convert message into hex :
      window_tronweb.toHex(message);
      //To sign the message :
      const signature = await adapter.signMessage(message);
      if (!signature) {
        dispatch(
          showNotification({
            name: "tron-error3",
            message: "Tron Error : User rejected signing message.",
            severity: "error",
          })
        );
        return;
      }
      //To send address , message , signature hash towards the server :
      const postServerData = await axios.post<{
        success: boolean;
        data: { access_token: string };
      }>(
        `${baseURL}/Auth/verify-request`,
        {
          address: addr,
          message,
          signature,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
          timeout: axiosTimeOut,
          validateStatus: (status: number) => status < 500,
        }
      );

      //To convert postServerData into json
      const server_data_json = postServerData.data;
      if (server_data_json.success === false) {
        dispatch(
          showNotification({
            name: "tron-error4",
            message: "Tron Error : error fetching data from server.",
            severity: "error",
          })
        );
        return;
      }

      //To get access token :
      const access_Token = server_data_json.data.access_token;
      setAccessToken(access_Token);

      //To save refressh_token, access_token, wallet address into a json
      const localStorageSavedData = {
        wallet_address: addr,
      };
      //To save localStorageSavedData in localStorage :

      //wallet address state :
      setAddress(addr);

      setIsConnectedTrading(true);

      // Start refresh interval
      startRefreshInterval(addr);

      //To show success notification after wallet connection :
      dispatch(
        showNotification({
          name: "tron-success5",
          message: "Wallet connection successful.",
          severity: "success",
        })
      );
    } catch (err) {
      setIsConnectedTrading(false);
      // Check for TronLink rejection specifically
      const isTronLinkRejection =
        err instanceof Error &&
        (err.message.includes("confirmation declined by user") ||
          err.message.includes("User denied transaction signature") ||
          err.message.includes("User rejected") ||
          err.message.includes("rejected by user"));
      // Check if the error matches any of your 5 specific cases
      const isMyError =
        err instanceof Error &&
        (err.message.includes("No wallet address found") ||
          err.message.includes("Tron Error : Something went wrong") ||
          err.message.includes("User rejected signing message") ||
          err.message.includes("error fetching data from server") ||
          err.message.includes("Wallet connection failed"));

      // Show appropriate error message
      if (isTronLinkRejection) {
        dispatch(
          showNotification({
            name: "tron-rejection",
            message: "Confirmation declined by user",
            severity: "warning",
          })
        );
        return;
      } else {
        dispatch(
          showNotification({
            name: "tron-error5",
            message:
              "Wallet connection failed: " +
              (err instanceof Error ? err.message : "Unknown error"),
            severity: "error",
          })
        );
      }
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
        refreshIntervalRef.current = null;
      }

      clearAccessToken();
    }
  };

  const connectWalletMarket = async () => {
    try {
      await adapter.connect();
      const addr = adapter.address;

      if (!addr) {
        dispatch(
          showNotification({
            name: "tron-error-market",
            message: "No wallet address found. Please connect your wallet.",
            severity: "error",
          })
        );
        return;
      }

      // Update state
      setAddress(addr);

      setIsConnectedMarket(true);

      startRefreshInterval(addr);

      dispatch(
        showNotification({
          name: "tron-market-connected",
          message: "Market wallet connected successfully.",
          severity: "success",
        })
      );
    } catch (err) {
      setIsConnectedMarket(false);
      dispatch(
        showNotification({
          name: "tron-error-market",
          message:
            "Market wallet connection failed: " +
            (err instanceof Error ? err.message : "Unknown error"),
          severity: "error",
        })
      );
    }
  };

  //-------------------------------------------------------------------------------------

  useEffect(() => {
    const autoConnect = async () => {
      try {
        // Connect the adapter
        if (location.pathname !== "/" && isConnectedMarket) {
          return;
        }

        await adapter.connect();

        // Get TronWeb instance
        const tronWeb = await getTronWeb();
        const walletAddr = adapter.address;
        if (walletAddr === null) {
          return;
        }

        // Restore wallet address
        setAddress(walletAddr);

        // Get balance
        const balanceInSun = await tronWeb.trx.getBalance(walletAddr);
        setBalance(Number(tronWeb.fromSun(balanceInSun)).toFixed(2));

        // Get bandwidth and energy
        const resource = await tronWeb.trx.getAccountResources(walletAddr);
        const freeNetLimit = resource.freeNetLimit ?? 0;
        const netLimit = resource.NetLimit ?? 0;
        const netUsed = resource.NetUsed ?? 0;
        const freeNetUsed = resource.freeNetUsed ?? 0;
        const energyLimit = resource.EnergyLimit ?? 0;
        const energyUsed = resource.EnergyUsed ?? 0;

        setAllBandwidth(freeNetLimit + netLimit - netUsed - freeNetUsed);
        setAvailableBandwidth(freeNetLimit + netLimit);
        setAllEnergy(energyLimit);
        setAvailableEnergy(energyLimit - energyUsed);

        // Set connection flags
        setIsConnected(true);
        setIsConnectedMarket(true);

        // Start refreshing wallet data automatically

        startRefreshInterval(walletAddr);
        if (location.pathname === "/" && !isConnectedMarket) {
          dispatch(
            showNotification({
              name: "tron-auto-connect",
              message: "Wallet reconnected successfully",
              severity: "success",
            })
          );
        }
      } catch (err) {
        console.error("Auto-connect failed:", err);
        // If something fails, clear local state
        setAddress(null);
        setBalance(null);
        setAllBandwidth(null);
        setAvailableBandwidth(null);
        setAllEnergy(null);
        setAvailableEnergy(null);
        setIsConnected(false);
        setIsConnectedMarket(false);
        setIsConnectedTrading(false);
      }
    };

    autoConnect();
  }, [location.pathname]);

  //-------------------------------------------------------------------------------------
  //To transfer TRX :
  const transferTrx = async (
    toAddress: string,
    amount: number
  ): Promise<TrxTransferResult> => {
    setIsTransferring(true);
    setTransferError(null);

    try {
      //validate connection :
      const baseUrl = process.env.REACT_APP_TRON_API;
      if (!address || !adapter.connected) {
        dispatch(
          showNotification({
            name: "tron-error6",
            message: "No wallet address found. Please connect your wallet.",
            severity: "error",
          })
        );
        return { success: false, error: "Wallet not connected" };
      }

      //To import TronWeb localy :
      const tronWeb = await getTronWeb();
      const MainAddress = process.env.REACT_APP_TRON_API;
      if (window?.tronWeb?.fullNode.host !== MainAddress) {
        dispatch(
          showNotification({
            name: "tron-error100",
            message: "Switch to mainnet network.",
            severity: "error",
          })
        );
        return { success: false, error: "Switch to mainnet network." };
      }

      if (!tronWeb) {
        dispatch(
          showNotification({
            name: "tron-error7",
            message: "TronWeb is not available.",
            severity: "error",
          })
        );
        return { success: false, error: "TronWeb is not available." };
      }

      // Validate inputs
      if (!tronWeb.isAddress(toAddress)) {
        dispatch(
          showNotification({
            name: "tron-error8",
            message: "Invalid recipient address.",
            severity: "error",
          })
        );
        return { success: false, error: "Invalid recipient address." };
      }

      if (amount <= 0 || isNaN(amount)) {
        dispatch(
          showNotification({
            name: "tron-error9",
            message: "Amount must be a positive number.",
            severity: "error",
          })
        );
        return { success: false, error: "Amount must be a positive number." };
      }

      // Check balance
      const currentBalance = await tronWeb.trx.getBalance(address);
      if (Number(tronWeb.fromSun(currentBalance)) < amount) {
        dispatch(
          showNotification({
            name: "tron-error10",
            message: "Insufficient balance.",
            severity: "error",
          })
        );
        return { success: false, error: "Insufficient balance." };
      }

      // Convert amount to sun (fixed type issue)
      const amountInSun = tronWeb.toSun(amount);

      // Create transaction (fixed parameter type issue)
      const transaction = await tronWeb.transactionBuilder.sendTrx(
        toAddress,
        Number(amountInSun),
        address
      );

      // Sign transaction using adapter
      const signedTx = await adapter.signTransaction(transaction);

      // Broadcast transaction using TronWeb directly
      const txResult = await tronWeb.trx.sendRawTransaction(signedTx);

      if (txResult?.code) {
        dispatch(
          showNotification({
            name: "tron-error11",
            message: `Transaction failed: ${txResult.code}`,
            severity: "error",
          })
        );
        return {
          success: false,
          error: `Transaction failed: ${txResult.code}`,
        };
      }

      // Verify transaction
      if (!txResult?.transaction?.txID && !txResult?.txid) {
        dispatch(
          showNotification({
            name: "tron-error11",
            message: "Transaction failed: no transaction ID received.",
            severity: "error",
          })
        );
        return {
          success: false,
          error: "Transaction failed: no transaction ID received.",
        };
      }

      // Update balance after successful transfer
      const newBalance = await tronWeb.trx.getBalance(address);
      setBalance(Number(tronWeb.fromSun(newBalance)).toFixed(2));

      return {
        success: true,
        txId: txResult.transaction?.txID || txResult.txid,
      };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Transfer failed";

      dispatch(
        showNotification({
          name: "tron-error12",
          message: errorMessage,
          severity: "error",
        })
      );

      setTransferError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsTransferring(false);
    }
  };
  //-------------------------------------------------------------------------------------
  //Delegated other (this function is for filling trx in sell button) :
  const fillOrder = async (
    receiverAddress: string,
    delegateAmount: number,
    resourceType: string | null,
    requesterAddress: string,
    lock: boolean = false,
    lockPeriod: number = 0,
    isMultiSignature: boolean = false,
    options?: any
  ): Promise<fillOrder> => {
    setFillTRX(true);
    setFillTrxError(null);

    try {
      //validate connection :
      const baseUrl = process.env.REACT_APP_TRON_API;
      if (!address || !adapter.connected) {
        dispatch(
          showNotification({
            name: "tron-error6",
            message: "No wallet address found. Please connect your wallet.",
            severity: "error",
          })
        );
        return { success: false, error: "Wallet not connected" };
      }

      //To import TronWeb localy :
      const tronWeb = await getTronWeb();

      const MainAddress = process.env.REACT_APP_TRON_API;

      if (window?.tronWeb?.fullNode.host !== MainAddress) {
        dispatch(
          showNotification({
            name: "tron-error100",
            message: "Switch to mainnet network.",
            severity: "error",
          })
        );
        return { success: false, error: "Switch to mainnet network." };
      }

      if (!tronWeb) {
        dispatch(
          showNotification({
            name: "tron-error7",
            message: "TronWeb is not available.",
            severity: "error",
          })
        );
        return { success: false, error: "TronWeb is not available." };
      }

      // Validate inputs
      if (!tronWeb.isAddress(receiverAddress)) {
        dispatch(
          showNotification({
            name: "tron-error8",
            message: "Invalid recipient address.",
            severity: "error",
          })
        );
        return { success: false, error: "Invalid recipient address." };
      }

      // Check balance
      const resourceType2 = resourceType?.toUpperCase() as
        | "ENERGY"
        | "BANDWIDTH";
      const addressToCheck =
        isMultiSignature && options?.address
          ? options.address
          : requesterAddress;

      const currentDelegated = await tronWeb.trx.getCanDelegatedMaxSize(
        addressToCheck,
        resourceType2
      );
      if (Number(currentDelegated) > delegateAmount) {
        dispatch(
          showNotification({
            name: "tron-error10",
            message: "Insufficient balance.",
            severity: "error",
          })
        );
        return { success: false, error: "Insufficient balance." };
      }

      // Convert amount to sun (fixed type issue)
      const amountInSun = tronWeb.toSun(delegateAmount);
      const amountInSun2 = Math.round(Number(amountInSun));

      // Create transaction (fixed parameter type issue)

      const transactionDelegated =
        await tronWeb.transactionBuilder.delegateResource(
          amountInSun2,
          receiverAddress,
          resourceType2,
          requesterAddress,
          lock,
          lockPeriod,
          {
            ...(isMultiSignature ? options : {}),
            permissionId: options?.permissionId,
          }
        );

      let signedTx: any;
      // Sign and broadcast transaction

      if (!transactionDelegated.raw_data.contract[0].Permission_id) {
        signedTx = await adapter.signTransaction(transactionDelegated);
      } else if (transactionDelegated.raw_data.contract[0].Permission_id) {
        signedTx = await adapter.multiSign(transactionDelegated);
      } else {
        dispatch(
          showNotification({
            name: "tron-error16",
            message: `Transaction failed: check your sign transaction`,
            severity: "error",
          })
        );
      }

      const txResult = await tronWeb.trx.sendRawTransaction(signedTx);

      if (txResult?.code) {
        dispatch(
          showNotification({
            name: "tron-error11",
            message: `Transaction failed: ${txResult.code}`,
            severity: "error",
          })
        );
        return {
          success: false,
          error: `Transaction failed: ${txResult.code}`,
        };
      }

      // Verify transaction
      if (!txResult?.transaction?.txID && !txResult?.txid) {
        dispatch(
          showNotification({
            name: "tron-error11",
            message: "Transaction failed: no transaction ID received.",
            severity: "error",
          })
        );
        return {
          success: false,
          error: "Transaction failed: no transaction ID received.",
        };
      }

      return {
        success: true,
        txId: txResult.transaction?.txID || txResult.txid,
      };
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Transfer failed";

      dispatch(
        showNotification({
          name: "tron-error12",
          message: errorMessage,
          severity: "error",
        })
      );

      setFillTrxError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setFillTRX(false);
    }
  };
  //-------------------------------------------------------------------------------------

  return (
    <TronWalletContext.Provider
      value={{
        adapter,
        address,
        setAddress,
        balance,
        allBandwidth,
        availableBandwidth,
        availableEnergy,
        allEnergy,
        accessToken,
        connectWallet,
        connectWalletMarket,
        disconnectWallet,
        disconnectWallet2,
        transferTrx,
        isTransferring,
        transferError,
        fillOrder,
        fillTRX,
        fillTrxError,
        refreshWalletData,
        isConnected,
        isConnectedMarket,
        isConnectedTrading,
        getTronWeb,
        sellersPermission,
      }}
    >
      {children}
    </TronWalletContext.Provider>
  );
};

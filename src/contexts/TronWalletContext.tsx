import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import { TronLinkAdapter } from "@tronweb3/tronwallet-adapters";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showNotification } from "../redux/actions/notifSlice";
import { toggleRefresh } from "../redux/actions/refreshSlice";

// Context interface
interface TronWalletContextProps {
  address: string | null;
  balance: string | null;
  allBandwidth: number | null;
  availableBandwidth: number | null;
  allEnergy: number | null;
  availableEnergy: number | null;
  isConnected: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  disconnectWallet2: () => void;
  signMessage: (message: string) => Promise<string | null>;
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
  refreshWalletData: () => Promise<void>;
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
  //States :
  const [address, setAddress] = useState<string | null>(null);
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
  //States for request data each 5000 ms to get refresh data :
  const [isConnected, setIsConnected] = useState(false);
  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);

  //to get axios timeout :
  const axiosTimeOut = Number(process.env.AXIOS_TIME_OUT);

  const globalReqTime = Number(process.env.REACT_APP_TRON_REQ_TIME)
  //-------------------------------------------------------------------------------------
  //To initiate TronLinkAdapter
  const adapter = new TronLinkAdapter();
  //-------------------------------------------------------------------------------------
  //function to send req each 5000 ms to get refresh data :
  const fetchWalletData = async (walletAddress: string) => {
    try {
      const tronNileUrl = process.env.REACT_APP_TRON_API;
      const { TronWeb } = await import("tronweb");
      const tronWeb = new TronWeb({ fullHost: tronNileUrl });

      // Get balance
      const balanceInSun = await tronWeb.trx.getBalance(walletAddress);
      const balanceTRX = tronWeb.fromSun(balanceInSun);
      setBalance(Number(balanceTRX).toFixed(2));

      // Get resources
      const resource = await tronWeb.trx.getAccountResources(walletAddress);
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

    // Set new interval (5000ms = 5 seconds)
    refreshIntervalRef.current = setInterval(async () => {
      await fetchWalletData(walletAddress);
    }, globalReqTime);
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
  //-------------------------------------------------------------------------------------
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
      //nile network url :
      const tronNileUrl = process.env.REACT_APP_TRON_API;
      //To import TronWeb localy :
      const { TronWeb } = await import("tronweb");
      //To get data from any network
      const window_tronweb = (window as any).tronWeb;

      //To get data from tron nile :
      const tronWeb = new TronWeb({ fullHost: tronNileUrl });
      //base url :
      const baseURL = process.env.REACT_APP_BASE_URL;
      //Message in signature form based nonce :
      const generate_msg = await axios.get<{
        success: boolean;
        data: { nonce: string };
      }>(`${baseURL}/Auth/get-message`, {
        headers: { "Content-Type": "application/json" },
        timeout: axiosTimeOut,
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
      //To save refressh_token, access_token, wallet address into a json
      const localStorageSavedData = {
        wallet_address: addr,
      };
      //To save localStorageSavedData in localStorage :
      localStorage.setItem(
        "tronWalletAddress",
        JSON.stringify(localStorageSavedData)
      );
      //wallet address state :
      setAddress(addr);
      setIsConnected(true);

      // Fetch initial data
      await fetchWalletData(addr);

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
      // Clean up on error
      setIsConnected(false);
      stopRefreshInterval();
    }
  };
  //-------------------------------------------------------------------------------------
  //Function to delete data from localStorage :
  const localStorageDeleteData = async () => {
    const baseURL = process.env.REACT_APP_BASE_URL;
    try {
      const stored = localStorage.getItem("tronWalletAddress");
      // to remove localStorage :
      localStorage.removeItem("tronWalletAddress");
      if (stored) {
        /*
        we use {} in out axios because the data format of posting with axios is something like this: 
          axios.post(url, data?, config?)
        If you skip the data parameter, the config (like withCredentials) becomes the second argument.
        This can cause confusion because Axios may misinterpret your intention.
        */
        const response = await axios.post<DisconnectResponse>(
          `${baseURL}/Auth/disconnect`,
          {},
          { withCredentials: true, timeout: axiosTimeOut }
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
      }
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
      await localStorageDeleteData();

      // Clear local state only after successful server logout
      setAddress(null);
      setBalance(null);
      setAllBandwidth(null);
      setAvailableBandwidth(null);
      setAllEnergy(null);
      setAvailableEnergy(null);
      setIsConnected(false);
      stopRefreshInterval();

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
      setIsConnected(false);
      stopRefreshInterval();

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
      await localStorageDeleteData();

      // Clear local state only after successful server logout
      setAddress(null);
      setBalance(null);
      setAllBandwidth(null);
      setAvailableBandwidth(null);
      setAllEnergy(null);
      setAvailableEnergy(null);
      setIsConnected(false);
      stopRefreshInterval();
    } catch (err) {
      // If server logout fails, we still clear local state but show an error
      setAddress(null);
      setBalance(null);
      setAllBandwidth(null);
      setAvailableBandwidth(null);
      setAllEnergy(null);
      setAvailableEnergy(null);
      setIsConnected(false);
      stopRefreshInterval();
    }
  };

  // Cleanup interval on component unmount
  useEffect(() => {
    return () => {
      stopRefreshInterval();
    };
  }, []);
  //-------------------------------------------------------------------------------------
  //Function sign the message :
  const signMessage = async (message: string): Promise<string | null> => {
    try {
      const tronWeb = (window as any).tronWeb;
      if (!tronWeb) throw new Error("TronWeb not found");

      const hexMessage = tronWeb.toHex(message);
      const signature = await tronWeb.trx.signMessage(hexMessage);
      return signature;
    } catch (error) {
      return null;
    }
  };
  //-------------------------------------------------------------------------------------
  useEffect(() => {
    //Function for auto connection :
    const autoConnect = async () => {
      //To save address in localStorage :
      const savedData = localStorage.getItem("tronWalletAddress");
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          const walletAddr = parsedData.wallet_address;
          //nile network url :
          const tronNileUrl = process.env.REACT_APP_TRON_API;
          //To coonect to adapter :
          await adapter.connect();
          //To import TronWeb localy :
          const { TronWeb } = await import("tronweb");
          //To get data from api.trongrid.io
          const tronWeb = new TronWeb({ fullHost: tronNileUrl });
          //Wallwet address state :
          setAddress(walletAddr);
          //To get balance from TronLink :
          const balanceInSun = await tronWeb.trx.getBalance(walletAddr);
          const balanceTRX = tronWeb.fromSun(balanceInSun);
          //To set balance with 2 digites after decimal point
          setBalance(Number(balanceTRX).toFixed(2));

          //bandwidth and energy calculation :
          const resource = await tronWeb.trx.getAccountResources(walletAddr);
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
        } catch (e) {
          console.error("Auto-connect failed:", e);
        }
      }
    };

    autoConnect();
  }, []);
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
      const { TronWeb } = await import("tronweb");
      //nile network url :
      const tronNileUrl = process.env.REACT_APP_TRON_API;
      //To get data from api.trongrid.io
      const tronWeb = new TronWeb({ fullHost: tronNileUrl });
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
      const { TronWeb } = await import("tronweb");
      //nile network url :
      const tronNileUrl = process.env.REACT_APP_TRON_API;
      //To get data from api.trongrid.io
      const tronWeb = new TronWeb({ fullHost: tronNileUrl });

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
      console.log(txResult);

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
        address,
        balance,
        allBandwidth,
        availableBandwidth,
        availableEnergy,
        allEnergy,
        isConnected,
        connectWallet,
        disconnectWallet,
        disconnectWallet2,
        signMessage,
        transferTrx,
        isTransferring,
        transferError,
        fillOrder,
        fillTRX,
        fillTrxError,
        refreshWalletData,
      }}
    >
      {children}
    </TronWalletContext.Provider>
  );
};

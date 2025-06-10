import React, { createContext, useContext, useEffect, useState } from "react";
import { TronLinkAdapter } from "@tronweb3/tronwallet-adapters";

// Context interface
interface TronWalletContextProps {
  address: string | null;
  balance: string | null;
  allBandwidth: number | null;
  availableBandwidth: number | null;
  allEnergy: number | null;
  availableEnergy: number | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  signMessage: (message: string) => Promise<string | null>;
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
  //States :
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [allBandwidth, setAllBandwidth] = useState<number | null>(null);
  const [availableBandwidth, setAvailableBandwidth] = useState<number | null>(
    null
  );
  const [allEnergy, setAllEnergy] = useState<number | null>(null);
  const [availableEnergy, setAvailableEnergy] = useState<number | null>(null);
  //-------------------------------------------------------------------------------------
  //To initiate TronLinkAdapter
  const adapter = new TronLinkAdapter();
  //-------------------------------------------------------------------------------------
  //Funtion to connect wallet :
  const connectWallet = async () => {
    try {
      await adapter.connect();
      //wallet address :
      const addr = adapter.address;
      if (!addr) throw new Error("No wallet address found");
      //To import TronWeb localy :
      const { TronWeb } = await import("tronweb");
      //To get data from any network
      const window_tronweb = (window as any).tronWeb;
      //To get data from api.trongrid.io
      const tronWeb = new TronWeb({ fullHost: "https://api.trongrid.io" });

      //Message in signature form based nonce :
      const generate_msg = await fetch("http://91.244.70.95/Auth/get-message", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      //To convert he message into json :
      const responseBody = await generate_msg.json();
      if (responseBody.success === false)
        throw new Error("Something went wrong");
      const message = responseBody.data.nonce;
      //To convert message into hex :
      window_tronweb.toHex(message);
      //To sign the message :
      const signature = await adapter.signMessage(message);
      if (!signature) throw new Error("User rejected signing message");
      //To send address , message , signature hash towards the server :
      const postServerData = await fetch(
        "http://91.244.70.95/Auth/verify-request",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ address: addr, message, signature }),
        }
      );
      //To convert postServerData into json
      const server_data_json = await postServerData.json();
      //To get refresh token :
      const refresh_Token = server_data_json.data.refresh_token;
      //To get access token :
      const access_Token = server_data_json.data.access_token;
      //To save refressh_token, access_token, wallet address into a json
      const localStorageSavedData = {
        refresh_Token: refresh_Token,
        access_Token: access_Token,
        wallet_address: addr,
      };
      //To save localStorageSavedData in localStorage :
      localStorage.setItem(
        "tronWalletAddress",
        JSON.stringify(localStorageSavedData)
      );
      //wallet address state :
      setAddress(addr);
      //To get balance from tronWeb :
      const balanceInSun = await tronWeb.trx.getBalance(addr);
      const balanceTRX = tronWeb.fromSun(balanceInSun);
      setBalance(balanceTRX.toString());

      //bandwidth and energy calculation :
      const resource = await tronWeb.trx.getAccountResources(addr);
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
      console.error("Wallet connection or signing error:", err);
      disconnectWallet();
    }
  };
  //-------------------------------------------------------------------------------------
  //Function to delete data from localStorage :
  const localStorageDeleteData = async () => {
    try {
      //To get data from localStorage :
      const stored = localStorage.getItem("tronWalletAddress");
      if (stored) {
        const { refresh_Token, access_Token, wallet_address } =
          JSON.parse(stored);

        //To send disconnect request towards the server :
        const deleteData = await fetch("http://91.244.70.95/Auth/disconnect", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            refresh_token: refresh_Token,
            access_token: access_Token,
            address: wallet_address,
          }),
        });
        const disconnectResponse = await deleteData.json();
        if (!disconnectResponse.success) {
          alert(`Disconnect failed on server side: ${disconnectResponse}`);
        }
      }
      //To clear localStorage :
      localStorage.removeItem("tronWalletAddress");
    } catch (err) {
      console.log(`Error during disconnect: ${err}`);
    }
  };
  //-------------------------------------------------------------------------------------
  //Function to disconnect wallet :
  const disconnectWallet = () => {
    setAddress(null);
    setBalance(null);
    setAllBandwidth(null);
    setAvailableBandwidth(null);
    setAllEnergy(null);
    setAvailableEnergy(null);
    localStorageDeleteData();
  };
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
      console.error("Error signing message:", error);
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
          //To coonect to adapter :
          await adapter.connect();
          //To import TronWeb localy :
          const { TronWeb } = await import("tronweb");
          //To get data from api.trongrid.io
          const tronWeb = new TronWeb({ fullHost: "https://api.trongrid.io" });
          //Wallwet address state :
          setAddress(walletAddr);
          //To get balance from TronLink :
          const balanceInSun = await tronWeb.trx.getBalance(walletAddr);
          const balanceTRX = tronWeb.fromSun(balanceInSun);
          setBalance(balanceTRX.toString());

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
  return (
    <TronWalletContext.Provider
      value={{
        address,
        balance,
        allBandwidth,
        availableBandwidth,
        availableEnergy,
        allEnergy,
        connectWallet,
        disconnectWallet,
        signMessage,
      }}
    >
      {children}
    </TronWalletContext.Provider>
  );
};

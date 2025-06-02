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

// Provider component
export const TronWalletProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);
  const [allBandwidth, setAllBandwidth] = useState<number | null>(null);
  const [availableBandwidth, setAvailableBandwidth] = useState<number | null>(
    null
  );
  const [allEnergy, setAllEnergy] = useState<number | null>(null);
  const [availableEnergy, setAvailableEnergy] = useState<number | null>(null);

  const adapter = new TronLinkAdapter();

  const connectWallet = async () => {
    try {
      await adapter.connect();
      const addr = adapter.address;
      if (!addr) throw new Error("No wallet address found");

      const { TronWeb } = await import("tronweb");
      const tronWeb =
        (window as any).tronWeb ||
        new TronWeb({ fullHost: "https://api.trongrid.io" });

      const message = `Log into your wallet : ${addr} - Time: ${new Date().toISOString()}`;
      tronWeb.toHex(message);
      const signature = await tronWeb.trx.signMessageV2(message);

      if (!signature) throw new Error("User rejected signing message");

      await fetch("http://localhost:3001/walletSignature", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address: addr, message, signature }),
      });

      localStorage.setItem("tronWalletAddress", addr);
      setAddress(addr);

      const balanceInSun = await tronWeb.trx.getBalance(addr);
      const balanceTRX = tronWeb.fromSun(balanceInSun);
      setBalance(balanceTRX.toString());

      const resource = await tronWeb.trx.getAccountResources(addr);
      //bandwidth and energy calculation :
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

  const disconnectWallet = () => {
    setAddress(null);
    setBalance(null);
    setAllBandwidth(null);
    setAvailableBandwidth(null);
    setAllEnergy(null);
    setAvailableEnergy(null);
  };

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

  useEffect(() => {
    const autoConnect = async () => {
      const savedAddr = localStorage.getItem("tronWalletAddress");
      if (savedAddr) {
        try {
          await adapter.connect();
          const { TronWeb } = await import("tronweb");
          const tronWeb =
            (window as any).tronWeb ||
            new TronWeb({ fullHost: "https://api.trongrid.io" });

          setAddress(savedAddr);

          const balanceInSun = await tronWeb.trx.getBalance(savedAddr);
          const balanceTRX = tronWeb.fromSun(balanceInSun);
          setBalance(balanceTRX.toString());

          const resource = await tronWeb.trx.getAccountResources(savedAddr);

          //bandwidth and energy calculation :
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
          disconnectWallet();
        }
      }
    };

    autoConnect();
    return () => disconnectWallet();
  }, []);

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

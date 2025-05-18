import React, { createContext, useContext, useEffect, useState } from "react";
import { TronLinkAdapter } from "@tronweb3/tronwallet-adapters";

// Context interface
interface TronWalletContextProps {
  address: string | null;
  balance: string | null;
  energy: number | null;
  bandwidth: number | null;
  delegatedEnergy: number | null;
  delegableEnergy: number | null;
  delegatedBandwidth: number | null;
  delegableBandwidth: number | null;
  frozenTRX: number | null;
  totalTRX: number | null;
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
  const [energy, setEnergy] = useState<number | null>(null);
  const [bandwidth, setBandwidth] = useState<number | null>(null);
  const [delegatedEnergy, setDelegatedEnergy] = useState<number | null>(null);
  const [delegableEnergy, setDelegableEnergy] = useState<number | null>(null);
  const [delegatedBandwidth, setDelegatedBandwidth] = useState<number | null>(null);
  const [delegableBandwidth, setDelegableBandwidth] = useState<number | null>(null);
  const [frozenTRX, setFrozenTRX] = useState<number | null>(null);
  const [totalTRX, setTotalTRX] = useState<number | null>(null);

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

      // Get account and resources
      const balanceInSun = await tronWeb.trx.getBalance(addr);
      const balanceTRX = tronWeb.fromSun(balanceInSun);
      setBalance(balanceTRX.toString());

      const account = await tronWeb.trx.getAccount(addr);
      const resource = await tronWeb.trx.getAccountResources(addr);

      setEnergy(resource.EnergyLimit ?? 0);
      setBandwidth(resource.freeNetLimit ?? 0);
      setDelegatedEnergy(resource.delegatedFrozenBalanceForEnergy ?? 0);
      setDelegatedBandwidth(resource.delegatedFrozenBalanceForBandwidth ?? 0);

      let energy = 0;
      let bandwidth = 0;

      if (account.frozen) {
        for (const item of account.frozen) {
          if (item.resource === "ENERGY") energy += item.frozen_balance;
          else if (item.resource === "BANDWIDTH") bandwidth += item.frozen_balance;
        }
      }

      if (account.frozenV2) {
        for (const item of account.frozenV2) {
          if (item.type === "ENERGY") energy += item.amount;
          else if (item.type === "BANDWIDTH") bandwidth += item.amount;
        }
      }

      setDelegableEnergy(energy);
      setDelegableBandwidth(bandwidth);

      const totalFrozen = energy + bandwidth;
      setFrozenTRX(totalFrozen);
      setTotalTRX(parseFloat(balanceTRX) + tronWeb.fromSun(totalFrozen));
    } catch (err) {
      console.error("Wallet connection or signing error:", err);
      disconnectWallet();
    }
  };

  const disconnectWallet = () => {
    setAddress(null);
    setBalance(null);
    setEnergy(null);
    setBandwidth(null);
    setDelegatedEnergy(null);
    setDelegableEnergy(null);
    setDelegatedBandwidth(null);
    setDelegableBandwidth(null);
    setFrozenTRX(null);
    setTotalTRX(null);
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

          const account = await tronWeb.trx.getAccount(savedAddr);
          const resource = await tronWeb.trx.getAccountResources(savedAddr);

          setEnergy(resource.EnergyLimit ?? 0);
          setBandwidth(resource.freeNetLimit ?? 0);
          setDelegatedEnergy(resource.delegatedFrozenBalanceForEnergy ?? 0);
          setDelegatedBandwidth(resource.delegatedFrozenBalanceForBandwidth ?? 0);

          let energy = 0;
          let bandwidth = 0;

          if (account.frozen) {
            for (const item of account.frozen) {
              if (item.resource === "ENERGY") energy += item.frozen_balance;
              else if (item.resource === "BANDWIDTH") bandwidth += item.frozen_balance;
            }
          }

          if (account.frozenV2) {
            for (const item of account.frozenV2) {
              if (item.type === "ENERGY") energy += item.amount;
              else if (item.type === "BANDWIDTH") bandwidth += item.amount;
            }
          }

          setDelegableEnergy(energy);
          setDelegableBandwidth(bandwidth);

          const totalFrozen = energy + bandwidth;
          setFrozenTRX(totalFrozen);
          setTotalTRX(parseFloat(balanceTRX) + tronWeb.fromSun(totalFrozen));
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
        energy,
        bandwidth,
        delegatedEnergy,
        delegableEnergy,
        delegatedBandwidth,
        delegableBandwidth,
        frozenTRX,
        totalTRX,
        connectWallet,
        disconnectWallet,
        signMessage,
      }}
    >
      {children}
    </TronWalletContext.Provider>
  );
};

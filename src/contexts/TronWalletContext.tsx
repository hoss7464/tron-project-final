import React, { createContext, useContext, useEffect, useState } from "react";
import { TronLinkAdapter } from "@tronweb3/tronwallet-adapters";

// Context interface
interface TronWalletContextProps {
  address: string | null;
  balance: string | null;
  energy: number | null;
  bandwidth: number | null;
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

  const adapter = new TronLinkAdapter();

  const connectWallet = async () => {
    try {
      await adapter.connect();
      const addr = adapter.address;
      if (!addr) throw new Error("No wallet address found");

      // Dynamically import TronWeb
      const { TronWeb } = await import("tronweb");

      // Get tronWeb instance (prefer injected, fallback to remote node)
      const tronWeb =
        (window as any).tronWeb ||
        new TronWeb({ fullHost: "https://api.trongrid.io" });

      // Sign a message
      const message = `Log into your wallet : ${addr} - Time: ${new Date().toISOString()}`;
      tronWeb.toHex(message);
      const signature = await tronWeb.trx.signMessageV2(message);

      if (!signature) {
        throw new Error("User rejected signing message");
      }

      // Send signature to backend
      await fetch("http://localhost:3001/walletSignature", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address: addr, message, signature }),
      });

      // Save to localStorage
      localStorage.setItem("tronWalletAddress", addr);

      // Set address and fetch balance/resources
      setAddress(addr);

      const balanceInSun = await tronWeb.trx.getBalance(addr);
      setBalance(tronWeb.fromSun(balanceInSun).toString());

      const accountResource = await tronWeb.trx.getAccountResources(addr);
      setEnergy(accountResource.EnergyLimit ?? 0);
      setBandwidth(accountResource.freeNetLimit ?? 0);
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
  //Function to remains log in when the user logged in once on reloading the page :
  useEffect(() => {
    const autoConnect = async () => {
      const savedAddr = localStorage.getItem("tronWalletAddress");
      if (savedAddr) {
        try {
          await adapter.connect();
          const { TronWeb } = await import("tronweb");
          const tronWeb = (window as any).tronWeb || new TronWeb({ fullHost: "https://api.trongrid.io" });

          setAddress(savedAddr);

          const balanceInSun = await tronWeb.trx.getBalance(savedAddr);
          setBalance(tronWeb.fromSun(balanceInSun).toString());

          const accountResource = await tronWeb.trx.getAccountResources(savedAddr);
          setEnergy(accountResource.EnergyLimit ?? 0);
          setBandwidth(accountResource.freeNetLimit ?? 0);
        } catch (e) {
          console.error("Auto-connect failed:", e);
          disconnectWallet();
        }
      }
    };

    autoConnect();

    return () => {
      disconnectWallet();
    };
  }, []);

  return (
    <TronWalletContext.Provider
      value={{
        address,
        balance,
        energy,
        bandwidth,
        connectWallet,
        disconnectWallet,
        signMessage,
      }}
    >
      {children}
    </TronWalletContext.Provider>
  );
};

'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ethers } from 'ethers';

interface WalletContextType {
    walletAddress: string | null;
    provider: ethers.BrowserProvider | null;
    signer: ethers.JsonRpcSigner | null;
    isConnecting: boolean;
    error: string | null;
    connectWallet: () => Promise<void>;
    disconnectWallet: () => void;
    checkWalletConnection: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
    const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
    const [isConnecting, setIsConnecting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        checkWalletConnection();

        if (typeof window !== 'undefined' && (window as any).ethereum) {
            (window as any).ethereum.on('accountsChanged', async (accounts: string[]) => {
                if (accounts.length > 0) {
                    const ethProvider = new ethers.BrowserProvider((window as any).ethereum);
                    const newSigner = await ethProvider.getSigner();

                    setWalletAddress(accounts[0]);
                    setProvider(ethProvider);
                    setSigner(newSigner);
                } else {
                    disconnectWallet();
                }
            });
        }
    }, []);

    // ✅ Check existing connection (on refresh)
    const checkWalletConnection = async () => {
        if (typeof window !== 'undefined' && (window as any).ethereum) {
            try {
                const ethProvider = new ethers.BrowserProvider((window as any).ethereum);
                const accounts = await ethProvider.send('eth_accounts', []);

                if (accounts.length > 0) {
                    const signer = await ethProvider.getSigner();

                    setWalletAddress(accounts[0]);
                    setProvider(ethProvider);
                    setSigner(signer);
                }
            } catch (err) {
                console.error("Error checking wallet connection:", err);
            }
        }
    };
     
    const checkNetwork = async () => {
  const chainId = await (window as any).ethereum.request({
    method: "eth_chainId",
  });

  if (chainId !== "0x7a69") {
    alert("Switch MetaMask to Hardhat (Chain ID 31337)");
  }
};

    // ✅ Connect wallet (main function)
    const connectWallet = async () => {
        setIsConnecting(true);
        setError(null);

        if (typeof window !== 'undefined' && (window as any).ethereum) {
            try {
                const ethProvider = new ethers.BrowserProvider((window as any).ethereum);
                const accounts = await ethProvider.send('eth_requestAccounts', []);
                const signer = await ethProvider.getSigner();

                setWalletAddress(accounts[0]);
                setProvider(ethProvider);
                setSigner(signer);

                console.log("Connected:", accounts[0]);

            } catch (err: any) {
                console.error('Connection error:', err);
                setError(err.message || 'Failed to connect wallet');
            } finally {
                setIsConnecting(false);
            }
        } else {
            setIsConnecting(false);
            window.open('https://metamask.io/download/', '_blank');
            setError('MetaMask is not installed');
        }
    };

    // ✅ Disconnect (frontend only)
    const disconnectWallet = () => {
        setWalletAddress(null);
        setProvider(null);
        setSigner(null);
    };

    return (
        <WalletContext.Provider
            value={{
                walletAddress,
                provider,
                signer,
                isConnecting,
                error,
                connectWallet,
                disconnectWallet,
                checkWalletConnection
            }}
        >
            {children}
        </WalletContext.Provider>
    );
}

export function useWallet() {
    const context = useContext(WalletContext);
    if (!context) {
        throw new Error('useWallet must be used within a WalletProvider');
    }
    return context;
}
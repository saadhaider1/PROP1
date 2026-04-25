'use client';

import { useState, useEffect } from 'react';
import { useWallet } from '@/context/WalletContext';

export default function AdminWalletSection() {
    const { walletAddress, isConnecting, connectWallet } = useWallet();
    const [receivingWallet, setReceivingWallet] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    useEffect(() => {
        fetchWallet();
    }, []);

    const fetchWallet = async () => {
        try {
            const res = await fetch('/api/admin/wallet');
            const data = await res.json();
            if (data.success) {
                setReceivingWallet(data.walletAddress);
            }
        } catch (err) {
            console.error('Failed to fetch wallet address:', err);
        }
    };

    const saveWallet = async (addressToSave: string) => {
        if (!addressToSave) {
            setStatus({ type: 'error', message: 'Wallet address cannot be empty' });
            return;
        }

        setLoading(true);
        setStatus(null);

        try {
            const res = await fetch('/api/admin/wallet', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ walletAddress: addressToSave }),
            });
            const data = await res.json();
            
            if (data.success) {
                setReceivingWallet(addressToSave);
                setStatus({ type: 'success', message: 'Receiving wallet updated successfully!' });
            } else {
                setStatus({ type: 'error', message: data.error || 'Failed to update wallet' });
            }
        } catch (err) {
            setStatus({ type: 'error', message: 'An error occurred while saving' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-8 max-w-3xl">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Admin Receiving Wallet</h2>
            
            <p className="text-gray-600 dark:text-gray-400 mb-8">
                Configure the MetaMask wallet address that will receive all direct ETH payments from users when they invest in properties or participate in crowdfunding.
            </p>

            {status && (
                <div className={`p-4 rounded-xl mb-6 ${status.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                    {status.message}
                </div>
            )}

            <div className="space-y-6">
                {/* Current Configured Wallet */}
                <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700">
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Current Receiving Wallet</h3>
                    {receivingWallet ? (
                        <p className="font-mono text-lg text-emerald-600 dark:text-emerald-400 break-all">{receivingWallet}</p>
                    ) : (
                        <p className="text-gray-400 italic">No wallet configured yet.</p>
                    )}
                </div>

                {/* Connection Section */}
                <div className="border-t border-gray-100 dark:border-gray-700 pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Update Receiving Wallet</h3>
                    
                    {walletAddress ? (
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M22.5 12c0 5.799-4.701 10.5-10.5 10.5S1.5 17.799 1.5 12 6.201 1.5 12 1.5 22.5 6.201 22.5 12zm-12.87 3.528c-.287.35-.916.35-1.203 0a.82.82 0 0 1 0-1.168l4.475-5.46a.862.862 0 0 1 1.203 0l4.475 5.46a.82.82 0 0 1 0 1.168c-.287.35-.916.35-1.203 0l-3.873-4.726-3.874 4.726z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Connected MetaMask</p>
                                    <p className="font-mono font-medium text-gray-900 dark:text-white">{walletAddress}</p>
                                </div>
                            </div>
                            
                            <button
                                onClick={() => saveWallet(walletAddress)}
                                disabled={loading || receivingWallet === walletAddress}
                                className="w-full sm:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Saving...' : receivingWallet === walletAddress ? 'Already Set as Receiving Wallet' : 'Set as Receiving Wallet'}
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Connect your MetaMask to set it as the receiving wallet for property payments.
                            </p>
                            <button
                                onClick={connectWallet}
                                disabled={isConnecting}
                                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-xl transition-colors disabled:opacity-50"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M22.5 12c0 5.799-4.701 10.5-10.5 10.5S1.5 17.799 1.5 12 6.201 1.5 12 1.5 22.5 6.201 22.5 12zM9.63 15.528c-.287.35-.916.35-1.203 0a.82.82 0 0 1 0-1.168l4.475-5.46a.862.862 0 0 1 1.203 0l4.475 5.46a.82.82 0 0 1 0 1.168c-.287.35-.916.35-1.203 0l-3.873-4.726-3.874 4.726z" />
                                </svg>
                                {isConnecting ? 'Connecting...' : 'Connect MetaMask'}
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

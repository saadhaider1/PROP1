'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import PropertyUploadForm from '@/components/admin/PropertyUploadForm';
import CrowdfundingUploadForm from '@/components/admin/CrowdfundingUploadForm';
import InvestmentUploadForm from '@/components/admin/InvestmentUploadForm';

interface Stats {
    total_users: number;
    total_agents: number;
    total_properties: number;
    standard_properties: number;
    crowdfunding_campaigns: number;
    investment_opportunities: number;
}

export default function AdminDashboard() {
    const [stats, setStats] = useState<Stats>({
        total_users: 0,
        total_agents: 0,
        total_properties: 0,
        standard_properties: 0,
        crowdfunding_campaigns: 0,
        investment_opportunities: 0
    });
    const [activeTab, setActiveTab] = useState<'standard' | 'crowdfunding' | 'investment'>('standard');
    const router = useRouter();

    const fetchStats = () => {
        fetch('http://localhost/PROPLEDGER/admin/stats.php', { credentials: 'include' })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setStats(data.stats);
                }
            })
            .catch(err => console.error('Stats fetch error:', err));
    };

    useEffect(() => {
        // Check for standalone admin session first
        const adminToken = localStorage.getItem('admin_token');
        if (adminToken === 'logged_in') {
            fetchStats();
            return;
        }

        // Check for main user session
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            router.push('/login');
            return;
        }

        try {
            const user = JSON.parse(storedUser);
            if (user.user_type !== 'admin') {
                router.push('/dashboard');
                return;
            }
            fetchStats();
        } catch (e) {
            router.push('/login');
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('admin_token');
        router.push('/login');
    };

    const handleUploadSuccess = () => {
        fetchStats(); // Refresh stats after successful upload
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Navbar */}
            <nav className="bg-gray-800 border-b border-gray-700 px-8 py-4 flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center font-bold text-xl">
                        A
                    </div>
                    <h1 className="text-xl font-bold">Admin Dashboard</h1>
                </div>
                <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
                >
                    Logout
                </button>
            </nav>

            <main className="container mx-auto px-4 py-8">
                {/* Stats Cards */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-lg">
                            <h3 className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-2">Total Users</h3>
                            <div className="text-3xl font-bold text-blue-400">{stats.total_users}</div>
                        </div>
                        <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-lg">
                            <h3 className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-2">Total Agents</h3>
                            <div className="text-3xl font-bold text-green-400">{stats.total_agents}</div>
                        </div>
                        <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-lg">
                            <h3 className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-2">All Properties</h3>
                            <div className="text-3xl font-bold text-purple-400">{stats.total_properties}</div>
                        </div>
                        <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-lg">
                            <h3 className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-2">Standard</h3>
                            <div className="text-3xl font-bold text-primary">{stats.standard_properties}</div>
                        </div>
                        <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-lg">
                            <h3 className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-2">Crowdfunding</h3>
                            <div className="text-3xl font-bold text-purple-500">{stats.crowdfunding_campaigns}</div>
                        </div>
                        <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-lg">
                            <h3 className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-2">Investments</h3>
                            <div className="text-3xl font-bold text-teal-500">{stats.investment_opportunities}</div>
                        </div>
                    </div>
                </div>

                {/* Property Management */}
                <div className="bg-gray-800/50 rounded-2xl border border-gray-700 p-8">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                        <h2 className="text-2xl font-bold mb-4 md:mb-0">Content Management</h2>

                        {/* Tabs */}
                        <div className="flex bg-gray-800 p-1 rounded-xl border border-gray-700">
                            <button
                                onClick={() => setActiveTab('standard')}
                                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'standard'
                                        ? 'bg-primary text-white shadow-lg'
                                        : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                Properties
                            </button>
                            <button
                                onClick={() => setActiveTab('crowdfunding')}
                                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'crowdfunding'
                                        ? 'bg-purple-500 text-white shadow-lg'
                                        : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                Crowdfunding
                            </button>
                            <button
                                onClick={() => setActiveTab('investment')}
                                className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'investment'
                                        ? 'bg-teal-500 text-white shadow-lg'
                                        : 'text-gray-400 hover:text-white'
                                    }`}
                            >
                                Investments
                            </button>
                        </div>
                    </div>

                    {/* Active Form */}
                    <div className="max-w-4xl mx-auto">
                        {activeTab === 'standard' && <PropertyUploadForm type="standard" onSuccess={handleUploadSuccess} />}
                        {activeTab === 'crowdfunding' && <CrowdfundingUploadForm onSuccess={handleUploadSuccess} />}
                        {activeTab === 'investment' && <InvestmentUploadForm onSuccess={handleUploadSuccess} />}
                    </div>
                </div>
            </main>
        </div>
    );
}

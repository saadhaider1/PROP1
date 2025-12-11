'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import LoadingScreen from '@/components/LoadingScreen';
import Footer from '@/components/Footer';

export default function Home() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        // First check localStorage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          console.log('User data from localStorage:', userData);
          setUser(userData);
          setLoading(false);
          return;
        }

        // Fallback to API check
        const response = await fetch('/api/auth/session');
        if (response.ok) {
          const data = await response.json();
          console.log('User data from API:', data.user);
          setUser(data.user);
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);
  return (
    <>
      <LoadingScreen />
      <div className="min-h-screen bg-gray-950">
        <Navbar />

        {/* Hero Section */}
        <section className="py-20 relative bg-gradient-to-br from-slate-50 via-blue-50 to-teal-50 shadow-inner">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxNGI4YTYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE0YzMuMzEgMCA2LTIuNjkgNi02cy0yLjY5LTYtNi02LTYgMi42OS02IDYgMi42OSA2IDYgNnptMC0xMGMyLjIxIDAgNCAxLjc5IDQgNHMtMS43OSA0LTQgNC00LTEuNzktNC00IDEuNzktNCA0LTR6TTYgMzRjMy4zMSAwIDYtMi42OSA2LTZzLTIuNjktNi02LTYtNiAyLjY5LTYgNiAyLjY5IDYgNiA2em0wLTEwYzIuMjEgMCA0IDEuNzkgNCA0cy0xLjc5IDQtNCA0LTQtMS43OS00LTQgMS43OS00IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-200 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center max-w-5xl mx-auto">
              <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent mb-6">
                PROPLEDGER
              </h1>
              <p className="text-2xl md:text-3xl text-gray-800 mb-6 font-semibold">
                Pakistan's First CDA-Compliant Blockchain Real Estate Investment Platform
              </p>
              <p className="text-lg text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed">
                Revolutionizing property investment with blockchain technology, smart contracts, and full CDA compliance.
                Invest in tokenized properties, earn transparent ROI, and participate in Pakistan's digital real estate future.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all">
                  <div className="text-4xl font-bold text-teal-600 mb-2">₨2.5B+</div>
                  <div className="text-gray-600 text-sm uppercase tracking-wide font-medium">Property Value</div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all">
                  <div className="text-4xl font-bold text-teal-600 mb-2">1,200+</div>
                  <div className="text-gray-600 text-sm uppercase tracking-wide font-medium">CDA Approved Properties</div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all">
                  <div className="text-4xl font-bold text-teal-600 mb-2">15,000+</div>
                  <div className="text-gray-600 text-sm uppercase tracking-wide font-medium">Active Investors</div>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all">
                  <div className="text-4xl font-bold text-teal-600 mb-2">12.5%</div>
                  <div className="text-gray-600 text-sm uppercase tracking-wide font-medium">Average ROI</div>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap justify-center gap-4 mb-10">
                <div className="px-6 py-3 bg-white rounded-xl font-medium text-gray-700 shadow-md border border-gray-200 flex items-center gap-2 hover:shadow-lg hover:-translate-y-0.5 transition-all">
                  <span className="text-xl">📋</span>
                  CDA Certified Platform
                </div>
                <div className="px-6 py-3 bg-white rounded-xl font-medium text-gray-700 shadow-md border border-gray-200 flex items-center gap-2 hover:shadow-lg hover:-translate-y-0.5 transition-all">
                  <span className="text-xl">🔗</span>
                  Blockchain Secured
                </div>
                <div className="px-6 py-3 bg-white rounded-xl font-medium text-gray-700 shadow-md border border-gray-200 flex items-center gap-2 hover:shadow-lg hover:-translate-y-0.5 transition-all">
                  <span className="text-xl">🛡️</span>
                  Smart Contract Protected
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap justify-center gap-4">
                <Link
                  href="/dashboard"
                  className="px-8 py-3 bg-white hover:bg-teal-50 text-teal-600 rounded-xl font-semibold transition-all flex items-center gap-2 shadow-lg border-2 border-teal-200 hover:border-teal-400 hover:shadow-xl"
                >
                  <span>📊</span>
                  My Dashboard
                </Link>
                <Link
                  href="/properties"
                  className="px-8 py-3 bg-white hover:bg-blue-50 text-blue-600 rounded-xl font-semibold transition-all flex items-center gap-2 shadow-lg border-2 border-blue-200 hover:border-blue-400 hover:shadow-xl"
                >
                  <span>🏠</span>
                  Browse CDA Properties
                </Link>
                <Link
                  href="/investments"
                  className="px-8 py-3 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white rounded-xl font-semibold transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <span>💰</span>
                  Start Investing
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Platform Features Section */}
        <section className="py-20 bg-gradient-to-b from-gray-50 via-slate-100 to-gray-100 relative">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDE0YzMuMzEgMCA2LTIuNjkgNi02cy0yLjY5LTYtNi02LTYgMi42OS02IDYgMi42OSA2IDYgNnptMC0xMGMyLjIxIDAgNCAxLjc5IDQgNHMtMS43OSA0LTQgNC00LTEuNzktNC00IDEuNzktNCA0LTR6TTYgMzRjMy4zMSAwIDYtMi42OSA2LTZzLTIuNjktNi02LTYtNiAyLjY5LTYgNiAyLjY5IDYgNiA2em0wLTEwYzIuMjEgMCA0IDEuNzkgNCA0cy0xLjc5IDQtNCA0LTQtMS43OS00LTQgMS43OS00IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50"></div>
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">Platform Features</h2>

            {/* Investment & Trading */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-teal-600 mb-8 text-center">Investment & Trading</h3>
              <div className="grid md:grid-cols-3 gap-8">
                {/* Investments */}
                <Link href="/investments" className="feature-card hover-glow bg-white/80 backdrop-blur-sm border border-gray-300 rounded-2xl p-8 hover:shadow-2xl hover:bg-white transition-all cursor-pointer shadow-md" style={{ animationDelay: '0.1s' }}>
                  <div className="text-5xl mb-4">💰</div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">Investments</h4>
                  <p className="text-gray-600 mb-4">
                    Invest in real estate properties using blockchain-based tokens. Purchase tokens via fiat or cryptocurrency and earn calculated ROI on your investments.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-2 mb-6">
                    <li>• Investment Listings</li>
                    <li>• Buy Property Shares</li>
                    <li>• ROI Calculator</li>
                    <li>• Token-based Transactions</li>
                  </ul>
                  <div className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold">
                    Start Investing →
                  </div>
                </Link>

                {/* Properties */}
                <Link href="/properties" className="feature-card hover-glow bg-white/80 backdrop-blur-sm border border-gray-300 rounded-2xl p-8 hover:shadow-2xl hover:bg-white transition-all cursor-pointer shadow-md" style={{ animationDelay: '0.2s' }}>
                  <div className="text-5xl mb-4">🏠</div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">Property Management</h4>
                  <p className="text-gray-600 mb-4">
                    Comprehensive property management system supporting residential and commercial listings with tokenized transactions on the blockchain.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-2 mb-6">
                    <li>• Residential and Commercial Properties</li>
                    <li>• Add Properties</li>
                    <li>• Filtered Browsing</li>
                    <li>• Sell Properties</li>
                  </ul>
                  <div className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold">
                    Browse Properties →
                  </div>
                </Link>

                {/* Crowdfunding */}
                <Link href="/crowdfunding" className="feature-card hover-glow bg-white/80 backdrop-blur-sm border border-gray-300 rounded-2xl p-8 hover:shadow-2xl hover:bg-white transition-all cursor-pointer shadow-md" style={{ animationDelay: '0.3s' }}>
                  <div className="text-5xl mb-4">🤝</div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">Crowdfunding</h4>
                  <p className="text-gray-600 mb-4">
                    Participate in collaborative property investments through blockchain-powered crowdfunding campaigns with transparent smart contracts.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-2 mb-6">
                    <li>• Campaign Creation</li>
                    <li>• Collaborative Funding</li>
                    <li>• Smart Contract Automation</li>
                    <li>• Progress Tracking</li>
                  </ul>
                  <div className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold">
                    View Campaigns →
                  </div>
                </Link>
              </div>
            </div>

            {/* Professional Services */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-teal-600 mb-8 text-center">Professional Services</h3>
              <div className={`grid gap-8 ${user?.type === 'agent' ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
                {/* Portfolio Management - Hidden for agents */}
                {user?.type !== 'agent' && (
                  <div className="feature-card hover-glow bg-white/80 backdrop-blur-sm border border-gray-300 rounded-2xl p-8 hover:shadow-2xl hover:bg-white transition-all shadow-md" style={{ animationDelay: '0.4s' }}>
                    <div className="text-5xl mb-4">👥</div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-4">Portfolio Management</h4>
                    <p className="text-gray-600 mb-4">
                      Connect with professional portfolio managers who specialize in real estate investments and blockchain assets.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-2 mb-6">
                      <li>• Expert Portfolio Managers</li>
                      <li>• Video Call & Messaging</li>
                      <li>• Online Meeting Scheduling</li>
                      <li>• Personalized Investment Strategies</li>
                    </ul>
                    <Link
                      href="/managers"
                      className="inline-block px-6 py-2 bg-teal-600 text-white rounded-lg text-sm font-semibold hover:bg-teal-700 transition-colors"
                    >
                      View Managers →
                    </Link>
                  </div>
                )}

                {/* Online Meetings */}
                <div className="feature-card hover-glow bg-white/80 backdrop-blur-sm border border-gray-300 rounded-2xl p-8 hover:shadow-2xl hover:bg-white transition-all shadow-md" style={{ animationDelay: '0.5s' }}>
                  <div className="text-5xl mb-4">📹</div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">Online Meetings & Video Communication</h4>
                  <p className="text-gray-600 mb-4">
                    Enable real-time communication between buyers, sellers, and agents through integrated video calls and meetings.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-2 mb-6">
                    <li>• Live Video Meetings</li>
                    <li>• Virtual Property Tours</li>
                    <li>• Document Sharing & Screen Sharing</li>
                    <li>• Chat & Notes Panel</li>
                    <li>• Encrypted Communication</li>
                  </ul>
                </div>

                {/* Analytics Dashboard */}
                <Link href="/dashboard" className="feature-card hover-glow bg-white/80 backdrop-blur-sm border border-gray-300 rounded-2xl p-8 hover:shadow-2xl hover:bg-white transition-all cursor-pointer shadow-md" style={{ animationDelay: '0.6s' }}>
                  <div className="text-5xl mb-4">📊</div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">Analytics Dashboard</h4>
                  <p className="text-gray-600 mb-4">
                    Comprehensive analytics and reporting tools to track your investments, property performance, and market trends in real-time.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-2 mb-6">
                    <li>• Investment Portfolio Tracking</li>
                    <li>• Market Analysis</li>
                    <li>• Performance Metrics</li>
                    <li>• ROI Visualization</li>
                  </ul>
                  <div className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg text-sm font-semibold">
                    View Dashboard →
                  </div>
                </Link>
              </div>
            </div>

            {/* Technology & Security */}
            <div>
              <h3 className="text-2xl font-bold text-teal-600 mb-8 text-center">Technology & Security</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Blockchain Security */}
                <div className="feature-card hover-glow bg-white/80 backdrop-blur-sm border border-gray-300 rounded-2xl p-8 hover:shadow-2xl hover:bg-white transition-all shadow-md" style={{ animationDelay: '0.1s' }}>
                  <div className="text-5xl mb-4">⛓️</div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">Blockchain Security</h4>
                  <p className="text-gray-600 mb-4">
                    Built on secure blockchain technology ensuring transparent, immutable, and decentralized property transactions and investments.
                  </p>
                  <ul className="text-sm text-gray-600 space-y-2">
                    <li>• Smart Contract Integration</li>
                    <li>• Immutable Transaction Records</li>
                    <li>• Decentralized Architecture</li>
                    <li>• Cryptocurrency Support</li>
                  </ul>
                </div>

                {/* CDA Compliance */}
                <div className="feature-card hover-glow bg-blue-50/60 backdrop-blur-sm border border-blue-300 rounded-2xl p-8 hover:shadow-xl transition-all shadow-md" style={{ animationDelay: '0.2s' }}>
                  <div className="text-5xl mb-4">🏛️</div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">CDA Compliance</h4>
                  <p className="text-gray-700">
                    All properties listed on PROPLEDGER are reviewed for Capital Development Authority (CDA) compliance, ensuring that you invest in legally approved real estate projects.
                  </p>
                </div>

                {/* Blockchain Technology */}
                <div className="feature-card hover-glow bg-purple-50/60 backdrop-blur-sm border border-purple-300 rounded-2xl p-8 hover:shadow-xl transition-all shadow-md" style={{ animationDelay: '0.3s' }}>
                  <div className="text-5xl mb-4">🔒</div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">Blockchain Technology</h4>
                  <p className="text-gray-700">
                    Embrace the future of real estate with blockchain technology, guaranteeing transparent, immutable, and efficient transactions.
                  </p>
                </div>

                {/* Real Estate Investment */}
                <div className="feature-card hover-glow bg-green-50/60 backdrop-blur-sm border border-green-300 rounded-2xl p-8 hover:shadow-xl transition-all shadow-md" style={{ animationDelay: '0.4s' }}>
                  <div className="text-5xl mb-4">🏘️</div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">Real Estate Investment</h4>
                  <p className="text-gray-700">
                    Dive into the thriving world of tokenized real estate. Whether you're investing in luxury villas, urban apartments, or commercial plots.
                  </p>
                </div>

                {/* Security and Reliability */}
                <div className="feature-card hover-glow bg-amber-50/60 backdrop-blur-sm border border-amber-300 rounded-2xl p-8 hover:shadow-xl transition-all shadow-md" style={{ animationDelay: '0.5s' }}>
                  <div className="text-5xl mb-4">🛡️</div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-4">Security and Reliability</h4>
                  <p className="text-gray-700">
                    Security is at the heart of PROPLEDGER. Our platform employs state-of-the-art security measures to protect your investments and personal information.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
}

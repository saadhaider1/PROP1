'use client';

import { useState } from 'react';
import PropertyCard from '@/components/PropertyCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function CrowdfundingPage() {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample crowdfunding campaigns - Replace with API call
  const campaigns = [
    {
      id: '1',
      image: '/images/property1.jpg',
      logo: '/images/logo1.png',
      title: 'Property Share',
      category: 'Real Estate Ownership Made Easy',
      location: 'Arif Habib Dolmen REIT Management Limited',
      description: 'It is an innovative, bite-sized way to invest in high-value real estate. With Dolmen REIT, you can own a share of the most sought-after commercial properties without needing millions upfront.',
      targetAmount: 'PKR 50,000,000',
      raisedAmount: 'PKR 35,000,000',
      investors: 245,
      minInvestment: 'PKR 100,000',
      type: 'crowdfunding' as const
    },
    {
      id: '2',
      image: '/images/property2.jpg',
      logo: '/images/logo2.png',
      title: 'Serene Heights Hotel & Resort',
      category: 'Hospitality',
      location: 'Nathia Gali, Khyber Pakhtunkhwa',
      description: 'Serene Heights in Nathia Gali is a luxury hotel and resort spanning 2.5 acres with 50 rooms, a spa, restaurant, and conference facilities. Located in a prime tourist destination.',
      targetAmount: 'PKR 80,000,000',
      raisedAmount: 'PKR 62,000,000',
      investors: 412,
      minInvestment: 'PKR 150,000',
      type: 'crowdfunding' as const
    },
    {
      id: '3',
      image: '/images/property3.jpg',
      title: 'Green Valley Apartments',
      category: 'Residential Complex',
      location: 'Bahria Town, Islamabad',
      description: 'Modern apartment complex with eco-friendly design, solar panels, and smart home technology. Features include gym, swimming pool, and community center.',
      targetAmount: 'PKR 30,000,000',
      raisedAmount: 'PKR 18,000,000',
      investors: 156,
      minInvestment: 'PKR 75,000',
      type: 'crowdfunding' as const
    },
    {
      id: '4',
      image: '/images/property4.jpg',
      title: 'Tech Hub Commercial Plaza',
      category: 'Commercial Development',
      location: 'I-9 Markaz, Islamabad',
      description: 'State-of-the-art commercial plaza designed for tech startups and IT companies. Features high-speed internet, modern workspaces, and parking facilities.',
      targetAmount: 'PKR 65,000,000',
      raisedAmount: 'PKR 45,000,000',
      investors: 328,
      minInvestment: 'PKR 200,000',
      type: 'crowdfunding' as const
    },
    {
      id: '5',
      image: '/images/property5.jpg',
      title: 'Luxury Villas Project',
      category: 'Premium Housing',
      location: 'DHA Phase 6, Lahore',
      description: 'Exclusive luxury villas with private gardens, swimming pools, and modern architecture. Each villa features 5 bedrooms, home automation, and premium finishes.',
      targetAmount: 'PKR 120,000,000',
      raisedAmount: 'PKR 95,000,000',
      investors: 567,
      minInvestment: 'PKR 500,000',
      type: 'crowdfunding' as const
    },
    {
      id: '6',
      image: '/images/property6.jpg',
      title: 'Shopping Mall Development',
      category: 'Retail Complex',
      location: 'Gulberg, Karachi',
      description: 'Multi-story shopping mall with international brands, food court, cinema, and entertainment zone. Strategic location with high foot traffic.',
      targetAmount: 'PKR 100,000,000',
      raisedAmount: 'PKR 72,000,000',
      investors: 489,
      minInvestment: 'PKR 250,000',
      type: 'crowdfunding' as const
    }
  ];

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         campaign.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || 
                         (filter === 'active' && parseFloat(campaign.raisedAmount.replace(/[^0-9.]/g, '')) < parseFloat(campaign.targetAmount.replace(/[^0-9.]/g, ''))) ||
                         (filter === 'completed' && parseFloat(campaign.raisedAmount.replace(/[^0-9.]/g, '')) >= parseFloat(campaign.targetAmount.replace(/[^0-9.]/g, '')));
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-slate-100 to-gray-100">
      <Navbar />
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-teal-900 text-white py-20 shadow-xl">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">Crowdfunding Campaigns</h1>
          <p className="text-lg text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-md">Join community-funded real estate projects</p>
        </div>
      </div>

      {/* Content Section with Light Background */}
      <div className="bg-gradient-to-b from-gray-50 via-slate-100 to-gray-100 relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAwMDAiIGZpbGwtb3BhY2l0eT0iMC4wMiI+PHBhdGggZD0iTTM2IDE0YzMuMzEgMCA2LTIuNjkgNi02cy0yLjY5LTYtNi02LTYgMi42OS02IDYgMi42OSA2IDYgNnptMC0xMGMyLjIxIDAgNCAxLjc5IDQgNHMtMS43OSA0LTQgNC00LTEuNzktNC00IDEuNzktNCA0LTR6TTYgMzRjMy4zMSAwIDYtMi42OSA2LTZzLTIuNjktNi02LTYtNiAyLjY5LTYgNiAyLjY5IDYgNiA2em0wLTEwYzIuMjEgMCA0IDEuNzkgNCA0cy0xLjc5IDQtNCA0LTQtMS43OS00LTQgMS43OS00IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50"></div>
        <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border border-gray-300 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div>
              <input
                type="text"
                placeholder="Search campaigns by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Filter */}
            <div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">All Campaigns</option>
                <option value="active">Active Campaigns</option>
                <option value="completed">Fully Funded</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border border-gray-300 p-6 text-center hover:shadow-xl transition-all">
            <p className="text-3xl font-bold text-teal-600">{campaigns.length}</p>
            <p className="text-gray-600">Active Campaigns</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border border-gray-300 p-6 text-center hover:shadow-xl transition-all">
            <p className="text-3xl font-bold text-blue-600">PKR 1.2B</p>
            <p className="text-gray-600">Total Funded</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border border-gray-300 p-6 text-center hover:shadow-xl transition-all">
            <p className="text-3xl font-bold text-teal-600">3,500+</p>
            <p className="text-gray-600">Investors</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border border-gray-300 p-6 text-center hover:shadow-xl transition-all">
            <p className="text-3xl font-bold text-blue-600">PKR 50K</p>
            <p className="text-gray-600">Min. Contribution</p>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">How Crowdfunding Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
              <h3 className="font-semibold text-lg mb-2">Browse Projects</h3>
              <p className="text-gray-600 text-sm">Explore verified real estate projects</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
              <h3 className="font-semibold text-lg mb-2">Choose Investment</h3>
              <p className="text-gray-600 text-sm">Select amount and review details</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
              <h3 className="font-semibold text-lg mb-2">Secure Payment</h3>
              <p className="text-gray-600 text-sm">Complete transaction via blockchain</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-600 text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">4</div>
              <h3 className="font-semibold text-lg mb-2">Earn Returns</h3>
              <p className="text-gray-600 text-sm">Receive profits from your investment</p>
            </div>
          </div>
        </div>

        {/* Campaigns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCampaigns.map((campaign) => (
            <PropertyCard key={campaign.id} {...campaign} />
          ))}
        </div>

        {/* No Results */}
        {filteredCampaigns.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-xl">No campaigns found matching your criteria.</p>
          </div>
        )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

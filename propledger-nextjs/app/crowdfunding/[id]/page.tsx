'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface Campaign {
  id: string;
  image: string;
  icon?: string;
  title: string;
  category: string;
  location: string;
  description: string;
  fullDescription: string;
  targetAmount: string;
  targetNumeric: number;
  raisedAmount: string;
  raisedNumeric: number;
  investors: number;
  minInvestment: string;
  minInvestmentNumeric: number;
  expectedROI: string;
  duration: string;
  endDate: string;
  features: string[];
  updates: { date: string; title: string; content: string; }[];
  documents: { name: string; url: string; }[];
}

export default function CrowdfundingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'updates' | 'documents'>('overview');

  useEffect(() => {
    // Sample campaign data - Replace with API call
    const campaigns: { [key: string]: Campaign } = {
      '1': {
        id: '1',
        image: '/images/property1.jpg',
        icon: '🏠',
        title: 'Property Share',
        category: 'Real Estate Ownership Made Easy',
        location: 'Arif Habib Dolmen REIT Management Limited',
        description: 'It is an innovative, bite-sized way to invest in high-value real estate.',
        fullDescription: 'Property Share by Dolmen REIT is a groundbreaking crowdfunding campaign that democratizes real estate investment. By pooling resources from multiple investors, we can collectively own premium commercial properties that would otherwise be out of reach. Each investor receives proportional ownership tokens and shares in rental income and property appreciation.',
        targetAmount: 'PKR 50,000,000',
        targetNumeric: 50000000,
        raisedAmount: 'PKR 35,000,000',
        raisedNumeric: 35000000,
        investors: 245,
        minInvestment: 'PKR 100,000',
        minInvestmentNumeric: 100000,
        expectedROI: '16% annually',
        duration: '3 Years',
        endDate: 'December 31, 2025',
        features: [
          'Collective Ownership Model',
          'Regular Income Distribution',
          'Professional Property Management',
          'Blockchain-Verified Shares',
          'Quarterly Performance Reports',
          'Exit Strategy After 3 Years'
        ],
        updates: [
          {
            date: 'Nov 1, 2025',
            title: 'Campaign 70% Funded!',
            content: 'We are thrilled to announce that we have reached 70% of our funding goal with 245 investors. Thank you for your trust and support!'
          },
          {
            date: 'Oct 15, 2025',
            title: 'Property Inspection Completed',
            content: 'Independent valuation and inspection completed. All reports available in documents section.'
          }
        ],
        documents: [
          { name: 'Campaign Prospectus', url: '#' },
          { name: 'Property Valuation Report', url: '#' },
          { name: 'Legal Agreement', url: '#' },
          { name: 'CDA Approval', url: '#' }
        ]
      },
      '2': {
        id: '2',
        image: '/images/property2.jpg',
        icon: '🏨',
        title: 'Serene Heights Hotel & Resort',
        category: 'Hospitality',
        location: 'Nathia Gali, Khyber Pakhtunkhwa',
        description: 'Luxury hotel and resort spanning 2.5 acres with 50 rooms.',
        fullDescription: 'Serene Heights is an exciting hospitality crowdfunding opportunity. This luxury hotel and resort in the scenic Nathia Gali region offers investors a chance to participate in the booming tourism industry. With 50 well-appointed rooms, spa facilities, and conference halls, this property generates year-round revenue from both leisure and business travelers.',
        targetAmount: 'PKR 80,000,000',
        targetNumeric: 80000000,
        raisedAmount: 'PKR 62,000,000',
        raisedNumeric: 62000000,
        investors: 412,
        minInvestment: 'PKR 150,000',
        minInvestmentNumeric: 150000,
        expectedROI: '18% annually',
        duration: '5 Years',
        endDate: 'January 15, 2026',
        features: [
          '50 Luxury Rooms',
          'Full-Service Spa',
          'Conference Facilities',
          'Restaurant & Bar',
          'Year-Round Operations',
          'Experienced Hotel Management'
        ],
        updates: [
          {
            date: 'Oct 28, 2025',
            title: 'Over 400 Investors!',
            content: 'We have crossed 400 investors and raised over PKR 62 million. Only PKR 18 million remaining to reach our goal!'
          },
          {
            date: 'Oct 10, 2025',
            title: 'Hotel License Approved',
            content: 'All necessary licenses and permits have been approved by local authorities.'
          }
        ],
        documents: [
          { name: 'Investment Prospectus', url: '#' },
          { name: 'Hotel License', url: '#' },
          { name: 'Revenue Projections', url: '#' },
          { name: 'Management Agreement', url: '#' }
        ]
      }
    };

    const campaignData = campaigns[params.id as string];
    if (campaignData) {
      setCampaign(campaignData);
    }
  }, [params.id]);

  const handleInvestment = () => {
    if (!investmentAmount) {
      alert('Please enter an investment amount');
      return;
    }
    const amount = parseInt(investmentAmount);
    if (amount < campaign!.minInvestmentNumeric) {
      alert(`Minimum investment is ${campaign!.minInvestment}`);
      return;
    }
    router.push(`/checkout?campaign=${params.id}&amount=${investmentAmount}&type=crowdfunding`);
  };

  if (!campaign) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading campaign details...</p>
        </div>
      </div>
    );
  }

  const fundingPercentage = (campaign.raisedNumeric / campaign.targetNumeric) * 100;
  const remainingAmount = campaign.targetNumeric - campaign.raisedNumeric;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 bg-gray-900">
        <Image
          src={campaign.image}
          alt={campaign.title}
          fill
          className="object-cover opacity-70"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 py-8">
          <Link href="/crowdfunding" className="text-white hover:text-green-400 mb-4 inline-block">
            ← Back to Crowdfunding
          </Link>
          <div className="flex items-start gap-4">
            {campaign.icon && (
              <div className="text-6xl bg-white p-4 rounded-lg">{campaign.icon}</div>
            )}
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">{campaign.title}</h1>
              <p className="text-gray-300 text-lg">{campaign.category}</p>
              <p className="text-gray-400">{campaign.location}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Funding Progress Card */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Raised</p>
                  <p className="text-2xl font-bold text-green-600">{campaign.raisedAmount}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Target</p>
                  <p className="text-2xl font-bold text-gray-900">{campaign.targetAmount}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Investors</p>
                  <p className="text-2xl font-bold text-blue-600">{campaign.investors}</p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
                <div
                  className="bg-gradient-to-r from-green-500 to-blue-500 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${fundingPercentage}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>{fundingPercentage.toFixed(1)}% funded</span>
                <span>PKR {(remainingAmount / 1000000).toFixed(1)}M remaining</span>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-md mb-6">
              <div className="border-b border-gray-200">
                <div className="flex">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`px-6 py-4 font-semibold ${
                      activeTab === 'overview'
                        ? 'text-green-600 border-b-2 border-green-600'
                        : 'text-gray-600 hover:text-green-600'
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('updates')}
                    className={`px-6 py-4 font-semibold ${
                      activeTab === 'updates'
                        ? 'text-green-600 border-b-2 border-green-600'
                        : 'text-gray-600 hover:text-green-600'
                    }`}
                  >
                    Updates
                  </button>
                  <button
                    onClick={() => setActiveTab('documents')}
                    className={`px-6 py-4 font-semibold ${
                      activeTab === 'documents'
                        ? 'text-green-600 border-b-2 border-green-600'
                        : 'text-gray-600 hover:text-green-600'
                    }`}
                  >
                    Documents
                  </button>
                </div>
              </div>

              <div className="p-6">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">About This Campaign</h2>
                    <p className="text-gray-700 leading-relaxed mb-6">{campaign.fullDescription}</p>

                    <h3 className="text-xl font-bold mb-3">Key Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {campaign.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <span className="text-green-600">✓</span>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Updates Tab */}
                {activeTab === 'updates' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Campaign Updates</h2>
                    <div className="space-y-4">
                      {campaign.updates.map((update, index) => (
                        <div key={index} className="border-l-4 border-green-500 pl-4 py-2">
                          <p className="text-sm text-gray-500 mb-1">{update.date}</p>
                          <h4 className="font-semibold text-lg text-gray-900 mb-2">{update.title}</h4>
                          <p className="text-gray-700">{update.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Documents Tab */}
                {activeTab === 'documents' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Campaign Documents</h2>
                    <div className="space-y-3">
                      {campaign.documents.map((doc, index) => (
                        <a
                          key={index}
                          href={doc.url}
                          className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">📄</span>
                            <span className="font-semibold text-gray-700">{doc.name}</span>
                          </div>
                          <span className="text-green-600">Download →</span>
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Investment Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
              <h3 className="text-2xl font-bold mb-4">Join This Campaign</h3>

              {/* Campaign Stats */}
              <div className="mb-6 p-4 bg-green-50 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Min. Investment:</span>
                  <span className="font-semibold text-gray-900">{campaign.minInvestment}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Expected ROI:</span>
                  <span className="font-semibold text-green-600">{campaign.expectedROI}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Duration:</span>
                  <span className="font-semibold text-gray-900">{campaign.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">End Date:</span>
                  <span className="font-semibold text-gray-900">{campaign.endDate}</span>
                </div>
              </div>

              {/* Investment Amount Input */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Investment Amount (PKR):
                </label>
                <input
                  type="number"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(e.target.value)}
                  placeholder={`Min ${campaign.minInvestment}`}
                  min={campaign.minInvestmentNumeric}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                {investmentAmount && parseInt(investmentAmount) >= campaign.minInvestmentNumeric && (
                  <div className="mt-3 p-3 bg-blue-50 rounded">
                    <p className="text-sm text-gray-600">Your share:</p>
                    <p className="text-lg font-bold text-blue-600">
                      {((parseInt(investmentAmount) / campaign.targetNumeric) * 100).toFixed(2)}%
                    </p>
                  </div>
                )}
              </div>

              {/* Invest Button */}
              <button
                onClick={handleInvestment}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-4 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl mb-3"
              >
                Invest Now
              </button>

              {/* Share Campaign */}
              <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors mb-4">
                Share Campaign
              </button>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-gray-200">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-green-600">✓</span>
                    <span>Verified Campaign</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-green-600">✓</span>
                    <span>Blockchain Secured</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-green-600">✓</span>
                    <span>Regular Updates</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-green-600">✓</span>
                    <span>{campaign.investors} Investors Trust This</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

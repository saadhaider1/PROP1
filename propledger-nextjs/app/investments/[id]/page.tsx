'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface Investment {
  id: string;
  image: string;
  icon?: string;
  title: string;
  category: string;
  location: string;
  description: string;
  fullDescription: string;
  returns: string;
  duration: string;
  minInvestment: string;
  minInvestmentNumeric: number;
  maxInvestment?: string;
  totalSize: string;
  availableUnits: number;
  totalUnits: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  paymentSchedule: string;
  features: string[];
  financials: { label: string; value: string; }[];
  documents: { name: string; url: string; }[];
}

export default function InvestmentDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [investment, setInvestment] = useState<Investment | null>(null);
  const [selectedOption, setSelectedOption] = useState<'full' | 'partial'>('partial');
  const [investmentAmount, setInvestmentAmount] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'financials' | 'documents'>('overview');

  useEffect(() => {
    // Reset investment state to force fresh load
    setInvestment(null);

    const fetchInvestment = async () => {
      try {
        console.log('Fetching investment ID:', params.id);

        // Fetch from API
        const response = await fetch('/api/properties');
        const data = await response.json();

        if (data.success) {
          // Find the specific property by ID
          const property = data.properties.find((p: any) => p.id.toString() === params.id);

          if (property) {
            console.log('Found property:', property);

            // Transform property data to investment format
            const investmentData: Investment = {
              id: property.id.toString(),
              image: property.image_url || '/images/property-placeholder.jpg',
              icon: '🏢',
              title: property.title,
              category: property.property_type === 'commercial' ? 'Commercial Real Estate' :
                property.property_type === 'mixed' ? 'Mixed Use Development' :
                  property.property_type === 'residential' ? 'Residential Development' :
                    property.property_type === 'land' ? 'Land Investment' :
                      property.property_type === 'industrial' ? 'Industrial Real Estate' :
                        'Real Estate Investment',
              location: property.location,
              description: property.description || '',
              fullDescription: property.description || '',
              returns: property.returns || '12-15%',
              duration: property.duration || '3-5 Years',
              minInvestment: `PKR ${(property.min_investment || property.token_price || 100000).toLocaleString()}`,
              minInvestmentNumeric: property.min_investment || property.token_price || 100000,
              maxInvestment: `PKR ${(property.price || 10000000).toLocaleString()}`,
              totalSize: `PKR ${(property.price || 5000000).toLocaleString()}`,
              availableUnits: property.available_tokens || 1000,
              totalUnits: property.total_tokens || 1000,
              riskLevel: (property.risk_level || 'Low') as 'Low' | 'Medium' | 'High',
              paymentSchedule: property.payment_schedule || 'Quarterly',
              features: property.key_features || [],
              financials: [
                { label: 'Expected Annual Return', value: property.returns || '12-15%' },
                { label: 'Payment Schedule', value: property.payment_schedule || 'Quarterly' },
                { label: 'Risk Level', value: property.risk_level || 'Low' },
                { label: 'Duration', value: property.duration || '3-5 Years' },
                { label: 'Min Investment', value: `PKR ${(property.min_investment || 100000).toLocaleString()}` },
                { label: 'Property Type', value: property.property_type }
              ],
              documents: property.documents || []
            };

            setInvestment(investmentData);
          } else {
            console.error('Property not found for ID:', params.id);
          }
        } else {
          console.error('Failed to fetch properties:', data.message);
        }
      } catch (error) {
        console.error('Error fetching investment:', error);
      }
    };

    fetchInvestment();
  }, [params.id]);

  const handleInvestment = () => {
    if (!investmentAmount) {
      alert('Please enter an investment amount');
      return;
    }
    const amount = parseInt(investmentAmount);
    if (amount < investment!.minInvestmentNumeric) {
      alert(`Minimum investment is ${investment!.minInvestment}`);
      return;
    }
    router.push(`/checkout?investment=${params.id}&amount=${investmentAmount}&type=investment`);
  };

  if (!investment) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading investment details...</p>
        </div>
      </div>
    );
  }

  const availabilityPercentage = (investment.availableUnits / investment.totalUnits) * 100;

  return (
    <div key={params.id as string} className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 bg-gray-900">
        <Image
          src={investment.image}
          alt={investment.title}
          fill
          className="object-cover opacity-70"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 py-8">
          <Link href="/investments" className="text-white hover:text-purple-400 mb-4 inline-block">
            ← Back to Investments
          </Link>
          <div className="flex items-start gap-4">
            {investment.icon && (
              <div className="text-6xl bg-white p-4 rounded-lg">{investment.icon}</div>
            )}
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">{investment.title}</h1>
              <p className="text-gray-300 text-lg">{investment.category}</p>
              <p className="text-gray-400">{investment.location}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Key Metrics Card */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Returns</p>
                  <p className="text-2xl font-bold text-green-600">{investment.returns}</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Duration</p>
                  <p className="text-2xl font-bold text-blue-600">{investment.duration}</p>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Min. Investment</p>
                  <p className="text-lg font-bold text-purple-600">{investment.minInvestment}</p>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Risk Level</p>
                  <p className={`text-2xl font-bold ${investment.riskLevel === 'Low' ? 'text-green-600' :
                    investment.riskLevel === 'Medium' ? 'text-orange-600' : 'text-red-600'
                    }`}>{investment.riskLevel}</p>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-md mb-6">
              <div className="border-b border-gray-200">
                <div className="flex">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`px-6 py-4 font-semibold ${activeTab === 'overview'
                      ? 'text-purple-600 border-b-2 border-purple-600'
                      : 'text-gray-600 hover:text-purple-600'
                      }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('financials')}
                    className={`px-6 py-4 font-semibold ${activeTab === 'financials'
                      ? 'text-purple-600 border-b-2 border-purple-600'
                      : 'text-gray-600 hover:text-purple-600'
                      }`}
                  >
                    Financials
                  </button>
                  <button
                    onClick={() => setActiveTab('documents')}
                    className={`px-6 py-4 font-semibold ${activeTab === 'documents'
                      ? 'text-purple-600 border-b-2 border-purple-600'
                      : 'text-gray-600 hover:text-purple-600'
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
                    <h2 className="text-2xl font-bold mb-4">Investment Overview</h2>
                    <p className="text-gray-700 leading-relaxed mb-6">{investment.fullDescription}</p>

                    <h3 className="text-xl font-bold mb-3">Key Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                      {investment.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <span className="text-purple-600">✓</span>
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                      <h4 className="font-semibold text-blue-900 mb-2">Investment Highlights</h4>
                      <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Payment Schedule: {investment.paymentSchedule}</li>
                        <li>• Total Investment Size: {investment.totalSize}</li>
                        <li>• Available Units: {investment.availableUnits.toLocaleString()} of {investment.totalUnits.toLocaleString()}</li>
                        <li>• Availability: {availabilityPercentage.toFixed(1)}%</li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* Financials Tab */}
                {activeTab === 'financials' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Financial Details</h2>
                    <div className="space-y-3">
                      {investment.financials.map((item, index) => (
                        <div key={index} className="flex justify-between items-center py-3 border-b">
                          <span className="font-semibold text-gray-700">{item.label}:</span>
                          <span className="text-gray-900 font-medium">{item.value}</span>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded">
                      <h4 className="font-semibold text-yellow-900 mb-2">⚠️ Risk Disclosure</h4>
                      <p className="text-sm text-yellow-800">
                        All investments carry risk. Past performance does not guarantee future results.
                        Please read all documents carefully and consult with a financial advisor before investing.
                      </p>
                    </div>
                  </div>
                )}

                {/* Documents Tab */}
                {activeTab === 'documents' && (
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Investment Documents</h2>
                    {investment.documents && investment.documents.length > 0 ? (
                      <div className="space-y-3">
                        {investment.documents.map((doc, index) => (
                          <a
                            key={index}
                            href={doc.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">📄</span>
                              <span className="font-semibold text-gray-700">{doc.name}</span>
                            </div>
                            <span className="text-purple-600">Download →</span>
                          </a>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 bg-gray-50 rounded-lg">
                        <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <h3 className="text-lg font-semibold text-gray-600 mb-2">No Documents Found</h3>
                        <p className="text-gray-500">Documents for this investment will be available soon.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar - Investment Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
              <h3 className="text-2xl font-bold mb-4">Start Investing</h3>

              {/* Investment Options */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Investment Type:
                </label>
                <div className="space-y-3">
                  <button
                    onClick={() => setSelectedOption('full')}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${selectedOption === 'full'
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                      }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900">Full Investment</span>
                      <span className={`w-5 h-5 rounded-full border-2 ${selectedOption === 'full'
                        ? 'border-purple-600 bg-purple-600'
                        : 'border-gray-300'
                        }`}>
                        {selectedOption === 'full' && (
                          <span className="block w-full h-full rounded-full bg-white scale-50"></span>
                        )}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">Maximum investment amount</p>
                    <p className="text-lg font-bold text-purple-600 mt-2">{investment.maxInvestment}</p>
                  </button>

                  <button
                    onClick={() => setSelectedOption('partial')}
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${selectedOption === 'partial'
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                      }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900">Partial Investment</span>
                      <span className={`w-5 h-5 rounded-full border-2 ${selectedOption === 'partial'
                        ? 'border-purple-600 bg-purple-600'
                        : 'border-gray-300'
                        }`}>
                        {selectedOption === 'partial' && (
                          <span className="block w-full h-full rounded-full bg-white scale-50"></span>
                        )}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">Choose your investment amount</p>
                    <p className="text-sm text-gray-500 mt-2">Min: {investment.minInvestment}</p>
                  </button>
                </div>
              </div>

              {/* Investment Amount Input */}
              {selectedOption === 'partial' && (
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Investment Amount (PKR):
                  </label>
                  <input
                    type="number"
                    value={investmentAmount}
                    onChange={(e) => setInvestmentAmount(e.target.value)}
                    placeholder={`Min ${investment.minInvestment}`}
                    min={investment.minInvestmentNumeric}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                  {investmentAmount && parseInt(investmentAmount) >= investment.minInvestmentNumeric && (
                    <div className="mt-3 p-3 bg-green-50 rounded">
                      <p className="text-sm text-gray-600">Estimated Annual Return:</p>
                      <p className="text-lg font-bold text-green-600">
                        PKR {((parseInt(investmentAmount) * 0.12)).toLocaleString()} - {((parseInt(investmentAmount) * 0.15)).toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Invest Button */}
              <button
                onClick={handleInvestment}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl mb-3"
              >
                Invest Now
              </button>

              {/* Calculate Returns */}
              <button className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors mb-4">
                Calculate Returns
              </button>

              {/* Trust Indicators */}
              <div className="pt-6 border-t border-gray-200">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-green-600">✓</span>
                    <span>CDA Verified</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-green-600">✓</span>
                    <span>Blockchain Secured</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-green-600">✓</span>
                    <span>{investment.paymentSchedule} Payments</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-green-600">✓</span>
                    <span>Professional Management</span>
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

'use client';

import { useState } from 'react';
import PropertyCard from '@/components/PropertyCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function InvestmentsPage() {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample investment opportunities - Replace with API call
  const investments = [
    {
      id: '4',
      image: '/images/property1.jpg',
      logo: '/images/logo1.png',
      title: 'Property Share',
      category: 'Real Estate Ownership Made Easy',
      location: 'Arif Habib Dolmen REIT Management Limited',
      description: 'It is an innovative, bite-sized way to invest in high-value real estate. With Dolmen REIT, you can own a share of the most sought-after commercial properties without needing millions upfront.',
      returns: '12-15%',
      duration: '3 Years',
      minInvestment: 'PKR 100K',
      type: 'investment' as const,
      fullDescription: 'Property Share offers a unique investment opportunity in premium commercial real estate through Dolmen REIT. This investment vehicle provides exposure to a diversified portfolio of high-quality commercial properties across major cities in Pakistan. With professional management and transparent reporting, investors can earn stable returns through rental income and property appreciation.'
    },
    {
      id: '5',
      image: '/images/property2.jpg',
      logo: '/images/logo2.png',
      title: 'Serene Heights Hotel & Resort',
      category: 'Hospitality',
      location: 'Nathia Gali, Khyber Pakhtunkhwa',
      description: 'Serene Heights in Nathia Gali is a luxury hotel and resort spanning 2.5 acres with 50 rooms, a spa, restaurant, and conference facilities. Located in a prime tourist destination.',
      returns: '18-22%',
      duration: '5 Years',
      minInvestment: 'PKR 150K',
      type: 'investment' as const,
      fullDescription: 'Serene Heights Hotel & Resort represents a premium hospitality investment in one of Pakistan\'s most sought-after tourist destinations. This 50-room luxury property generates consistent revenue from both leisure and business travelers year-round. With professional hotel management and a proven track record, this investment offers attractive returns with moderate risk.'
    },
    {
      id: '6',
      image: '/images/property3.jpg',
      title: 'Commercial Plaza Investment',
      category: 'Commercial Real Estate',
      location: 'Blue Area, Islamabad',
      description: 'Prime commercial plaza in the heart of Islamabad\'s business district. Guaranteed rental income with long-term corporate tenants and appreciation potential.',
      returns: '14-16%',
      duration: '4 Years',
      minInvestment: 'PKR 200K',
      type: 'investment' as const,
      fullDescription: 'A premier commercial plaza strategically located in Islamabad\'s Blue Area business district. This investment property features modern infrastructure with guaranteed long-term corporate tenants including multinational companies. The location ensures consistent rental income and strong appreciation potential in one of Pakistan\'s fastest-growing business hubs.'
    },
    {
      id: '7',
      image: '/images/property4.jpg',
      title: 'Residential Apartment Complex',
      category: 'Residential Development',
      location: 'Bahria Town, Lahore',
      description: 'Modern apartment complex with guaranteed rental yields. Features include gym, pool, security, and prime location near schools and shopping centers.',
      returns: '10-12%',
      duration: '2 Years',
      minInvestment: 'PKR 75K',
      type: 'investment' as const,
      fullDescription: 'A modern residential apartment complex located in prestigious Bahria Town, Lahore. This well-designed community offers guaranteed rental yields with excellent amenities including gym, swimming pool, 24/7 security, and proximity to premium schools and shopping centers. Perfect for investors seeking stable mid-term returns in a thriving residential community.'
    },
    {
      id: '8',
      image: '/images/property2.jpg',
      title: 'Educational Complex',
      category: 'Educational Real Estate',
      location: 'Gulberg, Lahore',
      description: 'Purpose-built educational facility leased to international school. Long-term contract with annual rent escalation and low vacancy risk.',
      returns: '11-14%',
      duration: '7 Years',
      minInvestment: 'PKR 350K',
      type: 'investment' as const,
      fullDescription: 'A purpose-built educational facility in prime Gulberg location leased to a reputable international school. Features long-term lease agreements with annual rent escalation clauses, ensuring predictable income growth. Low vacancy risk due to consistent demand for quality education in this premium neighborhood.'
    },
    {
      id: '9',
      image: '/images/property3.jpg',
      title: 'Retail Shopping Center',
      category: 'Retail Real Estate',
      location: 'Clifton, Karachi',
      description: 'High-traffic retail center in premium location. Multiple anchor tenants with strong foot traffic and excellent appreciation potential.',
      returns: '17-21%',
      duration: '5 Years',
      minInvestment: 'PKR 500K',
      type: 'investment' as const,
      fullDescription: 'A high-traffic retail shopping center located in the premium Clifton area of Karachi. Features multiple anchor tenants generating strong foot traffic and consistent rental income. The prime location ensures excellent appreciation potential as Karachi\'s commercial landscape continues to develop.'
    },
    {
      id: '10',
      image: '/images/property5.jpg',
      title: 'DHA Residential Villas',
      category: 'Residential Real Estate',
      location: 'Defence Housing Authority, Karachi',
      description: 'Luxury villa community in premium DHA location. High appreciation potential with strong rental yields and secure gated community amenities.',
      returns: '15-18%',
      duration: '6 Years',
      minInvestment: 'PKR 450K',
      type: 'investment' as const,
      fullDescription: 'A prestigious luxury villa community in Defence Housing Authority (DHA), Karachi. This gated community offers secure living with premium amenities, strong rental yields, and excellent long-term appreciation potential. Perfect for investors seeking high-quality residential investments in Pakistan\'s most exclusive neighborhood.'
    },
    {
      id: '11',
      image: '/images/property6.jpg',
      title: 'Mixed-Use Development',
      category: 'Commercial & Residential',
      location: 'Sector G-15, Islamabad',
      description: 'Modern mixed-use development combining commercial spaces and residential units. Strategic location near business centers with strong rental demand.',
      returns: '16-19%',
      duration: '4 Years',
      minInvestment: 'PKR 300K',
      type: 'investment' as const,
      fullDescription: 'A modern mixed-use development in Sector G-15, Islamabad combining commercial office spaces with residential units. Strategic location near major business centers ensures strong tenant demand for both commercial and residential components. Diversified revenue streams provide stability and attractive returns.'
    },
    {
      id: '12',
      image: '/images/property7.jpg',
      title: 'IT Park Office Complex',
      category: 'Technology Park',
      location: 'Lahore, Punjab',
      description: 'State-of-the-art IT park with modern office spaces leased to tech companies. High demand from multinational corporations with stable long-term contracts.',
      returns: '13-16%',
      duration: '7 Years',
      minInvestment: 'PKR 250K',
      type: 'investment' as const,
      fullDescription: 'A state-of-the-art IT park in Lahore featuring modern office spaces designed for technology companies. High demand from multinational corporations ensures stable long-term lease agreements. This investment benefits from Pakistan\'s growing IT sector with predictable cash flows and strong growth potential.'
    },
    {
      id: '13',
      image: '/images/property8.jpg',
      title: 'Healthcare Clinic Complex',
      category: 'Medical Real Estate',
      location: 'Gulshan-e-Iqbal, Karachi',
      description: 'Purpose-built healthcare facility leased to established medical practice. Essential services with consistent demand and high occupancy rates.',
      returns: '12-15%',
      duration: '5 Years',
      minInvestment: 'PKR 200K',
      type: 'investment' as const,
      fullDescription: 'A purpose-built healthcare clinic complex in Gulshan-e-Iqbal, Karachi. Leased to established medical practitioners offering essential healthcare services with consistent demand and high occupancy rates. Healthcare real estate provides stable, recession-resistant returns and growing demand in urban areas.'
    },
    {
      id: '14',
      image: '/images/property9.jpg',
      title: 'Farmhouse Community',
      category: 'Agricultural Real Estate',
      location: 'Bedian Road, Lahore',
      description: 'Premium farmhouse community with agricultural land conversion potential. Close to Lahore with excellent future development prospects and appreciation.',
      returns: '14-17%',
      duration: '3 Years',
      minInvestment: 'PKR 180K',
      type: 'investment' as const,
      fullDescription: 'A premium farmhouse community located on Bedian Road near Lahore with significant agricultural land conversion potential. As Lahore expands, this location offers excellent future development prospects and strong appreciation potential. Ideal for investors seeking short to medium-term capital gains.'
    },
    {
      id: '15',
      image: '/images/property10.jpg',
      title: 'Corporate Business Park',
      category: 'Corporate Real Estate',
      location: 'Rawalpindi, Punjab',
      description: 'Modern business park hosting multiple corporate tenants. Strategic location near major cities with growing commercial demand and stable income.',
      returns: '11-13%',
      duration: '6 Years',
      minInvestment: 'PKR 280K',
      type: 'investment' as const,
      fullDescription: 'A modern corporate business park in Rawalpindi hosting multiple established corporate tenants. Strategic location near Islamabad ensures growing commercial demand and stable rental income. Multiple tenant diversification reduces risk while providing attractive long-term returns.'
    },
    {
      id: '16',
      image: '/images/property11.jpg',
      title: 'Student Housing Complex',
      category: 'Residential Investment',
      location: 'University Road, Peshawar',
      description: 'Purpose-built student housing near major universities. High occupancy rates with guaranteed rental income and minimal vacancy risk.',
      returns: '13-16%',
      duration: '4 Years',
      minInvestment: 'PKR 120K',
      type: 'investment' as const,
      fullDescription: 'A purpose-built student housing complex located on University Road in Peshawar near major educational institutions. High occupancy rates due to consistent student demand ensure guaranteed rental income with minimal vacancy risk. Reliable and predictable returns make this an attractive investment.'
    },
    {
      id: '17',
      image: '/images/property12.jpg',
      title: 'Industrial Warehouse',
      category: 'Industrial Real Estate',
      location: 'Port Qasim, Karachi',
      description: 'Strategic industrial warehouse leased to logistics companies. Port proximity ensures consistent demand with long-term corporate leases.',
      returns: '15-18%',
      duration: '5 Years',
      minInvestment: 'PKR 400K',
      type: 'investment' as const,
      fullDescription: 'A strategic industrial warehouse located at Port Qasim in Karachi leased to major logistics companies. Port proximity ensures consistent demand with long-term corporate lease agreements. Critical infrastructure location provides stable returns and strong appreciation potential in Pakistan\'s logistics sector.'
    }
  ];

  const filteredInvestments = investments.filter(investment => {
    const matchesSearch = investment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         investment.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || 
                         (filter === 'short' && investment.duration.includes('2') || investment.duration.includes('3')) ||
                         (filter === 'medium' && investment.duration.includes('4') || investment.duration.includes('5')) ||
                         (filter === 'long' && investment.duration.includes('6') || investment.duration.includes('7'));
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-slate-100 to-gray-100">
      <Navbar />
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-teal-900 text-white py-20 shadow-xl">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg">Investment Opportunities</h1>
          <p className="text-lg text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-md">Secure your financial future with verified real estate investments</p>
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
                placeholder="Search investments by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Filter */}
            <div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Durations</option>
                <option value="short">Short Term (2-3 Years)</option>
                <option value="medium">Medium Term (4-5 Years)</option>
                <option value="long">Long Term (6+ Years)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border border-gray-300 p-6 text-center hover:shadow-xl transition-all">
            <p className="text-3xl font-bold text-teal-600">{investments.length}</p>
            <p className="text-gray-600">Investment Opportunities</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border border-gray-300 p-6 text-center hover:shadow-xl transition-all">
            <p className="text-3xl font-bold text-blue-600">15.8%</p>
            <p className="text-gray-600">Avg. Returns</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border border-gray-300 p-6 text-center hover:shadow-xl transition-all">
            <p className="text-3xl font-bold text-teal-600">PKR 100K</p>
            <p className="text-gray-600">Min. Investment</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border border-gray-300 p-6 text-center hover:shadow-xl transition-all">
            <p className="text-3xl font-bold text-blue-600">5,000+</p>
            <p className="text-gray-600">Active Investors</p>
          </div>
        </div>

        {/* Investment Benefits */}
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Why Invest With Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="font-semibold text-lg mb-2">Blockchain Security</h3>
              <p className="text-gray-600 text-sm">All transactions secured with blockchain technology and smart contracts</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="font-semibold text-lg mb-2">CDA Verified</h3>
              <p className="text-gray-600 text-sm">100% verified properties approved by Capital Development Authority</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="font-semibold text-lg mb-2">High Returns</h3>
              <p className="text-gray-600 text-sm">Competitive returns ranging from 10% to 22% annually</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="font-semibold text-lg mb-2">Low Entry Barrier</h3>
              <p className="text-gray-600 text-sm">Start investing with as low as PKR 75,000</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="font-semibold text-lg mb-2">Professional Management</h3>
              <p className="text-gray-600 text-sm">Expert portfolio managers handle all property operations</p>
            </div>
            <div className="bg-white rounded-lg p-6 shadow-md">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="font-semibold text-lg mb-2">Transparent Reporting</h3>
              <p className="text-gray-600 text-sm">Real-time updates and detailed performance reports</p>
            </div>
          </div>
        </div>

        {/* Investments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredInvestments.map((investment) => (
            <PropertyCard key={investment.id} {...investment} />
          ))}
        </div>

        {/* No Results */}
        {filteredInvestments.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-xl">No investments found matching your criteria.</p>
          </div>
        )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

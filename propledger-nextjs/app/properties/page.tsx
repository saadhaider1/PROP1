'use client';

import { useState } from 'react';
import PropertyCard from '@/components/PropertyCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function PropertiesPage() {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Sample property data - Replace with API call
  const properties = [
    {
      id: '1',
      image: '/images/property1.jpg',
      logo: '/images/logo1.png',
      title: 'Property Share',
      category: 'Real Estate Ownership Made Easy',
      location: 'Arif Habib Dolmen REIT Management Limited',
      description: 'It is an innovative, bite-sized way to invest in high-value real estate. With Dolmen REIT, you can own a share of the most sought-after commercial properties without needing millions upfront.',
      price: 'PKR 25,000,000',
      type: 'property' as const
    },
    {
      id: '2',
      image: '/images/property2.jpg',
      logo: '/images/logo2.png',
      title: 'Serene Heights Hotel & Resort',
      category: 'Hospitality',
      location: 'Nathia Gali, Khyber Pakhtunkhwa',
      description: 'Serene Heights in Nathia Gali is a luxury hotel and resort spanning 2.5 acres with 50 rooms, a spa, restaurant, and conference facilities. Located in a prime tourist destination.',
      price: 'PKR 45,000,000',
      type: 'property' as const
    },
    {
      id: '3',
      image: '/images/property3.jpg',
      title: 'Blue World City',
      category: 'Residential Development',
      location: 'Islamabad Highway, Rawalpindi',
      description: 'A modern residential project offering affordable housing solutions with world-class amenities including parks, shopping centers, and educational institutions.',
      price: 'PKR 15,000,000',
      type: 'property' as const
    },
    {
      id: '4',
      image: '/images/property4.jpg',
      title: 'Capital Smart City',
      category: 'Smart City Development',
      location: 'Islamabad-Lahore Motorway',
      description: 'Pakistan\'s first smart city project featuring eco-friendly infrastructure, smart homes, and sustainable living solutions with modern facilities.',
      price: 'PKR 35,000,000',
      type: 'property' as const
    },
    {
      id: '5',
      image: '/images/property5.jpg',
      title: 'DHA Phase 8',
      category: 'Premium Residential',
      location: 'DHA Lahore',
      description: 'Exclusive residential plots in DHA Phase 8 offering premium lifestyle with state-of-the-art amenities, security, and infrastructure.',
      price: 'PKR 55,000,000',
      type: 'property' as const
    },
    {
      id: '6',
      image: '/images/property6.jpg',
      title: 'Bahria Town Karachi',
      category: 'Gated Community',
      location: 'Karachi',
      description: 'Luxurious gated community offering residential and commercial properties with world-class amenities including golf courses, theme parks, and shopping malls.',
      price: 'PKR 28,000,000',
      type: 'property' as const
    },
    {
      id: '7',
      image: '/images/beachfront.jpg',
      icon: '🏖️',
      title: 'Beachfront Cottage',
      category: 'Vacation Rental Investment',
      location: 'Coastal Area, Karachi',
      description: 'Charming 2-bedroom cottage with ocean views. Perfect vacation rental investment opportunity.',
      price: 'PKR 675,000',
      type: 'property' as const
    },
    {
      id: '8',
      image: '/images/victorian.jpg',
      icon: '🏛️',
      title: 'Historic Victorian Home',
      category: 'Heritage Property',
      location: 'Civil Lines, Karachi',
      description: 'Restored Victorian mansion with original features. Unique investment with heritage value.',
      price: 'PKR 1,250,000',
      type: 'property' as const
    },
    {
      id: '9',
      image: '/images/smarthome.jpg',
      icon: '🏡',
      title: 'Smart Home - Tech District',
      category: 'Modern Smart Home',
      location: 'IT Park, Islamabad',
      description: 'Ultra-modern smart home with automated systems. Perfect for tech-savvy tenants.',
      price: 'PKR 925,000',
      type: 'property' as const
    }
  ];

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || property.category.toLowerCase().includes(filter.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-slate-100 to-gray-100">
      <Navbar />
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-900 to-teal-900 text-white py-20 shadow-xl">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-2xl">Explore Properties</h1>
          <p className="text-lg text-white/90 max-w-3xl mx-auto leading-relaxed drop-shadow-md">Discover premium real estate investment opportunities</p>
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
                placeholder="Search properties by name or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filter */}
            <div>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
                <option value="hospitality">Hospitality</option>
                <option value="development">Development</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border border-gray-300 p-6 text-center hover:shadow-xl transition-all">
            <p className="text-3xl font-bold text-teal-600">{properties.length}</p>
            <p className="text-gray-600">Total Properties</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border border-gray-300 p-6 text-center hover:shadow-xl transition-all">
            <p className="text-3xl font-bold text-blue-600">PKR 2.5B+</p>
            <p className="text-gray-600">Total Value</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border border-gray-300 p-6 text-center hover:shadow-xl transition-all">
            <p className="text-3xl font-bold text-teal-600">15+</p>
            <p className="text-gray-600">Locations</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg border border-gray-300 p-6 text-center hover:shadow-xl transition-all">
            <p className="text-3xl font-bold text-blue-600">100%</p>
            <p className="text-gray-600">CDA Approved</p>
          </div>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} {...property} />
          ))}
        </div>

        {/* No Results */}
        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-xl">No properties found matching your criteria.</p>
          </div>
        )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

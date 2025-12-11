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
    
    // Sample investment data - Replace with API call
    const investments: { [key: string]: Investment } = {
      '1': {
        id: '1',
        image: '/images/manhattan-office.jpg',
        icon: '🏢',
        title: 'Manhattan Office Tower',
        category: 'Commercial Real Estate',
        location: 'Manhattan Financial District',
        description: 'Prime commercial real estate in Manhattan\'s financial district. Fully leased with AAA-rated tenants.',
        fullDescription: 'This premium office tower in Manhattan\'s financial district represents a blue-chip commercial real estate investment. The property is 100% leased to AAA-rated financial institutions and tech companies with long-term contracts. Located in the heart of the financial district, this investment offers stable cash flows and strong appreciation potential.',
        returns: '14%',
        duration: '5 years',
        minInvestment: 'PKR 150,000',
        minInvestmentNumeric: 150000,
        maxInvestment: 'PKR 10,000,000',
        totalSize: 'PKR 2,500,000,000',
        availableUnits: 15000,
        totalUnits: 16667,
        riskLevel: 'Low' as const,
        paymentSchedule: 'Quarterly',
        features: [
          'AAA-Rated Tenants',
          'Prime Financial District Location',
          '100% Occupancy Rate',
          'Long-Term Lease Contracts',
          'Professional Property Management',
          'Strong Appreciation History'
        ],
        financials: [
          { label: 'Expected Annual Return', value: '14%' },
          { label: 'Rental Yield', value: '9%' },
          { label: 'Capital Appreciation', value: '5%' },
          { label: 'Management Fee', value: '1.5%' },
          { label: 'Lock-in Period', value: '2 Years' },
          { label: 'Exit Options', value: 'After Year 2' }
        ],
        documents: [
          { name: 'Investment Prospectus', url: '#' },
          { name: 'Lease Agreements', url: '#' },
          { name: 'Tenant Credit Reports', url: '#' },
          { name: 'Property Valuation', url: '#' },
          { name: 'Terms & Conditions', url: '#' }
        ]
      },
      '2': {
        id: '2',
        image: '/images/miami-beach.jpg',
        icon: '🏖️',
        title: 'Miami Beach Resort',
        category: 'Hospitality Investment',
        location: 'Miami Beach, Florida',
        description: 'Luxury beachfront resort with high occupancy rates and growing tourism market in Miami Beach.',
        fullDescription: 'Invest in this luxury beachfront resort in Miami Beach, one of the world\'s premier tourist destinations. The property features 200 rooms, multiple restaurants, spa facilities, and direct beach access. With Miami\'s booming tourism industry and year-round warm weather, this investment offers exceptional returns through both room revenue and property appreciation.',
        returns: '20%',
        duration: '3 years',
        minInvestment: 'PKR 125,000',
        minInvestmentNumeric: 125000,
        maxInvestment: 'PKR 8,000,000',
        totalSize: 'PKR 1,800,000,000',
        availableUnits: 13500,
        totalUnits: 14400,
        riskLevel: 'Medium' as const,
        paymentSchedule: 'Monthly',
        features: [
          '200 Luxury Rooms',
          'Beachfront Location',
          'Multiple Revenue Streams',
          'Year-Round Tourism',
          'Spa & Restaurant Facilities',
          'High Occupancy Rates (85%+)'
        ],
        financials: [
          { label: 'Expected Annual Return', value: '20%' },
          { label: 'Occupancy Rate', value: '85%' },
          { label: 'Average Daily Rate', value: '$350' },
          { label: 'Management Fee', value: '2.5%' },
          { label: 'Lock-in Period', value: '1 Year' },
          { label: 'Profit Distribution', value: 'Monthly' }
        ],
        documents: [
          { name: 'Resort Performance Report', url: '#' },
          { name: 'Market Analysis', url: '#' },
          { name: 'Revenue Projections', url: '#' },
          { name: 'Management Agreement', url: '#' },
          { name: 'Legal Documents', url: '#' }
        ]
      },
      '3': {
        id: '3',
        image: '/images/tech-warehouse.jpg',
        icon: '🏭',
        title: 'Tech Hub Warehouse',
        category: 'Industrial Real Estate',
        location: 'Silicon Valley, California',
        description: 'Modern warehouse facility leased to major tech companies for data centers and logistics operations.',
        fullDescription: 'This state-of-the-art warehouse facility in Silicon Valley serves major tech companies for data center operations and logistics. The property features advanced infrastructure, redundant power systems, and high-security measures. With long-term leases to Fortune 500 tech companies and the growing demand for data center space, this investment offers stable returns with strong growth potential.',
        returns: '17%',
        duration: '7 years',
        minInvestment: 'PKR 135,000',
        minInvestmentNumeric: 135000,
        maxInvestment: 'PKR 12,000,000',
        totalSize: 'PKR 3,200,000,000',
        availableUnits: 22500,
        totalUnits: 23704,
        riskLevel: 'Low' as const,
        paymentSchedule: 'Quarterly',
        features: [
          'Fortune 500 Tech Tenants',
          'Data Center Infrastructure',
          'Long-Term Lease Agreements',
          'Redundant Power Systems',
          'High-Security Facility',
          'Strategic Silicon Valley Location'
        ],
        financials: [
          { label: 'Expected Annual Return', value: '17%' },
          { label: 'Rental Yield', value: '11%' },
          { label: 'Capital Appreciation', value: '6%' },
          { label: 'Management Fee', value: '1.8%' },
          { label: 'Lock-in Period', value: '3 Years' },
          { label: 'Exit Options', value: 'After Year 3' }
        ],
        documents: [
          { name: 'Facility Specifications', url: '#' },
          { name: 'Tenant Lease Agreements', url: '#' },
          { name: 'Infrastructure Report', url: '#' },
          { name: 'Market Analysis', url: '#' },
          { name: 'Investment Terms', url: '#' }
        ]
      },
      '4': {
        id: '4',
        image: '/images/property1.jpg',
        icon: '🏢',
        title: 'Property Share',
        category: 'Real Estate Ownership Made Easy',
        location: 'Arif Habib Dolmen REIT Management Limited',
        description: 'Innovative, bite-sized way to invest in high-value real estate.',
        fullDescription: 'Property Share offers a unique investment opportunity in premium commercial real estate through Dolmen REIT. This investment vehicle provides exposure to a diversified portfolio of high-quality commercial properties across major cities in Pakistan. With professional management and transparent reporting, investors can earn stable returns through rental income and property appreciation.',
        returns: '12-15%',
        duration: '3 Years',
        minInvestment: 'PKR 100,000',
        minInvestmentNumeric: 100000,
        maxInvestment: 'PKR 5,000,000',
        totalSize: 'PKR 500,000,000',
        availableUnits: 3250,
        totalUnits: 5000,
        riskLevel: 'Low' as const,
        paymentSchedule: 'Quarterly',
        features: [
          'Diversified Commercial Portfolio',
          'Professional REIT Management',
          'Quarterly Dividend Payments',
          'Capital Appreciation Potential',
          'Liquidity After Lock-in Period',
          'Tax-Efficient Structure'
        ],
        financials: [
          { label: 'Expected Annual Return', value: '12-15%' },
          { label: 'Rental Yield', value: '8-10%' },
          { label: 'Capital Appreciation', value: '4-5%' },
          { label: 'Management Fee', value: '1.5%' },
          { label: 'Lock-in Period', value: '1 Year' },
          { label: 'Exit Options', value: 'After Year 1' }
        ],
        documents: [
          { name: 'Investment Prospectus', url: '#' },
          { name: 'REIT Structure Document', url: '#' },
          { name: 'Portfolio Details', url: '#' },
          { name: 'Risk Disclosure', url: '#' },
          { name: 'Terms & Conditions', url: '#' }
        ]
      },
      '5': {
        id: '5',
        image: '/images/property2.jpg',
        icon: '🏨',
        title: 'Serene Heights Hotel & Resort',
        category: 'Hospitality',
        location: 'Nathia Gali, Khyber Pakhtunkhwa',
        description: 'Luxury hotel and resort investment opportunity.',
        fullDescription: 'Serene Heights Hotel & Resort represents a premium hospitality investment in one of Pakistan\'s most sought-after tourist destinations. This 50-room luxury property generates consistent revenue from both leisure and business travelers year-round. With professional hotel management and a proven track record, this investment offers attractive returns with moderate risk.',
        returns: '18-22%',
        duration: '5 Years',
        minInvestment: 'PKR 150,000',
        minInvestmentNumeric: 150000,
        maxInvestment: 'PKR 10,000,000',
        totalSize: 'PKR 800,000,000',
        availableUnits: 4200,
        totalUnits: 5333,
        riskLevel: 'Medium' as const,
        paymentSchedule: 'Monthly',
        features: [
          '50 Luxury Rooms',
          'Year-Round Operations',
          'Experienced Management Team',
          'Multiple Revenue Streams',
          'Prime Tourist Location',
          'Strong Booking History'
        ],
        financials: [
          { label: 'Expected Annual Return', value: '18-22%' },
          { label: 'Occupancy Rate', value: '75-85%' },
          { label: 'Average Daily Rate', value: 'PKR 15,000' },
          { label: 'Management Fee', value: '2%' },
          { label: 'Lock-in Period', value: '2 Years' },
          { label: 'Profit Distribution', value: 'Monthly' }
        ],
        documents: [
          { name: 'Investment Memorandum', url: '#' },
          { name: 'Hotel Performance Report', url: '#' },
          { name: 'Revenue Projections', url: '#' },
          { name: 'Management Agreement', url: '#' },
          { name: 'Legal Documents', url: '#' }
        ]
      },
      '6': {
        id: '6',
        image: '/images/property3.jpg',
        title: 'Commercial Plaza Investment',
        category: 'Commercial Real Estate',
        location: 'Blue Area, Islamabad',
        description: 'Prime commercial plaza in Islamabad\'s business district.',
        fullDescription: 'A premier commercial plaza strategically located in Islamabad\'s Blue Area business district. This investment property features modern infrastructure with guaranteed long-term corporate tenants including multinational companies. The location ensures consistent rental income and strong appreciation potential in one of Pakistan\'s fastest-growing business hubs.',
        returns: '14-16%',
        duration: '4 Years',
        minInvestment: 'PKR 200,000',
        minInvestmentNumeric: 200000,
        maxInvestment: 'PKR 8,000,000',
        totalSize: 'PKR 600,000,000',
        availableUnits: 2800,
        totalUnits: 3000,
        riskLevel: 'Low' as const,
        paymentSchedule: 'Quarterly',
        features: [
          'Prime Blue Area Location',
          'Corporate Tenant Base',
          'Long-Term Leases',
          'Modern Infrastructure',
          'Steady Appreciation',
          'High Occupancy Rates'
        ],
        financials: [
          { label: 'Expected Annual Return', value: '14-16%' },
          { label: 'Rental Yield', value: '10-11%' },
          { label: 'Capital Appreciation', value: '4-5%' },
          { label: 'Management Fee', value: '1.5%' },
          { label: 'Lock-in Period', value: '18 Months' },
          { label: 'Profit Distribution', value: 'Quarterly' }
        ],
        documents: [
          { name: 'Property Valuation Report', url: '#' },
          { name: 'Lease Agreements', url: '#' },
          { name: 'Market Analysis', url: '#' },
          { name: 'Investment Terms', url: '#' },
          { name: 'Compliance Documents', url: '#' }
        ]
      },
      '7': {
        id: '7',
        image: '/images/property4.jpg',
        title: 'Residential Apartment Complex',
        category: 'Residential Development',
        location: 'Bahria Town, Lahore',
        description: 'Modern apartment complex with guaranteed rental yields.',
        fullDescription: 'A modern residential apartment complex located in prestigious Bahria Town, Lahore. This well-designed community offers guaranteed rental yields with excellent amenities including gym, swimming pool, 24/7 security, and proximity to premium schools and shopping centers. Perfect for investors seeking stable mid-term returns in a thriving residential community.',
        returns: '10-12%',
        duration: '2 Years',
        minInvestment: 'PKR 75,000',
        minInvestmentNumeric: 75000,
        maxInvestment: 'PKR 3,000,000',
        totalSize: 'PKR 400,000,000',
        availableUnits: 2100,
        totalUnits: 2667,
        riskLevel: 'Low' as const,
        paymentSchedule: 'Monthly',
        features: [
          'Gated Community',
          'Modern Amenities',
          'Prime Location',
          'Guaranteed Rental Yield',
          '24/7 Security',
          'High Appreciation Potential'
        ],
        financials: [
          { label: 'Expected Annual Return', value: '10-12%' },
          { label: 'Rental Yield', value: '8-9%' },
          { label: 'Capital Appreciation', value: '2-3%' },
          { label: 'Management Fee', value: '1.2%' },
          { label: 'Lock-in Period', value: '6 Months' },
          { label: 'Profit Distribution', value: 'Monthly' }
        ],
        documents: [
          { name: 'Development Prospectus', url: '#' },
          { name: 'Rental Guarantee Agreement', url: '#' },
          { name: 'Architectural Plans', url: '#' },
          { name: 'Investment Terms', url: '#' },
          { name: 'Safety Certifications', url: '#' }
        ]
      },
      '8': {
        id: '8',
        image: '/images/property2.jpg',
        title: 'Educational Complex',
        category: 'Educational Real Estate',
        location: 'Gulberg, Lahore',
        description: 'Purpose-built educational facility with long-term leases.',
        fullDescription: 'A purpose-built educational facility in prime Gulberg location leased to a reputable international school. Features long-term lease agreements with annual rent escalation clauses, ensuring predictable income growth. Low vacancy risk due to consistent demand for quality education in this premium neighborhood.',
        returns: '11-14%',
        duration: '7 Years',
        minInvestment: 'PKR 350,000',
        minInvestmentNumeric: 350000,
        maxInvestment: 'PKR 12,000,000',
        totalSize: 'PKR 1,200,000,000',
        availableUnits: 5400,
        totalUnits: 6000,
        riskLevel: 'Low' as const,
        paymentSchedule: 'Quarterly',
        features: [
          'Long-Term School Lease',
          'Annual Rent Escalation',
          'Low Vacancy Risk',
          'Premium Location',
          'Stable Revenue Stream',
          'Educational Growth Sector'
        ],
        financials: [
          { label: 'Expected Annual Return', value: '11-14%' },
          { label: 'Rental Yield', value: '9-10%' },
          { label: 'Capital Appreciation', value: '2-4%' },
          { label: 'Management Fee', value: '1.3%' },
          { label: 'Lock-in Period', value: '2 Years' },
          { label: 'Profit Distribution', value: 'Quarterly' }
        ],
        documents: [
          { name: 'School Lease Agreement', url: '#' },
          { name: 'Facility Specifications', url: '#' },
          { name: 'Financial Projections', url: '#' },
          { name: 'Risk Assessment', url: '#' },
          { name: 'Terms & Conditions', url: '#' }
        ]
      },
      '9': {
        id: '9',
        image: '/images/property3.jpg',
        title: 'Retail Shopping Center',
        category: 'Retail Real Estate',
        location: 'Clifton, Karachi',
        description: 'High-traffic retail center in premium location.',
        fullDescription: 'A high-traffic retail shopping center located in the premium Clifton area of Karachi. Features multiple anchor tenants generating strong foot traffic and consistent rental income. The prime location ensures excellent appreciation potential as Karachi\'s commercial landscape continues to develop.',
        returns: '17-21%',
        duration: '5 Years',
        minInvestment: 'PKR 500,000',
        minInvestmentNumeric: 500000,
        maxInvestment: 'PKR 15,000,000',
        totalSize: 'PKR 1,800,000,000',
        availableUnits: 3600,
        totalUnits: 3600,
        riskLevel: 'Medium' as const,
        paymentSchedule: 'Monthly',
        features: [
          'High-Traffic Location',
          'Multiple Anchor Tenants',
          'Premium Area',
          'Strong Rental Demand',
          'Excellent ROI',
          'Future Appreciation'
        ],
        financials: [
          { label: 'Expected Annual Return', value: '17-21%' },
          { label: 'Rental Yield', value: '12-14%' },
          { label: 'Capital Appreciation', value: '5-7%' },
          { label: 'Management Fee', value: '2%' },
          { label: 'Lock-in Period', value: '18 Months' },
          { label: 'Profit Distribution', value: 'Monthly' }
        ],
        documents: [
          { name: 'Retail Market Analysis', url: '#' },
          { name: 'Tenant Agreements', url: '#' },
          { name: 'Revenue Projections', url: '#' },
          { name: 'Property Valuation', url: '#' },
          { name: 'Investment Prospectus', url: '#' }
        ]
      },
      '10': {
        id: '10',
        image: '/images/property5.jpg',
        title: 'DHA Residential Villas',
        category: 'Residential Real Estate',
        location: 'Defence Housing Authority, Karachi',
        description: 'Luxury villa community with premium amenities.',
        fullDescription: 'A prestigious luxury villa community in Defence Housing Authority (DHA), Karachi. This gated community offers secure living with premium amenities, strong rental yields, and excellent long-term appreciation potential. Perfect for investors seeking high-quality residential investments in Pakistan\'s most exclusive neighborhood.',
        returns: '15-18%',
        duration: '6 Years',
        minInvestment: 'PKR 450,000',
        minInvestmentNumeric: 450000,
        maxInvestment: 'PKR 14,000,000',
        totalSize: 'PKR 1,500,000,000',
        availableUnits: 3150,
        totalUnits: 3333,
        riskLevel: 'Low' as const,
        paymentSchedule: 'Quarterly',
        features: [
          'Gated Community Security',
          'Premium DHA Location',
          'Luxury Amenities',
          'Strong Rental Demand',
          'High Appreciation',
          'Exclusive Neighborhood'
        ],
        financials: [
          { label: 'Expected Annual Return', value: '15-18%' },
          { label: 'Rental Yield', value: '10-12%' },
          { label: 'Capital Appreciation', value: '5-6%' },
          { label: 'Management Fee', value: '1.8%' },
          { label: 'Lock-in Period', value: '2 Years' },
          { label: 'Profit Distribution', value: 'Quarterly' }
        ],
        documents: [
          { name: 'DHA Plot Verification', url: '#' },
          { name: 'Rental Agreement Templates', url: '#' },
          { name: 'Community Benefits', url: '#' },
          { name: 'Investment Terms', url: '#' },
          { name: 'Legal Compliance', url: '#' }
        ]
      },
      '11': {
        id: '11',
        image: '/images/property6.jpg',
        title: 'Mixed-Use Development',
        category: 'Commercial & Residential',
        location: 'Sector G-15, Islamabad',
        description: 'Modern mixed-use development with commercial and residential units.',
        fullDescription: 'A modern mixed-use development in Sector G-15, Islamabad combining commercial office spaces with residential units. Strategic location near major business centers ensures strong tenant demand for both commercial and residential components. Diversified revenue streams provide stability and attractive returns.',
        returns: '16-19%',
        duration: '4 Years',
        minInvestment: 'PKR 300,000',
        minInvestmentNumeric: 300000,
        maxInvestment: 'PKR 10,000,000',
        totalSize: 'PKR 1,000,000,000',
        availableUnits: 4000,
        totalUnits: 4000,
        riskLevel: 'Medium' as const,
        paymentSchedule: 'Monthly',
        features: [
          'Mixed-Use Development',
          'Dual Revenue Streams',
          'Strategic Location',
          'Strong Tenant Demand',
          'Diversified Investment',
          'Professional Management'
        ],
        financials: [
          { label: 'Expected Annual Return', value: '16-19%' },
          { label: 'Commercial Yield', value: '10-11%' },
          { label: 'Residential Yield', value: '6-8%' },
          { label: 'Management Fee', value: '1.7%' },
          { label: 'Lock-in Period', value: '18 Months' },
          { label: 'Profit Distribution', value: 'Monthly' }
        ],
        documents: [
          { name: 'Development Plan', url: '#' },
          { name: 'Lease Agreements', url: '#' },
          { name: 'Market Analysis', url: '#' },
          { name: 'Financial Projections', url: '#' },
          { name: 'Compliance Certificates', url: '#' }
        ]
      },
      '12': {
        id: '12',
        image: '/images/property7.jpg',
        title: 'IT Park Office Complex',
        category: 'Technology Park',
        location: 'Lahore, Punjab',
        description: 'State-of-the-art IT park with modern office spaces.',
        fullDescription: 'A state-of-the-art IT park in Lahore featuring modern office spaces designed for technology companies. High demand from multinational corporations ensures stable long-term lease agreements. This investment benefits from Pakistan\'s growing IT sector with predictable cash flows and strong growth potential.',
        returns: '13-16%',
        duration: '7 Years',
        minInvestment: 'PKR 250,000',
        minInvestmentNumeric: 250000,
        maxInvestment: 'PKR 9,000,000',
        totalSize: 'PKR 900,000,000',
        availableUnits: 3600,
        totalUnits: 3600,
        riskLevel: 'Low' as const,
        paymentSchedule: 'Quarterly',
        features: [
          'IT Sector Growth',
          'Multinational Tenants',
          'Modern Infrastructure',
          'Long-Term Leases',
          'Stable Income',
          'Tech Hub Location'
        ],
        financials: [
          { label: 'Expected Annual Return', value: '13-16%' },
          { label: 'Rental Yield', value: '9-10%' },
          { label: 'Capital Appreciation', value: '4-6%' },
          { label: 'Management Fee', value: '1.5%' },
          { label: 'Lock-in Period', value: '2 Years' },
          { label: 'Profit Distribution', value: 'Quarterly' }
        ],
        documents: [
          { name: 'IT Park Specifications', url: '#' },
          { name: 'Tenant Agreements', url: '#' },
          { name: 'Infrastructure Details', url: '#' },
          { name: 'Investment Terms', url: '#' },
          { name: 'Technology Certifications', url: '#' }
        ]
      },
      '13': {
        id: '13',
        image: '/images/property8.jpg',
        title: 'Healthcare Clinic Complex',
        category: 'Medical Real Estate',
        location: 'Gulshan-e-Iqbal, Karachi',
        description: 'Purpose-built healthcare facility with established tenants.',
        fullDescription: 'A purpose-built healthcare clinic complex in Gulshan-e-Iqbal, Karachi. Leased to established medical practitioners offering essential healthcare services with consistent demand and high occupancy rates. Healthcare real estate provides stable, recession-resistant returns and growing demand in urban areas.',
        returns: '12-15%',
        duration: '5 Years',
        minInvestment: 'PKR 200,000',
        minInvestmentNumeric: 200000,
        maxInvestment: 'PKR 7,000,000',
        totalSize: 'PKR 700,000,000',
        availableUnits: 2800,
        totalUnits: 3500,
        riskLevel: 'Low' as const,
        paymentSchedule: 'Quarterly',
        features: [
          'Essential Services',
          'High Occupancy',
          'Recession-Resistant',
          'Growing Demand',
          'Healthcare Focus',
          'Stable Revenue'
        ],
        financials: [
          { label: 'Expected Annual Return', value: '12-15%' },
          { label: 'Rental Yield', value: '8-10%' },
          { label: 'Capital Appreciation', value: '4-5%' },
          { label: 'Management Fee', value: '1.4%' },
          { label: 'Lock-in Period', value: '18 Months' },
          { label: 'Profit Distribution', value: 'Quarterly' }
        ],
        documents: [
          { name: 'Healthcare Regulations', url: '#' },
          { name: 'Clinic Lease Agreement', url: '#' },
          { name: 'Medical Facility Standards', url: '#' },
          { name: 'Investment Terms', url: '#' },
          { name: 'Health Certifications', url: '#' }
        ]
      },
      '14': {
        id: '14',
        image: '/images/property9.jpg',
        title: 'Farmhouse Community',
        category: 'Agricultural Real Estate',
        location: 'Bedian Road, Lahore',
        description: 'Premium farmhouse community with conversion potential.',
        fullDescription: 'A premium farmhouse community located on Bedian Road near Lahore with significant agricultural land conversion potential. As Lahore expands, this location offers excellent future development prospects and strong appreciation potential. Ideal for investors seeking short to medium-term capital gains.',
        returns: '14-17%',
        duration: '3 Years',
        minInvestment: 'PKR 180,000',
        minInvestmentNumeric: 180000,
        maxInvestment: 'PKR 6,000,000',
        totalSize: 'PKR 600,000,000',
        availableUnits: 2000,
        totalUnits: 2000,
        riskLevel: 'Medium' as const,
        paymentSchedule: 'Quarterly',
        features: [
          'Land Conversion Potential',
          'Expansion Location',
          'Short-Term Gains',
          'Strategic Position',
          'Agricultural Asset',
          'Development Upside'
        ],
        financials: [
          { label: 'Expected Annual Return', value: '14-17%' },
          { label: 'Rental Yield', value: '6-7%' },
          { label: 'Capital Appreciation', value: '8-10%' },
          { label: 'Management Fee', value: '1.2%' },
          { label: 'Lock-in Period', value: '1 Year' },
          { label: 'Profit Distribution', value: 'Quarterly' }
        ],
        documents: [
          { name: 'Land Survey Reports', url: '#' },
          { name: 'Agricultural Valuation', url: '#' },
          { name: 'Development Potential', url: '#' },
          { name: 'Investment Terms', url: '#' },
          { name: 'Location Analysis', url: '#' }
        ]
      },
      '15': {
        id: '15',
        image: '/images/property10.jpg',
        title: 'Corporate Business Park',
        category: 'Corporate Real Estate',
        location: 'Rawalpindi, Punjab',
        description: 'Modern business park hosting multiple corporate tenants.',
        fullDescription: 'A modern corporate business park in Rawalpindi hosting multiple established corporate tenants. Strategic location near Islamabad ensures growing commercial demand and stable rental income. Multiple tenant diversification reduces risk while providing attractive long-term returns.',
        returns: '11-13%',
        duration: '6 Years',
        minInvestment: 'PKR 280,000',
        minInvestmentNumeric: 280000,
        maxInvestment: 'PKR 9,000,000',
        totalSize: 'PKR 850,000,000',
        availableUnits: 3400,
        totalUnits: 3400,
        riskLevel: 'Low' as const,
        paymentSchedule: 'Quarterly',
        features: [
          'Multiple Tenants',
          'Diversified Risk',
          'Corporate Tenants',
          'Growing Demand',
          'Strategic Location',
          'Stable Returns'
        ],
        financials: [
          { label: 'Expected Annual Return', value: '11-13%' },
          { label: 'Rental Yield', value: '8-9%' },
          { label: 'Capital Appreciation', value: '3-4%' },
          { label: 'Management Fee', value: '1.4%' },
          { label: 'Lock-in Period', value: '2 Years' },
          { label: 'Profit Distribution', value: 'Quarterly' }
        ],
        documents: [
          { name: 'Business Park Specifications', url: '#' },
          { name: 'Tenant Contracts', url: '#' },
          { name: 'Market Analysis', url: '#' },
          { name: 'Investment Details', url: '#' },
          { name: 'Management Agreement', url: '#' }
        ]
      },
      '16': {
        id: '16',
        image: '/images/property11.jpg',
        title: 'Student Housing Complex',
        category: 'Residential Investment',
        location: 'University Road, Peshawar',
        description: 'Purpose-built student housing near major universities.',
        fullDescription: 'A purpose-built student housing complex located on University Road in Peshawar near major educational institutions. High occupancy rates due to consistent student demand ensure guaranteed rental income with minimal vacancy risk. Reliable and predictable returns make this an attractive investment.',
        returns: '13-16%',
        duration: '4 Years',
        minInvestment: 'PKR 120,000',
        minInvestmentNumeric: 120000,
        maxInvestment: 'PKR 5,000,000',
        totalSize: 'PKR 400,000,000',
        availableUnits: 1600,
        totalUnits: 2000,
        riskLevel: 'Low' as const,
        paymentSchedule: 'Monthly',
        features: [
          'Student Demand',
          'High Occupancy',
          'Minimal Vacancy',
          'Reliable Returns',
          'Education Hub',
          'Guaranteed Income'
        ],
        financials: [
          { label: 'Expected Annual Return', value: '13-16%' },
          { label: 'Rental Yield', value: '10-11%' },
          { label: 'Capital Appreciation', value: '3-5%' },
          { label: 'Management Fee', value: '1.3%' },
          { label: 'Lock-in Period', value: '1 Year' },
          { label: 'Profit Distribution', value: 'Monthly' }
        ],
        documents: [
          { name: 'Occupancy Guarantee', url: '#' },
          { name: 'University Agreements', url: '#' },
          { name: 'Facility Specifications', url: '#' },
          { name: 'Investment Terms', url: '#' },
          { name: 'Safety Standards', url: '#' }
        ]
      },
      '17': {
        id: '17',
        image: '/images/property12.jpg',
        title: 'Industrial Warehouse',
        category: 'Industrial Real Estate',
        location: 'Port Qasim, Karachi',
        description: 'Strategic industrial warehouse leased to logistics companies.',
        fullDescription: 'A strategic industrial warehouse located at Port Qasim in Karachi leased to major logistics companies. Port proximity ensures consistent demand with long-term corporate lease agreements. Critical infrastructure location provides stable returns and strong appreciation potential in Pakistan\'s logistics sector.',
        returns: '15-18%',
        duration: '5 Years',
        minInvestment: 'PKR 400,000',
        minInvestmentNumeric: 400000,
        maxInvestment: 'PKR 12,000,000',
        totalSize: 'PKR 1,100,000,000',
        availableUnits: 4400,
        totalUnits: 5500,
        riskLevel: 'Low' as const,
        paymentSchedule: 'Quarterly',
        features: [
          'Port Proximity',
          'Logistics Hub',
          'Industrial Focus',
          'Long-Term Leases',
          'High Demand',
          'Infrastructure Critical'
        ],
        financials: [
          { label: 'Expected Annual Return', value: '15-18%' },
          { label: 'Rental Yield', value: '11-12%' },
          { label: 'Capital Appreciation', value: '4-6%' },
          { label: 'Management Fee', value: '1.6%' },
          { label: 'Lock-in Period', value: '18 Months' },
          { label: 'Profit Distribution', value: 'Quarterly' }
        ],
        documents: [
          { name: 'Warehouse Specifications', url: '#' },
          { name: 'Logistics Agreements', url: '#' },
          { name: 'Port Benefits Analysis', url: '#' },
          { name: 'Investment Prospectus', url: '#' },
          { name: 'Infrastructure Report', url: '#' }
        ]
      }
    };

    const investmentData = investments[params.id as string];
    console.log('Loading investment ID:', params.id);
    console.log('Investment data:', investmentData);
    if (investmentData) {
      setInvestment(investmentData);
    } else {
      console.error('Investment not found for ID:', params.id);
    }
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
                  <p className={`text-2xl font-bold ${
                    investment.riskLevel === 'Low' ? 'text-green-600' :
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
                    className={`px-6 py-4 font-semibold ${
                      activeTab === 'overview'
                        ? 'text-purple-600 border-b-2 border-purple-600'
                        : 'text-gray-600 hover:text-purple-600'
                    }`}
                  >
                    Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('financials')}
                    className={`px-6 py-4 font-semibold ${
                      activeTab === 'financials'
                        ? 'text-purple-600 border-b-2 border-purple-600'
                        : 'text-gray-600 hover:text-purple-600'
                    }`}
                  >
                    Financials
                  </button>
                  <button
                    onClick={() => setActiveTab('documents')}
                    className={`px-6 py-4 font-semibold ${
                      activeTab === 'documents'
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
                    <div className="space-y-3">
                      {investment.documents.map((doc, index) => (
                        <a
                          key={index}
                          href={doc.url}
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
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      selectedOption === 'full'
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900">Full Investment</span>
                      <span className={`w-5 h-5 rounded-full border-2 ${
                        selectedOption === 'full'
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
                    className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                      selectedOption === 'partial'
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900">Partial Investment</span>
                      <span className={`w-5 h-5 rounded-full border-2 ${
                        selectedOption === 'partial'
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

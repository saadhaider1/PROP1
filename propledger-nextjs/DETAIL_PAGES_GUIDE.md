# Property Detail Pages Implementation Guide

## Overview

This guide covers the implementation of detail pages for Properties, Crowdfunding campaigns, and Investment opportunities. Each detail page provides comprehensive information and investment options including **full ownership** and **fractional/partial ownership**.

## Files Created

### 1. Property Detail Page
**Location**: `app/properties/[id]/page.tsx`  
**Route**: `/properties/[id]`  
**Example**: `/properties/1`, `/properties/2`

### 2. Crowdfunding Detail Page
**Location**: `app/crowdfunding/[id]/page.tsx`  
**Route**: `/crowdfunding/[id]`  
**Example**: `/crowdfunding/1`, `/crowdfunding/2`

### 3. Investment Detail Page
**Location**: `app/investments/[id]/page.tsx`  
**Route**: `/investments/[id]`  
**Example**: `/investments/1`, `/investments/2`

## Design Features

### Layout Structure

All detail pages follow a consistent layout:

```
┌─────────────────────────────────────────┐
│         Hero Image with Overlay         │
│  ┌────┐                                 │
│  │Icon│  Title                          │
│  └────┘  Category & Location            │
└─────────────────────────────────────────┘
┌──────────────────────┬──────────────────┐
│                      │                  │
│   Main Content       │   Sidebar Card   │
│   (2/3 width)        │   (1/3 width)    │
│                      │                  │
│   - Tabs             │   - Investment   │
│   - Overview         │     Options      │
│   - Details/Updates  │   - Amount Input │
│   - Documents        │   - Buy Button   │
│                      │                  │
└──────────────────────┴──────────────────┘
```

### Common Elements

#### Hero Section
- Full-width property image (384px height)
- Dark overlay with gradient
- Large icon (emoji) in white box
- Title, category, and location
- Back navigation link

#### Tabbed Content
Three tabs for organized information:
1. **Overview** - Description, features, amenities
2. **Details/Updates/Financials** - Specific information per type
3. **Documents** - Downloadable files

#### Sticky Sidebar
Investment card that stays visible while scrolling:
- Investment options (Full/Fractional)
- Amount input field
- Call-to-action button
- Trust indicators

## Property Detail Page Features

### Ownership Options

#### Full Ownership
```typescript
{
  type: 'Full Ownership',
  description: 'Own 100% of the property',
  price: 'PKR 25,000,000',
  button: 'Buy Now'
}
```

#### Fractional Ownership
```typescript
{
  type: 'Fractional Ownership',
  description: 'Own a share of the property',
  minInvestment: 'PKR 100,000',
  button: 'Invest Now'
}
```

### Tabs

1. **Overview Tab**
   - Full description
   - Key features (with checkmarks)
   - Amenities list

2. **Details Tab**
   - Price
   - Tokens
   - Expected ROI
   - Location
   - Category
   - Status

3. **Documents Tab**
   - Property Title Deed
   - CDA Approval Certificate
   - Valuation Report
   - Investment Prospectus

### Investment Calculation
When fractional ownership selected:
- User enters amount
- System calculates tokens: `amount / 1000`
- Displays: "Tokens: X PROP"

## Crowdfunding Detail Page Features

### Funding Progress

Visual progress bar showing:
- Amount raised
- Target amount
- Number of investors
- Percentage funded
- Remaining amount

```typescript
const fundingPercentage = (raisedAmount / targetAmount) * 100;
```

### Tabs

1. **Overview Tab**
   - Campaign description
   - Key features

2. **Updates Tab**
   - Timeline of campaign updates
   - Date, title, and content
   - Left border accent

3. **Documents Tab**
   - Campaign Prospectus
   - Property Valuation Report
   - Legal Agreement
   - CDA Approval

### Investment Card

Shows:
- Minimum investment
- Expected ROI
- Duration
- End date
- Investment amount input
- Share calculation: `(amount / target) * 100%`

## Investment Detail Page Features

### Key Metrics Display

Four metric cards showing:
1. **Returns** - Expected percentage (green)
2. **Duration** - Investment period (blue)
3. **Min. Investment** - Entry amount (purple)
4. **Risk Level** - Low/Medium/High (color-coded)

### Investment Options

#### Full Investment
```typescript
{
  type: 'Full Investment',
  description: 'Maximum investment amount',
  amount: 'PKR 5,000,000'
}
```

#### Partial Investment
```typescript
{
  type: 'Partial Investment',
  description: 'Choose your investment amount',
  minAmount: 'PKR 100,000'
}
```

### Tabs

1. **Overview Tab**
   - Investment description
   - Key features
   - Investment highlights box

2. **Financials Tab**
   - Expected annual return
   - Rental yield / Occupancy rate
   - Capital appreciation
   - Management fee
   - Lock-in period
   - Exit options
   - Risk disclosure warning

3. **Documents Tab**
   - Investment Prospectus
   - REIT Structure / Performance Report
   - Portfolio Details / Revenue Projections
   - Risk Disclosure
   - Terms & Conditions

### Return Calculator

When amount entered:
- Calculates estimated annual return
- Shows range based on ROI percentage
- Example: 12-15% of investment amount

## Common Features Across All Pages

### Navigation
- Back link to listing page
- Breadcrumb trail
- Smooth transitions

### Loading State
```tsx
<div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[color]">
</div>
```

### Image Handling
```tsx
<Image
  src={image}
  alt={title}
  fill
  className="object-cover opacity-70"
  onError={(e) => {
    (e.target as HTMLImageElement).style.display = 'none';
  }}
/>
```

### Trust Indicators
All pages show:
- ✓ CDA Verified / Verified Campaign
- ✓ Blockchain Secured
- ✓ Professional Management
- ✓ Transparent Reporting / Regular Updates

### Responsive Design
- **Desktop (lg)**: 2/3 content + 1/3 sidebar
- **Tablet/Mobile**: Stacked layout
- Sticky sidebar on desktop only

## Investment Flow

### 1. User Selects Option
- Full ownership/investment
- Fractional/partial ownership

### 2. User Enters Amount
- Validation against minimum
- Real-time calculations shown

### 3. User Clicks Invest/Buy
- Validation checks
- Redirect to checkout page

### Checkout URL Format
```
/checkout?property={id}&amount={amount}&type={type}
/checkout?campaign={id}&amount={amount}&type=crowdfunding
/checkout?investment={id}&amount={amount}&type=investment
```

## Sample Data Structure

### Property
```typescript
interface Property {
  id: string;
  image: string;
  icon?: string;
  title: string;
  category: string;
  location: string;
  description: string;
  fullDescription: string;
  price: string;
  priceNumeric: number;
  tokens: string;
  expectedROI: string;
  features: string[];
  amenities: string[];
  documents: { name: string; url: string; }[];
  gallery: string[];
}
```

### Campaign
```typescript
interface Campaign {
  id: string;
  // ... basic info
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
```

### Investment
```typescript
interface Investment {
  id: string;
  // ... basic info
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
```

## Color Schemes

### Properties
- Primary: Blue (`blue-600`)
- Secondary: Purple (`purple-600`)
- Gradient: `from-blue-600 to-purple-600`

### Crowdfunding
- Primary: Green (`green-600`)
- Secondary: Blue (`blue-600`)
- Gradient: `from-green-600 to-blue-600`

### Investments
- Primary: Purple (`purple-600`)
- Secondary: Blue (`blue-600`)
- Gradient: `from-purple-600 to-blue-600`

## Interactive Elements

### Radio Button Style Selection
Custom radio buttons for ownership options:
```tsx
<span className={`w-5 h-5 rounded-full border-2 ${
  selected ? 'border-blue-600 bg-blue-600' : 'border-gray-300'
}`}>
  {selected && (
    <span className="block w-full h-full rounded-full bg-white scale-50"></span>
  )}
</span>
```

### Tab Navigation
Active tab styling:
```tsx
className={`px-6 py-4 font-semibold ${
  activeTab === 'overview'
    ? 'text-blue-600 border-b-2 border-blue-600'
    : 'text-gray-600 hover:text-blue-600'
}`}
```

### Input Validation
```tsx
const handleInvestment = () => {
  if (!investmentAmount) {
    alert('Please enter an investment amount');
    return;
  }
  const amount = parseInt(investmentAmount);
  if (amount < minInvestmentNumeric) {
    alert(`Minimum investment is ${minInvestment}`);
    return;
  }
  // Proceed to checkout
};
```

## API Integration (Future)

### Fetch Property Data
```typescript
useEffect(() => {
  fetch(`/api/properties/${params.id}`)
    .then(res => res.json())
    .then(data => setProperty(data))
    .catch(error => console.error('Error:', error));
}, [params.id]);
```

### Submit Investment
```typescript
const handleInvestment = async () => {
  const response = await fetch('/api/investments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      propertyId: params.id,
      amount: investmentAmount,
      type: selectedOption
    })
  });
  
  if (response.ok) {
    router.push('/checkout');
  }
};
```

## Testing Checklist

### Properties Detail Page
- [ ] Page loads with property ID
- [ ] Hero image displays correctly
- [ ] All three tabs work
- [ ] Full ownership option selectable
- [ ] Fractional ownership option selectable
- [ ] Amount input validates minimum
- [ ] Token calculation displays
- [ ] Buy Now button redirects correctly
- [ ] Documents are downloadable
- [ ] Back link works
- [ ] Responsive on mobile/tablet

### Crowdfunding Detail Page
- [ ] Funding progress bar displays
- [ ] Percentage calculation correct
- [ ] Updates tab shows timeline
- [ ] Investment amount validates
- [ ] Share percentage calculates
- [ ] All tabs functional
- [ ] Trust indicators show
- [ ] Responsive design works

### Investments Detail Page
- [ ] Key metrics display correctly
- [ ] Risk level color-coded
- [ ] Full/Partial options work
- [ ] Financials tab shows all data
- [ ] Return calculator works
- [ ] Risk disclosure visible
- [ ] Documents accessible
- [ ] Responsive layout

## URLs for Testing

### Properties
```
http://localhost:3000/properties/1
http://localhost:3000/properties/2
```

### Crowdfunding
```
http://localhost:3000/crowdfunding/1
http://localhost:3000/crowdfunding/2
```

### Investments
```
http://localhost:3000/investments/1
http://localhost:3000/investments/2
```

## Next Steps

1. **Create Checkout Page** (`/checkout`)
   - Payment method selection
   - Investment summary
   - Terms acceptance
   - Payment processing

2. **Add More Sample Data**
   - Expand property database
   - Add more campaigns
   - Include diverse investments

3. **Implement Backend API**
   - Create database tables
   - Build API endpoints
   - Connect to PostgreSQL

4. **Add User Features**
   - Save to favorites
   - Share functionality
   - Investment calculator modal
   - Comparison tool

## Summary

✅ **Completed**:
- Property detail page with full/fractional ownership
- Crowdfunding detail page with progress tracking
- Investment detail page with full/partial options
- Tabbed content organization
- Sticky investment sidebar
- Responsive design
- Input validation
- Trust indicators
- Document downloads
- Navigation integration

🎯 **Ready for**:
- Checkout page implementation
- Backend API integration
- Payment processing
- User authentication flows
- Real-time data updates

---

**Implementation Date**: November 3, 2025  
**Status**: ✅ Complete and Ready for Testing

# Testing Guide - Property Pages

## Quick Start

### 1. Start Development Server
```bash
cd c:\xampp\htdocs\PROPLEDGER\propledger-nextjs
npm run dev
```

### 2. Open Browser
Navigate to: `http://localhost:3000`

### 3. Test Pages

#### Properties Page
**URL**: `http://localhost:3000/properties`

**Test Cases**:
- [ ] Page loads without errors
- [ ] Hero section displays with blue-purple gradient
- [ ] Stats show: Total Properties, Total Value, Locations, CDA Approval
- [ ] Search bar is functional
- [ ] Category filter dropdown works
- [ ] 6 property cards display in grid
- [ ] Cards show: image, title, category, location, description, price
- [ ] Hover effect works (shadow elevation, slight lift)
- [ ] "View Details" button appears on each card
- [ ] Responsive: 1 column on mobile, 2 on tablet, 3 on desktop

**Search Test**:
1. Type "Property Share" in search box
2. Should filter to show only matching properties
3. Clear search - all properties return

**Filter Test**:
1. Select "Residential" from dropdown
2. Should show only residential properties
3. Select "All Categories" - all properties return

#### Crowdfunding Page
**URL**: `http://localhost:3000/crowdfunding`

**Test Cases**:
- [ ] Page loads without errors
- [ ] Hero section displays with green-blue gradient
- [ ] Stats show: Active Campaigns, Total Investors, Funds Raised, Avg Funding
- [ ] "How It Works" section displays with 4 steps
- [ ] Search bar is functional
- [ ] Status filter dropdown works (All/Active/Completed)
- [ ] 6 campaign cards display in grid
- [ ] Cards show: image, title, category, location, description
- [ ] Funding progress bar displays correctly
- [ ] Progress bar shows raised vs target amounts
- [ ] Investors and min investment display
- [ ] "Invest Now" button appears on each card
- [ ] Hover effect works

**Progress Bar Test**:
1. Check Property Share card
2. Progress bar should show 70% filled (35M/50M)
3. Serene Heights should show 77.5% (62M/80M)

**Filter Test**:
1. Select "Active Campaigns"
2. Should show only campaigns not fully funded
3. Select "Fully Funded"
4. Should show only completed campaigns

#### Investments Page
**URL**: `http://localhost:3000/investments`

**Test Cases**:
- [ ] Page loads without errors
- [ ] Hero section displays with purple-blue gradient
- [ ] Stats show: Active Opportunities, Avg Returns, Min Investment, Active Investors
- [ ] "Why Invest With Us" section displays with 6 benefits
- [ ] Search bar is functional
- [ ] Duration filter dropdown works
- [ ] 9 investment cards display in grid
- [ ] Cards show: image, title, category, location, description
- [ ] Returns percentage displays (e.g., "12-15%")
- [ ] Duration displays (e.g., "3 Years")
- [ ] Min investment displays (e.g., "PKR 100K")
- [ ] "View Opportunity" button appears on each card
- [ ] Hover effect works

**Filter Test**:
1. Select "Short Term (2-3 Years)"
2. Should show only 2-3 year investments
3. Select "Medium Term (4-5 Years)"
4. Should show 4-5 year investments
5. Select "Long Term (6+ Years)"
6. Should show 6+ year investments

## Responsive Testing

### Mobile (< 768px)
1. Open browser DevTools (F12)
2. Click device toolbar (Ctrl+Shift+M)
3. Select "iPhone 12 Pro" or similar
4. Test each page:
   - [ ] Cards stack in 1 column
   - [ ] Search and filter stack vertically
   - [ ] Stats cards stack in 2 columns
   - [ ] All text is readable
   - [ ] Buttons are easily tappable

### Tablet (768px - 1024px)
1. Select "iPad" or set width to 800px
2. Test each page:
   - [ ] Cards display in 2 columns
   - [ ] Search and filter side by side
   - [ ] Stats cards in 2 columns
   - [ ] Layout looks balanced

### Desktop (> 1024px)
1. Set width to 1920px
2. Test each page:
   - [ ] Cards display in 3 columns
   - [ ] Content is centered with max-width
   - [ ] Stats cards in 4 columns
   - [ ] Plenty of whitespace

## Navigation Testing

### From Homepage
1. Go to `http://localhost:3000`
2. Click navbar links:
   - [ ] "Properties" → `/properties`
   - [ ] "Crowdfunding" → `/crowdfunding`
   - [ ] "Investments" → `/investments`
3. Active link should be highlighted in blue

### Between Pages
1. From Properties page, click "Crowdfunding" in navbar
2. Should navigate smoothly
3. Repeat for all page combinations

## Authentication Testing

### Not Logged In
1. Clear cookies/logout if needed
2. Visit each page:
   - [ ] Pages load normally
   - [ ] Token bar NOT visible in navbar
   - [ ] "Login" and "Sign Up" buttons visible
   - [ ] All content is accessible
3. Click "Invest Now" or "View Details":
   - [ ] Should redirect to login page (future implementation)

### Logged In
1. Login via `/login`
2. Visit each page:
   - [ ] Pages load normally
   - [ ] Token bar IS visible (shows "0 Tokens | ₨ 0")
   - [ ] "Dashboard" and "Logout" buttons visible
   - [ ] All content is accessible
3. Click "Invest Now" or "View Details":
   - [ ] Should proceed to investment flow (future implementation)

## Performance Testing

### Page Load Speed
1. Open DevTools → Network tab
2. Reload each page
3. Check:
   - [ ] Initial load < 2 seconds
   - [ ] No console errors
   - [ ] All assets load successfully

### Search Performance
1. Type quickly in search box
2. Check:
   - [ ] Results update in real-time
   - [ ] No lag or stuttering
   - [ ] Smooth filtering

## Visual Testing

### Card Design
Compare with reference image:
- [ ] Large image at top (264px height)
- [ ] Logo overlay (if present) in top-left
- [ ] Title is bold and prominent
- [ ] Category text is smaller
- [ ] Location text is gray
- [ ] Description has 3-line limit
- [ ] Metrics display correctly
- [ ] Button is full-width at bottom
- [ ] Gradient background if image missing

### Color Scheme
- [ ] Properties: Blue-purple gradient hero
- [ ] Crowdfunding: Green-blue gradient hero
- [ ] Investments: Purple-blue gradient hero
- [ ] Cards: White background
- [ ] Hover: Shadow increases, card lifts slightly

### Typography
- [ ] Titles are large and readable
- [ ] Body text is appropriate size
- [ ] All text has good contrast
- [ ] No text overflow or truncation issues

## Browser Testing

Test in multiple browsers:
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (if available)

## Common Issues & Solutions

### Issue: Images Not Loading
**Solution**: 
1. Check if images exist in `public/images/`
2. Verify image paths in page files
3. Should show gradient fallback if missing

### Issue: Search Not Working
**Solution**:
1. Check browser console for errors
2. Verify state management in component
3. Check filter logic in code

### Issue: Cards Not Responsive
**Solution**:
1. Check Tailwind CSS classes
2. Verify breakpoint classes (md:, lg:)
3. Test at exact breakpoint widths

### Issue: Styling Looks Wrong
**Solution**:
1. Clear browser cache
2. Restart dev server (`npm run dev`)
3. Check if Tailwind CSS is compiling

## Test Results Template

```
Date: ___________
Tester: ___________

Properties Page:     ☐ Pass  ☐ Fail
Crowdfunding Page:   ☐ Pass  ☐ Fail
Investments Page:    ☐ Pass  ☐ Fail
Responsive Design:   ☐ Pass  ☐ Fail
Navigation:          ☐ Pass  ☐ Fail
Search/Filter:       ☐ Pass  ☐ Fail

Issues Found:
_________________________________
_________________________________
_________________________________

Notes:
_________________________________
_________________________________
_________________________________
```

## Next Steps After Testing

1. **If All Tests Pass**:
   - Add real property images
   - Integrate with backend API
   - Implement property detail pages
   - Add investment functionality

2. **If Issues Found**:
   - Document issues clearly
   - Check console for errors
   - Review component code
   - Fix and re-test

## Support

For issues:
1. Check browser console (F12)
2. Review `PROPERTY_PAGES_GUIDE.md`
3. Check `IMPLEMENTATION_SUMMARY.md`
4. Review component code with comments

---

**Happy Testing! 🚀**

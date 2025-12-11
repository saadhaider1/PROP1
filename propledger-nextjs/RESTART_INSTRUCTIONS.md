# Restart Instructions - View Details Button Not Showing

## Issue
The "View Details" button code is in the file but not showing on the page due to Next.js caching.

## Solution: Restart Dev Server

### Step 1: Stop the Server
In your terminal where `npm run dev` is running:
- Press `Ctrl + C` to stop the server

### Step 2: Clear Next.js Cache
Run this command:
```bash
# Windows PowerShell
Remove-Item -Recurse -Force .next

# OR Windows Command Prompt
rmdir /s /q .next

# Mac/Linux
rm -rf .next
```

### Step 3: Restart Dev Server
```bash
npm run dev
```

### Step 4: Hard Refresh Browser
Once the server restarts:
1. Open browser DevTools (F12)
2. Right-click the refresh button
3. Select "Empty Cache and Hard Reload"

OR simply:
- Press `Ctrl + Shift + R` (Windows)
- Press `Cmd + Shift + R` (Mac)

## Verification

After restarting, go to:
```
http://localhost:3000/investments
```

You should now see TWO buttons on each investment card:
1. **Invest Now** (blue gradient)
2. **View Details** (white with blue border)

## Quick Test

```
1. Go to /investments
2. Find "Manhattan Office Tower"
3. Verify TWO buttons are visible ✅
4. Click "View Details" → Goes to /investments/1 ✅
5. Click "Invest Now" → Opens modal ✅
```

## If Still Not Working

### Check 1: Verify File Saved
Make sure `components/PropertyCard.tsx` is saved with the changes.

### Check 2: Check Console
Open browser console (F12) and look for any errors.

### Check 3: Verify Code
Open `components/PropertyCard.tsx` and search for:
```typescript
{type === 'investment' ? (
  <div className="flex gap-2">
```

This should be around line 181.

### Check 4: Nuclear Option
If nothing works:
```bash
# Stop server (Ctrl+C)
# Delete node_modules and cache
rm -rf node_modules .next
# Reinstall
npm install
# Restart
npm run dev
```

## Expected Code Structure

The PropertyCard component should have:

```typescript
{/* Action Buttons */}
{type === 'investment' ? (
  <div className="flex gap-2">
    <button onClick={handleButtonClick}>
      Invest Now
    </button>
    <button onClick={() => window.location.href = `/investments/${id}`}>
      View Details
    </button>
  </div>
) : (
  <button onClick={handleButtonClick}>
    {type === 'property' ? 'Buy Now' : 'Invest Now'}
  </button>
)}
```

## Why This Happens

Next.js caches compiled components for faster development. Sometimes when you make changes, the cache doesn't update properly. Deleting the `.next` folder forces Next.js to recompile everything from scratch.

## Prevention

For future changes:
1. Always save files before testing
2. Use hard refresh (Ctrl+Shift+R) when testing changes
3. If changes don't appear, restart dev server
4. Clear `.next` folder if restart doesn't work

---

**Date**: November 3, 2025  
**Issue**: View Details button not showing  
**Solution**: Restart dev server and clear cache

# 🔧 Fixing Blank Screen on Netlify

## 🐛 Issue

Blank white screen when previewing the app on Netlify.

## 🔍 Root Causes

1. **Script Path Issue**: HTML was looking for `/bundle.js` but production builds use hashed filenames
2. **Build Error**: RTK Query compatibility issue preventing successful build
3. **Missing Error Handling**: No visible errors when app fails to load

## ✅ Fixes Applied

### 1. Fixed HTML Template
- Removed hardcoded script tag
- Let HtmlWebpackPlugin inject the correct script automatically
- Added proper script loading configuration

### 2. Enhanced Error Handling
- Added global error handlers in `index.web.tsx`
- Improved ErrorBoundary component
- Added fallback error page

### 3. Webpack Configuration
- Fixed script injection
- Improved build output
- Better error reporting

## 🚀 Next Steps

1. **Check Browser Console**: Open DevTools (F12) and check for errors
2. **Verify Build**: Make sure Netlify build completes successfully
3. **Check Network Tab**: Verify JavaScript files are loading (not 404)

## 📝 Debugging

If still blank:
1. Open browser DevTools (F12)
2. Check Console tab for errors
3. Check Network tab - are JS files loading?
4. Check if `index.html` exists in `web-build` folder

## 🔄 Rebuild

After fixes:
```bash
npm run web:build
```

Then commit and push to trigger Netlify rebuild.

---

**The blank screen should be fixed now! 🎉**


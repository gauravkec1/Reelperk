# 🚀 Deploy ReelPerk to Netlify

## ✅ Netlify Configuration Created

I've created `netlify.toml` with the proper configuration for your app.

---

## 📋 Deployment Steps

### Option 1: Deploy via Netlify Dashboard

1. **Go to Netlify**: https://app.netlify.com
2. **Add New Site** → **Import an existing project**
3. **Connect to Git** → Select GitHub
4. **Choose repository**: `gauravkec1/Reelperk`
5. **Build settings**:
   - **Build command**: `npm run web:build`
   - **Publish directory**: `web-build`
6. **Deploy site**

### Option 2: Deploy via Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Initialize and deploy
netlify init
netlify deploy --prod
```

### Option 3: Connect GitHub Repository

1. **Netlify Dashboard** → **Add new site** → **Import from Git**
2. **Authorize GitHub** and select `gauravkec1/Reelperk`
3. **Build settings** (auto-detected from `netlify.toml`):
   - Build command: `npm run web:build`
   - Publish directory: `web-build`
4. **Deploy**

---

## 🔧 Build Configuration

The `netlify.toml` file includes:
- ✅ Build command: `npm run web:build`
- ✅ Publish directory: `web-build`
- ✅ SPA redirects (all routes → index.html)
- ✅ Security headers
- ✅ Cache headers for static assets

---

## ⚙️ Environment Variables

If needed, add in Netlify Dashboard:
- **Site settings** → **Environment variables**
- Add:
  - `API_URL` = Your backend API URL
  - `NODE_ENV` = `production`

---

## 🐛 Fixing 404 Errors

If you're getting 404 errors:

1. **Check build output**: Make sure `web-build` folder exists after build
2. **Verify redirects**: The `netlify.toml` should handle SPA routing
3. **Check build logs**: In Netlify dashboard → Deploys → Build log

---

## 📝 Quick Deploy Commands

```bash
# Build locally first
npm run web:build

# Deploy to Netlify
netlify deploy --prod
```

---

## ✅ After Deployment

Your app will be available at:
- `https://your-site-name.netlify.app`
- Or custom domain if configured

---

**Your Netlify configuration is ready! 🚀**


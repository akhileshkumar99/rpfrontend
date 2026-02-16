# 🚀 Deployment Guide - RP Public School Website

## 📋 Prerequisites
- GitHub account
- Render account (https://render.com)
- Vercel account (https://vercel.com)
- MongoDB Atlas account (https://www.mongodb.com/cloud/atlas)

---

## 🗄️ Step 1: Setup MongoDB Atlas (Cloud Database)

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up / Login
3. Create a **FREE** cluster
4. Click **"Connect"** → **"Connect your application"**
5. Copy the connection string (looks like):
   ```
   mongodb+srv://username:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Replace `<password>` with your actual password
7. Keep this connection string safe - you'll need it!

---

## 🔧 Step 2: Prepare Backend for Render

### Update `server/db.js`:
Replace the MongoDB connection string with environment variable:

```javascript
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/school';

mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Error:', err));

module.exports = mongoose;
```

### Update `server/server.js`:
Change PORT to use environment variable:

```javascript
const PORT = process.env.PORT || 5000;
```

---

## 🌐 Step 3: Deploy Backend to Render

1. **Push code to GitHub:**
   ```bash
   cd c:\Users\DELL\OneDrive\Desktop\ai
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Go to Render Dashboard:**
   - Visit https://dashboard.render.com
   - Click **"New +"** → **"Web Service"**

3. **Connect GitHub Repository:**
   - Select your repository
   - Click **"Connect"**

4. **Configure Service:**
   - **Name:** `rp-school-backend`
   - **Region:** Choose closest to you
   - **Branch:** `main`
   - **Root Directory:** `server`
   - **Runtime:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** `Free`

5. **Add Environment Variables:**
   Click **"Advanced"** → **"Add Environment Variable"**
   
   Add these:
   ```
   MONGO_URI = your_mongodb_atlas_connection_string
   NODE_ENV = production
   ```

6. **Deploy:**
   - Click **"Create Web Service"**
   - Wait 5-10 minutes for deployment
   - Copy your backend URL (e.g., `https://rp-school-backend.onrender.com`)

---

## 🎨 Step 4: Update Frontend API URLs

Create a config file for API URLs:

### Create `src/config.js`:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'https://rp-school-backend.onrender.com';

export default API_URL;
```

### Update all fetch calls in your components:

**Example - Update `src/pages/Gallery.jsx`:**
```javascript
import API_URL from '../config';

// Change from:
const res = await fetch('http://localhost:5000/api/gallery');

// To:
const res = await fetch(`${API_URL}/api/gallery`);
```

**Do this for ALL files that use fetch:**
- `src/pages/Gallery.jsx`
- `src/pages/Faculty.jsx`
- `src/pages/Courses.jsx`
- `src/pages/Notices.jsx`
- `src/pages/Contact.jsx`
- `src/pages/Admissions.jsx`
- `src/pages/AdminLogin.jsx`
- `src/pages/AdminDashboard.jsx`
- `src/components/HeroSlider.jsx`

---

## 🚀 Step 5: Deploy Frontend to Vercel

1. **Install Vercel CLI (Optional):**
   ```bash
   npm install -g vercel
   ```

2. **Deploy via Vercel Website:**
   - Go to https://vercel.com
   - Click **"Add New"** → **"Project"**
   - Import your GitHub repository
   - **Framework Preset:** Vite
   - **Root Directory:** `./` (leave as is)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

3. **Add Environment Variables:**
   Click **"Environment Variables"**
   
   Add:
   ```
   VITE_API_URL = https://rp-school-backend.onrender.com
   ```
   (Use your actual Render backend URL)

4. **Deploy:**
   - Click **"Deploy"**
   - Wait 2-3 minutes
   - Your site will be live at `https://your-project.vercel.app`

---

## 🔄 Step 6: Update Backend CORS

Update `server/server.js` to allow your Vercel domain:

```javascript
const cors = require('cors');

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://your-project.vercel.app'  // Add your Vercel URL
  ],
  credentials: true
}));
```

Push changes to GitHub - Render will auto-deploy!

---

## ✅ Step 7: Test Your Deployment

1. Visit your Vercel URL
2. Test all features:
   - ✅ Gallery loads
   - ✅ Hero slider works
   - ✅ Contact form submits
   - ✅ Admin login works
   - ✅ Admin can upload images

---

## 🐛 Common Issues & Fixes

### Issue 1: Images not loading
**Fix:** Update image URLs to use full backend URL:
```javascript
<img src={`${API_URL}${image.imageUrl}`} />
```

### Issue 2: CORS errors
**Fix:** Add your Vercel domain to CORS whitelist in backend

### Issue 3: MongoDB connection fails
**Fix:** 
- Check MongoDB Atlas IP whitelist (allow 0.0.0.0/0 for all IPs)
- Verify connection string is correct
- Check username/password

### Issue 4: Render service sleeping (free tier)
**Fix:** First request takes 30-60 seconds to wake up. This is normal for free tier.

---

## 📝 Quick Commands Reference

### Backend (Render):
```bash
# View logs
Visit: https://dashboard.render.com → Your Service → Logs

# Redeploy
Visit: https://dashboard.render.com → Your Service → Manual Deploy
```

### Frontend (Vercel):
```bash
# Redeploy
git add .
git commit -m "Update"
git push

# Or use Vercel CLI
vercel --prod
```

---

## 🎉 Your URLs

After deployment, you'll have:

- **Frontend:** `https://your-project.vercel.app`
- **Backend:** `https://rp-school-backend.onrender.com`
- **Admin Panel:** `https://your-project.vercel.app` (click Admin in footer)

---

## 💡 Pro Tips

1. **Free Tier Limitations:**
   - Render: Service sleeps after 15 min inactivity
   - Vercel: 100GB bandwidth/month
   - MongoDB Atlas: 512MB storage

2. **Keep Render Active:**
   Use a service like UptimeRobot to ping your backend every 5 minutes

3. **Custom Domain:**
   - Vercel: Settings → Domains → Add your domain
   - Update CORS in backend with new domain

4. **Environment Variables:**
   - Never commit `.env` files
   - Always use environment variables for sensitive data

---

## 📞 Need Help?

If you face any issues:
1. Check Render logs for backend errors
2. Check browser console for frontend errors
3. Verify all environment variables are set correctly
4. Ensure MongoDB Atlas IP whitelist includes 0.0.0.0/0

---

**Good Luck! 🚀**

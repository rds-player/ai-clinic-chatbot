# Quick Start Guide - AI Clinic Chatbot

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Create `.env.local` File

Copy the example and add your API keys:

```bash
cp .env.local.example .env.local
```

### Step 3: Get FREE API Keys

#### 1. Groq AI (Required - 100% FREE)
- Visit: https://console.groq.com
- Sign up with email
- Click "Create API Key"
- Copy key and paste in `.env.local`:
  ```
  GROQ_API_KEY=gsk_your_key_here
  ```

#### 2. MongoDB Atlas (Required - FREE 512MB)
- Visit: https://www.mongodb.com/cloud/atlas/register
- Create free cluster
- Click "Connect" → "Connect your application"
- Copy connection string and paste in `.env.local`:
  ```
  MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/
  ```

#### 3. Resend (Optional - FREE 100 emails/day)
- Visit: https://resend.com/signup
- Create API key
- Add to `.env.local`:
  ```
  RESEND_API_KEY=re_your_key_here
  CLINIC_EMAIL=your@email.com
  ```

### Step 4: Run Development Server

```bash
npm run dev
```

Open http://localhost:3000 - You'll see:
- Landing page with pricing
- Chat button in bottom-right corner
- Full chatbot functionality

### Step 5: Test Features

#### Test the Chatbot:
1. Click chat button
2. Ask: "What services do you offer?"
3. Ask: "What are your hours?"
4. Say: "I want to book an appointment"
5. Fill the booking form

#### Test Admin Dashboard:
1. Go to http://localhost:3000/admin
2. Password: `clinic2024`
3. View leads, export CSV, update statuses

### Step 6: Customize Your Clinic

Edit `data/demo-clinic.json`:

```json
{
  "name": "Your Clinic Name",
  "services": [
    { "name": "Your Service", "price": "€50", "duration": "30min" }
  ],
  "contact": {
    "phone": "+351 912 345 678",
    "email": "your@clinic.com"
  }
}
```

## 📊 What's Included

✅ AI chatbot with Groq (FREE)
✅ Appointment booking system
✅ Admin dashboard
✅ Email notifications (optional)
✅ Multi-language (PT/EN)
✅ Mobile responsive
✅ Medical safety rules

## 💰 Subscription Pricing

The landing page shows 3 pricing tiers:
- **1 Month**: €10/month
- **3 Months**: €30 total
- **12 Months**: €79 total (save €41!)

## 🌐 Deploy to Production

### Option 1: Vercel (Recommended - FREE)

1. Push to GitHub
2. Visit https://vercel.com
3. Click "Import Project"
4. Add environment variables
5. Deploy!

### Option 2: Any Node.js hosting

```bash
npm run build
npm start
```

## 🔧 Common Issues

### "Please add your Groq API key"
- Make sure `.env.local` exists
- Restart dev server after adding keys

### Chatbot not responding
- Check Groq API key is valid
- Check browser console for errors

### Email not sending
- Resend key is optional for testing
- Leads still save to database

## 📱 Features Overview

### Chatbot Widget
- Floating button (bottom-right)
- Smart AI responses
- Booking form integration
- Multi-language support

### Admin Dashboard
- Real-time lead tracking
- Status updates
- CSV export
- Analytics

### Safety Features
- Never provides medical diagnoses
- Validates phone numbers
- Requires full names
- Secure password protection

## 🎨 Customization

### Change Colors
Edit `app/globals.css` theme colors

### Add Services
Edit `data/demo-clinic.json`

### Change Admin Password
Edit `.env.local`:
```
ADMIN_PASSWORD=your_secure_password
```

## 📞 Support

Questions? Check:
1. README.md (full documentation)
2. .env.local.example (all variables)
3. Browser console (error messages)

---

**Ready to go? Run `npm run dev` and start chatting!** 🎉

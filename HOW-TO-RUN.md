# How to Run - AI Clinic Chatbot

## ⚡ Fastest Way to Test (Without API Keys)

The app will run but some features need API keys. Here's what works without keys:

```bash
npm run dev
```

Open http://localhost:3000

✅ **Works without keys:**
- Landing page
- Pricing cards
- UI/UX demo
- Admin login page
- Language switcher

❌ **Needs API keys:**
- AI chatbot responses (needs Groq)
- Saving appointments (needs MongoDB)
- Email notifications (needs Resend)

---

## 🚀 Full Setup with FREE API Keys (5 minutes)

### Step 1: Get Groq API Key (Required for AI chat)

1. Go to https://console.groq.com
2. Click "Sign Up" (free forever)
3. Go to "API Keys"
4. Click "Create API Key"
5. Copy the key (starts with `gsk_`)

### Step 2: Get MongoDB URI (Required for saving leads)

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up (free 512MB)
3. Create a "Free" cluster
4. Click "Connect" → "Drivers"
5. Copy connection string
6. Replace `<password>` with your password

### Step 3: Create `.env.local` File

In the project root, create `.env.local`:

```bash
# Copy the example
cp .env.local.example .env.local
```

Then edit `.env.local` and add:

```
GROQ_API_KEY=gsk_your_key_from_step_1
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/clinic-chatbot
ADMIN_PASSWORD=clinic2024
```

### Step 4: Install & Run

```bash
npm install
npm run dev
```

Open http://localhost:3000 - Everything works now!

---

## 🎯 Quick Test Checklist

### Test the Chatbot:
1. Click chat button (bottom-right)
2. Ask: "What services do you offer?"
3. Ask: "What are your opening hours?"
4. Say: "I want to book an appointment"
5. Fill the booking form with:
   - Name: João Silva
   - Phone: 912345678
   - Service: General Consultation

### Test the Admin:
1. Go to http://localhost:3000/admin
2. Password: `clinic2024`
3. See your test appointment!
4. Change status from "new" to "contacted"
5. Click "Export CSV"

### Test Language Switching:
1. Click "PT" in top-right corner
2. Changes to "EN"
3. All text switches to English
4. Chatbot responds in English

---

## 📧 Optional: Email Notifications

If you want email notifications when appointments are booked:

1. Go to https://resend.com/signup
2. Sign up (FREE 100 emails/day)
3. Create API key
4. Add to `.env.local`:
   ```
   RESEND_API_KEY=re_your_key_here
   CLINIC_EMAIL=your@email.com
   ```
5. Restart server

Now you'll receive emails for each appointment!

---

## 🛠️ Customize Your Clinic

Edit `data/demo-clinic.json`:

```json
{
  "name": "Your Clinic Name",
  "services": [
    { "name": "Your Service", "price": "€50", "duration": "30min" }
  ],
  "contact": {
    "phone": "+351 912 345 678",
    "email": "your@clinic.com",
    "address": "Your Address"
  }
}
```

Restart the server to see changes.

---

## 🐛 Troubleshooting

### "Please add your Groq API key"
- Make sure `.env.local` exists in project root
- Restart dev server: `Ctrl+C` then `npm run dev`
- Check key starts with `gsk_`

### Chatbot not responding
- Check Groq API key is valid
- Open browser console (F12) for errors
- Make sure MongoDB is connected

### Can't login to admin
- Default password: `clinic2024`
- Change in `.env.local`: `ADMIN_PASSWORD=your_password`

### Port already in use
```bash
# Use a different port
PORT=3001 npm run dev
```

---

## 📱 Mobile Testing

The chatbot is fully responsive. Test on mobile:

1. Find your local IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
2. On your phone, go to: `http://YOUR_IP:3000`
3. Test chatbot, booking, language switching

---

## 🚢 Deploy to Production (FREE)

### Deploy to Vercel:

1. Push code to GitHub
2. Go to https://vercel.com
3. Click "New Project"
4. Import your repository
5. Add environment variables:
   - `GROQ_API_KEY`
   - `MONGODB_URI`
   - `ADMIN_PASSWORD`
   - `RESEND_API_KEY` (optional)
6. Click "Deploy"

Your chatbot is now live! 🎉

---

## 📊 What You Get

✅ AI chatbot with medical safety rules
✅ Appointment booking system
✅ Admin dashboard for leads
✅ Email notifications (optional)
✅ Multi-language (Portuguese/English)
✅ Mobile responsive
✅ 100% FREE infrastructure

---

## 💡 Next Steps

1. **Customize clinic info** in `data/demo-clinic.json`
2. **Test all features** with the checklist above
3. **Deploy to Vercel** for free hosting
4. **Add Stripe** for payments (optional)
5. **Promote your chatbot** to patients!

---

## 🎓 Learn More

- **README.md** - Full documentation
- **QUICKSTART.md** - 5-minute setup
- **PROJECT-SUMMARY.md** - Architecture overview

---

**Need help? All code is well-commented and TypeScript provides type hints!**

Happy coding! 🚀

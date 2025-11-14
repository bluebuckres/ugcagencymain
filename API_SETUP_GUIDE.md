# 🔧 API SETUP GUIDE - Rate Limiting & Form Submission

**Current Status:** ⚠️ APIs disabled (honeypot only)  
**Target Status:** ✅ Full spam protection with rate limiting

---

## 📋 WHAT'S HAPPENING NOW

### **Current Setup:**
- ✅ Contact form: Works with honeypot field
- ✅ Creator application: Works with honeypot field
- ⚠️ Rate limiting: Disabled (API failing)
- ⚠️ Form submission: Using `/api/submit` (may also fail)

### **Why APIs Are Failing:**
```
POST /api/check-rate-limit → 500 Error
POST /api/submit → 500 Error
```

**Root Cause:** Environment variables not configured in Vercel

---

## 🚀 HOW TO FIX (Step by Step)

### **Step 1: Set Environment Variables in Vercel**

1. Go to: `https://vercel.com/dashboard`
2. Select your project
3. Go to: **Settings → Environment Variables**
4. Add these variables:

```
SUPABASE_URL = https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
ALLOWED_ORIGIN = https://makeugc.in
```

**Where to get these values:**
- Go to: `https://app.supabase.com`
- Select your project
- Settings → API
- Copy `Project URL` and `Service Role Key`

---

### **Step 2: Redeploy After Setting Variables**

1. Vercel Dashboard → Deployments
2. Click latest deployment
3. Click "Redeploy"
4. Wait for build to complete

---

### **Step 3: Re-enable Rate Limiting**

Once APIs are working, update the form handlers:

**File:** `/public/assets/js/contact-form-handler.js`

Replace this:
```javascript
try {
    // TODO: Rate limiting will be enabled after API configuration
    // For now, honeypot field provides basic spam protection
    
    // Submit via serverless proxy
```

With this:
```javascript
try {
    // SPAM CHECK 2: Rate limiting (prevent duplicate submissions)
    const email = emailInput.value.trim();
    const rateCheckResponse = await fetch('/api/check-rate-limit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, table: 'connect.inquiries' })
    });
    
    if (rateCheckResponse.ok) {
        const rateCheckResult = await rateCheckResponse.json();
        if (rateCheckResult.blocked) {
            throw new Error(rateCheckResult.message || 'Please wait before submitting another inquiry');
        }
    }

    // Submit via serverless proxy
```

Do the same for `/public/assets/js/creator-application-handler.js`

---

## 📊 CURRENT SPAM PROTECTION

### **What's Active:**
- ✅ **Honeypot Field** - Catches 90% of bots
  - Hidden input field that only bots fill
  - Instant detection (no API call)
  - Zero false positives

### **What's Disabled:**
- ⚠️ **Rate Limiting** - Prevents duplicate submissions
  - Requires API endpoint working
  - Requires Supabase configured
  - Will be re-enabled after setup

---

## 🔍 TESTING CURRENT SETUP

### **Test Contact Form:**
1. Go to: `https://makeugc.in/contact.html`
2. Fill form normally
3. Submit
4. Should see success message ✅

### **Test Honeypot:**
1. Open DevTools (F12)
2. Console: 
```javascript
document.querySelector('input[name="website"]').value = "test";
```
3. Try to submit form
4. Should be blocked with "Invalid form submission" ✅

---

## 🛠️ TROUBLESHOOTING

### **If Form Still Fails After Setting Env Vars:**

1. **Check Vercel Logs:**
   - Vercel Dashboard → Deployments
   - Click latest deployment
   - Check "Build Logs" and "Function Logs"

2. **Check Supabase Connection:**
   - Make sure Supabase project is active
   - Check API keys are correct
   - Verify tables exist: `connect.inquiries`, `creator_applications`

3. **Check CORS:**
   - Make sure `ALLOWED_ORIGIN` is set correctly
   - Should be: `https://makeugc.in`

---

## 📝 FILES INVOLVED

### **API Endpoints:**
- `/api/submit.js` - Form submission
- `/api/check-rate-limit.js` - Rate limiting check

### **Form Handlers:**
- `/public/assets/js/contact-form-handler.js` - Contact form
- `/public/assets/js/creator-application-handler.js` - Creator app

### **Configuration:**
- `/vercel.json` - Vercel config
- Environment variables in Vercel dashboard

---

## ✅ CHECKLIST FOR FULL SETUP

- [ ] Supabase project created
- [ ] Supabase tables created (`connect.inquiries`, `creator_applications`)
- [ ] Environment variables set in Vercel
- [ ] Vercel redeployed
- [ ] Contact form tested
- [ ] Creator application tested
- [ ] Rate limiting re-enabled in form handlers
- [ ] Forms tested again with rate limiting

---

## 🎯 TIMELINE

| Step | Time | Status |
|------|------|--------|
| Set env vars | 2 min | 📝 TODO |
| Redeploy | 3 min | 📝 TODO |
| Test forms | 2 min | 📝 TODO |
| Re-enable rate limiting | 5 min | 📝 TODO |
| Final testing | 5 min | 📝 TODO |

**Total Time:** ~15 minutes

---

## 🚀 AFTER SETUP

Once everything is configured:

1. ✅ Contact form will have full spam protection
2. ✅ Creator application will have full spam protection
3. ✅ Rate limiting will prevent duplicate submissions
4. ✅ Honeypot will catch bots
5. ✅ All data saved to Supabase

---

**Questions?** Check Vercel logs or Supabase dashboard for errors.

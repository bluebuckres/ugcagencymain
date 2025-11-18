# Professional Debugging - Find the Exact Issue

**Status**: API returning 500 error  
**Goal**: Identify exact cause and fix

---

## 🔍 Step 1: Check Vercel Logs (CRITICAL)

This will show the exact error message:

1. Go to: https://vercel.com/dashboard
2. Click your project: `ugcagencymain`
3. Click: `Deployments`
4. Click latest deployment
5. Click: `Functions` tab
6. Click: `submit-application` function
7. Look at the logs

**What to look for**:
- "Column 'referral_code' does not exist" → Need to add column
- "Table 'referrals' does not exist" → Need to create table
- "Missing credentials" → Environment variables not set
- "UNIQUE constraint failed" → Duplicate referral code
- Any other error message

---

## 🔍 Step 2: Check Environment Variables

1. Go to: https://vercel.com/dashboard
2. Click your project: `ugcagencymain`
3. Go to: `Settings` → `Environment Variables`
4. Look for:
   - `SUPABASE_URL` - Should be your Supabase project URL
   - `SUPABASE_KEY` - Should be your Supabase API key

**If missing**:
1. Go to Supabase Dashboard
2. Click your project
3. Go to: `Settings` → `API`
4. Copy `Project URL` → Add to Vercel as `SUPABASE_URL`
5. Copy `anon public` key → Add to Vercel as `SUPABASE_KEY`
6. Redeploy on Vercel

---

## 🔍 Step 3: Check Database Structure

Go to Supabase SQL Editor and run:

```sql
-- Check if columns exist
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'creator_applications' 
ORDER BY ordinal_position;
```

**Expected columns**:
- ✅ full_name (text)
- ✅ email (text)
- ✅ phone (text)
- ✅ city (text)
- ✅ primary_platform (text)
- ✅ social_handle (text)
- ✅ content_experience (text)
- ✅ niches (text)
- ✅ instagram_url (text)
- ✅ youtube_url (text)
- ✅ portfolio_video_url (text)
- ✅ additional_links (text)
- ✅ referral_code (text) ← MUST EXIST
- ✅ referred_by (text) ← MUST EXIST
- ✅ submitted_at (timestamp)

**If referral_code or referred_by missing**:
Run this in SQL Editor:
```sql
ALTER TABLE creator_applications ADD COLUMN IF NOT EXISTS referral_code TEXT UNIQUE;
ALTER TABLE creator_applications ADD COLUMN IF NOT EXISTS referred_by TEXT;
```

---

## 🔍 Step 4: Test API Directly

Use this curl command to test the API:

```bash
curl -X POST https://www.makeugc.in/api/submit-application \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "phone": "9999999999",
    "city": "Mumbai",
    "platform": "Instagram",
    "handle": "testhandle",
    "experience": "2 years",
    "interests": "Fashion, Lifestyle",
    "instagram_url": "https://instagram.com/test",
    "youtube_url": "",
    "portfolio_link": "https://example.com",
    "additional_links": "",
    "referred_by": null
  }'
```

**Expected response** (200 OK):
```json
{
  "success": true,
  "message": "Application submitted successfully",
  "referralCode": "TES9999ABC",
  "name": "Test User",
  "email": "test@example.com"
}
```

**If 500 error**: Check Vercel logs for exact error

---

## 🔍 Step 5: Check Browser Network Tab

1. Open DevTools (F12)
2. Go to: `Network` tab
3. Submit form
4. Look for: `submit-application` request
5. Click it
6. Go to: `Response` tab
7. **Copy the entire response** and share it

This will show the exact error message from the server.

---

## 📋 Checklist Before Testing

- [ ] Vercel deployment completed successfully
- [ ] Environment variables set (SUPABASE_URL, SUPABASE_KEY)
- [ ] referral_code column exists in creator_applications
- [ ] referred_by column exists in creator_applications
- [ ] Indexes created for performance
- [ ] All SQL commands executed without errors

---

## 🚀 If Everything Checks Out

1. Clear browser cache (Ctrl+Shift+Delete)
2. Open in incognito/private window
3. Visit: https://makeugc.in/creator-application.html
4. Fill form
5. Submit
6. Should redirect to thank you page

---

## 📞 What to Share if Still Not Working

1. **Vercel Function Logs** - Copy the error message
2. **Network Response** - Screenshot of API response
3. **Database Query Result** - Show columns in creator_applications
4. **Environment Variables** - Confirm they're set
5. **Browser Console** - Any JavaScript errors?

---

**This is a professional debugging guide. Follow each step carefully.**

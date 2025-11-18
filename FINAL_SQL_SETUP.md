# Final SQL Setup - Copy & Paste Ready

**Run these commands in Supabase SQL Editor in order**

---

## Step 1: Add Referral Columns to creator_applications

```sql
-- Add referral columns if they don't exist
ALTER TABLE creator_applications 
ADD COLUMN IF NOT EXISTS referral_code TEXT UNIQUE;

ALTER TABLE creator_applications 
ADD COLUMN IF NOT EXISTS referred_by TEXT;
```

---

## Step 2: Create Indexes

```sql
-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS idx_creator_applications_referral_code 
ON creator_applications(referral_code);

CREATE INDEX IF NOT EXISTS idx_creator_applications_referred_by 
ON creator_applications(referred_by);
```

---

## Step 3: Create Referrals Table (Optional - for tracking only)

```sql
-- Create referrals table for tracking referral relationships
CREATE TABLE IF NOT EXISTS referrals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  referrer_code TEXT NOT NULL,
  referred_email TEXT NOT NULL,
  referred_name TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_referrals_referrer_code 
ON referrals(referrer_code);

CREATE INDEX IF NOT EXISTS idx_referrals_referred_email 
ON referrals(referred_email);

CREATE INDEX IF NOT EXISTS idx_referrals_status 
ON referrals(status);
```

---

## ✅ That's It!

The API will now work without the referral tracking function. The system will:
1. ✅ Accept form submissions
2. ✅ Generate referral codes
3. ✅ Store referral codes in database
4. ✅ Track referral relationships (if referrals table exists)
5. ✅ Redirect to thank you page with referral code
6. ✅ Display referral section

---

## 🧪 Test After Setup

1. Visit: `https://makeugc.in/creator-application.html`
2. Fill form completely
3. Submit
4. Should redirect to thank you page
5. Should see referral section with sharing buttons

---

## 📊 Verify in Database

After submitting a form:

```sql
-- Check if application was inserted
SELECT id, full_name, email, referral_code, referred_by, submitted_at 
FROM creator_applications 
ORDER BY submitted_at DESC 
LIMIT 1;

-- Check referrals table (if created)
SELECT * FROM referrals 
ORDER BY created_at DESC 
LIMIT 5;
```

---

## 🔧 If Still Getting 500 Error

1. **Check Vercel Logs**:
   - Go to Vercel Dashboard
   - Select project
   - Go to Deployments
   - Click latest deployment
   - Check Function Logs

2. **Check Environment Variables**:
   - Vercel Dashboard → Settings → Environment Variables
   - Verify SUPABASE_URL is set
   - Verify SUPABASE_KEY is set

3. **Check Database**:
   - Go to Supabase Dashboard
   - Verify creator_applications table exists
   - Verify referral_code column exists
   - Verify referred_by column exists

---

**Status**: ✅ READY TO DEPLOY  
**Time**: 5 minutes

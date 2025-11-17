# Referral System SQL Setup Guide - MakeUGC

## 📋 Overview

This guide provides SQL commands for setting up the referral system. You have two options depending on your schema:

---

## 🔄 Option 1: Using Existing `creator_applications` Table

If you want to add referral columns to your existing `creator_applications` table:

### Step 1: Add Referral Columns

```sql
-- Add referral columns to creator_applications table
ALTER TABLE creator_applications ADD COLUMN IF NOT EXISTS referral_code TEXT UNIQUE;
ALTER TABLE creator_applications ADD COLUMN IF NOT EXISTS referred_by TEXT;
ALTER TABLE creator_applications ADD COLUMN IF NOT EXISTS referral_count INTEGER DEFAULT 0;
ALTER TABLE creator_applications ADD COLUMN IF NOT EXISTS referral_earnings INTEGER DEFAULT 0;
ALTER TABLE creator_applications ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_creator_applications_referral_code ON creator_applications(referral_code);
CREATE INDEX IF NOT EXISTS idx_creator_applications_referred_by ON creator_applications(referred_by);
```

### Step 2: Create Referrals Tracking Table

```sql
CREATE TABLE IF NOT EXISTS referrals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  referrer_code TEXT NOT NULL,
  referred_email TEXT NOT NULL,
  referred_name TEXT,
  status TEXT DEFAULT 'pending', -- pending, approved, rejected
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_referrals_referrer_code ON referrals(referrer_code);
CREATE INDEX IF NOT EXISTS idx_referrals_referred_email ON referrals(referred_email);
CREATE INDEX IF NOT EXISTS idx_referrals_status ON referrals(status);
```

### Step 3: Create PostgreSQL Function for Incrementing Referral Count

```sql
CREATE OR REPLACE FUNCTION increment_referral_count(ref_code TEXT)
RETURNS void AS $$
BEGIN
  UPDATE creator_applications 
  SET referral_count = referral_count + 1 
  WHERE referral_code = ref_code;
END;
$$ LANGUAGE plpgsql;
```

### Step 4: Create Function for Approving Referrals

```sql
CREATE OR REPLACE FUNCTION approve_referral(referred_email TEXT, ref_code TEXT)
RETURNS void AS $$
BEGIN
  -- Update referral status
  UPDATE referrals 
  SET status = 'approved', updated_at = NOW()
  WHERE referred_email = referred_email AND referrer_code = ref_code;
  
  -- Check if referrer should get bonus (3+ approved referrals)
  IF (SELECT COUNT(*) FROM referrals 
      WHERE referrer_code = ref_code AND status = 'approved') >= 3 THEN
    UPDATE creator_applications 
    SET referral_earnings = 500 
    WHERE referral_code = ref_code;
  END IF;
END;
$$ LANGUAGE plpgsql;
```

### Step 5: Enable RLS on Referrals Table

```sql
-- Enable RLS on referrals table
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to INSERT referrals
CREATE POLICY "Allow public insert on referrals"
ON referrals
FOR INSERT
TO anon
WITH CHECK (true);

-- Allow authenticated users to read referrals
CREATE POLICY "Allow authenticated read on referrals"
ON referrals
FOR SELECT
TO authenticated
USING (true);
```

---

## 🆕 Option 2: Create New `creators` Table (Recommended for Scalability)

If you want a separate `creators` table for better organization:

### Step 1: Create New Creators Table

```sql
CREATE TABLE IF NOT EXISTS creators (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT,
  city TEXT NOT NULL,
  platform TEXT NOT NULL,
  handle TEXT,
  experience TEXT,
  interests TEXT NOT NULL,
  instagram_url TEXT,
  youtube_url TEXT,
  portfolio_link TEXT NOT NULL,
  additional_links TEXT,
  referral_code TEXT UNIQUE,
  referred_by TEXT,
  referral_count INTEGER DEFAULT 0,
  referral_earnings INTEGER DEFAULT 0,
  status TEXT DEFAULT 'pending',
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_creators_email ON creators(email);
CREATE INDEX IF NOT EXISTS idx_creators_referral_code ON creators(referral_code);
CREATE INDEX IF NOT EXISTS idx_creators_referred_by ON creators(referred_by);
CREATE INDEX IF NOT EXISTS idx_creators_status ON creators(status);
CREATE INDEX IF NOT EXISTS idx_creators_submitted ON creators(submitted_at DESC);
```

### Step 2: Create Referrals Tracking Table

```sql
CREATE TABLE IF NOT EXISTS referrals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  referrer_code TEXT NOT NULL,
  referred_email TEXT NOT NULL,
  referred_name TEXT,
  status TEXT DEFAULT 'pending', -- pending, approved, rejected
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_referrals_referrer_code ON referrals(referrer_code);
CREATE INDEX IF NOT EXISTS idx_referrals_referred_email ON referrals(referred_email);
CREATE INDEX IF NOT EXISTS idx_referrals_status ON referrals(status);
```

### Step 3: Create PostgreSQL Functions

```sql
-- Function to increment referral count
CREATE OR REPLACE FUNCTION increment_referral_count(ref_code TEXT)
RETURNS void AS $$
BEGIN
  UPDATE creators 
  SET referral_count = referral_count + 1 
  WHERE referral_code = ref_code;
END;
$$ LANGUAGE plpgsql;

-- Function to approve referrals and award bonuses
CREATE OR REPLACE FUNCTION approve_referral(referred_email TEXT, ref_code TEXT)
RETURNS void AS $$
BEGIN
  -- Update referral status
  UPDATE referrals 
  SET status = 'approved', updated_at = NOW()
  WHERE referred_email = referred_email AND referrer_code = ref_code;
  
  -- Check if referrer should get bonus (3+ approved referrals)
  IF (SELECT COUNT(*) FROM referrals 
      WHERE referrer_code = ref_code AND status = 'approved') >= 3 THEN
    UPDATE creators 
    SET referral_earnings = 500 
    WHERE referral_code = ref_code;
  END IF;
END;
$$ LANGUAGE plpgsql;
```

### Step 4: Enable RLS

```sql
-- Enable RLS on both tables
ALTER TABLE creators ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to INSERT creators
CREATE POLICY "Allow public insert on creators"
ON creators
FOR INSERT
TO anon
WITH CHECK (true);

-- Allow authenticated users to read creators
CREATE POLICY "Allow authenticated read on creators"
ON creators
FOR SELECT
TO authenticated
USING (true);

-- Allow anonymous users to INSERT referrals
CREATE POLICY "Allow public insert on referrals"
ON referrals
FOR INSERT
TO anon
WITH CHECK (true);

-- Allow authenticated users to read referrals
CREATE POLICY "Allow authenticated read on referrals"
ON referrals
FOR SELECT
TO authenticated
USING (true);
```

---

## 🔍 Verification Queries

Run these to verify your setup:

```sql
-- Check if tables exist
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('creator_applications', 'creators', 'referrals');

-- Check if columns were added (for Option 1)
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'creator_applications' 
AND column_name IN ('referral_code', 'referred_by', 'referral_count', 'referral_earnings');

-- Check if functions exist
SELECT routine_name 
FROM information_schema.routines 
WHERE routine_schema = 'public' 
AND routine_name IN ('increment_referral_count', 'approve_referral');

-- Check RLS is enabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('creator_applications', 'creators', 'referrals');
```

---

## 📊 Admin Queries

### Query 1: Top Referrers (Option 1 - creator_applications)

```sql
SELECT 
  full_name,
  email,
  referral_code,
  referral_count,
  COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_referrals,
  COUNT(CASE WHEN status = 'approved' THEN 1 END) as approved_referrals,
  referral_earnings
FROM creator_applications
WHERE referral_count > 0
GROUP BY id
ORDER BY referral_count DESC
LIMIT 20;
```

### Query 2: Top Referrers (Option 2 - creators)

```sql
SELECT 
  full_name,
  email,
  referral_code,
  referral_count,
  COUNT(CASE WHEN r.status = 'pending' THEN 1 END) as pending_referrals,
  COUNT(CASE WHEN r.status = 'approved' THEN 1 END) as approved_referrals,
  referral_earnings
FROM creators c
LEFT JOIN referrals r ON c.referral_code = r.referrer_code
WHERE c.referral_count > 0
GROUP BY c.id
ORDER BY c.referral_count DESC
LIMIT 20;
```

### Query 3: Pending Approvals

```sql
-- For Option 1 (creator_applications)
SELECT 
  full_name,
  email,
  referral_code,
  COUNT(r.id) as pending_count
FROM creator_applications ca
LEFT JOIN referrals r ON ca.referral_code = r.referrer_code AND r.status = 'pending'
WHERE ca.referral_count > 0
GROUP BY ca.id
HAVING COUNT(r.id) > 0
ORDER BY pending_count DESC;

-- For Option 2 (creators)
SELECT 
  full_name,
  email,
  referral_code,
  COUNT(r.id) as pending_count
FROM creators c
LEFT JOIN referrals r ON c.referral_code = r.referrer_code AND r.status = 'pending'
WHERE c.referral_count > 0
GROUP BY c.id
HAVING COUNT(r.id) > 0
ORDER BY pending_count DESC;
```

---

## 🎯 Recommended Approach

**Use Option 1** if:
- You want to keep everything in one table
- You have fewer creators
- You want simpler queries

**Use Option 2** if:
- You want better organization
- You plan to scale
- You want to separate concerns
- You want better performance

---

## ✅ Setup Checklist

- [ ] Choose Option 1 or Option 2
- [ ] Run the appropriate SQL commands
- [ ] Run verification queries
- [ ] Check that functions were created
- [ ] Check that RLS is enabled
- [ ] Test with sample data
- [ ] Update API endpoint to use correct table name
- [ ] Deploy to production

---

**Last Updated**: November 17, 2025
**Version**: 1.0

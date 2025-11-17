# Referral System Setup Guide - MakeUGC

## 📋 Overview

This guide walks you through setting up a complete referral system for MakeUGC creators. Creators can share referral links and earn rewards when referred creators get approved.

## 🗄️ Part 1: Database Setup (Supabase)

### Step 1: Update Creators Table

Run these SQL commands in your Supabase SQL Editor:

```sql
-- Add referral columns to creators table
ALTER TABLE creators ADD COLUMN IF NOT EXISTS referral_code TEXT UNIQUE;
ALTER TABLE creators ADD COLUMN IF NOT EXISTS referred_by TEXT;
ALTER TABLE creators ADD COLUMN IF NOT EXISTS referral_count INTEGER DEFAULT 0;
ALTER TABLE creators ADD COLUMN IF NOT EXISTS referral_earnings INTEGER DEFAULT 0;
ALTER TABLE creators ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'pending';

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_referral_code ON creators(referral_code);
CREATE INDEX IF NOT EXISTS idx_referred_by ON creators(referred_by);
```

### Step 2: Create Referrals Tracking Table

```sql
CREATE TABLE IF NOT EXISTS referrals (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  referrer_code TEXT NOT NULL,
  referred_email TEXT NOT NULL,
  referred_name TEXT,
  status TEXT DEFAULT 'pending', -- pending, approved, rejected
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_referrer_code ON referrals(referrer_code);
CREATE INDEX IF NOT EXISTS idx_referred_email ON referrals(referred_email);
CREATE INDEX IF NOT EXISTS idx_status ON referrals(status);
```

### Step 3: Create PostgreSQL Function for Incrementing Referral Count

```sql
CREATE OR REPLACE FUNCTION increment_referral_count(ref_code TEXT)
RETURNS void AS $$
BEGIN
  UPDATE creators 
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
    UPDATE creators 
    SET referral_earnings = 500 
    WHERE referral_code = ref_code;
  END IF;
END;
$$ LANGUAGE plpgsql;
```

## 🔧 Part 2: Frontend Implementation

### Step 1: Add Referral System Script

The referral system script is already added to all HTML files:
- File: `/public/assets/js/referral-system.js`
- Automatically captures referral codes from URL
- Stores in localStorage for persistence
- Displays referral section on thank you page

### Step 2: Update Creator Application Form

The form already includes:
- ✅ Hidden field for `referred_by`
- ✅ Automatic referral code capture
- ✅ Visual indicator when user is referred

### Step 3: Update Thank You Page

Add this to your thank you page HTML:

```html
<!-- Referral Section will be inserted here by JavaScript -->
```

The referral system automatically displays:
- ✅ Referral code display
- ✅ Copy link button
- ✅ WhatsApp share button
- ✅ Instagram caption copy button
- ✅ Referral rewards information

## 🌐 Part 3: API Setup

### Step 1: Environment Variables

Add to your `.env.local`:

```
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
```

### Step 2: API Endpoint

The API handler is located at:
- File: `/api/submit-application.js`
- Endpoint: `POST /api/submit-application`

Features:
- ✅ Generates unique referral code for each creator
- ✅ Tracks referral relationships
- ✅ Increments referrer's count
- ✅ Returns referral code for thank you page

### Step 3: Form Submission

Update your creator application form submission to:

```javascript
// Example form submission
const response = await fetch('/api/submit-application', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
});

const data = await response.json();

if (data.success) {
  // Redirect to thank you page with referral code
  window.location.href = `/creator-thank-you.html?code=${data.referralCode}&name=${encodeURIComponent(data.name)}`;
}
```

## 📊 Part 4: Admin Dashboard Queries

### Query 1: Top Referrers

```sql
SELECT 
  c.full_name,
  c.email,
  c.referral_code,
  c.referral_count,
  COUNT(CASE WHEN r.status = 'pending' THEN 1 END) as pending_referrals,
  COUNT(CASE WHEN r.status = 'approved' THEN 1 END) as approved_referrals,
  c.referral_earnings
FROM creators c
LEFT JOIN referrals r ON c.referral_code = r.referrer_code
WHERE c.referral_count > 0
GROUP BY c.id
ORDER BY c.referral_count DESC
LIMIT 20;
```

### Query 2: Referral Details for Specific Creator

```sql
SELECT 
  r.referred_name,
  r.referred_email,
  r.status,
  r.created_at,
  r.updated_at
FROM referrals r
WHERE r.referrer_code = 'ABC1234XYZ'
ORDER BY r.created_at DESC;
```

### Query 3: Pending Approvals

```sql
SELECT 
  c.full_name,
  c.email,
  c.referral_code,
  COUNT(r.id) as pending_count
FROM creators c
LEFT JOIN referrals r ON c.referral_code = r.referrer_code AND r.status = 'pending'
WHERE c.referral_count > 0
GROUP BY c.id
HAVING COUNT(r.id) > 0
ORDER BY pending_count DESC;
```

## 🎯 Part 5: Workflow

### Creator Application Flow

1. **Creator visits referral link**: `https://makeugc.in/creator-application.html?ref=ABC1234XYZ`
2. **System captures referral code**: Stored in localStorage
3. **Creator fills form**: Referral code automatically included
4. **Form submitted**: API generates new referral code for creator
5. **Thank you page**: Displays creator's referral code and sharing options
6. **Creator shares**: Can share via WhatsApp, Instagram, or copy link

### Approval Flow

1. **Admin reviews application**: In dashboard
2. **Admin approves creator**: Calls `approve_referral()` function
3. **System updates referral status**: Changes to 'approved'
4. **System checks bonus**: If 3+ approved referrals, awards ₹500 bonus
5. **Referrer notified**: Email sent with bonus information (optional)

## 📱 Part 6: Sharing Features

### WhatsApp Share
- Pre-filled message with referral link
- Customizable text
- Direct share to contacts

### Instagram Share
- Copy-to-clipboard caption
- Includes referral link
- Optimized for Instagram Stories/Posts

### Direct Link Copy
- One-click copy to clipboard
- Feedback confirmation
- Easy to share via email, SMS, etc.

## 🔐 Security Considerations

1. **Unique Referral Codes**: Generated from email + phone + random string
2. **Validation**: All inputs validated before database insertion
3. **Rate Limiting**: Recommended to add rate limiting to API
4. **Duplicate Prevention**: Referral codes are unique in database
5. **Email Verification**: Consider adding email verification before approval

## 📈 Metrics to Track

1. **Total Referrals**: Count of all referrals
2. **Conversion Rate**: Approved referrals / Total referrals
3. **Top Referrers**: Creators with most approved referrals
4. **Bonus Payouts**: Total ₹500 bonuses awarded
5. **Referral Revenue**: Cost per acquisition via referrals

## 🐛 Troubleshooting

### Referral Code Not Captured
- Check browser console for errors
- Verify localStorage is enabled
- Check URL has `?ref=CODE` parameter

### Referral Not Tracked
- Verify `referred_by` field is in form submission
- Check Supabase connection
- Verify referral code exists in creators table

### Bonus Not Awarded
- Check referral status is 'approved'
- Verify count is >= 3
- Check `approve_referral()` function is called

## 📞 Support

For issues:
1. Check browser console for errors
2. Check Supabase logs for database errors
3. Verify environment variables are set
4. Test API endpoint directly with curl/Postman

---

**Last Updated**: November 17, 2025
**Version**: 1.0
**Status**: Ready for Implementation

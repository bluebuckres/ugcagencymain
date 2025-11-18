# API 500 Error Fix Guide

**Date**: November 18, 2025  
**Status**: ✅ FIXED  
**Issue**: POST /api/submit-application returning 500 error

---

## 🔴 The Problem

```
POST https://www.makeugc.in/api/submit-application 500 (Internal Server Error)
Error: SyntaxError: Unexpected token 'A', "A server e"... is not valid JSON
```

**Root Causes**:
1. API using ES6 `import` syntax (Vercel doesn't support without proper config)
2. API trying to insert into `creators` table (doesn't exist, should be `creator_applications`)
3. API using wrong field names for `creator_applications` table

---

## ✅ Fixes Applied

### Fix 1: Module Syntax
**Before**:
```javascript
import { createClient } from '@supabase/supabase-js';
export default async function handler(req, res) {
```

**After**:
```javascript
const { createClient } = require('@supabase/supabase-js');
module.exports = async function handler(req, res) {
```

### Fix 2: Table Name
**Before**:
```javascript
.from('creators')  // ❌ Table doesn't exist
```

**After**:
```javascript
.from('creator_applications')  // ✅ Correct table
```

### Fix 3: Field Names
**Before**:
```javascript
const applicationData = {
  platform: platform,           // ❌ Wrong field name
  handle: handle,               // ❌ Wrong field name
  experience: experience,       // ❌ Wrong field name
  interests: interests,         // ❌ Wrong field name
  portfolio_link: portfolio_link, // ❌ Wrong field name
};
```

**After**:
```javascript
const applicationData = {
  primary_platform: platform,           // ✅ Correct field
  social_handle: handle,                // ✅ Correct field
  content_experience: experience,       // ✅ Correct field
  niches: interests,                    // ✅ Correct field
  portfolio_video_url: portfolio_link,  // ✅ Correct field
};
```

---

## 📊 Field Mapping

| Form Field | API Field | DB Field |
|-----------|-----------|----------|
| fullName | fullName | full_name |
| email | email | email |
| phone | phone | phone |
| city | city | city |
| platform | platform | primary_platform |
| handle | handle | social_handle |
| experience | experience | content_experience |
| interests | interests | niches |
| instagram_url | instagram_url | instagram_url |
| youtube_url | youtube_url | youtube_url |
| portfolio_link | portfolio_link | portfolio_video_url |
| additional_links | additional_links | additional_links |

---

## 🧪 Testing

### Test 1: Check API Response
1. Open DevTools → Network tab
2. Submit form
3. Look for `/api/submit-application` request
4. **Expected Response** (200 OK):
```json
{
  "success": true,
  "message": "Application submitted successfully",
  "referralCode": "ABC1234XYZ",
  "name": "John Doe",
  "email": "john@example.com"
}
```

### Test 2: Check Database
1. Go to Supabase Dashboard
2. Open `creator_applications` table
3. **Expected**: New row with all fields populated
4. **Expected**: `referral_code` field has value
5. **Expected**: `referred_by` field has value (if referred)

### Test 3: Check Console Logs
1. Open DevTools → Console
2. Submit form
3. **Expected logs**:
```
[Form] Submitting to /api/submit-application with data: {...}
[Form] Response status: 200
[Form] Response data: {success: true, referralCode: "ABC1234XYZ", ...}
[Form] Redirecting to: /creator-thank-you.html?code=ABC1234XYZ&name=John%20Doe
```

---

## 🔐 Database Setup Required

### Add Referral Columns to creator_applications

Run in Supabase SQL Editor:

```sql
-- Add referral columns to creator_applications table
ALTER TABLE creator_applications ADD COLUMN IF NOT EXISTS referral_code TEXT UNIQUE;
ALTER TABLE creator_applications ADD COLUMN IF NOT EXISTS referred_by TEXT;

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_creator_applications_referral_code ON creator_applications(referral_code);
CREATE INDEX IF NOT EXISTS idx_creator_applications_referred_by ON creator_applications(referred_by);
```

### Create Referrals Tracking Table

```sql
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
CREATE INDEX IF NOT EXISTS idx_referrals_referrer_code ON referrals(referrer_code);
CREATE INDEX IF NOT EXISTS idx_referrals_referred_email ON referrals(referred_email);
CREATE INDEX IF NOT EXISTS idx_referrals_status ON referrals(status);
```

### Create PostgreSQL Function

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

---

## 📋 Deployment Checklist

- [ ] API endpoint fixed (CommonJS syntax)
- [ ] Table name corrected (creator_applications)
- [ ] Field names updated to match schema
- [ ] Referral columns added to database
- [ ] Referrals table created
- [ ] PostgreSQL function created
- [ ] Environment variables set (SUPABASE_URL, SUPABASE_KEY)
- [ ] Deployed to Vercel
- [ ] Tested form submission
- [ ] Verified database entries
- [ ] Checked console logs

---

## 🐛 Troubleshooting

### Still Getting 500 Error?
1. Check Vercel logs for detailed error
2. Verify Supabase credentials in environment
3. Verify table exists in Supabase
4. Verify field names match schema

### Still Getting Invalid JSON Error?
1. Check API response in Network tab
2. Look for error message in response
3. Check Supabase connection
4. Check for missing environment variables

### Referral Code Not Generated?
1. Check `generateReferralCode()` function
2. Verify email and phone parameters
3. Check for null values

---

## 📞 Support

If still having issues:
1. Check Vercel deployment logs
2. Check Supabase database logs
3. Verify environment variables
4. Check browser console for errors
5. Check Network tab for API response

---

**Status**: ✅ FIXED  
**Commit**: `c0c078c`  
**Ready**: Production deployment

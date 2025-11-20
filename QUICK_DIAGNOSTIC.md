# Quick Diagnostic - Training Cohort Form

## 🔧 Run These Tests NOW

### Test 1: Check Console Logs
```
1. Open /creators.html
2. Press F12 (DevTools)
3. Go to Console tab
4. You should see:
   ✅ "Training Cohort Handler: Script loaded"
   ✅ "DOMContentLoaded: Looking for form..."
   ✅ "Form found successfully"
```

**If you DON'T see these:**
- Form handler script not loading
- Check: Is script tag present? (line 2155 in creators.html)

---

### Test 2: Check Form Exists
```
1. In Console, type:
   document.getElementById('trainingCohortForm')
   
2. Should return: <form id="trainingCohortForm" ...>
   NOT: null
```

**If returns null:**
- Form ID is wrong
- Check: Form ID in HTML (should be "trainingCohortForm")

---

### Test 3: Check All Form Fields
```
1. In Console, type:
   const fields = ['cohortFullName', 'cohortEmail', 'cohortPhone', 'cohortCity', 'cohortPlatform', 'cohortExperience', 'cohortNiche', 'cohortInstagram', 'cohortYoutube', 'cohortPortfolio', 'cohortMotivation', 'cohortName', 'cohortStartDate'];
   fields.forEach(id => console.log(id, document.getElementById(id) ? '✅' : '❌'));
   
2. All should show ✅
```

**If any show ❌:**
- Field ID is wrong
- Check: HTML form field IDs match handler expectations

---

### Test 4: Test Form Submission
```
1. Fill form with valid data:
   - Full Name: Test User
   - Email: test@example.com
   - Phone: +91-9876543210
   - City: Mumbai
   - Platform: Instagram
   - Experience: Beginner
   - Niche: Beauty
   - Motivation: Test

2. Click "Register for Training"

3. In Console, you should see:
   ✅ "Submitting form data: {...}"
   ✅ "API Response: {...}"
   ✅ "Form submitted successfully!"
```

**If you DON'T see these:**
- Form not submitting
- API not responding
- Check Network tab for request

---

### Test 5: Check Network Request
```
1. Open DevTools → Network tab
2. Fill and submit form
3. Look for request to: /api/submit-training-cohort
4. Should be: POST request
5. Status should be: 200 (success) or 4xx/5xx (error)
```

**If no request appears:**
- Form submission blocked
- Check: Is form.preventDefault() working?
- Check: Are there JavaScript errors?

---

### Test 6: Check API Response
```
1. In Network tab, click on /api/submit-training-cohort request
2. Go to Response tab
3. Should show:
   {
     "success": true,
     "message": "Training cohort registration submitted successfully",
     "name": "Test User",
     "email": "test@example.com",
     "cohort": "Next Available"
   }
```

**If you see error:**
- Check Response tab for error message
- Common errors:
  - "Server configuration error" → Missing env vars
  - "Failed to save application" → Database error
  - "Missing required fields" → Field names wrong

---

### Test 7: Check Success Modal
```
1. After successful submission
2. Should see modal with:
   ✓ Checkmark icon
   ✓ "Registration Successful!"
   ✓ Your name
   ✓ Your email
   ✓ Auto-closes after 5 seconds

3. In Console, check for errors
```

**If modal doesn't appear:**
- Check: Is showSuccessMessage() being called?
- Check: CSS for .cohort-success-overlay exists?
- Check: No JavaScript errors?

---

### Test 8: Check Database
```
1. Go to Supabase Dashboard
2. Navigate to training_cohort_registrations table
3. Should see new record with:
   - full_name: Test User
   - email: test@example.com
   - status: pending
   - submitted_at: current time
```

**If no record appears:**
- Database table doesn't exist
- RLS policies blocking insert
- API not actually calling database

---

## 🚨 If Tests Fail

### Scenario A: Console shows "Form not found"
**Solution:**
1. Check form ID in HTML (should be "trainingCohortForm")
2. Check script tag loads AFTER form (line 2155)
3. Reload page

### Scenario B: Form submits but no network request
**Solution:**
1. Check for JavaScript errors in console
2. Check form.preventDefault() is called
3. Check fetch() is working

### Scenario C: Network request fails (404)
**Solution:**
1. Check API file exists: `/api/submit-training-cohort.js`
2. Check endpoint path is correct: `/api/submit-training-cohort`
3. Check CORS headers are set

### Scenario D: Network request fails (500)
**Solution:**
1. Check Supabase credentials in .env
2. Check database table exists
3. Check RLS policies are set
4. Check API logs for errors

### Scenario E: Success modal doesn't appear
**Solution:**
1. Check CSS loads correctly
2. Check showSuccessMessage() function exists
3. Check no JavaScript errors
4. Check response.ok is true

---

## 📋 Checklist for Success

- [ ] Console shows "Script loaded"
- [ ] Console shows "Form found"
- [ ] Form fields all exist
- [ ] Form submits without errors
- [ ] Network request appears
- [ ] API returns 200 status
- [ ] Success modal appears
- [ ] Data appears in Supabase

---

## 🔗 Quick Links

- **Form HTML:** `/public/creators.html` (line 1918)
- **Form Handler:** `/public/assets/js/training-cohort-handler.js`
- **API Endpoint:** `/api/submit-training-cohort.js`
- **Database:** Supabase → training_cohort_registrations
- **Testing Audit:** `COHORT_TESTING_AUDIT.md`

---

**Run these diagnostics and report which test fails!**

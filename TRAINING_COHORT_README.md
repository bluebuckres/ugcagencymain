# Training Cohort Registration System

## Setup (2 steps)

### 1. Database
Copy and paste `TRAINING_COHORT_TABLE.sql` into Supabase SQL Editor → Run

### 2. Environment Variables
Ensure `.env` has:
```
SUPABASE_URL=your_url
SUPABASE_KEY=your_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
```

## Files Added/Modified

**New Files:**
- `/api/submit-training-cohort.js` - API endpoint
- `/public/assets/js/training-cohort-handler.js` - Form handler
- `TRAINING_COHORT_TABLE.sql` - Database table only

**Modified:**
- `/public/creators.html` - Added form section

## Form Location
`/creators.html` → "Join Next Training Cohort" section (between Application Process & FAQ)

## Form Fields
| Field | Required | Type |
|-------|----------|------|
| Full Name | ✓ | Text |
| Email | ✓ | Email |
| Phone | ✓ | Tel |
| City | ✓ | Text |
| Platform | ✓ | Select |
| Experience | ✓ | Select |
| Niche | ✓ | Text |
| Instagram | - | Text |
| YouTube | - | Text |
| Portfolio | - | URL |
| Motivation | ✓ | Textarea |
| Cohort | - | Select |
| Start Date | - | Date |

## API Endpoint
**POST** `/api/submit-training-cohort`

**Required Fields:** fullName, email, phone, city, platform, experienceLevel, contentNiche

**Response:** `{success: true, message, name, email, cohort}`

## Customization

### Add Cohort Option
Edit `/public/creators.html` line ~1742:
```html
<option value="April 2025">April 2025</option>
```

### Add Platform
Edit `/public/creators.html` line ~1691:
```html
<option value="LinkedIn">LinkedIn</option>
```

### Change Success Message
Edit `/public/assets/js/training-cohort-handler.js` line ~95:
```javascript
const successHTML = `<p>Your custom message</p>`;
```

## Database Queries

**View registrations:**
```sql
SELECT * FROM training_cohort_registrations ORDER BY submitted_at DESC;
```

**Count by cohort:**
```sql
SELECT cohort_name, COUNT(*) FROM training_cohort_registrations GROUP BY cohort_name;
```

**Count by platform:**
```sql
SELECT primary_platform, COUNT(*) FROM training_cohort_registrations GROUP BY primary_platform;
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Form not visible | Scroll to "Join Next Training Cohort" on /creators.html |
| Form not submitting | Check browser console, verify API endpoint |
| Data not saving | Verify RLS policies, check Supabase credentials |
| Success modal not showing | Check if form submission succeeded |

## Status
✅ Production Ready

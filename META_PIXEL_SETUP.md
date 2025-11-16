# Meta Pixel Setup & Ad Strategy for MakeUGC.in

## Overview
This document outlines the complete Meta Pixel implementation for MakeUGC.in, including setup instructions, event tracking, and testing procedures.

## 📊 Part 1: Meta Pixel Setup

### Step 1: Create Meta Pixel in Meta Events Manager

1. Go to [Meta Events Manager](https://business.facebook.com/events_manager)
2. Click **Connect Data Sources** → **Web** → **Meta Pixel**
3. Name it: `"MakeUGC Main Pixel"`
4. Copy your **Pixel ID** (16-digit number)
5. Save it securely

### Step 2: Configure Pixel ID

1. Open `/public/assets/js/meta-pixel.js`
2. Find line: `const PIXEL_ID = 'YOUR_PIXEL_ID_HERE';`
3. Replace with your actual Pixel ID: `const PIXEL_ID = '1234567890123456';`
4. Save the file

### Step 3: Verify Installation

The Meta Pixel script has been automatically added to all HTML files:
- ✅ Root pages (index.html, about.html, etc.)
- ✅ Blog pages (/blog/*.html)
- ✅ Tools pages (/tools/*.html)
- ✅ Legal pages (/legal/*.html)

## 📈 Part 2: Event Tracking Implementation

### Events Being Tracked

#### 1. **Creator Signup** (Lead Event)
- **Trigger**: Creator application form submission
- **Form ID**: `#creatorApplicationForm`
- **Data Attributes**: `data-form="creator-signup"`
- **Properties**:
  - `content_category`: "creator_signup"
  - `content_name`: "UGC Creator Application"

#### 2. **Contact Form** (Contact Event)
- **Trigger**: Contact form submission
- **Form ID**: `#contactForm`
- **Data Attributes**: `data-form="contact"`
- **Properties**:
  - `content_name`: "Brand Inquiry Form"

#### 3. **Calendar Booking** (Schedule Event)
- **Trigger**: Click on Calendly/Cal.com links
- **Selectors**: `a[href*="calendly"]`, `a[href*="cal.com"]`
- **Properties**:
  - `content_name`: "Consultation Booking"
  - `content_category`: "booking"

#### 4. **Page Views** (ViewContent Event)
- **Pricing/Services Page**:
  - `content_name`: "Services/Pricing Page"
  - `content_category`: "pricing"

- **Portfolio/Case Studies**:
  - `content_name`: "Portfolio/Case Studies"
  - `content_category`: "case_study"

- **Blog Posts**:
  - `content_name`: "Blog Post"
  - `content_category`: "content"

- **Creator Application Page**:
  - `content_name`: "Creator Application"
  - `content_category`: "creator_signup"

- **Resources Page**:
  - `content_name`: "Resources"
  - `content_category`: "lead_magnet"

#### 5. **CTA Clicks** (Lead Event)
- **Creator CTA**: Clicks on creator application links
- **Brand CTA**: Clicks on contact/inquiry links

#### 6. **Scroll Depth** (ViewContent Event)
- Tracks when users scroll to 25%, 50%, 75%, 100% of page
- Indicates engagement level

#### 7. **Video Engagement** (ViewContent Event)
- Tracks when videos are played
- `content_category`: "video_engagement"

#### 8. **Newsletter Signup** (Subscribe Event)
- **Trigger**: Newsletter form submission
- **Properties**:
  - `content_name`: "Newsletter Signup"
  - `content_category`: "newsletter"

#### 9. **Resource Downloads** (Lead Event)
- **Trigger**: Click on PDF, XLSX, CSV downloads
- **Properties**:
  - `content_name`: "Resource Download"
  - `content_category`: "lead_magnet"

## 🧪 Part 3: Testing & Verification

### Test 1: Verify Pixel Installation

1. **In Browser Console**:
   ```javascript
   // Check if fbq is loaded
   console.log(typeof fbq);  // Should return "function"
   
   // Check Pixel ID
   console.log(fbq.callMethod);  // Should exist
   ```

2. **Using Meta Pixel Helper Chrome Extension**:
   - Install [Meta Pixel Helper](https://chrome.google.com/webstore/detail/meta-pixel-helper/fdgodklomelorjahfeijockhot/reviews)
   - Visit your website
   - Check that Pixel fires "PageView" event
   - Look for green checkmark

3. **In Meta Events Manager**:
   - Go to Events Manager
   - Select your pixel
   - Go to "Test Events"
   - Visit your website and perform actions
   - Events should appear in real-time

### Test 2: Test Individual Events

#### Creator Signup Event
1. Go to `/creator-application.html`
2. Fill out the form
3. Submit
4. Check Meta Pixel Helper → should show "Lead" event
5. Verify in Events Manager

#### Contact Form Event
1. Go to `/contact.html`
2. Fill out the contact form
3. Submit
4. Check Meta Pixel Helper → should show "Contact" event

#### Calendar Booking Event
1. Click any Calendly/Cal.com link
2. Check Meta Pixel Helper → should show "Schedule" event

#### Page View Events
1. Visit `/services.html`
2. Check Meta Pixel Helper → should show "ViewContent" event with `content_category: "pricing"`

#### Scroll Depth Event
1. Visit any page
2. Scroll down to 25%, 50%, 75%, 100%
3. Check Meta Pixel Helper → should show multiple "ViewContent" events

### Test 3: Debug Mode

To enable debug logging:

1. Open `/public/assets/js/meta-pixel.js`
2. Change: `const DEBUG_MODE = false;` to `const DEBUG_MODE = true;`
3. Open browser console
4. You'll see detailed logs of all tracked events

## 🎯 Part 4: Ad Strategy Implementation

### Conversion Tracking Setup

1. **In Meta Ads Manager**:
   - Go to Conversions
   - Create new conversion
   - Select your Pixel
   - Map events to conversions:
     - **Lead** → "Creator Application" or "Brand Inquiry"
     - **Contact** → "Contact Form Submission"
     - **Subscribe** → "Newsletter Signup"
     - **Schedule** → "Consultation Booking"

2. **Create Conversion Events**:
   - Creator Signup Conversion
   - Brand Inquiry Conversion
   - Newsletter Signup Conversion
   - Consultation Booking Conversion

### Audience Building

1. **Website Visitors Audience**:
   - All visitors (28-day window)
   - Used for retargeting

2. **Creator Applicants Audience**:
   - Users who submitted creator application
   - Used for nurture campaigns

3. **Brand Inquiries Audience**:
   - Users who submitted contact form
   - Used for sales follow-up

4. **Engaged Users Audience**:
   - Users who scrolled 75%+ on pages
   - Used for engagement campaigns

### Campaign Structure

```
MakeUGC Campaigns
├── Creator Acquisition
│   ├── Awareness (Reach)
│   ├── Consideration (Traffic)
│   └── Conversion (Leads)
├── Brand Services
│   ├── Awareness (Reach)
│   ├── Consideration (Traffic)
│   └── Conversion (Leads)
└── Retargeting
    ├── Website Visitors
    ├── Creator Applicants
    └── Brand Inquiries
```

## 📋 Checklist

- [x] Meta Pixel code created
- [x] Pixel ID placeholder added
- [x] Script added to all HTML files
- [x] Creator form tracking enabled
- [x] Contact form tracking enabled
- [x] Calendar booking tracking enabled
- [x] Page view tracking enabled
- [x] Scroll depth tracking enabled
- [x] Video engagement tracking enabled
- [x] Newsletter tracking enabled
- [x] Resource download tracking enabled
- [ ] Replace `YOUR_PIXEL_ID_HERE` with actual Pixel ID
- [ ] Test all events in Meta Pixel Helper
- [ ] Verify events in Events Manager
- [ ] Create conversions in Ads Manager
- [ ] Build audiences
- [ ] Launch campaigns

## 🔧 Troubleshooting

### Pixel Not Firing

1. **Check Pixel ID**: Ensure it's correctly set in `meta-pixel.js`
2. **Check Console**: Look for errors in browser console
3. **Enable Debug Mode**: Set `DEBUG_MODE = true` to see logs
4. **Check noscript tag**: Verify noscript fallback is in place

### Events Not Appearing

1. **Check Event Name**: Verify event name matches Meta's standard events
2. **Check Selectors**: Ensure form IDs and selectors are correct
3. **Check Timing**: Events may take 15-30 minutes to appear in Events Manager
4. **Check Filters**: Verify no ad blockers are preventing pixel firing

### Conversion Not Tracking

1. **Verify Event**: Ensure event is firing (check Pixel Helper)
2. **Verify Mapping**: Check conversion is mapped to correct event
3. **Check Pixel**: Ensure correct pixel is selected in conversion setup
4. **Wait for Data**: Conversions need time to accumulate

## 📞 Support

For issues or questions:
1. Check Meta Pixel Helper logs
2. Review Events Manager real-time data
3. Check browser console for errors
4. Refer to [Meta Pixel Documentation](https://developers.facebook.com/docs/facebook-pixel)

---

**Last Updated**: November 16, 2025
**Version**: 1.0
**Status**: Ready for Production

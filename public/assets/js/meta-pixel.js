// Meta Pixel Setup & Ad Strategy for MakeUGC.in
// Professional implementation with comprehensive event tracking

(function() {
  'use strict';
  
  // Configuration
  const PIXEL_ID = 'YOUR_PIXEL_ID_HERE'; // Replace with your actual Meta Pixel ID
  const DEBUG_MODE = false; // Set to true for development
  
  // Initialize Meta Pixel
  !function(f,b,e,v,n,t,s) {
    if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)
  }(window, document,'script',
  'https://connect.facebook.net/en_US/fbevents.js');
  
  fbq('init', PIXEL_ID);
  fbq('track', 'PageView');
  
  // Utility function for logging
  function log(message, data) {
    if (DEBUG_MODE) {
      console.log(`[Meta Pixel] ${message}`, data || '');
    }
  }
  
  // ============================================
  // 1. CREATOR SIGNUP TRACKING
  // ============================================
  function trackCreatorSignup() {
    const creatorForm = document.getElementById('creatorApplicationForm');
    if (creatorForm) {
      creatorForm.addEventListener('submit', function(e) {
        fbq('track', 'Lead', {
          content_category: 'creator_signup',
          content_name: 'UGC Creator Application',
          value: 0,
          currency: 'INR'
        });
        log('Creator Signup Tracked', { form: 'creatorApplicationForm' });
      });
    }
  }
  
  // ============================================
  // 2. BRAND/CONTACT FORM TRACKING
  // ============================================
  function trackContactForms() {
    // Contact form
    const contactForm = document.querySelector('form[id*="contact"]');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        fbq('track', 'Contact', {
          content_name: 'Brand Inquiry Form'
        });
        log('Contact Form Tracked');
      });
    }
    
    // Service quiz form
    const quizForm = document.querySelector('form[id*="quiz"]');
    if (quizForm) {
      quizForm.addEventListener('submit', function(e) {
        fbq('track', 'Lead', {
          content_category: 'service_inquiry',
          content_name: 'Service Quiz'
        });
        log('Service Quiz Tracked');
      });
    }
  }
  
  // ============================================
  // 3. CALENDAR BOOKING TRACKING
  // ============================================
  function trackCalendarBookings() {
    const calendarLinks = document.querySelectorAll('a[href*="calendly"], a[href*="cal.com"], a[href*="acuityscheduling"]');
    calendarLinks.forEach(link => {
      link.addEventListener('click', function() {
        fbq('track', 'Schedule', {
          content_name: 'Consultation Booking',
          content_category: 'booking'
        });
        log('Calendar Booking Tracked', { url: link.href });
      });
    });
  }
  
  // ============================================
  // 4. PAGE-SPECIFIC TRACKING
  // ============================================
  function trackPageViews() {
    const pathname = window.location.pathname;
    
    // Pricing page
    if (pathname.includes('services') || pathname.includes('pricing')) {
      fbq('track', 'ViewContent', {
        content_name: 'Services/Pricing Page',
        content_category: 'pricing',
        content_type: 'product'
      });
      log('Pricing Page Tracked');
    }
    
    // Portfolio/Work
    if (pathname.includes('portfolio') || pathname.includes('work') || pathname.includes('case-study')) {
      fbq('track', 'ViewContent', {
        content_name: 'Portfolio/Case Studies',
        content_category: 'case_study',
        content_type: 'product'
      });
      log('Portfolio Page Tracked');
    }
    
    // Blog pages
    if (pathname.includes('blog')) {
      fbq('track', 'ViewContent', {
        content_name: 'Blog Post',
        content_category: 'content',
        content_type: 'article'
      });
      log('Blog Page Tracked');
    }
    
    // Creator application page
    if (pathname.includes('creator') || pathname.includes('apply')) {
      fbq('track', 'ViewContent', {
        content_name: 'Creator Application',
        content_category: 'creator_signup',
        content_type: 'product'
      });
      log('Creator Application Page Tracked');
    }
    
    // Resources page
    if (pathname.includes('resources')) {
      fbq('track', 'ViewContent', {
        content_name: 'Resources',
        content_category: 'lead_magnet',
        content_type: 'product'
      });
      log('Resources Page Tracked');
    }
  }
  
  // ============================================
  // 5. CTA BUTTON TRACKING
  // ============================================
  function trackCTAClicks() {
    // Apply as creator button
    const creatorCTAs = document.querySelectorAll('a[href*="creator"], button[data-action="apply-creator"]');
    creatorCTAs.forEach(btn => {
      btn.addEventListener('click', function() {
        fbq('track', 'Lead', {
          content_name: 'Creator CTA Click',
          content_category: 'creator_signup'
        });
        log('Creator CTA Clicked');
      });
    });
    
    // Brand inquiry button
    const brandCTAs = document.querySelectorAll('a[href*="contact"], button[data-action="brand-inquiry"]');
    brandCTAs.forEach(btn => {
      btn.addEventListener('click', function() {
        fbq('track', 'Lead', {
          content_name: 'Brand Inquiry CTA Click',
          content_category: 'brand_inquiry'
        });
        log('Brand CTA Clicked');
      });
    });
  }
  
  // ============================================
  // 6. SCROLL DEPTH TRACKING
  // ============================================
  function trackScrollDepth() {
    let scrollTracked = {
      25: false,
      50: false,
      75: false,
      100: false
    };
    
    window.addEventListener('scroll', function() {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      
      if (scrollPercent >= 25 && !scrollTracked[25]) {
        fbq('track', 'ViewContent', {
          content_name: 'Scroll 25%',
          content_category: 'engagement'
        });
        scrollTracked[25] = true;
        log('Scroll 25% Tracked');
      }
      
      if (scrollPercent >= 50 && !scrollTracked[50]) {
        fbq('track', 'ViewContent', {
          content_name: 'Scroll 50%',
          content_category: 'engagement'
        });
        scrollTracked[50] = true;
        log('Scroll 50% Tracked');
      }
      
      if (scrollPercent >= 75 && !scrollTracked[75]) {
        fbq('track', 'ViewContent', {
          content_name: 'Scroll 75%',
          content_category: 'engagement'
        });
        scrollTracked[75] = true;
        log('Scroll 75% Tracked');
      }
      
      if (scrollPercent >= 100 && !scrollTracked[100]) {
        fbq('track', 'ViewContent', {
          content_name: 'Scroll 100%',
          content_category: 'engagement'
        });
        scrollTracked[100] = true;
        log('Scroll 100% Tracked');
      }
    });
  }
  
  // ============================================
  // 7. VIDEO ENGAGEMENT TRACKING
  // ============================================
  function trackVideoEngagement() {
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
      video.addEventListener('play', function() {
        fbq('track', 'ViewContent', {
          content_name: 'Video Play',
          content_category: 'video_engagement'
        });
        log('Video Play Tracked');
      });
    });
  }
  
  // ============================================
  // 8. NEWSLETTER SIGNUP TRACKING
  // ============================================
  function trackNewsletterSignup() {
    const newsletterForms = document.querySelectorAll('form[id*="newsletter"], form[data-form="newsletter"]');
    newsletterForms.forEach(form => {
      form.addEventListener('submit', function(e) {
        fbq('track', 'Subscribe', {
          content_name: 'Newsletter Signup',
          content_category: 'newsletter'
        });
        log('Newsletter Signup Tracked');
      });
    });
  }
  
  // ============================================
  // 9. RESOURCE DOWNLOAD TRACKING
  // ============================================
  function trackResourceDownloads() {
    const downloadLinks = document.querySelectorAll('a[href*=".pdf"], a[href*=".xlsx"], a[href*=".csv"], a[data-action="download"]');
    downloadLinks.forEach(link => {
      link.addEventListener('click', function() {
        fbq('track', 'Lead', {
          content_name: 'Resource Download',
          content_category: 'lead_magnet'
        });
        log('Resource Download Tracked', { url: link.href });
      });
    });
  }
  
  // ============================================
  // 10. INITIALIZATION
  // ============================================
  function init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        setupTracking();
      });
    } else {
      setupTracking();
    }
  }
  
  function setupTracking() {
    log('Meta Pixel Initialization Started');
    
    trackCreatorSignup();
    trackContactForms();
    trackCalendarBookings();
    trackPageViews();
    trackCTAClicks();
    trackScrollDepth();
    trackVideoEngagement();
    trackNewsletterSignup();
    trackResourceDownloads();
    
    log('Meta Pixel Initialization Complete');
  }
  
  // Start initialization
  init();
  
})();

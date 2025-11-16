// Meta Pixel - CSP Compliant Version
// Dynamically loads Meta Pixel script with proper error handling

(function() {
  'use strict';
  
  const PIXEL_ID = 'YOUR_PIXEL_ID_HERE'; // Replace with your actual pixel ID
  const DEBUG_MODE = false;
  
  // Load Meta Pixel Script
  function loadFacebookPixel() {
    if (window.fbq) return;
    
    var n = window.fbq = function() {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    
    if (!window._fbq) window._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = '2.0';
    n.queue = [];
    
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://connect.facebook.net/en_US/fbevents.js';
    
    script.onerror = function() {
      console.warn('Meta Pixel script failed to load. Check CSP settings.');
    };
    
    script.onload = function() {
      log('Meta Pixel loaded successfully');
      initializePixel();
    };
    
    var firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode.insertBefore(script, firstScript);
  }
  
  function initializePixel() {
    if (!window.fbq) {
      console.error('fbq not available');
      return;
    }
    
    fbq('init', PIXEL_ID);
    fbq('track', 'PageView');
    
    log('Meta Pixel initialized:', PIXEL_ID);
    setupEventTracking();
  }
  
  function log(message, data) {
    if (DEBUG_MODE) {
      console.log('[Meta Pixel] ' + message, data || '');
    }
  }
  
  function setupEventTracking() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', attachEventListeners);
    } else {
      attachEventListeners();
    }
  }
  
  function attachEventListeners() {
    // Creator signup tracking
    var creatorForms = document.querySelectorAll('[data-form="creator-signup"]');
    creatorForms.forEach(function(form) {
      form.addEventListener('submit', function(e) {
        if (window.fbq) {
          fbq('track', 'Lead', {
            content_category: 'creator_signup',
            content_name: 'UGC Creator Application'
          });
          log('Tracked: Creator Signup');
        }
      });
    });
    
    // Brand inquiry tracking
    var brandForms = document.querySelectorAll('[data-form="brand-inquiry"]');
    brandForms.forEach(function(form) {
      form.addEventListener('submit', function(e) {
        if (window.fbq) {
          fbq('track', 'Lead', {
            content_category: 'brand_inquiry',
            content_name: 'Brand UGC Request'
          });
          log('Tracked: Brand Inquiry');
        }
      });
    });
    
    // Contact form tracking
    var contactForms = document.querySelectorAll('[data-form="contact"]');
    contactForms.forEach(function(form) {
      form.addEventListener('submit', function(e) {
        if (window.fbq) {
          fbq('track', 'Contact');
          log('Tracked: Contact Form');
        }
      });
    });
    
    // Calendar booking tracking
    var calendarLinks = document.querySelectorAll('a[href*="calendly"], a[href*="cal.com"], a[href*="calendar"]');
    calendarLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        if (window.fbq) {
          fbq('track', 'Schedule', {
            content_name: 'Consultation Booking'
          });
          log('Tracked: Calendar Click');
        }
      });
    });
    
    // CTA button tracking
    var ctaButtons = document.querySelectorAll('[data-track="cta"]');
    ctaButtons.forEach(function(button) {
      button.addEventListener('click', function() {
        if (window.fbq) {
          fbq('track', 'Lead');
          log('Tracked: CTA Button');
        }
      });
    });
    
    // Pricing page view
    if (window.location.pathname.includes('pricing') || window.location.pathname.includes('services')) {
      if (window.fbq) {
        fbq('track', 'ViewContent', {
          content_name: 'Pricing Page',
          content_category: 'pricing'
        });
      }
    }
    
    // Case study view
    if (window.location.pathname.includes('52x-roas') || window.location.pathname.includes('case-study')) {
      if (window.fbq) {
        fbq('track', 'ViewContent', {
          content_name: 'Case Study',
          content_category: 'case_study'
        });
      }
    }
    
    log('Event listeners attached');
  }
  
  // Start loading
  loadFacebookPixel();
  
})();

// Referral System - MakeUGC
// Handles referral code capture, storage, and tracking

(function() {
  'use strict';

  class ReferralSystem {
    constructor() {
      this.STORAGE_KEY = 'makeugc_referral_code';
      this.init();
    }

    init() {
      this.captureReferralCode();
      this.setupFormTracking();
      this.setupThankYouPage();
    }

    // Capture referral code from URL
    captureReferralCode() {
      const urlParams = new URLSearchParams(window.location.search);
      const refCode = urlParams.get('ref');

      if (refCode) {
        localStorage.setItem(this.STORAGE_KEY, refCode);
        console.log('[Referral] Captured referral code:', refCode);
      }
    }

    // Get stored referral code
    getReferralCode() {
      return localStorage.getItem(this.STORAGE_KEY);
    }

    // Clear referral code
    clearReferralCode() {
      localStorage.removeItem(this.STORAGE_KEY);
    }

    // Setup form tracking
    setupFormTracking() {
      const creatorForm = document.getElementById('creatorApplicationForm');
      if (!creatorForm) return;

      // Add hidden field for referral code
      const referralInput = document.createElement('input');
      referralInput.type = 'hidden';
      referralInput.name = 'referred_by';
      referralInput.id = 'referred_by';
      creatorForm.appendChild(referralInput);

      // Update referral code before submission
      creatorForm.addEventListener('submit', (e) => {
        const refCode = this.getReferralCode();
        if (refCode) {
          document.getElementById('referred_by').value = refCode;
          console.log('[Referral] Form submitted with referral code:', refCode);
        }
      });

      // Show referral indicator if code exists
      this.showReferralIndicator(creatorForm);
    }

    // Show visual indicator if user was referred
    showReferralIndicator(form) {
      const refCode = this.getReferralCode();
      if (!refCode) return;

      const indicator = document.createElement('div');
      indicator.className = 'referral-indicator';
      indicator.innerHTML = `
        <div style="background: #d4edda; border: 2px solid #28a745; border-radius: 8px; padding: 12px; margin-bottom: 20px; color: #155724; font-size: 14px;">
          ✅ <strong>Referred by:</strong> ${refCode}
        </div>
      `;
      form.insertBefore(indicator, form.firstChild);
    }

    // Setup thank you page
    setupThankYouPage() {
      if (!window.location.pathname.includes('thank-you')) return;

      const urlParams = new URLSearchParams(window.location.search);
      const referralCode = urlParams.get('code');
      const name = urlParams.get('name');

      if (referralCode) {
        this.displayReferralSection(referralCode, name);
      }
    }

    // Display referral section on thank you page
    displayReferralSection(code, name) {
      const baseUrl = window.location.origin;
      const referralLink = `${baseUrl}/creator-application.html?ref=${code}`;

      const section = document.createElement('div');
      section.className = 'referral-section';
      section.innerHTML = `
        <div style="background: #f0f9ff; border: 2px solid #0ea5e9; border-radius: 12px; padding: 24px; margin: 24px 0; text-align: center;">
          <h2 style="font-size: 24px; font-weight: bold; margin-bottom: 16px;">🎁 Refer & Earn Rewards</h2>
          
          <p style="color: #333; margin-bottom: 16px;">
            Share this opportunity with creator friends:
          </p>
          
          <ul style="text-align: left; display: inline-block; color: #555; margin-bottom: 20px; line-height: 1.8;">
            <li>✨ Refer 3 creators who get selected → Get ₹500 bonus</li>
            <li>🏆 Top referrer each month → Extra project priority</li>
            <li>💰 Unlimited referrals = Unlimited earnings</li>
          </ul>

          <div style="background: white; padding: 12px; border-radius: 8px; margin-bottom: 16px; word-break: break-all; font-size: 13px; font-family: monospace; border: 1px solid #ddd;">
            ${referralLink}
          </div>

          <div style="display: flex; flex-wrap: wrap; gap: 12px; justify-content: center; margin-bottom: 16px;">
            <button onclick="window.referralSystem.copyLink('${referralLink}')" style="background: #1f2937; color: white; padding: 12px 24px; border-radius: 8px; border: none; cursor: pointer; font-weight: 600; transition: background 0.3s;">
              📋 Copy Link
            </button>

            <a href="https://wa.me/?text=${encodeURIComponent(`🎬 Join India's top UGC agency! Get paid to create content for brands.\n\n✅ No experience needed\n✅ Work from home\n✅ Keep all products\n\nApply here: ${referralLink}`)}" target="_blank" rel="noopener noreferrer" style="background: #25d366; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; display: inline-block; transition: background 0.3s;">
              💬 Share on WhatsApp
            </a>

            <button onclick="window.referralSystem.copyInstagramCaption('${referralLink}')" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 24px; border-radius: 8px; border: none; cursor: pointer; font-weight: 600; transition: opacity 0.3s;">
              📱 Copy for Instagram
            </button>
          </div>

          <p style="font-size: 12px; color: #666; margin-top: 16px;">
            Your referral code: <strong style="font-family: monospace; font-size: 14px;">${code}</strong>
          </p>
        </div>
      `;

      // Insert after thank you message
      const thankYouSection = document.querySelector('h1, .thank-you-message');
      if (thankYouSection) {
        thankYouSection.parentNode.insertBefore(section, thankYouSection.nextSibling);
      } else {
        document.body.appendChild(section);
      }

      // Clear referral code after displaying
      this.clearReferralCode();
    }

    // Copy referral link
    copyLink(link) {
      navigator.clipboard.writeText(link).then(() => {
        alert('✅ Referral link copied to clipboard!');
      }).catch(() => {
        alert('Failed to copy. Please try again.');
      });
    }

    // Copy Instagram caption
    copyInstagramCaption(link) {
      const caption = `🎬 Get paid to create content!\n\n✅ No experience needed\n✅ Work from home\n✅ Keep all products\n\nLink in bio or DM me!\n\nOr apply: ${link}`;
      navigator.clipboard.writeText(caption).then(() => {
        alert('✅ Instagram caption copied! Paste it in your post 📱');
      }).catch(() => {
        alert('Failed to copy. Please try again.');
      });
    }

    // Track referral in Meta Pixel
    trackReferral(referralCode) {
      if (window.fbq) {
        fbq('track', 'Lead', {
          content_category: 'referral',
          content_name: 'Creator Referral',
          value: referralCode
        });
      }
    }
  }

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.referralSystem = new ReferralSystem();
    });
  } else {
    window.referralSystem = new ReferralSystem();
  }

})();

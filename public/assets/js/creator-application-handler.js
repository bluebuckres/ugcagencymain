/**
 * Creator Application Form Handler with Referral System
 * Handles creator application form submission with referral tracking and redirect
 */

(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        const form = document.getElementById('creatorApplicationForm');
        
        if (!form) {
            console.error('Creator application form not found');
            return;
        }

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnContent = submitBtn ? submitBtn.innerHTML : '';

        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Validate form
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            // SPAM CHECK: Honeypot field (catches bots)
            const honeypot = form.querySelector('input[name="website"]');
            if (honeypot && honeypot.value.trim() !== '') {
                console.warn('Honeypot field filled - spam detected');
                showError('Invalid form submission detected');
                return;
            }

            // Show loading state
            setLoadingState(true);

            // Collect form data with correct field names for referral API
            const fullNameInput = form.querySelector('input[name="fullName"]');
            const emailInput = form.querySelector('input[name="email"]');
            const phoneInput = form.querySelector('input[name="phone"]');
            const cityInput = form.querySelector('input[name="city"]');
            const platformInput = form.querySelector('select[name="platform"]');
            const handleInput = form.querySelector('input[name="handle"]');
            const experienceInput = form.querySelector('textarea[name="experience"]');
            const interestsInput = form.querySelector('textarea[name="interests"]');
            const instagramUrlInput = form.querySelector('input[name="instagram_url"]');
            const youtubeUrlInput = form.querySelector('input[name="youtube_url"]');
            const portfolioLinkInput = form.querySelector('input[name="portfolio_link"]');
            const additionalLinksInput = form.querySelector('textarea[name="additional_links"]');
            const referredByInput = form.querySelector('input[name="referred_by"]');

            const formData = {
                fullName: fullNameInput.value.trim(),
                email: emailInput.value.trim(),
                phone: phoneInput.value.trim() || null,
                city: cityInput.value.trim(),
                platform: platformInput.value || null,
                handle: handleInput.value.trim() || null,
                experience: experienceInput.value.trim() || null,
                interests: interestsInput.value.trim(),
                instagram_url: instagramUrlInput.value.trim() || null,
                youtube_url: youtubeUrlInput.value.trim() || null,
                portfolio_link: portfolioLinkInput.value.trim(),
                additional_links: additionalLinksInput.value.trim() || null,
                referred_by: referredByInput ? referredByInput.value : null
            };

            try {
                // Submit to referral-enabled API endpoint
                console.log('[Form] Submitting to /api/submit-application with data:', formData);
                
                const response = await fetch('/api/submit-application', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData),
                    timeout: 10000
                });

                console.log('[Form] Response status:', response.status);
                const data = await response.json();
                console.log('[Form] Response data:', data);

                if (!response.ok || data.error) {
                    throw new Error(data.error || `HTTP error! status: ${response.status}`);
                }

                // Success! Redirect to thank you page with referral code
                console.log('[Form] Application submitted successfully:', data);
                if (data.success && data.referralCode) {
                    // Redirect to thank you page with referral code and name
                    const redirectUrl = `/creator-thank-you.html?code=${encodeURIComponent(data.referralCode)}&name=${encodeURIComponent(data.name)}`;
                    console.log('[Form] Redirecting to:', redirectUrl);
                    window.location.href = redirectUrl;
                } else {
                    showSuccess();
                }

                // Track event if analytics available
                if (window.ugcAnalytics && typeof window.ugcAnalytics.trackEvent === 'function') {
                    window.ugcAnalytics.trackEvent('creator_application_submitted', {
                        platform: formData.platform,
                        city: formData.city
                    });
                }

            } catch (error) {
                console.error('Error submitting creator application:', error);
                
                let errorMessage = 'Something went wrong! Please try again or contact us at connect@makeugc.in';
                
                if (error.message.includes('network')) {
                    errorMessage = 'Internet connection issue. Please check your connection.';
                } else if (error.message.includes('wait')) {
                    errorMessage = error.message;
                }
                
                showError(errorMessage);
            } finally {
                setLoadingState(false);
            }
        });

        // Helper Functions
        function setLoadingState(isLoading) {
            if (!submitBtn) return;
            
            if (isLoading) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = `
                    <svg class="animate-spin" style="width: 20px; height: 20px; display: inline; margin-right: 8px;" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                `;
                submitBtn.classList.add('opacity-70', 'cursor-not-allowed');
            } else {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnContent;
                submitBtn.classList.remove('opacity-70', 'cursor-not-allowed');
            }
        }

        function showSuccess() {
            const successDiv = document.createElement('div');
            successDiv.className = 'success-notification';
            successDiv.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                background: linear-gradient(135deg, #8B9A7A 0%, #7A8471 100%);
                color: white;
                padding: 1.5rem 2rem;
                border-radius: 16px;
                box-shadow: 0 10px 40px rgba(139, 154, 122, 0.4);
                z-index: 9999;
                max-width: 450px;
                animation: slideInRight 0.4s ease-out;
            `;
            successDiv.innerHTML = `
                <div style="display: flex; align-items: start; gap: 1rem;">
                    <div style="width: 48px; height: 48px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                        <svg style="width: 28px; height: 28px; color: #8B9A7A;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
                        </svg>
                    </div>
                    <div>
                        <strong style="display: block; margin-bottom: 0.5rem; font-size: 1.1rem;">Application Submitted! 🎉</strong>
                        <p style="margin: 0; font-size: 0.95rem; opacity: 0.95;">Thank you for applying! We'll review your application and get back to you within 2-3 business days.</p>
                    </div>
                </div>
            `;
            
            document.body.appendChild(successDiv);
            
            setTimeout(() => {
                successDiv.style.animation = 'slideOutRight 0.4s ease-out';
                setTimeout(() => successDiv.remove(), 400);
            }, 6000);
        }

        function showError(message) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-notification';
            errorDiv.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
                color: white;
                padding: 1.5rem 2rem;
                border-radius: 16px;
                box-shadow: 0 10px 40px rgba(239, 68, 68, 0.4);
                z-index: 9999;
                max-width: 450px;
                animation: slideInRight 0.4s ease-out;
            `;
            errorDiv.innerHTML = `
                <div style="display: flex; align-items: start; gap: 1rem;">
                    <div style="width: 48px; height: 48px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                        <svg style="width: 28px; height: 28px; color: #ef4444;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <div>
                        <strong style="display: block; margin-bottom: 0.5rem; font-size: 1.1rem;">Oops! Something went wrong</strong>
                        <p style="margin: 0; font-size: 0.95rem; opacity: 0.95;">${message}</p>
                    </div>
                </div>
            `;
            
            document.body.appendChild(errorDiv);
            
            setTimeout(() => {
                errorDiv.style.animation = 'slideOutRight 0.4s ease-out';
                setTimeout(() => errorDiv.remove(), 400);
            }, 7000);
        }
    });

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        .animate-spin {
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
})();

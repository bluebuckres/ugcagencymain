/**
 * Creator Application Form Handler with Spam Protection
 * Handles creator application form submission with honeypot and rate limiting
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

            // SPAM CHECK 1: Honeypot field (catches bots)
            const honeypot = form.querySelector('input[name="website"]');
            if (honeypot && honeypot.value.trim() !== '') {
                console.warn('Honeypot field filled - spam detected');
                showError('Invalid form submission detected');
                return;
            }

            // Show loading state
            setLoadingState(true);

            // Collect form data
            const fullNameInput = form.querySelector('input[name="fullName"]');
            const emailInput = form.querySelector('input[name="email"]');
            const phoneInput = form.querySelector('input[name="phone"]');
            const cityInput = form.querySelector('input[name="city"]');
            const instagramInput = form.querySelector('input[name="instagram"]');
            const experienceInput = form.querySelector('select[name="experience"]');
            const categoriesCheckboxes = form.querySelectorAll('input[name="categories"]:checked');
            const bioInput = form.querySelector('textarea[name="bio"]');

            const selectedCategories = Array.from(categoriesCheckboxes).map(cb => cb.value);

            const formData = {
                full_name: fullNameInput.value.trim(),
                email: emailInput.value.trim(),
                phone: phoneInput.value.trim() || null,
                city: cityInput.value.trim(),
                instagram_handle: instagramInput.value.trim() || null,
                experience_level: experienceInput.value || null,
                content_categories: selectedCategories.length > 0 ? selectedCategories : null,
                bio: bioInput.value.trim() || null,
                submitted_at: new Date().toISOString()
            };

            try {
                // Submit via serverless proxy
                const response = await fetch('/api/submit', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ table: 'creator_applications', data: formData }),
                    timeout: 10000
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                if (result.error) throw new Error(result.error);

                // Success
                console.log('Creator application submitted successfully:', formData);
                showSuccess();

                // Track event if analytics available
                if (window.ugcAnalytics && typeof window.ugcAnalytics.trackEvent === 'function') {
                    window.ugcAnalytics.trackEvent('creator_application_submitted', {
                        categories_count: selectedCategories.length,
                        experience_level: formData.experience_level
                    });
                }

                // Reset form after delay
                setTimeout(() => {
                    form.reset();
                }, 1500);

            } catch (error) {
                console.error('Error submitting creator application:', error);
                
                let errorMessage = 'Something went wrong! Please try again or contact us at contact@makeugc.in';
                
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

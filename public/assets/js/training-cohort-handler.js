// Training Cohort Registration Form Handler
// Handles form submission and validation for training cohort registrations

console.log('✅ Training Cohort Handler: Script loaded');

function initializeTrainingCohortForm() {
  console.log('📋 Initializing: Looking for form with ID: trainingCohortForm');
  
  const form = document.getElementById('trainingCohortForm');
  
  if (!form) {
    console.error('❌ CRITICAL: Form not found! ID: trainingCohortForm');
    console.log('📊 Available forms on page:', document.querySelectorAll('form').length);
    console.log('📊 Form IDs:', Array.from(document.querySelectorAll('form')).map(f => f.id));
    return;
  }
  
  console.log('✅ Form found successfully:', form);

  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    // Get form elements
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    
    try {
      // Show loading state
      submitBtn.disabled = true;
      submitBtn.textContent = 'Submitting...';

      // Collect form data
      const formData = {
        fullName: document.getElementById('cohortFullName').value.trim(),
        email: document.getElementById('cohortEmail').value.trim(),
        phone: document.getElementById('cohortPhone').value.trim(),
        city: document.getElementById('cohortCity').value.trim(),
        platform: document.getElementById('cohortPlatform').value.trim(),
        experienceLevel: document.getElementById('cohortExperience').value.trim(),
        contentNiche: document.getElementById('cohortNiche').value.trim(),
        instagramHandle: document.getElementById('cohortInstagram').value.trim() || null,
        youtubeChannel: document.getElementById('cohortYoutube').value.trim() || null,
        portfolioLink: document.getElementById('cohortPortfolio').value.trim() || null,
        motivation: document.getElementById('cohortMotivation').value.trim() || null,
        cohortName: document.getElementById('cohortName').value.trim() || null,
        cohortStartDate: document.getElementById('cohortStartDate').value.trim() || null
      };

      // Validate required fields
      if (!formData.fullName || !formData.email || !formData.phone || !formData.city || 
          !formData.platform || !formData.experienceLevel || !formData.contentNiche) {
        alert('Please fill in all required fields');
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        alert('Please enter a valid email address');
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
        return;
      }

      // Validate phone format (basic)
      const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
      if (!phoneRegex.test(formData.phone)) {
        alert('Please enter a valid phone number');
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
        return;
      }

      // Log form data before submission
      console.log('📤 Submitting form data:', formData);

      // Submit to API
      const response = await fetch('/api/submit-training-cohort', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      
      console.log('📥 API Response:', result);
      console.log('📊 Response Status:', response.status);

      if (!response.ok) {
        console.error('❌ API Error:', result);
        throw new Error(result.error || 'Failed to submit registration');
      }

      console.log('✅ Form submitted successfully!');
      
      // Success - show thank you message
      showSuccessMessage(result, formData);
      form.reset();

    } catch (error) {
      console.error('Form submission error:', error);
      alert('Error submitting registration: ' + error.message);
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
    }
  });

  function showSuccessMessage(result, formData) {
    // Create and show success modal with cohort info
    const cohortInfo = formData.cohortName ? `<p class="cohort-info-display">📅 <strong>Preferred Cohort:</strong> ${formData.cohortName}</p>` : '';
    
    const successHTML = `
      <div class="cohort-success-overlay">
        <div class="cohort-success-modal">
          <div class="success-icon">✓</div>
          <h3>Registration Successful!</h3>
          <p>Hi <strong>${formData.fullName}</strong>,</p>
          <p>Thank you for registering for our training cohort. We've received your application and will review it shortly.</p>
          <p class="confirmation-email">A confirmation email has been sent to <strong>${formData.email}</strong></p>
          ${cohortInfo}
          <div class="cohort-details">
            <p><strong>Next Cohorts Available:</strong></p>
            <ul class="cohort-list">
              <li>December 2025</li>
              <li>January 2026</li>
              <li>February 2026</li>
              <li>March 2026</li>
            </ul>
          </div>
          <p class="next-steps">We'll contact you within 24-48 hours with next steps and cohort details.</p>
          <button class="btn-close-success" onclick="this.closest('.cohort-success-overlay').remove()">Close</button>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', successHTML);

    // Auto-close after 5 seconds
    setTimeout(() => {
      const overlay = document.querySelector('.cohort-success-overlay');
      if (overlay) {
        overlay.remove();
      }
    }, 5000);
  }
}

// Initialize form when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeTrainingCohortForm);
} else {
  initializeTrainingCohortForm();
}

// Also initialize if form is added dynamically (for modal)
const observer = new MutationObserver(function(mutations) {
  const form = document.getElementById('trainingCohortForm');
  if (form && !form.dataset.initialized) {
    console.log('📋 Form detected dynamically, initializing...');
    form.dataset.initialized = 'true';
    initializeTrainingCohortForm();
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

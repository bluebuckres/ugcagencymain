// Modal Loader - Creates training cohort modal dynamically
console.log('✅ Modal Loader: Script loaded');

// Make function global so it's accessible from HTML onclick
window.openTrainingCohortModal = function() {
    console.log('🔄 Opening training cohort modal...');
    console.log('📍 Function called from:', event?.target?.outerHTML || 'unknown');
    
    // Create modal styles
    const styles = `
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            animation: fadeIn 0.3s ease-out;
        }
        
        .modal-content {
            background: white;
            border-radius: 12px;
            max-width: 600px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            animation: slideUp 0.3s ease-out;
        }
        
        .modal-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 2rem;
            border-bottom: 1px solid #eee;
        }
        
        .modal-header h2 {
            color: #2C2C2C;
            font-size: 1.5rem;
            margin: 0;
        }
        
        .close-btn {
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            color: #2C2C2C;
            padding: 0;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .close-btn:hover {
            color: #8B9A7A;
        }
        
        .modal-body {
            padding: 2rem;
        }
        
        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
            margin-bottom: 1.5rem;
        }
        
        .form-group {
            display: flex;
            flex-direction: column;
        }
        
        .form-group.full-width {
            grid-column: 1 / -1;
        }
        
        .form-group label {
            font-weight: 600;
            color: #2C2C2C;
            margin-bottom: 0.5rem;
            font-size: 0.95rem;
        }
        
        .form-group input,
        .form-group select,
        .form-group textarea {
            padding: 0.75rem;
            border: 1px solid #ddd;
            border-radius: 8px;
            font-family: 'Inter', sans-serif;
            font-size: 1rem;
            transition: all 0.3s;
            background: white;
        }
        
        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: #8B9A7A;
            box-shadow: 0 0 0 3px rgba(139, 154, 122, 0.1);
        }
        
        .form-group textarea {
            resize: vertical;
            min-height: 100px;
        }
        
        .btn-submit {
            width: 100%;
            padding: 1rem;
            background: #8B9A7A;
            color: white;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.3s;
            margin-top: 1rem;
        }
        
        .btn-submit:hover {
            background: #7a8a6a;
            transform: translateY(-2px);
        }
        
        .btn-submit:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }
        
        .form-note {
            text-align: center;
            color: #2C2C2C;
            opacity: 0.7;
            font-size: 0.9rem;
            margin-top: 1rem;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes slideUp {
            from {
                transform: translateY(20px);
                opacity: 0;
            }
            to {
                transform: translateY(0);
                opacity: 1;
            }
        }
        
        /* Success Modal Styles */
        .cohort-success-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 3000;
            animation: fadeIn 0.3s ease-out;
        }
        
        .cohort-success-modal {
            background: white;
            padding: 3rem;
            border-radius: 12px;
            max-width: 500px;
            text-align: center;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
            animation: slideUp 0.3s ease-out;
        }
        
        .success-icon {
            font-size: 3rem;
            color: #8B9A7A;
            margin-bottom: 1rem;
        }
        
        .cohort-success-modal h3 {
            color: #2C2C2C;
            margin-bottom: 1rem;
            font-size: 1.5rem;
        }
        
        .cohort-success-modal p {
            color: #2C2C2C;
            margin-bottom: 1rem;
            line-height: 1.6;
        }
        
        .confirmation-email {
            background: #FAF8F5;
            padding: 1rem;
            border-radius: 8px;
            margin: 1rem 0;
        }
        
        .cohort-info-display {
            color: #8B9A7A;
            font-weight: 600;
            margin: 1rem 0;
        }
        
        .cohort-details {
            background: #f0f4f0;
            padding: 1.5rem;
            border-radius: 8px;
            margin: 1.5rem 0;
            text-align: left;
        }
        
        .cohort-details p {
            margin-bottom: 0.5rem;
            text-align: center;
        }
        
        .cohort-list {
            list-style: none;
            padding: 0;
            margin: 1rem 0 0 0;
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.5rem;
        }
        
        .cohort-list li {
            background: white;
            padding: 0.75rem;
            border-radius: 6px;
            border: 1px solid #8B9A7A;
            color: #2C2C2C;
            font-weight: 500;
        }
        
        .next-steps {
            color: #8B9A7A;
            font-weight: 600;
            margin: 1rem 0;
        }
        
        .btn-close-success {
            background: #8B9A7A;
            color: white;
            border: none;
            padding: 0.75rem 2rem;
            border-radius: 8px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s;
            margin-top: 1rem;
        }
        
        .btn-close-success:hover {
            background: #7a8a6a;
            transform: translateY(-2px);
        }
        
        @media (max-width: 768px) {
            .form-row {
                grid-template-columns: 1fr;
            }
            
            .modal-content {
                width: 95%;
                max-height: 95vh;
            }
            
            .modal-header {
                padding: 1.5rem;
            }
            
            .modal-body {
                padding: 1.5rem;
            }
            
            .cohort-success-modal {
                padding: 2rem;
                max-width: 90%;
            }
            
            .cohort-list {
                grid-template-columns: 1fr;
            }
        }
    `;
    
    // Create modal HTML
    const modalHTML = `
        <div class="modal-overlay" id="trainingCohortOverlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Join Training Cohort</h2>
                    <button class="close-btn" onclick="closeTrainingCohortModal()">&times;</button>
                </div>
                <div class="modal-body">
                    <form id="trainingCohortForm">
                        <div class="form-row">
                            <div class="form-group">
                                <label for="cohortFullName">Full Name *</label>
                                <input type="text" id="cohortFullName" name="fullName" required>
                            </div>
                            <div class="form-group">
                                <label for="cohortEmail">Email Address *</label>
                                <input type="email" id="cohortEmail" name="email" required>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="cohortPhone">Phone Number *</label>
                                <input type="tel" id="cohortPhone" name="phone" required>
                            </div>
                            <div class="form-group">
                                <label for="cohortCity">City *</label>
                                <input type="text" id="cohortCity" name="city" required>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="cohortPlatform">Primary Platform *</label>
                                <select id="cohortPlatform" name="platform" required>
                                    <option value="">Select Platform</option>
                                    <option value="Instagram">Instagram</option>
                                    <option value="YouTube">YouTube</option>
                                    <option value="TikTok">TikTok</option>
                                    <option value="Instagram Reels">Instagram Reels</option>
                                    <option value="YouTube Shorts">YouTube Shorts</option>
                                    <option value="Multiple">Multiple Platforms</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="cohortExperience">Experience Level *</label>
                                <select id="cohortExperience" name="experienceLevel" required>
                                    <option value="">Select Level</option>
                                    <option value="Beginner">Beginner (0-6 months)</option>
                                    <option value="Intermediate">Intermediate (6-12 months)</option>
                                    <option value="Advanced">Advanced (1+ years)</option>
                                </select>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="cohortNiche">Content Niche *</label>
                                <input type="text" id="cohortNiche" name="contentNiche" placeholder="e.g., Beauty, Tech, Lifestyle" required>
                            </div>
                            <div class="form-group">
                                <label for="cohortInstagram">Instagram Handle</label>
                                <input type="text" id="cohortInstagram" name="instagramHandle" placeholder="@yourhandle">
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="cohortYoutube">YouTube Channel</label>
                                <input type="text" id="cohortYoutube" name="youtubeChannel" placeholder="Channel name or URL">
                            </div>
                            <div class="form-group">
                                <label for="cohortPortfolio">Portfolio Link</label>
                                <input type="url" id="cohortPortfolio" name="portfolioLink" placeholder="Link to your best work">
                            </div>
                        </div>
                        
                        <div class="form-group full-width">
                            <label for="cohortMotivation">Why do you want to join this training? *</label>
                            <textarea id="cohortMotivation" name="motivation" placeholder="Tell us about your goals and what you hope to achieve" required></textarea>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label for="cohortName">Preferred Cohort</label>
                                <select id="cohortName" name="cohortName">
                                    <option value="">Next Available</option>
                                    <option value="December 2025">December 2025</option>
                                    <option value="January 2026">January 2026</option>
                                    <option value="February 2026">February 2026</option>
                                    <option value="March 2026">March 2026</option>
                                    <option value="April 2026">April 2026</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label for="cohortStartDate">Preferred Start Date</label>
                                <input type="date" id="cohortStartDate" name="cohortStartDate">
                            </div>
                        </div>
                        
                        <button type="submit" class="btn-submit">Register for Training →</button>
                        <p class="form-note">We'll review your application and contact you within 24-48 hours</p>
                    </form>
                </div>
            </div>
        </div>
    `;
    
    // Add styles to head
    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    document.head.appendChild(styleElement);
    console.log('✅ Styles added to head');
    
    // Add modal to body
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    console.log('✅ Modal added to DOM');
    
    // Get modal and add event listeners
    const overlay = document.getElementById('trainingCohortOverlay');
    if (overlay) {
        console.log('✅ Modal element found');
        
        // Close on overlay click
        overlay.addEventListener('click', function(e) {
            if (e.target === this) {
                window.closeTrainingCohortModal();
            }
        });
        
        // Close on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                window.closeTrainingCohortModal();
            }
        });
    }
};

// Make close function global
window.closeTrainingCohortModal = function() {
    console.log('🔄 Closing modal...');
    const overlay = document.getElementById('trainingCohortOverlay');
    if (overlay) {
        overlay.remove();
        console.log('✅ Modal closed');
    }
};

// Verify functions are accessible
console.log('✅ openTrainingCohortModal available:', typeof window.openTrainingCohortModal);
console.log('✅ closeTrainingCohortModal available:', typeof window.closeTrainingCohortModal);

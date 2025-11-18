// API Handler: Creator Application Submission with Referral Tracking
// Endpoint: /api/submit-application

const { createClient } = require('@supabase/supabase-js');

// Generate unique referral code
function generateReferralCode(email, phone) {
  const emailPart = email.substring(0, 3).toUpperCase();
  const phonePart = phone.slice(-4);
  const randomPart = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `${emailPart}${phonePart}${randomPart}`;
}

module.exports = async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Content-Type', 'application/json');
  
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Check credentials
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase credentials');
      return res.status(500).json({ error: 'Server configuration error: Missing credentials' });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    const {
      fullName,
      email,
      phone,
      city,
      platform,
      handle,
      experience,
      interests,
      instagram_url,
      youtube_url,
      portfolio_link,
      additional_links,
      referred_by
    } = req.body;

    // Validate required fields
    if (!fullName || !email || !city || !platform || !interests) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Generate unique referral code for this applicant
    const newReferralCode = generateReferralCode(email, phone || '0000');

    // Prepare application data - using creator_applications table
    const applicationData = {
      full_name: fullName,
      email: email,
      phone: phone || null,
      city: city,
      primary_platform: platform,
      social_handle: handle || null,
      content_experience: experience || null,
      niches: interests,
      instagram_url: instagram_url || null,
      youtube_url: youtube_url || null,
      portfolio_video_url: portfolio_link || null,
      additional_links: additional_links || null,
      referral_code: newReferralCode,
      referred_by: referred_by || null,
      submitted_at: new Date().toISOString()
    };

    console.log('Inserting application data:', applicationData);

    // Insert the application into creator_applications table
    const { data: newCreator, error: insertError } = await supabase
      .from('creator_applications')
      .insert([applicationData])
      .select()
      .single();

    if (insertError) {
      console.error('Insert error:', insertError);
      return res.status(400).json({ 
        error: 'Failed to insert application',
        details: insertError.message 
      });
    }

    console.log('Application inserted successfully:', newCreator);

    // If they were referred, track it (non-blocking)
    if (referred_by) {
      try {
        // Add to referrals table
        const { error: referralError } = await supabase
          .from('referrals')
          .insert([{
            referrer_code: referred_by,
            referred_email: email,
            referred_name: fullName,
            status: 'pending',
            created_at: new Date().toISOString()
          }]);

        if (referralError) {
          console.warn('Referral tracking error (non-blocking):', referralError);
        }
      } catch (error) {
        console.warn('Error tracking referral (non-blocking):', error);
      }
    }

    // Return success with their unique referral code
    return res.status(200).json({
      success: true,
      message: 'Application submitted successfully',
      referralCode: newReferralCode,
      name: fullName,
      email: email
    });

  } catch (error) {
    console.error('Submission error:', error);
    return res.status(500).json({
      error: 'Submission failed',
      details: error.message || 'Unknown error'
    });
  }
}

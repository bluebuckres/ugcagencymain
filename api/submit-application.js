// API Handler: Creator Application Submission with Referral Tracking
// Endpoint: /api/submit-application

const { createClient } = require('@supabase/supabase-js');

// Generate unique referral code
function generateReferralCode(email, phone) {
  try {
    const emailPart = email.substring(0, 3).toUpperCase();
    const phonePart = (phone || '0000').slice(-4);
    const randomPart = Math.random().toString(36).substring(2, 5).toUpperCase();
    return `${emailPart}${phonePart}${randomPart}`;
  } catch (e) {
    return 'REF' + Math.random().toString(36).substring(2, 11).toUpperCase();
  }
}

module.exports = async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Content-Type', 'application/json');
  
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Check credentials - use SERVICE_ROLE_KEY for server-side operations
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase credentials');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Create Supabase client
    let supabase;
    try {
      supabase = createClient(supabaseUrl, supabaseKey);
    } catch (clientError) {
      console.error('Failed to create Supabase client:', clientError);
      return res.status(500).json({ error: 'Database connection failed' });
    }

    // Extract and validate request body
    const body = req.body || {};
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
    } = body;

    // Validate required fields
    if (!fullName || !email || !city || !platform || !interests) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        received: { fullName, email, city, platform, interests }
      });
    }

    // Generate unique referral code
    const newReferralCode = generateReferralCode(email, phone);

    // Prepare application data - using creator_applications table
    const applicationData = {
      full_name: String(fullName).trim(),
      email: String(email).trim().toLowerCase(),
      phone: phone ? String(phone).trim() : null,
      city: String(city).trim(),
      primary_platform: String(platform).trim(),
      social_handle: handle ? String(handle).trim() : null,
      content_experience: experience ? String(experience).trim() : null,
      niches: String(interests).trim(),
      instagram_url: instagram_url ? String(instagram_url).trim() : null,
      youtube_url: youtube_url ? String(youtube_url).trim() : null,
      portfolio_video_url: portfolio_link ? String(portfolio_link).trim() : null,
      additional_links: additional_links ? String(additional_links).trim() : null,
      referral_code: newReferralCode,
      referred_by: referred_by ? String(referred_by).trim() : null,
      submitted_at: new Date().toISOString()
    };

    // Insert the application
    const { data: newCreator, error: insertError } = await supabase
      .from('creator_applications')
      .insert([applicationData]);

    if (insertError) {
      console.error('Insert error:', insertError);
      return res.status(400).json({ 
        error: 'Failed to save application',
        details: insertError.message 
      });
    }

    // Track referral if provided (non-blocking)
    if (referred_by) {
      try {
        await supabase
          .from('referrals')
          .insert([{
            referrer_code: referred_by,
            referred_email: email,
            referred_name: fullName,
            status: 'pending',
            created_at: new Date().toISOString()
          }]);
      } catch (error) {
        console.warn('Referral tracking failed (non-blocking):', error);
      }
    }

    // Return success
    return res.status(200).json({
      success: true,
      message: 'Application submitted successfully',
      referralCode: newReferralCode,
      name: fullName,
      email: email
    });

  } catch (error) {
    console.error('Handler error:', error);
    return res.status(500).json({
      error: 'Server error',
      message: error.message || 'Unknown error'
    });
  }
}

// API Handler: Training Cohort Registration Submission
// Endpoint: /api/submit-training-cohort

const { createClient } = require('@supabase/supabase-js');

module.exports = async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
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
      experienceLevel,
      contentNiche,
      instagramHandle,
      youtubeChannel,
      portfolioLink,
      motivation,
      cohortName,
      cohortStartDate
    } = body;

    // Validate required fields
    if (!fullName || !email || !phone || !city || !platform || !experienceLevel || !contentNiche) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        received: { fullName, email, phone, city, platform, experienceLevel, contentNiche }
      });
    }

    // Prepare registration data
    const registrationData = {
      full_name: String(fullName).trim(),
      email: String(email).trim().toLowerCase(),
      phone: String(phone).trim(),
      city: String(city).trim(),
      primary_platform: String(platform).trim(),
      experience_level: String(experienceLevel).trim(),
      content_niche: String(contentNiche).trim(),
      instagram_handle: instagramHandle ? String(instagramHandle).trim() : null,
      youtube_channel: youtubeChannel ? String(youtubeChannel).trim() : null,
      portfolio_link: portfolioLink ? String(portfolioLink).trim() : null,
      motivation: motivation ? String(motivation).trim() : null,
      cohort_name: cohortName ? String(cohortName).trim() : null,
      cohort_start_date: cohortStartDate ? String(cohortStartDate).trim() : null,
      status: 'pending',
      submitted_at: new Date().toISOString()
    };

    // Insert the registration
    const { data: newRegistration, error: insertError } = await supabase
      .from('training_cohort_registrations')
      .insert([registrationData]);

    if (insertError) {
      console.error('Insert error:', insertError);
      return res.status(400).json({ 
        error: 'Failed to save registration',
        details: insertError.message 
      });
    }

    // Return success
    return res.status(200).json({
      success: true,
      message: 'Training cohort registration submitted successfully',
      name: fullName,
      email: email,
      cohort: cohortName || 'Next Available'
    });

  } catch (error) {
    console.error('Handler error:', error);
    return res.status(500).json({
      error: 'Server error',
      message: error.message || 'Unknown error'
    });
  }
}

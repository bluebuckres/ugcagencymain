// API Handler: Creator Application Submission with Referral Tracking
// Endpoint: /api/submit-application

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase credentials');
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Generate unique referral code
function generateReferralCode(email, phone) {
  const emailPart = email.substring(0, 3).toUpperCase();
  const phonePart = phone.slice(-4);
  const randomPart = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `${emailPart}${phonePart}${randomPart}`;
}

export default async function handler(req, res) {
  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
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

    // Prepare application data
    const applicationData = {
      full_name: fullName,
      email: email,
      phone: phone || null,
      city: city,
      platform: platform,
      handle: handle || null,
      experience: experience || null,
      interests: interests,
      instagram_url: instagram_url || null,
      youtube_url: youtube_url || null,
      portfolio_link: portfolio_link || null,
      additional_links: additional_links || null,
      referral_code: newReferralCode,
      referred_by: referred_by || null,
      status: 'pending',
      created_at: new Date().toISOString()
    };

    // Insert the application
    const { data: newCreator, error: insertError } = await supabase
      .from('creators')
      .insert([applicationData])
      .select()
      .single();

    if (insertError) {
      console.error('Insert error:', insertError);
      throw insertError;
    }

    // If they were referred, track it
    if (referred_by) {
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
        console.error('Referral tracking error:', referralError);
        // Don't fail the application if referral tracking fails
      }

      // Increment referrer's count
      try {
        await supabase.rpc('increment_referral_count', {
          ref_code: referred_by
        });
      } catch (error) {
        console.error('Error incrementing referral count:', error);
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
      message: error.message
    });
  }
}

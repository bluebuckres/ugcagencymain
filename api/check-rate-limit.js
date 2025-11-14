import { createClient } from '@supabase/supabase-js';

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 3600000; // 1 hour in milliseconds
const MAX_SUBMISSIONS_PER_HOUR = 3;

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Whitelist of allowed tables
const ALLOWED_TABLES = ['connect.inquiries', 'creator_applications'];

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN || '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, table } = req.body || {};

  // Validate input
  if (!email || !table) {
    return res.status(400).json({ error: 'Missing email or table' });
  }

  // Security: Whitelist table names
  if (!ALLOWED_TABLES.includes(table)) {
    return res.status(403).json({ error: 'Access denied' });
  }

  try {
    // Check recent submissions from this email
    const oneHourAgo = new Date(Date.now() - RATE_LIMIT_WINDOW).toISOString();
    
    const { data, error } = await supabase
      .from(table)
      .select('id, submitted_at')
      .eq('email', email.toLowerCase())
      .gte('submitted_at', oneHourAgo)
      .order('submitted_at', { ascending: false });

    if (error) throw error;

    // Check if rate limit exceeded
    if (data && data.length >= MAX_SUBMISSIONS_PER_HOUR) {
      const lastSubmission = new Date(data[0].submitted_at);
      const nextAllowedTime = new Date(lastSubmission.getTime() + RATE_LIMIT_WINDOW);
      const minutesUntilNext = Math.ceil((nextAllowedTime - Date.now()) / 60000);

      return res.status(429).json({
        blocked: true,
        message: `Please wait ${minutesUntilNext} minutes before submitting again`,
        retryAfter: minutesUntilNext
      });
    }

    // Not blocked
    return res.status(200).json({
      blocked: false,
      submissionsThisHour: data ? data.length : 0,
      remainingSubmissions: MAX_SUBMISSIONS_PER_HOUR - (data ? data.length : 0)
    });

  } catch (err) {
    console.error('Rate limit check error:', err);
    return res.status(500).json({ error: 'Failed to check rate limit' });
  }
}

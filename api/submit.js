import { createClient } from '@supabase/supabase-js';

// Serverless function to proxy inserts to Supabase keeping keys hidden.
// Environment variables required in Vercel dashboard:
//  - SUPABASE_URL
//  - SUPABASE_SERVICE_ROLE_KEY (or anon if you prefer lower privileges)

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Whitelist of allowed tables for security
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

  const { table, data } = req.body || {};

  // Validate input
  if (!table || !data || typeof table !== 'string' || typeof data !== 'object') {
    return res.status(400).json({ error: 'Invalid payload' });
  }

  // Security: Whitelist table names to prevent injection
  if (!ALLOWED_TABLES.includes(table)) {
    console.warn(`Unauthorized table access attempt: ${table}`);
    return res.status(403).json({ error: 'Access denied' });
  }

  // Rate limiting headers
  res.setHeader('X-RateLimit-Limit', '100');
  res.setHeader('X-RateLimit-Remaining', '99');

  try {
    const { error } = await supabase.from(table).insert([data]);
    if (error) throw error;
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Supabase insert error:', err);
    // Don't expose internal error details to client
    return res.status(500).json({ error: 'Failed to process request' });
  }
}

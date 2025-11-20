-- ============================================
-- TRAINING COHORT TABLE ONLY
-- Copy and paste this into Supabase SQL Editor
-- ============================================

CREATE TABLE training_cohort_registrations (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  city TEXT NOT NULL,
  primary_platform TEXT NOT NULL,
  experience_level TEXT NOT NULL,
  content_niche TEXT NOT NULL,
  instagram_handle TEXT,
  youtube_channel TEXT,
  portfolio_link TEXT,
  motivation TEXT,
  cohort_name TEXT,
  cohort_start_date DATE,
  status TEXT DEFAULT 'pending',
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX idx_training_cohort_email ON training_cohort_registrations(email);
CREATE INDEX idx_training_cohort_submitted ON training_cohort_registrations(submitted_at DESC);
CREATE INDEX idx_training_cohort_status ON training_cohort_registrations(status);
CREATE INDEX idx_training_cohort_cohort ON training_cohort_registrations(cohort_name);

-- Enable RLS
ALTER TABLE training_cohort_registrations ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Allow public insert on training_cohort_registrations"
ON training_cohort_registrations
FOR INSERT
TO anon
WITH CHECK (true);

CREATE POLICY "Allow authenticated read on training_cohort_registrations"
ON training_cohort_registrations
FOR SELECT
TO authenticated
USING (true);

-- Verify
SELECT * FROM training_cohort_registrations LIMIT 1;

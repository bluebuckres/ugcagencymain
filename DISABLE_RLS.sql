-- Disable RLS on contact_inquiries table
ALTER TABLE public.contact_inquiries DISABLE ROW LEVEL SECURITY;

-- Disable RLS on creator_applications table
ALTER TABLE public.creator_applications DISABLE ROW LEVEL SECURITY;

-- Verify RLS is disabled
SELECT tablename, rowsecurity FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('contact_inquiries', 'creator_applications');

import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://zzfaxllhhklyqlngnkyh.supabase.co';
const supabaseKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp6ZmF4bGxoaGtseXFsbmdua3loIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODc4NzIwMjMsImV4cCI6MjAwMzQ0ODAyM30.QvYVEzGgJVdNwRbHxTEAJMyxEuMCjhD7CZJD-RG9-Mo';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

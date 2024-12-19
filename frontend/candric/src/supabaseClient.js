import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cwgqkmqptdnhmbyyonqj.supabase.co';  // Replace with your Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN3Z3FrbXFwdGRuaG1ieXlvbnFqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ1MzMwMDEsImV4cCI6MjA1MDEwOTAwMX0.YITVD5MbBaSxOnlTODrrx3P25Aocizot0mRpyxtubeE';  // Replace with your Supabase anon public key
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

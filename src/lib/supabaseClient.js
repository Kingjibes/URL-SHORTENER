import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vxohcflpxsdlkeidceeq.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ4b2hjZmxweHNkbGtlaWRjZWVxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2Nzc1MjcsImV4cCI6MjA2NTI1MzUyN30.c6ev70WeeXpKqR_0lQKx_zvEijXPNvq5qBi6_oYTjcE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
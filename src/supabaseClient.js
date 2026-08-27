import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://tocoapazcefpiytczjop.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_espkys4mz7TKqqERkTqnIQ_X673mSZk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

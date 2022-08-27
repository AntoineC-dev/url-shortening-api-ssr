import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
  autoRefreshToken: false,
  persistSession: false,
});

export const loginWithGithub = () => supabaseClient.auth.signIn({ provider: "github" });
export const logout = () => supabaseClient.auth.signOut();
export const getSupabaseUser = () => supabaseClient.auth.user();

import { createClient } from "@supabase/supabase-js";

// 環境変数の安全な取得
const getEnvVar = (key: string): string | undefined => {
  try {
    return typeof import.meta !== 'undefined' && import.meta.env ? import.meta.env[key] : undefined;
  } catch {
    return undefined;
  }
};

const supabaseUrl = getEnvVar('VITE_SUPABASE_URL') || "https://hyqefzhiugwacdrilhwr.supabase.co";
const supabaseAnonKey = getEnvVar('VITE_SUPABASE_ANON_KEY') || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh5cWVmemhpdWd3YWNkcmlsaHdyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM5NDY0MTYsImV4cCI6MjA2OTUyMjQxNn0.KH1fesa5dCmshgaOLm7TXq0YvBPwoK6C8vRuBQOQ95w";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
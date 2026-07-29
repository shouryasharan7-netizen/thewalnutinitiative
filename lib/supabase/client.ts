import { createBrowserClient } from '@supabase/ssr';

/**
 * Supabase client for use in Client Components ("use client").
 * Safe to call repeatedly — each call returns a lightweight client
 * bound to the browser's cookie jar.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

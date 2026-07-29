'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push('/courses');
    router.refresh();
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-16">
      <h1 className="font-display text-3xl text-green">Log in</h1>
      <p className="mt-2 text-sm text-green-dark/70">
        Welcome back — pick up your course progress where you left off.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-3">
        <input
          required
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-xl2 border border-green/15 bg-beige-paper px-4 py-3 text-sm shadow-soft-inset focus:outline-none focus:ring-2 focus:ring-green/40"
        />
        <input
          required
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-xl2 border border-green/15 bg-beige-paper px-4 py-3 text-sm shadow-soft-inset focus:outline-none focus:ring-2 focus:ring-green/40"
        />
        {error && <p className="text-xs text-walnut">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-fit rounded-full bg-green px-6 py-3 text-sm font-medium text-beige-paper shadow-soft transition-transform duration-200 ease-out-soft hover:-translate-y-0.5 disabled:opacity-60"
        >
          {loading ? 'Logging in…' : 'Log in'}
        </button>
      </form>

      <p className="mt-6 text-sm text-green-dark/70">
        New here?{' '}
        <Link href="/auth/signup" className="font-medium text-green underline underline-offset-2">
          Create an account
        </Link>
      </p>
    </div>
  );
}

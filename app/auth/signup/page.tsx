'use client';

import { useState } from 'react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';

export default function SignupPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName } },
    });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    setDone(true);
  }

  if (done) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-16">
        <h1 className="font-display text-3xl text-green">Check your email</h1>
        <p className="mt-3 text-sm text-green-dark/70">
          We sent a confirmation link to <strong>{email}</strong>. Confirm it, then log in to
          start tracking your course progress.
        </p>
        <Link
          href="/auth/login"
          className="mt-6 w-fit rounded-full bg-green px-6 py-3 text-sm font-medium text-beige-paper shadow-soft"
        >
          Go to login
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-6 py-16">
      <h1 className="font-display text-3xl text-green">Create an account</h1>
      <p className="mt-2 text-sm text-green-dark/70">
        Free — this only unlocks progress tracking across your courses.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-3">
        <input
          required
          placeholder="Full name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="rounded-xl2 border border-green/15 bg-beige-paper px-4 py-3 text-sm shadow-soft-inset focus:outline-none focus:ring-2 focus:ring-green/40"
        />
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
          minLength={6}
          placeholder="Password (min. 6 characters)"
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
          {loading ? 'Creating account…' : 'Sign up'}
        </button>
      </form>

      <p className="mt-6 text-sm text-green-dark/70">
        Already have an account?{' '}
        <Link href="/auth/login" className="font-medium text-green underline underline-offset-2">
          Log in
        </Link>
      </p>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Send, CheckCircle2 } from 'lucide-react';

export default function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [values, setValues] = useState({ name: '', email: '', message: '' });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    try {
      const supabase = createClient();
      const { error } = await supabase.from('contact_messages').insert({
        name: values.name,
        email: values.email,
        message: values.message,
      });
      if (error) throw error;
      setStatus('sent');
      setValues({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  }

  if (status === 'sent') {
    return (
      <div className="flex items-center gap-2 rounded-xl2 bg-green/10 px-5 py-4 text-sm text-green">
        <CheckCircle2 size={18} />
        Message sent — we read every one of these.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-2">
      <input
        required
        placeholder="Your name"
        value={values.name}
        onChange={(e) => setValues({ ...values, name: e.target.value })}
        className="rounded-xl2 border border-green/15 bg-beige-paper px-4 py-3 text-sm text-green-dark shadow-soft-inset transition-shadow duration-150 focus:outline-none focus:ring-2 focus:ring-green/40"
      />
      <input
        required
        type="email"
        placeholder="Your email"
        value={values.email}
        onChange={(e) => setValues({ ...values, email: e.target.value })}
        className="rounded-xl2 border border-green/15 bg-beige-paper px-4 py-3 text-sm text-green-dark shadow-soft-inset transition-shadow duration-150 focus:outline-none focus:ring-2 focus:ring-green/40"
      />
      <textarea
        required
        placeholder="What's on your mind?"
        rows={3}
        value={values.message}
        onChange={(e) => setValues({ ...values, message: e.target.value })}
        className="rounded-xl2 border border-green/15 bg-beige-paper px-4 py-3 text-sm text-green-dark shadow-soft-inset transition-shadow duration-150 focus:outline-none focus:ring-2 focus:ring-green/40 sm:col-span-2"
      />
      <button
        type="submit"
        disabled={status === 'sending'}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-green px-6 py-3 text-sm font-medium text-beige-paper shadow-soft transition-transform duration-200 ease-out-soft hover:-translate-y-0.5 hover:shadow-soft-lg disabled:opacity-60 sm:col-span-2 sm:w-fit"
      >
        <Send size={16} />
        {status === 'sending' ? 'Sending…' : 'Send message'}
      </button>
      {status === 'error' && (
        <p className="text-xs text-walnut sm:col-span-2">
          Couldn&apos;t send that — check your connection and try again.
        </p>
      )}
    </form>
  );
}

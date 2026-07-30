'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { href: '/', label: 'Home' },
  { href: '/initiatives', label: 'Our Initiatives' },
  { href: '/blog', label: 'Blog' },
  { href: '/courses', label: 'Our Courses' },
  { href: '/resources', label: 'Resources' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-green/10 bg-beige/90 backdrop-blur-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center">
          <Image
            src="/Green Primary Logo.png"
            alt="The Walnut Initiative"
            width={200}
            height={50}
            className="h-10 w-auto"
          />
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="text-sm font-medium text-green-dark/80 transition-colors duration-150 hover:text-green"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-4 md:flex">
          <Link
            href="/auth/login"
            className="text-sm font-medium text-green-dark/80 transition-colors duration-150 hover:text-green"
          >
            Login
          </Link>
          <a
            href={process.env.NEXT_PUBLIC_LINKTREE_URL || 'https://linktr.ee/thewalnutinitiative'}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-green px-5 py-2 text-sm font-medium text-beige-paper shadow-soft transition-transform duration-200 ease-out-soft hover:-translate-y-0.5 hover:shadow-soft-lg"
          >
            Join Us
          </a>
        </div>

        <button
          className="md:hidden text-green"
          onClick={() => setOpen((o) => !o)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-green/10 bg-beige md:hidden"
          >
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block px-6 py-3 text-sm font-medium text-green-dark"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="px-6 py-3 flex flex-col gap-3">
              <Link
                href="/auth/login"
                onClick={() => setOpen(false)}
                className="inline-block rounded-full border border-green px-5 py-2 text-sm font-medium text-green text-center"
              >
                Login
              </Link>
              <a
                href={process.env.NEXT_PUBLIC_LINKTREE_URL || 'https://linktr.ee/thewalnutinitiative'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full bg-green px-5 py-2 text-sm font-medium text-beige-paper shadow-soft text-center"
              >
                Join Us
              </a>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}

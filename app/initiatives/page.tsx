'use client';

import { motion } from 'framer-motion';
import { BookOpen, Megaphone, FlaskConical, GraduationCap, PenLine } from 'lucide-react';
import WalnutDivider from '@/components/WalnutDivider';
import { initiatives, type Initiative } from '@/lib/mock-data';

const icons: Record<Initiative['icon'], React.ElementType> = {
  workshop: BookOpen,
  campaign: Megaphone,
  research: FlaskConical,
  course: GraduationCap,
  blog: PenLine,
};

export default function InitiativesPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <p className="eyebrow">Our initiatives</p>
      <h1 className="mt-2 max-w-2xl font-display text-4xl text-green sm:text-5xl">
        Five programs, one goal: make the brain approachable.
      </h1>
      <p className="mt-4 max-w-xl text-green-dark/70">
        Every initiative below is run by students, for students — grounded in real
        neuroscience and built around the questions people actually ask.
      </p>

      <div className="my-14">
        <WalnutDivider />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {initiatives.map((item, i) => {
          const Icon = icons[item.icon];
          return (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.45, delay: (i % 2) * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className={`rounded-xl2 bg-beige-paper p-8 shadow-soft ${
                i === 4 ? 'md:col-span-2' : ''
              }`}
            >
              <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-green/10 text-green">
                <Icon size={20} />
              </div>
              <h2 className="font-display text-xl text-green">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-green-dark/70">
                {item.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

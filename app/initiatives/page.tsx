'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BookOpen, Megaphone, FlaskConical, GraduationCap, PenLine, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import WalnutDivider from '@/components/WalnutDivider';
import { initiatives, type Initiative, galleryImages, testimonials } from '@/lib/mock-data';

const icons: Record<Initiative['icon'], React.ElementType> = {
  workshop: BookOpen,
  campaign: Megaphone,
  research: FlaskConical,
  course: GraduationCap,
  blog: PenLine,
};

export default function InitiativesPage() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollByCard(dir: 1 | -1) {
    scrollerRef.current?.scrollBy({ left: dir * 340, behavior: 'smooth' });
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <h1 className="mt-2 max-w-2xl font-display text-4xl text-green sm:text-5xl">
        OUR INITIATIVES
      </h1>
      <p className="mt-4 max-w-xl text-green-dark/70 text-2xl font-medium">
        Neuroscience for All
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
      <div className="my-14">
        <WalnutDivider />
      </div>

      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="mt-2 font-display text-4xl text-green sm:text-5xl uppercase">
            WORKSHOP HIGHLIGHTS
          </h1>
          <p className="mt-4 max-w-xl text-green-dark/70 text-lg">
            The Gallery features important highlights from our online and in-person workshop initiatives.
          </p>
        </div>
        <div className="hidden gap-2 sm:flex">
          <button
            onClick={() => scrollByCard(-1)}
            aria-label="Scroll left"
            className="rounded-full bg-beige-paper p-2.5 text-green shadow-soft transition-transform duration-150 ease-out-soft hover:-translate-y-0.5"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={() => scrollByCard(1)}
            aria-label="Scroll right"
            className="rounded-full bg-beige-paper p-2.5 text-green shadow-soft transition-transform duration-150 ease-out-soft hover:-translate-y-0.5"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 scrollbar-none"
        style={{ scrollbarWidth: 'none' }}
      >
        {galleryImages.map((img, i) => (
          <motion.figure
            key={img.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
            className="group relative aspect-[4/3] w-80 flex-none snap-center overflow-hidden rounded-xl2 bg-beige-deep shadow-soft"
          >
            <Image
              src={img.url}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-500 ease-out-soft group-hover:scale-[1.03]"
              sizes="320px"
            />
          </motion.figure>
        ))}
      </div>

      <div className="my-14">
        <WalnutDivider />
      </div>

      <p className="eyebrow">Testimonials</p>
      <h2 className="mt-2 max-w-lg font-display text-3xl text-green sm:text-4xl">
        In their words
      </h2>

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.blockquote
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col rounded-xl2 bg-beige-paper p-7 shadow-soft"
          >
            <Quote size={20} className="mb-4 text-walnut" />
            <p className="flex-1 text-sm leading-relaxed text-green-dark/80">
              &ldquo;{t.quote}&rdquo;
            </p>
            <footer className="mt-5 text-sm">
              <p className="font-medium text-green">{t.name}</p>
              <p className="text-green-dark/60">{t.role}</p>
            </footer>
          </motion.blockquote>
        ))}
      </div>
    </div>
  );
}

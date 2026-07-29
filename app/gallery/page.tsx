'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import WalnutDivider from '@/components/WalnutDivider';
import { galleryImages, testimonials } from '@/lib/mock-data';

export default function GalleryPage() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  function scrollByCard(dir: 1 | -1) {
    scrollerRef.current?.scrollBy({ left: dir * 340, behavior: 'smooth' });
  }

  return (
    <div className="py-20">
      {/* ------------------------------------------------------------ */}
      {/* Workshop highlights carousel                                  */}
      {/* ------------------------------------------------------------ */}
      <section className="mx-auto max-w-6xl px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Gallery</p>
            <h1 className="mt-2 font-display text-4xl text-green sm:text-5xl">
              Workshop Highlights
            </h1>
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
      </section>

      <div
        ref={scrollerRef}
        className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 scrollbar-none md:px-[calc((100vw-72rem)/2+1.5rem)]"
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

      <div className="mx-auto max-w-6xl px-6">
        <div className="my-16">
          <WalnutDivider />
        </div>
      </div>

      {/* ------------------------------------------------------------ */}
      {/* Testimonials                                                  */}
      {/* ------------------------------------------------------------ */}
      <section className="mx-auto max-w-6xl px-6">
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
      </section>
    </div>
  );
}

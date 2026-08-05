'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';
import WalnutDivider from '@/components/WalnutDivider';
import { galleryImages, type GalleryImage } from '@/lib/mock-data';

export default function GalleryPage() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

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
            <p className="mt-3 max-w-xl text-green-dark/70 text-base">
              Snapshots from our hands-on neuroscience workshops, school visits, and community initiatives.
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
            onClick={() => setSelectedImage(img)}
            className="group relative aspect-[4/3] w-80 flex-none snap-center overflow-hidden rounded-xl2 bg-beige-deep shadow-soft cursor-pointer"
          >
            <Image
              src={img.url}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-500 ease-out-soft group-hover:scale-[1.04]"
              sizes="320px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-green-dark/80 via-green-dark/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-4 text-white">
              <div className="flex items-center justify-between">
                <span className="font-display text-base font-medium">{img.title || img.alt}</span>
                <ZoomIn size={18} className="text-beige-paper opacity-80" />
              </div>
              {img.caption && (
                <p className="mt-1 text-xs text-beige-paper/80 line-clamp-2">{img.caption}</p>
              )}
            </div>
          </motion.figure>
        ))}
      </div>

      {/* ------------------------------------------------------------ */}
      {/* Full Gallery Grid                                             */}
      {/* ------------------------------------------------------------ */}
      <section className="mx-auto mt-20 max-w-6xl px-6">
        <div className="my-10">
          <WalnutDivider />
        </div>
        <h2 className="font-display text-3xl text-green">All Gallery Photos</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {galleryImages.map((img) => (
            <div
              key={img.id}
              onClick={() => setSelectedImage(img)}
              className="group relative aspect-[4/3] overflow-hidden rounded-xl2 bg-beige-deep shadow-soft cursor-pointer"
            >
              <Image
                src={img.url}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 ease-out-soft group-hover:scale-[1.04]"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-dark/80 via-green-dark/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-5 text-white">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg">{img.title || img.alt}</h3>
                  <ZoomIn size={20} className="text-beige-paper opacity-90" />
                </div>
                {img.caption && (
                  <p className="mt-1 text-xs text-beige-paper/80">{img.caption}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/* Lightbox Modal                                               */}
      {/* ------------------------------------------------------------ */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] max-w-4xl overflow-hidden rounded-2xl bg-beige-paper shadow-2xl flex flex-col"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              <div className="relative min-h-[300px] max-h-[70vh] w-full aspect-[4/3] sm:aspect-[16/10] bg-black">
                <Image
                  src={selectedImage.url}
                  alt={selectedImage.alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>

              {(selectedImage.title || selectedImage.caption) && (
                <div className="p-6 bg-beige-paper border-t border-green/10">
                  {selectedImage.title && (
                    <h3 className="font-display text-xl text-green">{selectedImage.title}</h3>
                  )}
                  {selectedImage.caption && (
                    <p className="mt-1 text-sm text-green-dark/80 leading-relaxed">
                      {selectedImage.caption}
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

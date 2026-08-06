'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, User } from 'lucide-react';
import WalnutDivider from '@/components/WalnutDivider';
import { blogPosts } from '@/lib/blog-data';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function BlogPage() {
  return (
    <>
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-28 text-center">
          <motion.div initial="hidden" animate="show" variants={fadeUp} custom={0}>
            <p className="eyebrow mx-auto mb-5">Research & Insights</p>
            <h1 className="font-display text-5xl font-medium leading-[1.05] tracking-tight text-green sm:text-6xl md:text-7xl">
              The Walnut Blog
            </h1>
            <p className="mt-6 mx-auto max-w-xl text-lg leading-relaxed text-green-dark/75">
              Explore scientific insights, deep dives into neurology, and the psychology behind our everyday lives written by our community.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="px-6">
        <WalnutDivider />
      </div>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-8 sm:grid-cols-2">
          {blogPosts.map((post, i) => (
            <motion.div
              key={post.slug}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              variants={fadeUp}
              custom={i}
              className="flex flex-col rounded-2xl bg-beige-paper p-8 shadow-soft border border-green/10 h-full transition-transform duration-200 hover:-translate-y-1 hover:shadow-soft-lg"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs font-medium uppercase tracking-wider text-walnut bg-walnut/10 px-3 py-1 rounded-full">
                  {post.category}
                </span>
              </div>
              
              <Link href={`/blog/${post.slug}`} className="group">
                <h2 className="font-display text-2xl text-green group-hover:text-green-dark transition-colors duration-150 mb-3">
                  {post.title}
                </h2>
              </Link>
              
              <p className="text-green-dark/75 leading-relaxed mb-6 flex-grow">
                {post.excerpt}
              </p>
              
              <div className="flex items-center justify-between border-t border-green/10 pt-6 mt-auto">
                <div className="flex flex-col gap-1 text-sm text-green-dark/60">
                  <div className="flex items-center gap-1.5">
                    <User size={14} />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Calendar size={14} />
                    <span>{post.date}</span>
                  </div>
                </div>
                
                <Link
                  href={`/blog/${post.slug}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-green text-beige shadow-soft transition-transform duration-200 hover:-translate-y-0.5 hover:bg-green-dark"
                >
                  <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}

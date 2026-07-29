'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import type { Blog } from '@/lib/mock-data';

const categoryColor: Record<string, string> = {
  'Mental Health': 'bg-walnut/15 text-walnut',
  Neuroscience: 'bg-green/10 text-green',
  Community: 'bg-green-soft/15 text-green-soft',
  Research: 'bg-green/10 text-green',
};

export default function BlogGrid({ blogs }: { blogs: Blog[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {blogs.map((post, i) => (
        <motion.article
          key={post.id}
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, delay: (i % 3) * 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="group flex flex-col rounded-xl2 bg-beige-paper p-6 shadow-soft transition-shadow duration-200 ease-out-soft hover:shadow-soft-lg"
        >
          <span
            className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${
              categoryColor[post.category] ?? 'bg-green/10 text-green'
            }`}
          >
            {post.category}
          </span>
          <h2 className="mt-4 font-display text-lg leading-snug text-green">
            {post.title}
          </h2>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-green-dark/70">
            {post.excerpt}
          </p>
          <div className="mt-5 flex items-center justify-between text-xs text-green-dark/50">
            <span>{post.author_name}</span>
            <span>{new Date(post.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
          <a
            href={`/blog/${post.slug}`}
            className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-green transition-colors duration-150 group-hover:text-walnut"
          >
            Read article
            <ArrowUpRight size={14} className="transition-transform duration-200 ease-out-soft group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </motion.article>
      ))}
    </div>
  );
}

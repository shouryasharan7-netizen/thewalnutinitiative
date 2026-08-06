import { blogPosts } from '@/lib/blog-data';
import Link from 'next/link';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';
import WalnutDivider from '@/components/WalnutDivider';

// Define generateStaticParams to statically generate routes for each blog post
export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

  if (!post) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-32 text-center">
        <h1 className="font-display text-4xl text-green">Post not found</h1>
        <Link href="/blog" className="mt-8 inline-block text-walnut hover:underline">
          Return to Blog
        </Link>
      </div>
    );
  }

  return (
    <article className="pb-24">
      {/* Header section */}
      <header className="mx-auto max-w-4xl px-6 pt-20 pb-16 md:pt-28 md:pb-20 text-center">
        <Link 
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-green-dark/60 hover:text-green transition-colors duration-150 mb-10"
        >
          <ArrowLeft size={16} />
          Back to all posts
        </Link>
        
        <div className="flex justify-center mb-6">
          <span className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-walnut bg-walnut/10 px-4 py-1.5 rounded-full">
            <Tag size={12} />
            {post.category}
          </span>
        </div>
        
        <h1 className="font-display text-4xl font-medium leading-[1.1] tracking-tight text-green sm:text-5xl md:text-6xl mb-8">
          {post.title}
        </h1>
        
        <div className="flex flex-wrap items-center justify-center gap-6 text-green-dark/70 text-sm font-medium">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-green/10 flex items-center justify-center text-green">
              <User size={16} />
            </div>
            <span>{post.author}</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-green/20 hidden sm:block"></div>
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-green/70" />
            <span>{post.date}</span>
          </div>
        </div>
      </header>

      <div className="px-6 mb-16">
        <div className="mx-auto max-w-4xl">
          <WalnutDivider />
        </div>
      </div>

      {/* Content section */}
      <div className="mx-auto max-w-3xl px-6">
        <div 
          className="prose prose-lg prose-green max-w-none 
            prose-headings:font-display prose-headings:text-green prose-headings:font-normal
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
            prose-p:text-green-dark/80 prose-p:leading-relaxed prose-p:mb-6
            prose-strong:text-green-dark prose-strong:font-semibold
            prose-a:text-walnut prose-a:underline-offset-4 hover:prose-a:text-walnut/80
            prose-blockquote:border-l-4 prose-blockquote:border-green prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-green-dark/90"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </div>
    </article>
  );
}

import { createClient } from '@/lib/supabase/server';
import { mockBlogs, type Blog } from '@/lib/mock-data';
import WalnutDivider from '@/components/WalnutDivider';
import BlogGrid from '@/components/BlogGrid';

// Revalidate periodically rather than caching forever or refetching on
// every request — blogs.published rows don't change every minute.
export const revalidate = 60;

async function getBlogs(): Promise<{ blogs: Blog[]; live: boolean }> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('blogs')
      .select('id, slug, title, excerpt, category, author_name, published_at')
      .eq('published', true)
      .order('published_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return { blogs: mockBlogs, live: false };
    }
    return { blogs: data as Blog[], live: true };
  } catch {
    // Supabase env vars not configured yet, or network unavailable —
    // fall back to mock data so the page always renders.
    return { blogs: mockBlogs, live: false };
  }
}

export default async function BlogPage() {
  const { blogs, live } = await getBlogs();

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <p className="eyebrow">Blog</p>
      <h1 className="mt-2 max-w-xl font-display text-4xl text-green sm:text-5xl">
        Papers translated into plain language.
      </h1>
      <p className="mt-4 max-w-xl text-green-dark/70">
        {live
          ? 'Fresh from our Supabase-backed publication.'
          : 'Showing preview content — connect Supabase to go live with real posts.'}
      </p>

      <div className="my-14">
        <WalnutDivider />
      </div>

      <BlogGrid blogs={blogs} />
    </div>
  );
}

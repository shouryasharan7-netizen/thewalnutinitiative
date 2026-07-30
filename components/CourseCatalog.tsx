'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Layers, LogIn, PlayCircle } from 'lucide-react';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import { mockCourses } from '@/lib/mock-data';

type ProgressMap = Record<string, { lessonsCompleted: number; totalLessons: number }>;

export default function CourseCatalog() {
  const [userId, setUserId] = useState<string | null>(null);
  const [progress, setProgress] = useState<ProgressMap>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    async function load() {
      const { data: userData } = await supabase.auth.getUser();
      const uid = userData?.user?.id ?? null;
      setUserId(uid);

      if (uid) {
        const { data: courseRows } = await supabase.from('courses').select('id, slug, total_lessons');
        const { data: progressRows } = await supabase
          .from('course_progress')
          .select('course_id, lessons_completed')
          .eq('user_id', uid);

        const map: ProgressMap = {};
        courseRows?.forEach((c) => {
          const p = progressRows?.find((r) => r.course_id === c.id);
          map[c.slug] = {
            lessonsCompleted: p?.lessons_completed ?? 0,
            totalLessons: c.total_lessons,
          };
        });
        setProgress(map);
      }
      setLoading(false);
    }

    load().catch(() => setLoading(false));
  }, []);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {!loading && !userId && (
        <div className="col-span-full mb-2 flex items-center gap-3 rounded-xl2 bg-green/10 px-5 py-4 text-sm text-green">
          <LogIn size={16} />
          <span>
            <Link href="/auth/login" className="font-medium underline underline-offset-2">
              Log in
            </Link>{' '}
            to save your progress across devices — you can still browse freely.
          </span>
        </div>
      )}

      {mockCourses.map((course, i) => {
        const p = progress[course.slug];
        const pct = p ? Math.round((p.lessonsCompleted / p.totalLessons) * 100) : 0;

        return (
          <motion.div
            key={course.slug}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.45, delay: (i % 3) * 0.06, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col rounded-xl2 bg-beige-paper p-6 shadow-soft"
          >
            <span className="w-fit rounded-full bg-green/10 px-3 py-1 text-xs font-medium text-green">
              {course.level}
            </span>
            <h3 className="mt-4 font-display text-lg text-green">{course.title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-green-dark/70">
              {course.description}
            </p>

            <div className="mt-5 flex items-center gap-4 text-xs text-green-dark/60">
              <span className="inline-flex items-center gap-1">
                <Layers size={13} /> {course.totalLessons} lessons
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock size={13} /> {course.durationHours}h
              </span>
            </div>

            <div className="mt-4">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-green/10">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${userId ? pct : 0}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-full bg-green"
                />
              </div>
              <p className="mt-1.5 text-xs text-green-dark/50">
                {userId ? `${pct}% complete` : 'Progress tracked once logged in'}
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-green/10 pt-4">
              <Link
                href={`/courses/${course.slug}`}
                className="group flex items-center gap-2 text-sm font-medium text-green transition-colors hover:text-green-dark"
              >
                {pct > 0 ? 'Continue Course' : 'Start Course'}
                <PlayCircle size={16} className="transition-transform duration-200 group-hover:scale-110" />
              </Link>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

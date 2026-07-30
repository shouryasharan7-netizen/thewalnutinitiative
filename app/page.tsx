'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, PenTool, Globe, Target } from 'lucide-react';
import WalnutDivider from '@/components/WalnutDivider';
import { initiatives } from '@/lib/mock-data';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function HomePage() {
  return (
    <>
      {/* ---------------------------------------------------------------- */}
      {/* Hero                                                              */}
      {/* ---------------------------------------------------------------- */}
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-[1.1fr_0.9fr] md:py-28">
          <motion.div initial="hidden" animate="show" variants={fadeUp} custom={0}>
            <p className="eyebrow mb-5">Facilitating neuroscience literacy. Advocating for youth mental health. Dismantling stigmas.</p>
            <h1 className="font-display text-5xl font-medium leading-[1.05] tracking-tight text-green sm:text-6xl md:text-7xl">
              THE WALNUT
              <br />
              INITIATIVE
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-green-dark/75">
              We are a youth-led initiative dedicated to making neuroscience accessible, raising awareness about neurological and psychological disorders, driving advocacy for mental health equity, and addressing stigmas, myths around neurological and mental health.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={process.env.NEXT_PUBLIC_LINKTREE_URL || 'https://linktr.ee/thewalnutinitiative'}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-full bg-green px-7 py-3.5 text-sm font-medium text-beige-paper shadow-soft transition-all duration-200 ease-out-soft hover:-translate-y-0.5 hover:shadow-soft-lg"
              >
                Join Us
                <ArrowRight size={16} className="transition-transform duration-200 ease-out-soft group-hover:translate-x-0.5" />
              </a>
              <Link
                href="/initiatives"
                className="text-sm font-medium text-green-dark/70 underline decoration-walnut/50 underline-offset-4 transition-colors duration-150 hover:text-green"
              >
                See our initiatives
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="show"
            variants={fadeUp}
            custom={1}
            className="relative mx-auto aspect-square w-full max-w-sm"
          >
            {/* Logo image replacing the placeholder svg */}
            <img 
              src="/Green Primary Logo.png" 
              alt="The Walnut Initiative Logo" 
              className="h-full w-full object-contain drop-shadow-[0_20px_40px_rgba(62,81,60,0.15)]"
            />
          </motion.div>
        </div>
      </section>

      <div className="px-6">
        <WalnutDivider />
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Mission Section                                                   */}
      {/* ---------------------------------------------------------------- */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.p variants={fadeUp} custom={0} className="eyebrow mx-auto">
            Our Mission
          </motion.p>
          <motion.h2 variants={fadeUp} custom={1} className="mt-4 font-display text-3xl text-green sm:text-4xl">
            Democratizing the Science of the Mind
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="mt-6 text-lg leading-relaxed text-green-dark/80">
            At The Walnut Initiative, we believe that understanding the human brain shouldn't be a privilege reserved for medical professionals or academics. It is the fundamental blueprint of who we are, and that knowledge belongs to everyone.
          </motion.p>
          <motion.p variants={fadeUp} custom={3} className="mt-4 text-lg leading-relaxed text-green-dark/80">
            Our mission is to tear down the barriers to neuroscience education. We provide free, high-quality resources, fiercely advocate for youth mental health equity, and empower young minds to embrace scientific thinking through peer-led research and publication. 
          </motion.p>
          <motion.div variants={fadeUp} custom={4} className="mt-8 rounded-2xl bg-green px-8 py-8 shadow-soft text-beige">
            <p className="text-xl font-medium leading-relaxed">
              "The brain is the most powerful, intricate organ in existence. We believe you don't need a medical degree to understand how it shapes your everyday life. You simply need to be curious."
            </p>
          </motion.div>
        </motion.div>
      </section>

      <div className="px-6">
        <WalnutDivider />
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* What we do — quick preview linking to Initiatives page            */}
      {/* ---------------------------------------------------------------- */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="eyebrow"
        >
          What we do
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.45, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="mt-2 max-w-lg font-display text-3xl text-green sm:text-4xl"
        >
          Our Initiatives
        </motion.h2>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {initiatives.map((item, i) => (
            <motion.div
              key={item.title}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-60px' }}
              variants={fadeUp}
              custom={i}
              className="rounded-xl2 bg-beige-paper p-6 shadow-soft"
            >
              <h3 className="font-display text-lg text-green">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-green-dark/70">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        <Link
          href="/initiatives"
          className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-green transition-colors duration-150 hover:text-walnut"
        >
          Explore all initiatives
          <ArrowRight size={15} />
        </Link>
      </section>

      <div className="px-6">
        <WalnutDivider />
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* Goals & Support                                                   */}
      {/* ---------------------------------------------------------------- */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-2">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
            className="rounded-2xl border border-green/10 bg-beige-paper p-8 shadow-soft"
          >
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-green text-beige">
              <Target size={24} />
            </div>
            <h3 className="font-display text-2xl text-green">Community Goals</h3>
            <ul className="mt-6 space-y-4">
              <li className="flex gap-3 text-green-dark/80">
                <ArrowRight size={18} className="mt-1 shrink-0 text-walnut" />
                <span>Donating 50 stationary kits to children at underserved schools.</span>
              </li>
              <li className="flex gap-3 text-green-dark/80">
                <ArrowRight size={18} className="mt-1 shrink-0 text-walnut" />
                <span>Providing practical, lab-based immersion experiences.</span>
              </li>
              <li className="flex gap-3 text-green-dark/80">
                <ArrowRight size={18} className="mt-1 shrink-0 text-walnut" />
                <span><strong>Upcoming Event:</strong> Educational workshop aimed at understanding fundamentals of the brain, at FSF school.</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            variants={fadeUp}
            custom={1}
            className="rounded-2xl border border-green/10 bg-beige-paper p-8 shadow-soft"
          >
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-green text-beige">
              <Globe size={24} />
            </div>
            <h3 className="font-display text-2xl text-green">Support Us</h3>
            <p className="mt-4 text-green-dark/80">
              Help us reach our community goals by donating or contributing directly:
            </p>
            <ul className="mt-6 space-y-3">
              <li className="flex items-center gap-3 text-green-dark/80">
                <BookOpen size={18} className="text-walnut" />
                <span>Study material</span>
              </li>
              <li className="flex items-center gap-3 text-green-dark/80">
                <PenTool size={18} className="text-walnut" />
                <span>Stationary items</span>
              </li>
              <li className="flex items-center gap-3 text-green-dark/80">
                <Globe size={18} className="text-walnut" />
                <span>Interactive models</span>
              </li>
              <li className="flex items-center gap-3 text-green-dark/80">
                <Target size={18} className="text-walnut" />
                <span>Follow us on social media</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </section>

    </>
  );
}

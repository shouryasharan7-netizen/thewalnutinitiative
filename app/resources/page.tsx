'use client';

import { motion } from 'framer-motion';
import WalnutDivider from '@/components/WalnutDivider';
import { ExternalLink, ClipboardList } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

const externalResources = [
  {
    title: 'The International Brain Bee',
    link: 'https://www.thebrainbee.org',
    description: 'Uses a completely free, downloadable PDF textbook (BrainFacts: A Primer on the Brain) as its entire study guide.',
  },
  {
    title: 'The AAN Neuroscience Research Prize',
    link: 'https://www.aan.com/research/neuroscience-research-prize',
    description: 'Run by the American Academy of Neurology, this competition is designed specifically for high schoolers who want to do independent scientific research.',
  },
  {
    title: 'The International Psychology Olympiad (IPsyO)',
    link: 'https://www.ipsyo.org',
    description: 'Ideal for students interested in the intersection of behavioral psychology and hard neurobiology.',
  },
  {
    title: 'The Human Connectome Project',
    link: 'https://www.humanconnectome.org',
    description: 'Offers free public access to high-resolution, 3D neuroimaging data and structural maps of human brains. High schoolers can download free viewing software to analyze actual MRI scans.',
  },
  {
    title: 'OER Commons: The Open Education Library',
    link: 'https://oercommons.org/',
    description: 'Access a massive, globally recognized digital library of completely free, openly licensed textbooks, lesson plans, and interactive science resources.',
  },
];

const forms = [
  {
    title: 'Volunteer Application',
    link: 'https://linktr.ee/thewalnutinitiative',
  },
  {
    title: 'Start a WIN Initiative',
    link: 'https://linktr.ee/thewalnutinitiative',
  },
  {
    title: 'Blog Submissions',
    link: 'https://docs.google.com/forms/d/e/1FAIpQLScuk-Vo-jreU3K-ZmHYDrYLrevh117kRVIZ3wgr8Btj_w6raA/viewform',
  },
  {
    title: 'Team Member Application',
    link: 'https://linktr.ee/thewalnutinitiative',
  }
];

export default function ResourcesPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-24 md:py-32">
      <motion.div initial="hidden" animate="show" variants={fadeUp} custom={0}>
        <h1 className="font-display text-4xl text-green md:text-5xl">Resources & Competitions</h1>
        <p className="mt-4 max-w-2xl text-lg text-green-dark/70">
          We believe in providing the best accessible resources for anyone interested in the mind. Explore these globally recognized tools, competitions, and datasets to further your understanding.
        </p>
      </motion.div>

      <div className="mt-16 grid gap-6 sm:grid-cols-2">
        {externalResources.map((resource, i) => (
          <motion.a
            key={resource.title}
            href={resource.link}
            target="_blank"
            rel="noopener noreferrer"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-40px' }}
            variants={fadeUp}
            custom={i + 1}
            className="group flex flex-col justify-between rounded-xl2 bg-beige-paper p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-lg"
          >
            <div>
              <div className="flex items-start justify-between">
                <h3 className="font-display text-xl text-green group-hover:text-walnut transition-colors">
                  {resource.title}
                </h3>
                <ExternalLink size={20} className="text-green-dark/40 group-hover:text-walnut transition-colors shrink-0 ml-4" />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-green-dark/75">
                {resource.description}
              </p>
            </div>
          </motion.a>
        ))}
      </div>

      <div className="my-20">
        <WalnutDivider />
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-40px' }}
        variants={fadeUp}
        custom={0}
      >
        <h2 className="font-display text-3xl text-green">Get Involved</h2>
        <p className="mt-4 text-green-dark/70">
          Ready to join the community? Fill out one of our forms below to get started.
        </p>
        
        <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {forms.map((form, i) => (
            <a
              key={form.title}
              href={form.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-lg border border-green/10 bg-beige-paper p-4 shadow-sm transition-all hover:bg-beige hover:shadow-soft"
            >
              <ClipboardList size={18} className="text-walnut" />
              <span className="text-sm font-medium text-green-dark">{form.title}</span>
            </a>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

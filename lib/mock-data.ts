// Mock-data-first: hardcoded, realistic dummy data so the UI is fully
// testable before/without a live Supabase connection. The Blog page
// fetches from Supabase and falls back to this if the query fails or
// env vars aren't configured yet — every other page uses it directly.

export type Blog = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author_name: string;
  published_at: string;
};

export const mockBlogs: Blog[] = [
  {
    id: '1',
    slug: 'rewiring-stigma',
    title: 'Rewiring the Conversation Around Stigma',
    excerpt:
      'What neuroscience actually tells us about mental illness — and why the "chemical imbalance" story is too simple.',
    category: 'Mental Health',
    author_name: 'Anya Kapoor',
    published_at: '2026-06-02',
  },
  {
    id: '2',
    slug: 'teen-brain-development',
    title: 'What Is Actually Happening in a Teenage Brain',
    excerpt:
      'Synaptic pruning, the limbic system, and why adolescence is not a design flaw.',
    category: 'Neuroscience',
    author_name: 'Rahul Mehta',
    published_at: '2026-05-14',
  },
  {
    id: '3',
    slug: 'workshop-recap-june',
    title: 'Workshop Recap: Neuroscience 101 for High Schoolers',
    excerpt:
      'Highlights, questions, and the moment forty students realized memory is not a recording.',
    category: 'Community',
    author_name: 'TWI Team',
    published_at: '2026-06-20',
  },
  {
    id: '4',
    slug: 'stress-response-explained',
    title: 'Your Brain on Stress: The Short Version',
    excerpt:
      'A plain-language walk through the amygdala, cortisol, and why "just relax" rarely works.',
    category: 'Neuroscience',
    author_name: 'Priya Nair',
    published_at: '2026-04-30',
  },
];

export type Initiative = {
  title: string;
  description: string;
  icon: 'workshop' | 'campaign' | 'research' | 'course' | 'blog';
};

export const initiatives: Initiative[] = [
  {
    title: 'Educational Workshop Tracks',
    description:
      'In-person experience with a curated curriculum. Upcoming event scheduled on 22nd June 2026 at FSF SCHOOL.',
    icon: 'workshop',
  },
  {
    title: 'The NutShell (Archive)',
    description:
      'Access high-quality short form educational videos, a daily facts corner, resources for studying neuroscience, and a competitions list.',
    icon: 'research',
  },
  {
    title: 'Mental Health Campaigns',
    description:
      'Peer-led campaigns that put real language around anxiety, depression, and burnout — and point people to real help.',
    icon: 'campaign',
  },
  {
    title: 'Neuroscience & STEM Courses',
    description:
      'Structured, self-paced courses that take a curious beginner from "what is a neuron" to reading real papers.',
    icon: 'course',
  },
  {
    title: 'Blog & Publication',
    description:
      'Educational insights, literature reviews, creative submissions, and meme science translated for the youth.',
    icon: 'blog',
  },
];

export type GalleryImage = {
  id: string;
  url: string;
  alt: string;
};

export const galleryImages: GalleryImage[] = [
  { id: 'g1', url: '/placeholders/gallery-1.svg', alt: 'Students at a TWI workshop table' },
  { id: 'g2', url: '/placeholders/gallery-2.svg', alt: 'Volunteer presenting a brain model' },
  { id: 'g3', url: '/placeholders/gallery-3.svg', alt: 'Group discussion during a campaign event' },
  { id: 'g4', url: '/placeholders/gallery-4.svg', alt: 'Whiteboard sketch of a neuron' },
  { id: 'g5', url: '/placeholders/gallery-5.svg', alt: 'Students collaborating on a research poster' },
  { id: 'g6', url: '/placeholders/gallery-6.svg', alt: 'Closing circle at a workshop' },
];

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
};

export const testimonials: Testimonial[] = [
  {
    name: 'Sana R.',
    role: 'Workshop attendee, Grade 11',
    quote:
      'I came in thinking neuroscience was for people who already loved chemistry. I left with an actual mental model of my own brain.',
  },
  {
    name: 'Devansh P.',
    role: 'Course learner',
    quote:
      'The course paced itself around actually understanding things, not memorizing terms for a quiz.',
  },
  {
    name: 'Meher K.',
    role: 'Campaign volunteer',
    quote:
      'First place I felt like talking about anxiety out loud wasn\u2019t going to make people treat me differently.',
  },
];

export type Course = {
  slug: string;
  title: string;
  description: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  totalLessons: number;
  durationHours: number;
};

export const mockCourses: Course[] = [
  {
    slug: 'intro-to-neuroscience',
    title: 'Introduction to Neuroscience',
    description:
      'A beginner-friendly tour of the brain: neurons, neurotransmitters, and how thought physically happens.',
    category: 'Neuroscience',
    level: 'Beginner',
    totalLessons: 8,
    durationHours: 6,
  },
  {
    slug: 'mental-health-first-aid',
    title: 'Youth Mental Health First Aid',
    description:
      'Recognize warning signs, respond with care, and know when and how to get someone real help.',
    category: 'Mental Health',
    level: 'Beginner',
    totalLessons: 6,
    durationHours: 4,
  },
  {
    slug: 'neuro-research-methods',
    title: 'Research Methods in Cognitive Science',
    description:
      'How psych and neuro studies are actually designed — and how to read one critically.',
    category: 'Research',
    level: 'Intermediate',
    totalLessons: 10,
    durationHours: 9,
  },
];

export type FaqItem = { question: string; answer: string };

export const courseFaqs: FaqItem[] = [
  {
    question: 'Do I need a science background to start?',
    answer:
      'No. Intro to Neuroscience assumes nothing beyond high-school biology, and every term is defined the first time it appears.',
  },
  {
    question: 'Are the courses free?',
    answer:
      'Yes — TWI courses are free for all students. We\u2019re funded by grants and donations, not tuition.',
  },
  {
    question: 'Is my progress saved if I log out?',
    answer:
      'Yes. Once you create an account, your lesson progress is saved to your profile and picks up where you left off on any device.',
  },
  {
    question: 'Can I get a certificate?',
    answer:
      'Completing a course marks it as finished on your profile. Downloadable certificates are on our roadmap.',
  },
];

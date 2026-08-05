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
    title: 'EDUCATIONAL WORKSHOPS',
    description:
      'We conduct in-person and online educational workshops with specialized curricula for all learners. These workshops include introductory topics, myth-bust segments (a unique characteristic of The Walnut Initiative) and interactive elements. The aim is to make complex neuroscience, cognitive and mental health topics fun, simple, engaging, digestible and beginner-friendly.',
    icon: 'workshop',
  },
  {
    title: 'MENTAL HEALTH CAMPAIGNS',
    description:
      'We offer one-on-one mental health support to youth learners, address misconceptions and stigmas around mental health, and facilitate mental health awareness and acceptability drives- especially in underserved communities.',
    icon: 'campaign',
  },
  {
    title: 'RESEARCH INITIATIVES',
    description:
      'We undertake student-led research initiatives to add to science and enhance our members’ skills. We conduct members’ only research programs and direct our members toward scientific thinking, writing and research.',
    icon: 'research',
  },
  {
    title: 'Neuroscience and STEM courses',
    description:
      'We offer free, accessible and online course tracks for learners all around the globe. These courses include certification after successful completion to fuel the learner’s scientific journey.',
    icon: 'course',
  },
  {
    title: 'BLOG, RESEARCH AND BOOK PUBLICATION',
    description:
      'The Walnut Initiative Blog fosters scientific and creative submissions from young voices all over the globe.',
    icon: 'blog',
  },
];

export type GalleryImage = {
  id: string;
  url: string;
  alt: string;
  title?: string;
  caption?: string;
};

export const galleryImages: GalleryImage[] = [
  {
    id: 'g1',
    url: '/gallery/workshop-presentation.jpg',
    alt: 'TWI volunteer presentation at FSF School neuroscience workshop',
    title: 'Interactive Workshop Presentation',
    caption: 'Engaging young students in neuroscience fundamentals at FSF School'
  },
  {
    id: 'g2',
    url: '/gallery/workshop-students.png',
    alt: 'Interactive audience session with students at FSF School',
    title: 'Youth Learners',
    caption: 'Students participating in hands-on brain awareness activities'
  },
  {
    id: 'g3',
    url: '/gallery/workshop-certificates.png',
    alt: 'Students receiving TWI Neuroscience Program certificates of participation',
    title: 'Certificate Distribution',
    caption: 'Students proudly displaying their TWI Neuroscience Awareness Program certificates'
  },
  { id: 'g4', url: '/placeholders/gallery-1.svg', alt: 'Students at a TWI workshop table' },
  { id: 'g5', url: '/placeholders/gallery-2.svg', alt: 'Volunteer presenting a brain model' },
  { id: 'g6', url: '/placeholders/gallery-3.svg', alt: 'Group discussion during a campaign event' },
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
    question: 'Will this course help me understand and navigate neuroscience?',
    answer:
      'Yes— these courses are tailored specifically for learners at different stages of neuroscience learning. This will help you improve gradually through consistency and engaging approaches..',
  },
  {
    question: 'How much time will I need to set aside each week?',
    answer:
      'These courses are self-paced and hence require you to set aside time according to your schedule.',
  },
  {
    question: 'Do I need fancy equipment or apps?',
    answer:
      'Just a screen, an internet connection, and a willingness to explore and learn new things!',
  }
];

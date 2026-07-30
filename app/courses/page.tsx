import WalnutDivider from '@/components/WalnutDivider';
import CourseCatalog from '@/components/CourseCatalog';
import Faq from '@/components/Faq';
import { courseFaqs } from '@/lib/mock-data';

export default function CoursesPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <p className="eyebrow">Our courses</p>
      <h1 className="mt-2 max-w-xl font-display text-4xl text-green sm:text-5xl">
        Our Courses
      </h1>
      <p className="mt-4 max-w-xl text-green-dark/70">
        Structured neuroscience course tracks for every learner— free of cost, accessible and beginner friendly.
      </p>

      <div className="my-14">
        <WalnutDivider />
      </div>

      <CourseCatalog />

      <div className="my-16">
        <WalnutDivider flip />
      </div>

      <section>
        <p className="eyebrow">Questions</p>
        <h2 className="mt-2 max-w-lg font-display text-3xl text-green sm:text-4xl">
          Frequently asked
        </h2>
        <div className="mt-8 max-w-2xl">
          <Faq items={courseFaqs} />
        </div>
      </section>
    </div>
  );
}

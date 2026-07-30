import ContactForm from './ContactForm';
import WalnutDivider from './WalnutDivider';

export default function Footer() {
  return (
    <footer className="border-t border-green/10 bg-beige-deep">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <WalnutDivider />
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <h3 className="font-display text-2xl text-green">Contact us</h3>
            <p className="mt-2 max-w-sm text-sm text-green-dark/70">
              Question about a workshop, a course, or want to volunteer? Tell us — a real
              person on the team reads this inbox.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 text-sm md:justify-items-end">
            <div>
              <p className="eyebrow mb-3">Explore</p>
              <ul className="space-y-2 text-green-dark/80">
                <li><a href="/initiatives" className="hover:text-green">Our Initiatives</a></li>
                <li><a href="/gallery" className="hover:text-green">Gallery &amp; Testimonials</a></li>
                <li><a href="/blog" className="hover:text-green">Blog</a></li>
                <li><a href="/courses" className="hover:text-green">Our Courses</a></li>
              </ul>
            </div>
            <div>
              <p className="eyebrow mb-3">Elsewhere</p>
              <ul className="space-y-2 text-green-dark/80">
                <li>
                  <a
                    href={process.env.NEXT_PUBLIC_LINKTREE_URL || 'https://linktr.ee/'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-green"
                  >
                    Linktree
                  </a>
                </li>
                <li>
                  <a
                    href="https://instagram.com/thewalnutinitiative"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-green"
                  >
                    Instagram
                  </a>
                </li>
                <li><a href="mailto:hello@thewalnutinitiative.org" className="hover:text-green">Email</a></li>
              </ul>
            </div>
          </div>
        </div>

        <p className="mt-12 text-xs text-green-dark/50">
          © {new Date().getFullYear()} The Walnut Initiative. A youth-led initiative making
          neuroscience accessible.
        </p>
      </div>
    </footer>
  );
}

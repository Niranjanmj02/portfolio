// src/components/Footer.jsx
import { profile } from '../data/content';
import { scrollToTop } from '../lib/smoothScroll';
import { RevealItem } from './Reveal';

const LINKS = [
  { label: 'github', href: profile.github },
  { label: 'linkedin', href: profile.linkedin },
  { label: 'email', href: `mailto:${profile.email}` },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-hair">
      <div className="u-container py-14">
        <RevealItem>
          <div className="flex flex-wrap items-end justify-between gap-8">
            <div>
              <div className="display text-chalk/[0.14]">Niranjan M</div>
              <div className="mt-4 font-mono text-[12px] text-fog">
                {profile.role} · {profile.location}
              </div>
            </div>

            <button type="button" onClick={scrollToTop} data-cursor="link" className="btn">
              Back to top ↑
            </button>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t border-hair pt-7 font-mono text-[11.5px] text-fog">
            <span>© {new Date().getFullYear()} Niranjan M</span>

            <div className="flex items-center gap-6">
              {LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  data-cursor="link"
                  className="transition-colors hover:text-mint"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </RevealItem>
      </div>
    </footer>
  );
}

// src/components/Contact.jsx
import { useState } from 'react';
import { profile } from '../data/content';
import SectionHeading from './SectionHeading';
import { Item, Reveal } from './Reveal';
import Magnetic from './Magnetic';

const DETAILS = [
  { k: 'email', v: profile.email, href: `mailto:${profile.email}` },
  { k: 'phone', v: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}` },
  { k: 'github', v: profile.githubLabel, href: profile.github },
  { k: 'linkedin', v: profile.linkedinLabel, href: profile.linkedin },
  { k: 'location', v: profile.location },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [copied, setCopied] = useState(false);

  const change = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // No backend on this site, so don't pretend there is one — hand off to the
  // visitor's mail client with everything pre-filled.
  const submit = (event) => {
    event.preventDefault();
    const subject = encodeURIComponent(`Portfolio enquiry — ${form.name || 'hello'}`);
    const body = encodeURIComponent(
      `${form.message}\n\n—\n${form.name}\n${form.email}`
    );
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="contact" className="u-section u-container relative z-10">
      <SectionHeading
        n="06"
        label="contact"
        title={
          <>
            Let&rsquo;s build
            <br />
            something.
          </>
        }
        lede="Open to AI / ML engineering roles and collaborations."
      >
        <div className="grid grid-cols-12 gap-5">
          <Reveal count={DETAILS.length + 1} className="col-span-12 lg:col-span-5">
            <Item className="panel p-7 md:p-8">
              <ul className="space-y-px">
                {DETAILS.map((detail) => (
                  <li
                    key={detail.k}
                    className="flex items-baseline justify-between gap-4 border-b border-hair py-4 last:border-b-0"
                  >
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-fog">
                      {detail.k}
                    </span>
                    {detail.href ? (
                      <a
                        href={detail.href}
                        target={detail.href.startsWith('http') ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        data-cursor="link"
                        className="text-right font-mono text-[13px] text-chalk transition-colors hover:text-brand"
                      >
                        {detail.v}
                      </a>
                    ) : (
                      <span className="font-mono text-[13px] text-chalk">{detail.v}</span>
                    )}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-3">
                <Magnetic>
                  <button type="button" onClick={copyEmail} data-cursor="link" className="btn">
                    {copied ? 'Copied ✓' : 'Copy email'}
                  </button>
                </Magnetic>
                <Magnetic>
                  <a href={profile.resume} download data-cursor="link" className="btn">
                    Résumé ↓
                  </a>
                </Magnetic>
              </div>
            </Item>
          </Reveal>

          <Reveal count={4} className="col-span-12 lg:col-span-7">
            <Item className="panel p-7 md:p-8">
              <form onSubmit={submit} className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-fog">
                      name
                    </span>
                    <input
                      className="field mt-2"
                      name="name"
                      value={form.name}
                      onChange={change}
                      placeholder="your name"
                      required
                    />
                  </label>

                  <label className="block">
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-fog">
                      email
                    </span>
                    <input
                      className="field mt-2"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={change}
                      placeholder="you@company.com"
                      required
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-fog">
                    message
                  </span>
                  <textarea
                    className="field mt-2 resize-none"
                    name="message"
                    rows="5"
                    value={form.message}
                    onChange={change}
                    placeholder="what are you building?"
                    required
                  />
                </label>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                  <p className="max-w-xs font-mono text-[11px] leading-relaxed text-fog">
                    Opens your mail client with this pre-filled. Nothing is sent from
                    this page.
                  </p>
                  <Magnetic>
                    <button type="submit" data-cursor="link" className="btn btn-solid">
                      Compose message →
                    </button>
                  </Magnetic>
                </div>
              </form>
            </Item>
          </Reveal>
        </div>
      </SectionHeading>
    </section>
  );
}

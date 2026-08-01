// src/components/Research.jsx
import { research } from '../data/content';
import SectionHeading from './SectionHeading';
import { Item, Reveal } from './Reveal';

export default function Research() {
  const { publication, education, certifications } = research;

  return (
    <section id="research" className="u-section u-container relative z-10">
      <SectionHeading
        n="05"
        label="research"
        title={
          <>
            Papers,
            <br />
            proof, degrees.
          </>
        }
      >
        <Reveal count={4} className="space-y-5">
          <Item className="panel p-7 md:p-9">
            <div className="flex flex-wrap items-center gap-3">
              <span className="chip chip-accent">publication</span>
              <span className="font-mono text-[11.5px] text-fog">
                {publication.venue} · {publication.index}
              </span>
            </div>
            <h3 className="mt-5 text-2xl font-semibold tracking-tight text-chalk md:text-[28px]">
              {publication.title}
            </h3>
            <p className="mt-3 max-w-xl text-[14.5px] leading-relaxed text-fog">
              {publication.note}
            </p>
            <a
              href={publication.link}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              className="mt-6 inline-flex font-mono text-[12px] text-brand hover:underline"
            >
              IEEE Xplore ↗
            </a>
          </Item>

          <div className="grid grid-cols-12 gap-5">
            <Item className="panel col-span-12 p-7 md:col-span-7 md:p-9">
              <span className="chip">education</span>
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-chalk">
                {education.degree}
              </h3>
              <div className="mt-1.5 text-[14.5px] text-fog">{education.school}</div>
              <div className="text-[13px] text-fog/80">{education.parent}</div>
              <div className="mt-1 font-mono text-[12px] text-brand">{education.period}</div>

              <div className="mt-6 border-t border-hair pt-5">
                <div className="font-mono text-[11px] uppercase tracking-[0.16em] text-fog">
                  relevant coursework
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {education.courses.map((course) => (
                    <span key={course} className="chip">
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </Item>

            <Item className="panel col-span-12 p-7 md:col-span-5 md:p-9">
              <span className="chip">certifications</span>
              <ul className="mt-6 space-y-5">
                {certifications.map((cert) => (
                  <li key={cert.name} className="border-t border-hair pt-5 first:border-t-0 first:pt-0">
                    <div className="text-[15px] leading-snug text-chalk">{cert.name}</div>
                    <div className="mt-1 font-mono text-[11.5px] text-brand">{cert.issuer}</div>
                  </li>
                ))}
              </ul>
            </Item>
          </div>
        </Reveal>
      </SectionHeading>
    </section>
  );
}

// src/components/About.jsx
import { useEffect, useRef } from 'react';

const About = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="about" className="py-20 px-4" ref={sectionRef}>
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="font-mono text-sm text-[#6b6b6b] mb-4">
          <span className="text-[#00d4ff]">01.</span> about
        </div>

        {/* Terminal Window */}
        <div className="terminal-window">
          <div className="terminal-header">
            <div className="terminal-dot terminal-dot-red"></div>
            <div className="terminal-dot terminal-dot-yellow"></div>
            <div className="terminal-dot terminal-dot-green"></div>
            <span className="terminal-title">README.md</span>
          </div>

          <div className="terminal-body">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Profile Image */}
              <div className="md:col-span-1">
                <div className="relative">
                  <div className="aspect-square rounded-lg overflow-hidden border-2 border-[#1e1e1e] hover:border-[#00ff88] transition-colors">
                    <img
                      src="/assets/me.jpg"
                      alt="Niranjan M"
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  <div className="absolute -bottom-3 -right-3 bg-[#111111] border border-[#1e1e1e] px-3 py-1 rounded font-mono text-xs text-[#00ff88]">
                    .jpg
                  </div>
                </div>
              </div>

              {/* About Content */}
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold text-[#00ff88] mb-4 font-mono">
                  # About Me
                </h2>

                <div className="space-y-4 text-[#a0a0a0] leading-relaxed">
                  <p>
                    <span className="text-[#00d4ff]">&gt;</span> Innovative <span className="text-[#00ff88]">Software Engineer</span> with expertise in full-stack development, AI integration, and data engineering.
                  </p>

                  <p>
                    <span className="text-[#00d4ff]">&gt;</span> Proven track record of developing scalable applications, implementing <span className="text-[#00ff88]">ETL pipelines with Apache Airflow</span>, and building AI-powered solutions.
                  </p>

                  <p>
                    <span className="text-[#00d4ff]">&gt;</span> Published researcher with work on <span className="text-[#00ff88]">deep learning for weed classification</span> at 2024 ASIANCON (IEEE Xplore).
                  </p>
                </div>

                {/* Education */}
                <div className="mt-8 p-4 bg-[#0a0a0a] rounded border border-[#1e1e1e]">
                  <div className="font-mono text-sm">
                    <span className="text-[#6b6b6b]">// education</span>
                    <div className="mt-2">
                      <span className="text-[#00d4ff]">degree:</span> <span className="text-[#e0e0e0]">Integrated BCA - MCA</span>
                    </div>
                    <div>
                      <span className="text-[#00d4ff]">institution:</span> <span className="text-[#e0e0e0]">Amrita School of Computing, Mysuru</span>
                    </div>
                    <div>
                      <span className="text-[#00d4ff]">year:</span> <span className="text-[#e0e0e0]">2019 - 2024</span>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="mt-6 flex flex-wrap gap-3">
                  {['JavaScript', 'Python', 'React', 'Node.js', 'FastAPI', 'AI/ML'].map((skill) => (
                    <span key={skill} className="terminal-tag">
                      --{skill.toLowerCase().replace(/[\/\s]/g, '-')}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

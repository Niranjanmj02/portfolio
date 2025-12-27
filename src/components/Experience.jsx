// src/components/Experience.jsx
import { useState, useRef, useEffect } from 'react';

const Experience = () => {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef(null);

  const experiences = [
    {
      company: 'Examic EdTech',
      role: 'Software Engineer',
      period: 'Jul 2024 - Present',
      location: 'Mysore',
      responsibilities: [
        'Built AI support chatbot using RAG, Google Gemini API, and WebSocket for real-time communication',
        'Designed ETL pipelines using Apache Airflow for data migration (UAT → QA → Cloud)',
        'Developed NLP application with FastAPI and Hugging Face BERT for PDF analysis',
        'Built CMS using FastAPI, Google Generative AI, React, and PostgreSQL',
        'Created proctoring solution with LiveKit and Google MediaPipe detection',
        'Engineered voice chat app with Google Gemini multimodal AI and LiveKit Agents',
        'Developed dynamic reporting API with OpenAI for real-time analytics'
      ]
    },
    {
      company: 'Codevice Solution',
      role: 'MERN Stack Developer Intern',
      period: 'Mar 2024 - Jul 2024',
      location: 'Bangalore',
      responsibilities: [
        'Developed Node.js backend with monolithic architecture for robust API integration',
        'Designed microservices architecture with RESTful APIs and inter-service communication',
        'Created scalable inventory management microservices using Node.js and MongoDB'
      ]
    }
  ];

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
    <section id="experience" className="py-20 px-4" ref={sectionRef}>
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="font-mono text-sm text-[#6b6b6b] mb-4">
          <span className="text-[#00d4ff]">02.</span> experience
        </div>

        {/* Terminal Window */}
        <div className="terminal-window">
          <div className="terminal-header">
            <div className="terminal-dot terminal-dot-red"></div>
            <div className="terminal-dot terminal-dot-yellow"></div>
            <div className="terminal-dot terminal-dot-green"></div>
            <span className="terminal-title">git log --oneline</span>
          </div>

          <div className="terminal-body">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Company Tabs */}
              <div className="md:w-1/3">
                <div className="flex md:flex-col gap-2">
                  {experiences.map((exp, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveTab(index)}
                      className={`font-mono text-left text-sm px-4 py-3 rounded transition-all ${activeTab === index
                          ? 'bg-[#00ff88]/10 text-[#00ff88] border-l-2 border-[#00ff88]'
                          : 'text-[#6b6b6b] hover:text-[#a0a0a0] hover:bg-[#1e1e1e]'
                        }`}
                    >
                      {exp.company}
                    </button>
                  ))}
                </div>
              </div>

              {/* Experience Details */}
              <div className="md:w-2/3">
                <div className="p-4 bg-[#0a0a0a] rounded border border-[#1e1e1e]">
                  {/* Role Header */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-[#e0e0e0]">
                      {experiences[activeTab].role}
                    </h3>
                    <div className="font-mono text-sm mt-1">
                      <span className="text-[#00ff88]">@{experiences[activeTab].company}</span>
                      <span className="text-[#6b6b6b]"> • </span>
                      <span className="text-[#00d4ff]">{experiences[activeTab].location}</span>
                    </div>
                    <div className="font-mono text-xs text-[#6b6b6b] mt-1">
                      {experiences[activeTab].period}
                    </div>
                  </div>

                  {/* Responsibilities */}
                  <ul className="space-y-3">
                    {experiences[activeTab].responsibilities.map((item, index) => (
                      <li key={index} className="flex items-start text-sm text-[#a0a0a0]">
                        <span className="text-[#00ff88] mr-3 font-mono">→</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;

// src/components/Projects.jsx
import { useState, useRef, useEffect } from 'react';

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const sectionRef = useRef(null);

  const projects = [
    {
      title: 'Hope Connect',
      description: 'Donation platform connecting donors with orphanages, featuring donation tracking and secure payment processing.',
      technologies: ['Node.js', 'Express.js', 'MongoDB', 'React'],
      github: '#',
      demo: '#'
    },
    {
      title: 'DeepWeed CNN',
      description: 'Published research at 2024 ASIANCON (IEEE Xplore). Deep learning model using VGG16 for weed classification.',
      technologies: ['TensorFlow', 'VGG16', 'CNN', 'Python'],
      github: '#',
      demo: 'https://ieeexplore.ieee.org/'
    },
    {
      title: 'AI Proctoring System',
      description: 'Advanced proctoring with LiveKit and Google MediaPipe for detecting multiple persons and objects.',
      technologies: ['LiveKit', 'MediaPipe', 'Node.js', 'React'],
      github: '#',
      demo: '#'
    },
    {
      title: 'RAG Chatbot',
      description: 'AI chatbot using RAG architecture, Google Gemini API, and WebSocket for real-time query resolution.',
      technologies: ['Gemini API', 'RAG', 'PostgreSQL', 'FastAPI'],
      github: '#',
      demo: '#'
    },
    {
      title: 'Voice Chat App',
      description: 'Real-time voice chat with Google Gemini multimodal AI and LiveKit Agents integration.',
      technologies: ['Gemini', 'LiveKit', 'WebRTC', 'React'],
      github: '#',
      demo: '#'
    },
    {
      title: 'ETL Pipeline System',
      description: 'Comprehensive data migration pipelines using Apache Airflow with Python DAGs and upsert operations.',
      technologies: ['Airflow', 'Python', 'PostgreSQL', 'Azure'],
      github: '#',
      demo: '#'
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
    <section id="projects" className="py-20 px-4" ref={sectionRef}>
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="font-mono text-sm text-[#6b6b6b] mb-4">
          <span className="text-[#00d4ff]">03.</span> projects
        </div>

        <div className="font-mono text-[#00ff88] mb-8 text-lg">
          $ ls -la ./projects/
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {projects.map((project, index) => (
            <div
              key={index}
              className="terminal-window group hover:border-[#00ff88]/50 transition-all duration-300"
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="terminal-header">
                <div className="terminal-dot terminal-dot-red"></div>
                <div className="terminal-dot terminal-dot-yellow"></div>
                <div className="terminal-dot terminal-dot-green"></div>
                <span className="terminal-title">{project.title.toLowerCase().replace(/\s+/g, '-')}.md</span>
              </div>

              <div className="p-5">
                <h3 className="font-bold text-lg text-[#e0e0e0] mb-2 group-hover:text-[#00ff88] transition-colors">
                  {project.title}
                </h3>

                <p className="text-[#6b6b6b] text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="font-mono text-xs text-[#00d4ff] bg-[#00d4ff]/10 px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4 font-mono text-xs">
                  <a
                    href={project.github}
                    className="text-[#6b6b6b] hover:text-[#00ff88] transition-colors"
                  >
                    [github]
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#6b6b6b] hover:text-[#00ff88] transition-colors"
                  >
                    [live →]
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
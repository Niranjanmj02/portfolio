    // src/components/Projects.jsx (continued)
import { useState, useRef, useEffect } from 'react';

const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState(null);
  const sectionRef = useRef(null);
  
  const projects = [
    {
      title: "DeepWeed",
      description: "A dynamically adaptive lightweight deep learning model for efficient weed classification using VGG16 pre-trained weights with custom layers.",
      technologies: ["TensorFlow", "Convolutional Neural Networks", "VGG16", "L2 Regularization"],
      image: "/project-deepweed.jpg",
      link: "https://ieeexplore.ieee.org/"
    },
    {
      title: "Energy Intensity Analysis",
      description: "Machine learning project analyzing the connection between energy consumption and GDP using decision tree and naive Bayes algorithms.",
      technologies: ["Python", "Decision Trees", "Naive Bayes", "Data Visualization"],
      image: "/project-energy.jpg",
      link: "#"
    },
    {
      title: "AI-Powered Proctoring System",
      description: "Real-time proctoring solution using video streaming and screen-sharing with cloud storage integration.",
      technologies: ["LiveKit", "Node.js", "MongoDB", "React", "MinIO", "Azure Blob Storage"],
      image: "/project-proctoring.jpg",
      link: "#"
    },
    {
      title: "RAG-Enhanced Chatbot",
      description: "Intelligent chatbot leveraging Google Gemini and Retrieval-Augmented Generation with vector database for enhanced responses.",
      technologies: ["Google Gemini", "RAG", "PostgreSQL Vector DB", "FastAPI", "React"],
      image: "/project-chatbot.jpg",
      link: "#"
    }
  ];
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeIn');
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
    <section id="projects" className="py-20 bg-gradient-to-b from-black to-purple-900/20" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-16 text-center relative overflow-hidden">
          <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
            Featured Projects
          </span>
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl text-white/5 font-bold">
            PROJECTS
          </span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group relative rounded-xl overflow-hidden bg-gradient-to-br from-purple-900/40 to-black border border-white/10 h-[400px]"
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-all duration-700 group-hover:scale-110 group-hover:opacity-20 opacity-40"
                style={{ backgroundImage: `url(${project.image})` }}
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
              
              <div className="relative z-10 h-full flex flex-col justify-end p-6 transition-all duration-500">
                <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-pink-500 transition-all duration-300">
                  {project.title}
                </h3>
                
                <p className={`text-gray-300 mb-4 transform transition-all duration-500 ${
                  hoveredProject === index ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}>
                  {project.description}
                </p>
                
                <div className={`flex flex-wrap gap-2 mb-6 transform transition-all duration-500 ${
                  hoveredProject === index ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}>
                  {project.technologies.map((tech, techIndex) => (
                    <span key={techIndex} className="px-3 py-1 text-xs bg-white/10 rounded-full text-gray-300">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`inline-flex items-center text-gray-300 hover:text-pink-500 transition-all duration-300 transform ${
                    hoveredProject === index ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}
                >
                  View Project
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
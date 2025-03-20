// src/components/Experience.jsx
import { useState, useRef, useEffect } from 'react';

const Experience = () => {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef(null);
  
  const experiences = [
    {
      company: 'Examic EdTech Private Limited',
      role: 'Associate Software Engineer',
      period: 'July 2024 - Present',
      location: 'Mysore',
      responsibilities: [
        'Developed NLP applications using FastAPI and Hugging Face Transformers for similarity checking and automated question generation',
        'Created content generation systems with Google Generative AI and React',
        'Built proctoring solutions using LiveKit, Node.js, and MongoDB',
        'Engineered chatbots with RAG implementation and PostgreSQL vector databases',
        'Developed real-time voice chat applications with AI capabilities'
      ]
    },
    {
      company: 'Codevice Solution Private Limited',
      role: 'MERN Stack Developer Intern',
      period: 'March 2024 - July 2024',
      location: 'Bangalore',
      responsibilities: [
        'Developed backend systems using Node.js in a monolithic architecture',
        'Designed and deployed microservices architecture with RESTful APIs',
        'Created scalable microservices for inventory management using Node.js and MongoDB'
      ]
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
    <section id="experience" className="py-20 bg-gradient-to-b from-purple-900/20 to-black" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-16 text-center relative overflow-hidden">
          <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
            Work Experience
          </span>
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl text-white/5 font-bold">
            EXPERIENCE
          </span>
        </h2>
        
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-1/3">
            <div className="sticky top-24 border-l-2 border-white/20">
              {experiences.map((exp, index) => (
                <button
                  key={index}
                  className={`block w-full text-left pl-4 py-4 transition-all duration-300 ${
                    activeTab === index
                      ? 'border-l-2 border-pink-500 -ml-0.5 text-pink-500'
                      : 'text-gray-400 hover:text-white hover:pl-6'
                  }`}
                  onClick={() => setActiveTab(index)}
                >
                  {exp.company}
                </button>
              ))}
            </div>
          </div>
          
          <div className="md:w-2/3">
            <div className="relative overflow-hidden p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl opacity-20"></div>
              <div className="relative">
                <h3 className="text-2xl font-bold mb-1">{experiences[activeTab].role}</h3>
                <h4 className="text-xl text-pink-500 mb-2">{experiences[activeTab].company}</h4>
                <p className="text-gray-400 mb-4">{experiences[activeTab].period} | {experiences[activeTab].location}</p>
                
                <ul className="space-y-3">
                  {experiences[activeTab].responsibilities.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-pink-500 mr-2">›</span>
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;

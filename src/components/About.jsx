// src/components/About.jsx
import { useEffect, useRef } from 'react';

const About = () => {
  const sectionRef = useRef(null);
  
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
    <section id="about" className="py-20 bg-gradient-to-b from-black to-purple-900/20" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-16 text-center relative overflow-hidden">
          <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
            About Me
          </span>
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl text-white/5 font-bold">
            ABOUT
          </span>
        </h2>
        
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative aspect-square rounded-xl overflow-hidden">
                <img 
                  src="/assets/me.jpg" 
                  alt="Niranjan M" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
            </div>
          </div>
          
          <div className="md:w-1/2">
            <h3 className="text-2xl font-bold mb-4">Full Stack Developer & AI Enthusiast</h3>
            <p className="text-gray-300 mb-6">
              I'm Niranjan M, a passionate software engineer with expertise in full-stack development and artificial intelligence. 
              With a strong foundation in both frontend and backend technologies, I specialize in creating innovative solutions 
              that leverage cutting-edge AI/ML techniques.
            </p>
            <p className="text-gray-300 mb-6">
              My journey in software development has equipped me with a versatile skill set, allowing me to build everything 
              from responsive web applications to sophisticated AI-powered systems. I'm particularly interested in natural 
              language processing, computer vision, and developing applications that make AI accessible and practical.
            </p>
            <p className="text-gray-300 mb-6">
              When I'm not coding, I enjoy exploring new technologies, contributing to open-source projects, and staying 
              updated with the latest advancements in the tech world.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <div className="px-4 py-2 bg-white/10 rounded-full text-sm">JavaScript</div>
              <div className="px-4 py-2 bg-white/10 rounded-full text-sm">Python</div>
              <div className="px-4 py-2 bg-white/10 rounded-full text-sm">React</div>
              <div className="px-4 py-2 bg-white/10 rounded-full text-sm">Node.js</div>
              <div className="px-4 py-2 bg-white/10 rounded-full text-sm">TensorFlow</div>
              <div className="px-4 py-2 bg-white/10 rounded-full text-sm">FastAPI</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

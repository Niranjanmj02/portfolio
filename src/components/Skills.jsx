
// src/components/Skills.jsx
import { useRef, useEffect } from 'react';

const Skills = () => {
    const sectionRef = useRef(null);

    const skillCategories = [
        {
            title: "Languages",
            skills: [
                { name: "JavaScript", level: 90 },
                { name: "Python", level: 85 },
                { name: "SQL", level: 80 },
                { name: "HTML/CSS", level: 90 },
                { name: "Node.js", level: 85 }
            ]
        },
        {
            title: "Frameworks & Libraries",
            skills: [
                { name: "React.js", level: 90 },
                { name: "Express.js", level: 85 },
                { name: "FastAPI", level: 80 },
                { name: "TensorFlow", level: 75 },
                { name: "Hugging Face", level: 70 }
            ]
        },
        {
            title: "Tools & Platforms",
            skills: [
                { name: "Git", level: 85 },
                { name: "MongoDB", level: 80 },
                { name: "PostgreSQL", level: 75 },
                { name: "Azure Blob", level: 70 },
                { name: "LiveKit", level: 75 }
            ]
        },
        {
            title: "AI & ML",
            skills: [
                { name: "NLP", level: 80 },
                { name: "RAG", level: 75 },
                { name: "Google Gemini", level: 70 },
                { name: "Neural Networks", level: 75 },
                { name: "Data Analysis", level: 80 }
            ]
        }
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-fadeIn');

                    // Animate skill bars
                    const skillBars = entry.target.querySelectorAll('.skill-bar-fill');
                    skillBars.forEach((bar, index) => {
                        setTimeout(() => {
                            bar.style.width = bar.dataset.level + '%';
                            bar.style.opacity = 1;
                        }, index * 100);
                    });
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
        <section id="skills" className="py-20 bg-gradient-to-b from-purple-900/20 to-black" ref={sectionRef}>
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold mb-16 text-center relative overflow-hidden">
                    <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
                        Technical Skills
                    </span>
                    <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-8xl text-white/5 font-bold">
                        SKILLS
                    </span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {skillCategories.map((category, catIndex) => (
                        <div key={catIndex} className="relative p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl opacity-20"></div>
                            <div className="relative">
                                <h3 className="text-xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                                    {category.title}
                                </h3>

                                <div className="space-y-6">
                                    {category.skills.map((skill, skillIndex) => (
                                        <div key={skillIndex}>
                                            <div className="flex justify-between mb-2">
                                                <span className="text-gray-300">{skill.name}</span>
                                                <span className="text-gray-400">{skill.level}%</span>
                                            </div>
                                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                                <div
                                                    className="skill-bar-fill h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-0"
                                                    style={{ width: '0%', transition: 'width 1s ease-in-out, opacity 0.5s ease-in-out' }}
                                                    data-level={skill.level}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
                    {[
                        'javascript', 'python', 'react', 'node', 'mongodb', 'postgresql',
                        'tensorflow', 'fastapi', 'huggingface', 'azure', 'git', 'livekit'
                    ].map((tech, index) => (
                        <div
                            key={index}
                            className="flex flex-col items-center justify-center p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300 group"
                        >
<div className="w-12 h-12 mb-2 text-gray-400 group-hover:text-white transition-colors duration-300">
  <img 
    src={`/assets/${tech}.svg`} 
    alt={tech} 
    className="w-full h-full object-contain transition-all duration-300 group-hover:scale-110"
  />
</div>
                            <span className="text-xs text-gray-400 group-hover:text-white capitalize transition-colors duration-300">
                                {tech}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
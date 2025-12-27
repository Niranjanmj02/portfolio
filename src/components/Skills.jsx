// src/components/Skills.jsx
import { useRef, useEffect } from 'react';

const Skills = () => {
    const sectionRef = useRef(null);

    const skillCategories = [
        {
            title: 'Languages & Frameworks',
            skills: [
                { name: 'JavaScript', level: 90 },
                { name: 'Python', level: 88 },
                { name: 'React.js', level: 90 },
                { name: 'Node.js', level: 88 },
                { name: 'FastAPI', level: 85 },
                { name: 'Express.js', level: 85 },
                { name: 'SQL', level: 82 }
            ]
        },
        {
            title: 'Tools & Databases',
            skills: [
                { name: 'PostgreSQL', level: 82 },
                { name: 'MongoDB', level: 85 },
                { name: 'Git', level: 88 },
                { name: 'Apache Airflow', level: 80 },
                { name: 'Azure Blob', level: 78 },
                { name: 'Docker', level: 75 }
            ]
        },
        {
            title: 'AI/ML & Data',
            skills: [
                { name: 'TensorFlow', level: 78 },
                { name: 'Hugging Face', level: 80 },
                { name: 'Google Gemini', level: 85 },
                { name: 'OpenAI API', level: 82 },
                { name: 'RAG Architecture', level: 82 },
                { name: 'ETL Pipelines', level: 80 }
            ]
        }
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');

                    // Animate progress bars
                    const bars = entry.target.querySelectorAll('.skill-bar');
                    bars.forEach((bar, index) => {
                        setTimeout(() => {
                            bar.style.width = bar.dataset.level + '%';
                        }, index * 50);
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

    // Generate CLI-style progress bar
    const renderProgressBar = (level) => {
        const filled = Math.floor(level / 10);
        const empty = 10 - filled;
        return `[${'█'.repeat(filled)}${'░'.repeat(empty)}]`;
    };

    return (
        <section id="skills" className="py-20 px-4" ref={sectionRef}>
            <div className="max-w-4xl mx-auto">
                {/* Section Header */}
                <div className="font-mono text-sm text-[#6b6b6b] mb-4">
                    <span className="text-[#00d4ff]">04.</span> skills
                </div>

                <div className="font-mono text-[#00ff88] mb-8 text-lg">
                    $ neofetch --skills
                </div>

                {/* Skills Grid */}
                <div className="grid md:grid-cols-3 gap-6">
                    {skillCategories.map((category, catIndex) => (
                        <div key={catIndex} className="terminal-window">
                            <div className="terminal-header">
                                <div className="terminal-dot terminal-dot-red"></div>
                                <div className="terminal-dot terminal-dot-yellow"></div>
                                <div className="terminal-dot terminal-dot-green"></div>
                                <span className="terminal-title">{category.title.toLowerCase().replace(/[\s&\/]+/g, '-')}</span>
                            </div>

                            <div className="p-5">
                                <h3 className="font-mono text-[#00ff88] text-sm mb-4">
                                    # {category.title}
                                </h3>

                                <div className="space-y-3">
                                    {category.skills.map((skill, skillIndex) => (
                                        <div key={skillIndex} className="font-mono text-xs">
                                            <div className="flex justify-between mb-1">
                                                <span className="text-[#a0a0a0]">{skill.name}</span>
                                                <span className="text-[#6b6b6b]">{skill.level}%</span>
                                            </div>
                                            <div className="terminal-progress">
                                                <div
                                                    className="skill-bar h-full bg-gradient-to-r from-[#00ff88] to-[#00d4ff] transition-all duration-1000"
                                                    style={{ width: '0%' }}
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

                {/* Tech Icons */}
                <div className="mt-12 terminal-window">
                    <div className="terminal-header">
                        <div className="terminal-dot terminal-dot-red"></div>
                        <div className="terminal-dot terminal-dot-yellow"></div>
                        <div className="terminal-dot terminal-dot-green"></div>
                        <span className="terminal-title">tech-stack.config</span>
                    </div>

                    <div className="p-6">
                        <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
                            {[
                                'javascript', 'python', 'react', 'node',
                                'mongodb', 'postgresql', 'tensorflow', 'git'
                            ].map((tech, index) => (
                                <div
                                    key={index}
                                    className="flex flex-col items-center p-3 bg-[#0a0a0a] rounded border border-[#1e1e1e] hover:border-[#00ff88] transition-all group"
                                >
                                    <img
                                        src={`/assets/${tech}.svg`}
                                        alt={tech}
                                        className="w-8 h-8 mb-2 opacity-60 group-hover:opacity-100 transition-opacity"
                                    />
                                    <span className="font-mono text-xs text-[#6b6b6b] group-hover:text-[#00ff88] transition-colors">
                                        {tech}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
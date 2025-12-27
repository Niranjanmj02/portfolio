// src/components/Hero.jsx
import { useState, useEffect } from 'react';

const Hero = () => {
    const [displayText, setDisplayText] = useState('');
    const [showCursor, setShowCursor] = useState(true);
    const fullText = 'Software Engineer';

    useEffect(() => {
        let index = 0;
        const typeInterval = setInterval(() => {
            if (index <= fullText.length) {
                setDisplayText(fullText.slice(0, index));
                index++;
            } else {
                clearInterval(typeInterval);
            }
        }, 100);

        return () => clearInterval(typeInterval);
    }, []);

    useEffect(() => {
        const cursorInterval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 530);
        return () => clearInterval(cursorInterval);
    }, []);

    return (
        <section id="home" className="min-h-screen flex items-center justify-center px-4 pt-20">
            <div className="max-w-4xl w-full">
                {/* Terminal Window */}
                <div className="terminal-window">
                    <div className="terminal-header">
                        <div className="terminal-dot terminal-dot-red"></div>
                        <div className="terminal-dot terminal-dot-yellow"></div>
                        <div className="terminal-dot terminal-dot-green"></div>
                        <span className="terminal-title">niranjan@portfolio ~ </span>
                    </div>

                    <div className="terminal-body font-mono">
                        {/* Welcome Line */}
                        <div className="text-[#6b6b6b] mb-6 text-sm">
                            Last login: {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} on ttys001
                        </div>

                        {/* Name */}
                        <div className="mb-4">
                            <span className="text-[#00d4ff]">niranjan</span>
                            <span className="text-[#6b6b6b]">@</span>
                            <span className="text-[#00ff88]">portfolio</span>
                            <span className="text-[#6b6b6b]">:~$ </span>
                            <span className="text-[#e0e0e0]">whoami</span>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold text-[#00ff88] mb-6 text-glow-green">
                            Niranjan M
                        </h1>

                        {/* Role with typing effect */}
                        <div className="mb-4">
                            <span className="text-[#00d4ff]">niranjan</span>
                            <span className="text-[#6b6b6b]">@</span>
                            <span className="text-[#00ff88]">portfolio</span>
                            <span className="text-[#6b6b6b]">:~$ </span>
                            <span className="text-[#e0e0e0]">echo $ROLE</span>
                        </div>

                        <div className="text-2xl md:text-3xl text-[#e0e0e0] mb-8">
                            {displayText}
                            <span className={`text-[#00ff88] ${showCursor ? 'opacity-100' : 'opacity-0'}`}>▋</span>
                        </div>

                        {/* Description */}
                        <div className="mb-4">
                            <span className="text-[#00d4ff]">niranjan</span>
                            <span className="text-[#6b6b6b]">@</span>
                            <span className="text-[#00ff88]">portfolio</span>
                            <span className="text-[#6b6b6b]">:~$ </span>
                            <span className="text-[#e0e0e0]">cat about.txt</span>
                        </div>

                        <p className="text-[#a0a0a0] mb-8 text-lg leading-relaxed max-w-2xl">
                            Full-stack developer specializing in AI integration, data engineering with Apache Airflow, and building scalable applications.
                        </p>

                        {/* Links */}
                        <div className="flex flex-wrap gap-4 mb-8">
                            <a
                                href="#projects"
                                className="terminal-btn terminal-btn-filled text-sm"
                            >
                                [ENTER] View Projects
                            </a>
                            <a
                                href="#contact"
                                className="terminal-btn text-sm"
                            >
                                [ESC] Contact Me
                            </a>
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center gap-6 text-sm">
                            <span className="text-[#6b6b6b]">// find me on</span>
                            <a
                                href="https://github.com/Niranjanmj02"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="terminal-link hover:text-glow-green"
                            >
                                github
                            </a>
                            <a
                                href="https://www.linkedin.com/in/niranjan-m-1ba74b258/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="terminal-link hover:text-glow-green"
                            >
                                linkedin
                            </a>
                            <a
                                href="mailto:niranjanmj02@gmail.com"
                                className="terminal-link hover:text-glow-green"
                            >
                                email
                            </a>
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="flex justify-center mt-12">
                    <a href="#about" className="text-[#6b6b6b] hover:text-[#00ff88] transition-colors font-mono text-sm flex flex-col items-center gap-2">
                        <span>scroll_down</span>
                        <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;
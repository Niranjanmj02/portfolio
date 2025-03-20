    // src/components/Hero.jsx
    import { useState, useEffect } from 'react';

    const Hero = () => {
    const [glitchText, setGlitchText] = useState('DEVELOPER');
    const titles = ['DEVELOPER', 'AI ENGINEER', 'FULL STACK', 'ML ENTHUSIAST'];
    const [titleIndex, setTitleIndex] = useState(0);
    const [letterIndex, setLetterIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [typingSpeed, setTypingSpeed] = useState(150);

    useEffect(() => {
        const timeout = setTimeout(() => {
        // Current title
        const currentTitle = titles[titleIndex];
        
        // Handle typing and deleting
        if (!isDeleting) {
            setGlitchText(currentTitle.substring(0, letterIndex + 1));
            setLetterIndex(letterIndex + 1);
            
            // If we've finished typing the current title
            if (letterIndex >= currentTitle.length) {
            setIsDeleting(true);
            setTypingSpeed(1000); // Pause before deleting
            }
        } else {
            setGlitchText(currentTitle.substring(0, letterIndex - 1));
            setLetterIndex(letterIndex - 1);
            
            // If we've finished deleting the current title
            if (letterIndex <= 1) {
            setIsDeleting(false);
            setTitleIndex((titleIndex + 1) % titles.length);
            setTypingSpeed(150);
            }
        }
        }, typingSpeed);
        
        return () => clearTimeout(timeout);
    }, [glitchText, letterIndex, isDeleting, titleIndex, typingSpeed]);

    return (
        <section id="home" className="h-screen flex items-center justify-center relative overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-indigo-900/20 animate-gradient-shift"></div>
        
        {/* Animated shapes */}
        <div className="absolute inset-0 overflow-hidden">
            {[...Array(5)].map((_, i) => (
            <div
                key={i}
                className="absolute rounded-full mix-blend-screen animate-float"
                style={{
                width: `${Math.random() * 400 + 200}px`,
                height: `${Math.random() * 400 + 200}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: `radial-gradient(circle, rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2) 0%, rgba(0,0,0,0) 70%)`,
                animationDuration: `${Math.random() * 10 + 10}s`,
                animationDelay: `${Math.random() * 5}s`,
                }}
            />
            ))}
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 z-10">
            <div className="flex flex-col items-center text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 glitch-text" data-text="NIRANJAN M">
                <span className="relative z-10">NIRANJAN M</span>
            </h1>
            
            <div className="h-20 flex items-center justify-center">
                <h2 className="text-2xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 glitch-text" data-text={glitchText}>
                {glitchText}
                </h2>
            </div>
            
            <p className="text-xl md:text-2xl mb-8 max-w-2xl text-gray-300">
                Building innovative solutions with cutting-edge technologies in AI, ML, and full-stack development.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
                <a
                href="#projects"
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 hover:shadow-neon"
                >
                View Projects
                </a>
                <a
                href="#contact"
                className="px-8 py-3 bg-transparent border border-white/30 rounded-full font-medium hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
                >
                Contact Me
                </a>
            </div>
            
            <div className="mt-12 flex space-x-6">
                <a
                href="https://github.com/Niranjanmj02"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
                </a>
                <a
                href="https://www.linkedin.com/in/niranjan-m-1ba74b258/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                </a>
            </div>
            </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
            <span className="text-sm text-gray-400 mb-2">Scroll Down</span>
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-scroll-down"></div>
            </div>
        </div>
        </section>
    );
    };

    export default Hero;
// src/App.jsx
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  if (loading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-[#0a0a0a]">
        <div className="font-mono text-[#00ff88] text-lg mb-4">
          <span className="text-[#00d4ff]">$</span> initializing portfolio...
        </div>
        <div className="w-64 h-2 bg-[#1e1e1e] rounded overflow-hidden">
          <div className="h-full bg-gradient-to-r from-[#00ff88] to-[#00d4ff] animate-pulse" style={{ width: '100%' }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0a0a0a] text-[#e0e0e0] min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
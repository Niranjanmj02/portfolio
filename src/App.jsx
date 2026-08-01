// src/App.jsx
import { MotionConfig } from 'framer-motion';

import ThemeProvider from './components/ThemeProvider';
import SmoothScroll from './components/SmoothScroll';
import ScrollProgress from './components/ScrollProgress';
import Scene3D from './components/three/Scene3D';
import Grain from './components/Grain';
import Cursor from './components/Cursor';
import Intro from './components/Intro';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Research from './components/Research';
import Contact from './components/Contact';
import Footer from './components/Footer';

import { EASE_OUT } from './lib/motion';

export default function App() {
  return (
    // reducedMotion="user" strips transforms from every animation at once.
    <MotionConfig reducedMotion="user" transition={{ ease: EASE_OUT }}>
      <ThemeProvider>
        <SmoothScroll />
        <Scene3D />
        <Grain />
        <Cursor />
        <ScrollProgress />
        <Intro />

        <a
          href="#about"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[90] focus:rounded-full focus:bg-brand focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:text-ink"
        >
          Skip to content
        </a>

        <Navbar />

        <main className="relative z-10">
          <Hero />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Research />
          <Contact />
        </main>

        <Footer />
      </ThemeProvider>
    </MotionConfig>
  );
}

// src/components/Navbar.jsx
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['home', 'about', 'experience', 'projects', 'skills', 'contact'];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled
          ? 'bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-[#1e1e1e]'
          : 'bg-transparent'
        }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="#home" className="font-mono text-lg group">
            <span className="text-[#00d4ff]">~</span>
            <span className="text-[#6b6b6b]">/</span>
            <span className="text-[#00ff88] group-hover:text-glow-green transition-all">niranjan</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="font-mono text-sm px-3 py-2 text-[#a0a0a0] hover:text-[#00ff88] transition-colors"
              >
                ./{item}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden font-mono text-[#00ff88] hover:text-glow-green transition-all"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? '[x] close' : '[=] menu'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#111111] border-t border-[#1e1e1e]">
          <div className="max-w-6xl mx-auto px-4 py-4">
            {navItems.map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="block font-mono text-sm py-3 text-[#a0a0a0] hover:text-[#00ff88] transition-colors border-b border-[#1e1e1e] last:border-0"
                onClick={() => setMenuOpen(false)}
              >
                <span className="text-[#00d4ff]">$</span> cd ./{item}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
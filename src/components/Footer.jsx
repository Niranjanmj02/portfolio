// src/components/Footer.jsx
const Footer = () => {
  return (
    <footer className="py-8 px-4 border-t border-[#1e1e1e]">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Logo */}
          <div className="font-mono text-sm">
            <span className="text-[#6b6b6b]">// </span>
            <span className="text-[#00ff88]">niranjan</span>
            <span className="text-[#6b6b6b]">@portfolio</span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6 font-mono text-sm">
            <a
              href="https://github.com/Niranjanmj02"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6b6b6b] hover:text-[#00ff88] transition-colors"
            >
              github
            </a>
            <a
              href="https://www.linkedin.com/in/niranjan-m-1ba74b258/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#6b6b6b] hover:text-[#00ff88] transition-colors"
            >
              linkedin
            </a>
            <a
              href="mailto:niranjanmj02@gmail.com"
              className="text-[#6b6b6b] hover:text-[#00ff88] transition-colors"
            >
              email
            </a>
          </div>

          {/* Copyright */}
          <div className="font-mono text-xs text-[#3a3a3a]">
            © {new Date().getFullYear()} Niranjan M
          </div>
        </div>

        {/* Built with */}
        <div className="mt-6 text-center font-mono text-xs text-[#3a3a3a]">
          <span className="text-[#6b6b6b]">$</span> built with react + tailwind
        </div>
      </div>
    </footer>
  );
};

export default Footer;
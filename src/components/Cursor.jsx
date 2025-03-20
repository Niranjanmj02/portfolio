// src/components/Cursor.jsx
import { useState, useEffect } from 'react';

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hidden, setHidden] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [linkHovered, setLinkHovered] = useState(false);

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseDown = () => setClicked(true);
    const handleMouseUp = () => setClicked(false);
    const handleMouseEnter = () => setHidden(false);
    const handleMouseLeave = () => setHidden(true);

    const handleLinkHoverStart = () => setLinkHovered(true);
    const handleLinkHoverEnd = () => setLinkHovered(false);

    document.addEventListener('mousemove', updatePosition);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    const links = document.querySelectorAll('a, button');
    links.forEach((link) => {
      link.addEventListener('mouseenter', handleLinkHoverStart);
      link.addEventListener('mouseleave', handleLinkHoverEnd);
    });

    return () => {
      document.removeEventListener('mousemove', updatePosition);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);

      links.forEach((link) => {
        link.removeEventListener('mouseenter', handleLinkHoverStart);
        link.removeEventListener('mouseleave', handleLinkHoverEnd);
      });
    };
  }, []);

  return (
    <>
      <div
        className={`fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference transition-transform duration-300 ${
          hidden ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
        }}
      >
        <div
          className={`relative rounded-full bg-white transition-all duration-300 ${
            clicked ? 'w-6 h-6 opacity-30' : linkHovered ? 'w-12 h-12 opacity-50' : 'w-8 h-8'
          }`}
          style={{
            transform: `translate(-50%, -50%)`,
          }}
        />
      </div>
      <div
        className="fixed top-0 left-0 pointer-events-none z-40 mix-blend-difference transition-transform duration-500"
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${linkHovered ? 4 : 1})`,
        }}
      >
        <div
          className="relative rounded-full bg-white opacity-20 transition-all duration-500"
          style={{
            transform: `translate(-50%, -50%)`,
            width: '30px',
            height: '30px',
          }}
        />
      </div>
    </>
  );
};

export default Cursor;
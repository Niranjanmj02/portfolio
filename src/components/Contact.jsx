// src/components/Contact.jsx
import { useState, useRef, useEffect } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const sectionRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });

      setTimeout(() => setSubmitStatus(null), 5000);
    }, 1500);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
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
    <section id="contact" className="py-20 px-4" ref={sectionRef}>
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="font-mono text-sm text-[#6b6b6b] mb-4">
          <span className="text-[#00d4ff]">05.</span> contact
        </div>

        <div className="font-mono text-[#00ff88] mb-8 text-lg">
          $ ./send-message.sh
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Contact Info */}
          <div className="terminal-window">
            <div className="terminal-header">
              <div className="terminal-dot terminal-dot-red"></div>
              <div className="terminal-dot terminal-dot-yellow"></div>
              <div className="terminal-dot terminal-dot-green"></div>
              <span className="terminal-title">contact.json</span>
            </div>

            <div className="p-6 font-mono text-sm">
              <div className="text-[#6b6b6b]">{'{'}</div>

              <div className="ml-4 space-y-2">
                <div>
                  <span className="text-[#00d4ff]">"email"</span>
                  <span className="text-[#6b6b6b]">: </span>
                  <a href="mailto:niranjanmj02@gmail.com" className="text-[#00ff88] hover:underline">
                    "niranjanmj02@gmail.com"
                  </a>
                  <span className="text-[#6b6b6b]">,</span>
                </div>

                <div>
                  <span className="text-[#00d4ff]">"phone"</span>
                  <span className="text-[#6b6b6b]">: </span>
                  <span className="text-[#e0e0e0]">"+91 9449198093"</span>
                  <span className="text-[#6b6b6b]">,</span>
                </div>

                <div>
                  <span className="text-[#00d4ff]">"location"</span>
                  <span className="text-[#6b6b6b]">: </span>
                  <span className="text-[#e0e0e0]">"Mysore, Karnataka"</span>
                  <span className="text-[#6b6b6b]">,</span>
                </div>

                <div>
                  <span className="text-[#00d4ff]">"socials"</span>
                  <span className="text-[#6b6b6b]">: {'{'}</span>
                </div>

                <div className="ml-4">
                  <span className="text-[#00d4ff]">"github"</span>
                  <span className="text-[#6b6b6b]">: </span>
                  <a href="https://github.com/Niranjanmj02" target="_blank" rel="noopener noreferrer" className="text-[#00ff88] hover:underline">
                    "github.com/Niranjanmj02"
                  </a>
                  <span className="text-[#6b6b6b]">,</span>
                </div>

                <div className="ml-4">
                  <span className="text-[#00d4ff]">"linkedin"</span>
                  <span className="text-[#6b6b6b]">: </span>
                  <a href="https://www.linkedin.com/in/niranjan-m-1ba74b258/" target="_blank" rel="noopener noreferrer" className="text-[#00ff88] hover:underline">
                    "linkedin.com/in/niranjan-m"
                  </a>
                </div>

                <div className="text-[#6b6b6b] -ml-4">{'}'}</div>
              </div>

              <div className="text-[#6b6b6b]">{'}'}</div>

              <div className="mt-8 text-[#6b6b6b]">
                // Open to opportunities and collaborations
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="terminal-window">
            <div className="terminal-header">
              <div className="terminal-dot terminal-dot-red"></div>
              <div className="terminal-dot terminal-dot-yellow"></div>
              <div className="terminal-dot terminal-dot-green"></div>
              <span className="terminal-title">compose-message</span>
            </div>

            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-mono text-sm text-[#00d4ff] mb-2">
                    &gt; name:
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="terminal-input"
                    placeholder="your_name"
                    required
                  />
                </div>

                <div>
                  <label className="block font-mono text-sm text-[#00d4ff] mb-2">
                    &gt; email:
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="terminal-input"
                    placeholder="your@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block font-mono text-sm text-[#00d4ff] mb-2">
                    &gt; message:
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="4"
                    className="terminal-input resize-none"
                    placeholder="your message here..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`terminal-btn terminal-btn-filled w-full font-mono text-sm ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                >
                  {isSubmitting ? '$ sending...' : '$ send --message'}
                </button>

                {submitStatus === 'success' && (
                  <div className="font-mono text-sm text-[#00ff88] p-3 bg-[#00ff88]/10 rounded border border-[#00ff88]/30">
                    ✓ Message sent successfully!
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
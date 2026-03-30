
import React, { useState } from 'react';
import SectionTitle from './SectionTitle';
import { FadeIn, SlideIn } from './animations';
import { Mail, Linkedin, Phone, MapPin } from 'lucide-react';

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Message from ${name} (${email})`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:saumya.gg6@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="section-padding bg-pastel-light-pink/50 dark:bg-pastel-charcoal/30">
      <div className="container-custom">
        <FadeIn>
          <SectionTitle 
            title="Contact Me" 
            subtitle="Get In Touch"
          />
        </FadeIn>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <SlideIn direction="left">
            <div className="glass-card p-8 h-full">
              <h3 className="text-2xl font-semibold mb-6 dark:text-pastel-light-gray">Let's Connect</h3>
              <p className="text-foreground/70 mb-8 dark:text-pastel-light-gray/70">
                I'm currently looking for new opportunities. Whether you have a question or just want to connect, I'll get back to you as soon as possible.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-pastel-pink/20 rounded-full dark:bg-pastel-burgundy/30">
                    <Mail size={18} className="text-primary-foreground dark:text-pastel-light-gray" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground/60 dark:text-pastel-light-gray/60">Email</p>
                    <a href="mailto:saumya.gg6@gmail.com" className="text-foreground hover:text-primary-foreground/80 transition-colors dark:text-pastel-light-gray dark:hover:text-pastel-light-gray/80">
                      saumya.gg6@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-pastel-pink/20 rounded-full dark:bg-pastel-burgundy/30">
                    <Phone size={18} className="text-primary-foreground dark:text-pastel-light-gray" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground/60 dark:text-pastel-light-gray/60">Phone</p>
                    <a href="tel:+16179080210" className="text-foreground hover:text-primary-foreground/80 transition-colors dark:text-pastel-light-gray dark:hover:text-pastel-light-gray/80">
                      +1 (617) 908-0210
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-pastel-pink/20 rounded-full dark:bg-pastel-burgundy/30">
                    <MapPin size={18} className="text-primary-foreground dark:text-pastel-light-gray" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground/60 dark:text-pastel-light-gray/60">Location</p>
                    <p className="text-foreground dark:text-pastel-light-gray">Boston, MA</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-pastel-pink/20 rounded-full dark:bg-pastel-burgundy/30">
                    <Linkedin size={18} className="text-primary-foreground dark:text-pastel-light-gray" />
                  </div>
                  <div>
                    <p className="text-sm text-foreground/60 dark:text-pastel-light-gray/60">LinkedIn</p>
                    <a href="https://www.linkedin.com/in/saumya-gorantala/" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary-foreground/80 transition-colors dark:text-pastel-light-gray dark:hover:text-pastel-light-gray/80">
                      linkedin.com/in/saumya-gorantala
                    </a>
                  </div>
                </div>
              </div>

              {/* PDF Download Link */}
              <div className="mt-12 pt-6 border-t border-pastel-pink/20">
                <a 
                  href={`${import.meta.env.BASE_URL}assets/contact.pdf`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-pastel-burgundy hover:text-pastel-dark-pink transition-colors font-semibold"
                >
                  <Mail size={16} />
                  <span>View Full Contact Document (PDF)</span>
                </a>
              </div>
            </div>
          </SlideIn>
          
          <SlideIn direction="right">
            <div className="glass-card p-8 h-full">
              <h3 className="text-2xl font-semibold mb-6 dark:text-pastel-light-gray">Send a Message</h3>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground/70 mb-1 dark:text-pastel-light-gray/70">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border border-pastel-pink/30 rounded-lg focus:ring-2 focus:ring-pastel-pink/50 focus:border-transparent outline-none transition-all duration-200 bg-white/90 dark:bg-pastel-dark-gray dark:border-pastel-burgundy/30 dark:focus:ring-pastel-burgundy/50 dark:text-pastel-light-gray"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground/70 mb-1 dark:text-pastel-light-gray/70">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-pastel-pink/30 rounded-lg focus:ring-2 focus:ring-pastel-pink/50 focus:border-transparent outline-none transition-all duration-200 bg-white/90 dark:bg-pastel-dark-gray dark:border-pastel-burgundy/30 dark:focus:ring-pastel-burgundy/50 dark:text-pastel-light-gray"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground/70 mb-1 dark:text-pastel-light-gray/70">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-2 border border-pastel-pink/30 rounded-lg focus:ring-2 focus:ring-pastel-pink/50 focus:border-transparent outline-none transition-all duration-200 bg-white/90 dark:bg-pastel-dark-gray dark:border-pastel-burgundy/30 dark:focus:ring-pastel-burgundy/50 dark:text-pastel-light-gray"
                    placeholder="Your message..."
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 bg-pastel-pink text-primary-foreground rounded-lg hover:bg-pastel-dark-pink transition-colors duration-300 w-full md:w-auto dark:bg-pastel-burgundy dark:text-white dark:hover:bg-pastel-burgundy/80"
                >
                  Send Message
                </button>
              </form>
            </div>
          </SlideIn>
        </div>
      </div>
    </section>
  );
};

export default Contact;

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download, ChevronRight, User } from 'lucide-react';
import { Button } from './ui/Button';
import { Link } from 'react-scroll';

const TITLES = ['Data Scientist', 'Machine Learning Enthusiast', 'Problem Solver'];

export function Hero() {
  const [titleIndex, setTitleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typeSpeed = isDeleting ? 50 : 100;
    const currentTitle = TITLES[titleIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting && currentText === currentTitle) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setTitleIndex((prev) => (prev + 1) % TITLES.length);
      } else {
        setCurrentText(
          currentTitle.substring(0, currentText.length + (isDeleting ? -1 : 1))
        );
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, titleIndex]);

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative pt-20 overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center">
          
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="w-32 h-32 md:w-40 md:h-40 rounded-full glass p-2 mb-8"
          >
            {/* Professional Photo Placeholder */}
            <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center overflow-hidden border-2 border-slate-700">
              <User size={64} className="text-slate-500" />
            </div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl md:text-7xl font-bold mb-4 tracking-tight"
          >
            Abhay Dwivedi
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-3xl font-medium text-slate-300 h-10 mb-8"
          >
            <span className="text-gradient">Aspiring </span>
            <span className="border-r-2 border-blue-500 pr-1 animate-pulse">{currentText}</span>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            I am a Computer Science student specializing in Cyber Security with strong interest in Data Science, Machine Learning, Analytics and Generative AI. I enjoy solving real-world problems through technology, building impactful projects and continuously improving my technical and communication skills.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Link to="projects" smooth={true} duration={500} offset={-80}>
              <Button size="lg" className="w-full sm:w-auto gap-2">
                View Projects <ChevronRight size={18} />
              </Button>
            </Link>
            <Link to="resume" smooth={true} duration={500} offset={-80}>
              <Button variant="secondary" size="lg" className="w-full sm:w-auto gap-2">
                <Download size={18} /> Download Resume
              </Button>
            </Link>
            <Link to="contact" smooth={true} duration={500} offset={-80}>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Contact Me
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

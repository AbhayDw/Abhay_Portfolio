import React from 'react';
import { ArrowUp } from 'lucide-react';
import { Link } from 'react-scroll';

export function Footer() {
  return (
    <footer className="relative bg-slate-950 py-10 border-t border-slate-800">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        <p className="text-slate-400 text-sm mb-4 md:mb-0">
          © {new Date().getFullYear()} Abhay Dwivedi | Built with Passion and Technology
        </p>
        
        <Link 
          to="home" 
          smooth={true} 
          duration={500}
          className="p-3 rounded-full bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white transition-colors cursor-pointer"
          aria-label="Back to top"
        >
          <ArrowUp size={20} />
        </Link>
      </div>
    </footer>
  );
}

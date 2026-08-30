import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Achievements } from './components/Achievements';
import { Projects } from './components/Projects';
import { Certifications } from './components/Certifications';
import { CodingProfiles } from './components/CodingProfiles';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-slate-900 selection:bg-blue-500/30">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Achievements />
        <Projects />
        <Certifications />
        <CodingProfiles />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;

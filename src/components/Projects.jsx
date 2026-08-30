import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from './ui/SectionHeading';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { GitBranch, ExternalLink, X, Code2 } from 'lucide-react';

const projects = [
  {
    title: "PlaceMate",
    subtitle: "Placement Preparation Platform",
    description: "A smart placement preparation platform designed to help students prepare for interviews and placement drives.",
    techStack: ["JavaScript", "Web Development", "UI/UX", "Antigravity AI"],
    problem: "Students often lack a centralized platform that provides structured preparation, mock interviews, and tracking for campus placements.",
    solution: "Developed PlaceMate to offer curated resources, progress tracking, and AI-assisted tools to streamline the preparation process.",
    results: "Improved student engagement and provided a seamless experience for placement preparation. (Created with the help of Antigravity AI)",
    githubUrl: "#",
    liveUrl: "#"
  },
  {
    title: "Movie Recommendation System",
    subtitle: "AI-Powered Recommender",
    description: "Built a recommendation engine that suggests movies to users based on preferences and similarity algorithms.",
    techStack: ["Python", "Pandas", "Scikit-learn"],
    problem: "Users face choice paralysis when trying to find movies that match their specific tastes among vast catalogs.",
    solution: "Implemented a content-based filtering system using TF-IDF and cosine similarity to suggest highly relevant movies.",
    results: "Achieved high recommendation accuracy and built a responsive UI for seamless user interaction.",
    githubUrl: "#",
    liveUrl: "#"
  },
  {
    title: "Genomic Splice Junction Classification",
    subtitle: "Machine Learning Model",
    description: "Built a machine learning model for multiclass DNA splice junction classification and compared different algorithms.",
    techStack: ["Python", "Pandas", "NumPy", "Scikit-learn", "Google Colab"],
    problem: "Accurately identifying splice junctions in DNA sequences is challenging but critical for genomic research.",
    solution: "Processed DNA sequence data and trained multiple classification models (Random Forest, SVM, etc.) to detect Exon/Intron boundaries.",
    results: "Successfully compared model performances, highlighting the most effective algorithm for genomic sequence classification.",
    githubUrl: "#",
    liveUrl: "#"
  }
];

export function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="py-20 relative">
      <div className="container mx-auto px-6">
        <SectionHeading 
          title="Featured Projects" 
          subtitle="Real-world applications built to solve complex problems."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card key={index} delay={index * 0.1} className="flex flex-col h-full overflow-hidden p-0 group">
              {/* Image Placeholder */}
              <div className="h-48 bg-slate-800 relative overflow-hidden flex items-center justify-center border-b border-slate-700">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent z-10" />
                <Code2 size={48} className="text-slate-600 group-hover:scale-110 transition-transform duration-500" />
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white mb-1">{project.title}</h3>
                <p className="text-blue-400 text-sm font-medium mb-4">{project.subtitle}</p>
                <p className="text-slate-400 text-sm mb-6 flex-grow">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techStack.slice(0, 3).map((tech, i) => (
                    <span key={i} className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      {tech}
                    </span>
                  ))}
                  {project.techStack.length > 3 && (
                    <span className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      +{project.techStack.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 mt-auto">
                  <Button variant="secondary" size="sm" className="w-full" onClick={() => setSelectedProject(project)}>
                    View Details
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
              onClick={() => setSelectedProject(null)}
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto glass-card border border-slate-700 shadow-2xl z-10"
            >
              <div className="sticky top-0 right-0 p-4 flex justify-end bg-slate-900/80 backdrop-blur-md border-b border-slate-800 z-20">
                <button 
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-6 sm:p-8 pt-0">
                <h2 className="text-3xl font-bold text-white mb-2">{selectedProject.title}</h2>
                <p className="text-blue-400 text-lg mb-8">{selectedProject.subtitle}</p>

                <div className="space-y-8">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                      <span className="w-8 h-8 rounded bg-blue-500/20 flex items-center justify-center text-blue-400">1</span>
                      The Problem
                    </h4>
                    <p className="text-slate-300 leading-relaxed pl-10">{selectedProject.problem}</p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                      <span className="w-8 h-8 rounded bg-purple-500/20 flex items-center justify-center text-purple-400">2</span>
                      The Solution
                    </h4>
                    <p className="text-slate-300 leading-relaxed pl-10">{selectedProject.solution}</p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                      <span className="w-8 h-8 rounded bg-green-500/20 flex items-center justify-center text-green-400">3</span>
                      Key Results
                    </h4>
                    <p className="text-slate-300 leading-relaxed pl-10">{selectedProject.results}</p>
                  </div>

                  <div className="pt-6 border-t border-slate-800">
                    <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3">Tech Stack</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.techStack.map((tech, i) => (
                        <span key={i} className="px-3 py-1 rounded-full bg-slate-800 text-slate-200 border border-slate-700 text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-8 flex flex-col sm:flex-row gap-4">
                    <Button className="w-full sm:w-auto gap-2">
                      <ExternalLink size={18} /> Live Demo
                    </Button>
                    <Button variant="secondary" className="w-full sm:w-auto gap-2">
                      <GitBranch size={18} /> View Source
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

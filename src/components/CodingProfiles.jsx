import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from './ui/SectionHeading';
import { Card } from './ui/Card';
import { GitBranch, Briefcase, Code2, Terminal, Cpu } from 'lucide-react';

const profiles = [
  {
    name: "LinkedIn",
    icon: <Briefcase size={32} />,
    url: "#",
    color: "hover:border-blue-500 hover:shadow-blue-500/20 text-blue-500",
    stats: "500+ Connections"
  },
  {
    name: "GitHub",
    icon: <GitBranch size={32} />,
    url: "#",
    color: "hover:border-slate-400 hover:shadow-slate-400/20 text-slate-100",
    stats: "Projects & Repos"
  },
  {
    name: "CodeChef",
    icon: <Terminal size={32} />,
    url: "#",
    color: "hover:border-amber-700 hover:shadow-amber-700/20 text-amber-600",
    stats: "3-Star Coder"
  },
  {
    name: "LeetCode",
    icon: <Code2 size={32} />,
    url: "#",
    color: "hover:border-yellow-500 hover:shadow-yellow-500/20 text-yellow-500",
    stats: "Problem Solver"
  },
  {
    name: "GeeksforGeeks",
    icon: <Cpu size={32} />,
    url: "#",
    color: "hover:border-green-600 hover:shadow-green-600/20 text-green-600",
    stats: "200+ Solved"
  }
];

export function CodingProfiles() {
  return (
    <section className="py-20 relative bg-slate-900/50">
      <div className="container mx-auto px-6">
        <SectionHeading 
          title="Coding Profiles" 
          subtitle="Find me across the web and explore my code."
        />

        <div className="flex flex-wrap justify-center gap-6">
          {profiles.map((profile, index) => (
            <motion.a
              key={index}
              href={profile.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -8 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`w-40 sm:w-48 glass rounded-2xl p-6 flex flex-col items-center justify-center gap-4 border border-slate-700/50 transition-all duration-300 ${profile.color}`}
            >
              <div className="p-4 rounded-full bg-slate-800/80 shadow-inner">
                {profile.icon}
              </div>
              <div className="text-center">
                <h4 className="font-semibold text-white mb-1">{profile.name}</h4>
                <p className="text-xs text-slate-400">{profile.stats}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

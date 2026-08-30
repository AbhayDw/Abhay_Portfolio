import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from './ui/SectionHeading';
import { Card } from './ui/Card';
import { Code2, LineChart, Database, Wrench, Users } from 'lucide-react';

const skillCategories = [
  {
    title: "Programming",
    icon: <Code2 size={24} />,
    skills: ["Python", "SQL"]
  },
  {
    title: "Data Science & Analytics",
    icon: <LineChart size={24} />,
    skills: ["NumPy", "Pandas", "Matplotlib", "Seaborn", "Scikit-learn", "Statistics", "Linear Algebra", "Power BI", "Microsoft Excel"]
  },
  {
    title: "Core CS & AI",
    icon: <Database size={24} />,
    skills: ["DSA", "DBMS", "Operating Systems", "Machine Learning", "Generative AI"]
  },
  {
    title: "Tools & Platforms",
    icon: <Wrench size={24} />,
    skills: ["MySQL", "PostgreSQL", "Git", "GitHub", "Jupyter Notebook", "VS Code", "Google Colab"]
  },
  {
    title: "Soft Skills",
    icon: <Users size={24} />,
    skills: ["Communication", "Leadership", "Teamwork", "Presentation", "Problem Solving"]
  }
];

export function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="skills" className="py-20 relative">
      <div className="container mx-auto px-6">
        <SectionHeading 
          title="Technical Arsenal" 
          subtitle="A comprehensive toolkit for data science, machine learning, and software development."
        />

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {skillCategories.map((category, index) => (
            <Card key={index} delay={index * 0.1} className="h-full">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-700/50">
                <div className="p-3 rounded-lg bg-blue-500/10 text-blue-400">
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-white">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, i) => (
                  <motion.span
                    key={i}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, backgroundColor: "rgba(59, 130, 246, 0.2)" }}
                    className="px-3 py-1.5 text-sm font-medium rounded-md bg-slate-800 text-slate-300 border border-slate-700/50 transition-colors cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

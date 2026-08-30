import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from './ui/SectionHeading';
import { Card } from './ui/Card';
import { Award, CheckCircle, ExternalLink } from 'lucide-react';

const certifications = [
  {
    title: "Python Essentials 1",
    issuer: "Cisco Networking Academy",
    date: "Completed",
    icon: <Award className="text-blue-500" size={32} />
  },
  {
    title: "SQL Intermediate",
    issuer: "HackerRank",
    date: "Completed",
    icon: <Award className="text-green-500" size={32} />
  },
  {
    title: "Deloitte Data Analytics Virtual Experience",
    issuer: "Forage",
    date: "Completed",
    icon: <Award className="text-purple-500" size={32} />
  },
  {
    title: "Data Science A+",
    issuer: "Sai Campus Recruitment Training",
    date: "Completed",
    icon: <Award className="text-yellow-500" size={32} />
  },
  {
    title: "Python for Data Science",
    issuer: "NPTEL",
    date: "Silver Badge | Score: 75%",
    icon: <Award className="text-slate-300" size={32} />,
    featured: true
  }
];

export function Certifications() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <section id="certifications" className="py-20 relative">
      <div className="container mx-auto px-6">
        <SectionHeading 
          title="Licenses & Certifications" 
          subtitle="Continuous learning and professional validation."
        />

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {certifications.map((cert, index) => (
            <motion.div key={index} variants={itemVariants} className={cert.featured ? "md:col-span-2 lg:col-span-1" : ""}>
              <Card className={`h-full relative overflow-hidden group ${cert.featured ? 'border-blue-500/50 bg-blue-900/10' : ''}`}>
                {cert.featured && (
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -mr-16 -mt-16 pointer-events-none" />
                )}
                
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-slate-800 rounded-lg border border-slate-700 shadow-inner">
                    {cert.icon}
                  </div>
                  <button className="text-slate-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100">
                    <ExternalLink size={20} />
                  </button>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-2">{cert.title}</h3>
                <p className="text-slate-400 font-medium mb-4">{cert.issuer}</p>
                
                <div className="mt-auto pt-4 border-t border-slate-700/50 flex items-center gap-2 text-sm text-slate-300">
                  <CheckCircle size={16} className={cert.featured ? "text-blue-400" : "text-emerald-400"} />
                  {cert.date}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

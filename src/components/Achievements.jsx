import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from './ui/SectionHeading';
import { Card } from './ui/Card';
import { Trophy, CheckCircle2, Star, Award, ShieldCheck } from 'lucide-react';

const reasonsToHire = [
  "Problem-solving mindset",
  "Real-world project building",
  "Strong technical foundation",
  "Fast learner",
  "Continuous improvement mindset"
];

const achievements = [
  {
    icon: <Trophy className="text-yellow-500" size={32} />,
    title: "200+ Coding Problems",
    description: "Solved on GeeksforGeeks, LeetCode, and CodeChef.",
    color: "from-yellow-500/20 to-orange-500/10"
  },
  {
    icon: <Star className="text-blue-500" size={32} />,
    title: "3-Star CodeChef Coder",
    description: "Consistent performance in competitive programming.",
    color: "from-blue-500/20 to-cyan-500/10"
  },
  {
    icon: <Award className="text-purple-500" size={32} />,
    title: "1st Prize Winner",
    description: "Gravition 2024 Shark Tank Event.",
    color: "from-purple-500/20 to-pink-500/10"
  },
  {
    icon: <ShieldCheck className="text-green-500" size={32} />,
    title: "Discipline Club Coordinator",
    description: "Leadership role (2024–25).",
    color: "from-green-500/20 to-emerald-500/10"
  }
];

export function Achievements() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <section id="achievements" className="py-20 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading 
          title="Why Hire Me & Achievements" 
          subtitle="My track record of competitive programming, leadership, and problem-solving."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Why Hire Me */}
          <div className="lg:col-span-4">
            <Card className="h-full border-blue-500/30 bg-blue-900/10">
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                Why Hire Me <span className="text-blue-500">?</span>
              </h3>
              <ul className="space-y-4">
                {reasonsToHire.map((reason, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3 text-slate-300"
                  >
                    <CheckCircle2 className="text-blue-400 shrink-0" size={20} />
                    <span className="font-medium">{reason}</span>
                  </motion.li>
                ))}
              </ul>
            </Card>
          </div>

          {/* Achievements Grid */}
          <div className="lg:col-span-8">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {achievements.map((achievement, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className={`h-full bg-gradient-to-br ${achievement.color} border-slate-700/50 hover:border-slate-500/50 transition-colors`}>
                    <div className="mb-4">
                      {achievement.icon}
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">{achievement.title}</h4>
                    <p className="text-slate-400">{achievement.description}</p>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

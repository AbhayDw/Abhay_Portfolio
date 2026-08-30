import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from './ui/SectionHeading';
import { Card } from './ui/Card';
import { GraduationCap, Target, BrainCircuit } from 'lucide-react';

export function About() {
  return (
    <section id="about" className="py-20 relative">
      <div className="container mx-auto px-6">
        <SectionHeading 
          title="About Me" 
          subtitle="Passionate about solving real-world problems and building impactful technology."
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main About Card */}
          <div className="lg:col-span-2">
            <Card className="h-full flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6 text-blue-400">
                  <BrainCircuit size={28} />
                  <h3 className="text-2xl font-semibold text-white">Who I Am</h3>
                </div>
                <p className="text-slate-300 text-lg leading-relaxed mb-6">
                  I am a B.Tech student at Sagar Institute of Research & Technology (RGPV), specializing in the Cyber Security Department. Currently in my 5th Semester with a CGPA of 7.46, I have developed a strong foundation in core computer science principles.
                </p>
                <p className="text-slate-300 text-lg leading-relaxed">
                  My true interest lies at the intersection of Data Science, Machine Learning, Analytics, and Gen AI. I am a fast learner with a continuous improvement mindset, always eager to tackle complex challenges and build data-driven solutions.
                </p>
              </div>

              <div className="mt-8 p-6 rounded-xl bg-gradient-to-r from-blue-500/10 to-violet-500/10 border border-blue-500/20">
                <div className="flex items-center gap-3 mb-2 text-violet-400">
                  <Target size={24} />
                  <h4 className="text-xl font-medium text-white">Career Goal</h4>
                </div>
                <p className="text-slate-300 italic">
                  "I aim to build impactful AI and data-driven solutions while growing as a skilled Data Science and Machine Learning professional."
                </p>
              </div>
            </Card>
          </div>

          {/* Education Timeline */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <div className="flex items-center gap-3 mb-8 text-blue-400">
                <GraduationCap size={28} />
                <h3 className="text-2xl font-semibold text-white">Education</h3>
              </div>

              <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
                
                {/* Degree */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-slate-900 bg-blue-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <GraduationCap size={16} />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-slate-700/50 bg-slate-800/50 shadow">
                    <div className="flex items-center justify-between space-x-2 mb-1">
                      <div className="font-bold text-white">B.Tech – Cyber Security</div>
                      <time className="font-medium text-blue-400 text-sm">2027</time>
                    </div>
                    <div className="text-slate-400 text-sm mb-2">SIRT Bhopal (RGPV)</div>
                    <div className="text-slate-300 text-sm font-medium">CGPA: 7.46</div>
                  </div>
                </div>

                {/* 12th */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-slate-900 bg-slate-700 text-slate-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <div className="w-2 h-2 bg-slate-400 rounded-full" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-slate-700/50 bg-slate-800/50 shadow">
                    <div className="font-bold text-white mb-1">12th Grade</div>
                    <div className="text-slate-400 text-sm mb-2">MP Board</div>
                    <div className="text-slate-300 text-sm font-medium">Score: 65.8%</div>
                  </div>
                </div>

                {/* 10th */}
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-slate-900 bg-slate-700 text-slate-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                    <div className="w-2 h-2 bg-slate-400 rounded-full" />
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded border border-slate-700/50 bg-slate-800/50 shadow">
                    <div className="font-bold text-white mb-1">10th Grade</div>
                    <div className="text-slate-400 text-sm mb-2">MP Board</div>
                    <div className="text-slate-300 text-sm font-medium">Score: 78%</div>
                  </div>
                </div>

              </div>
            </Card>
          </div>

        </div>
      </div>
    </section>
  );
}

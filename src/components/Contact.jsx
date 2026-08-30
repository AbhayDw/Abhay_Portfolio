import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from './ui/SectionHeading';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Mail, Phone, MapPin, Send, Download, FileText } from 'lucide-react';

export function Contact() {
  return (
    <section id="contact" className="py-20 relative">
      <div className="container mx-auto px-6">
        <SectionHeading 
          title="Get In Touch & Resume" 
          subtitle="Looking for an internship or full-time opportunity in Data Science and Machine Learning."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Let's Connect</h3>
            <p className="text-slate-400 mb-8 leading-relaxed">
              I'm always open to discussing product design work, new projects, creative ideas, or opportunities to be part of your visions.
            </p>
            
            <div className="space-y-6 mb-12">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Email Me</p>
                  <a href="mailto:dwivediabhay727@gmail.com" className="text-white hover:text-blue-400 font-medium transition-colors">
                    dwivediabhay727@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-violet-500/10 flex items-center justify-center text-violet-400 border border-violet-500/20">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Call Me</p>
                  <a href="tel:+919329903375" className="text-white hover:text-violet-400 font-medium transition-colors">
                    +91 9329903375
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-400 border border-green-500/20">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-sm text-slate-400">Location</p>
                  <p className="text-white font-medium">Bhopal, India</p>
                </div>
              </div>
            </div>

            {/* Resume Section */}
            <div id="resume">
              <h3 className="text-2xl font-bold text-white mb-6">Resume</h3>
              <Card className="flex flex-col sm:flex-row items-center gap-6 bg-gradient-to-r from-blue-900/20 to-slate-800 border-blue-500/30">
                <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                  <FileText size={32} />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-2">Abhay Dwivedi - Resume</h4>
                  <p className="text-sm text-slate-400 mb-4">PDF format, 124 KB</p>
                  <div className="flex flex-wrap gap-3">
                    <Button size="sm" className="gap-2">
                      <Download size={16} /> Download
                    </Button>
                    <Button variant="outline" size="sm">Preview</Button>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Contact Form */}
          <Card className="h-full">
            <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
            <form className="space-y-4 flex flex-col h-[calc(100%-3rem)]">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-400 mb-1">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-400 mb-1">Your Email</label>
                <input 
                  type="email" 
                  id="email" 
                  className="w-full bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
                  placeholder="john@example.com"
                />
              </div>
              <div className="flex-grow">
                <label htmlFor="message" className="block text-sm font-medium text-slate-400 mb-1">Message</label>
                <textarea 
                  id="message" 
                  rows="5"
                  className="w-full h-full min-h-[120px] bg-slate-900/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow resize-none"
                  placeholder="How can I help you?"
                ></textarea>
              </div>
              <Button type="button" className="w-full mt-auto gap-2">
                <Send size={18} /> Send Message
              </Button>
            </form>
          </Card>

        </div>
      </div>
    </section>
  );
}

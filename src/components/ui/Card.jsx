import React from 'react';
import { motion } from 'framer-motion';
import { cn } from './Button';

export function Card({ children, className, hover = true, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={hover ? { y: -5, transition: { duration: 0.2 } } : {}}
      className={cn("glass-card p-6 md:p-8", className)}
    >
      {children}
    </motion.div>
  );
}

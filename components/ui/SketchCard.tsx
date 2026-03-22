'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export function SketchCard({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotate: -1 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ 
        type: 'spring', 
        stiffness: 260, 
        damping: 20, 
        delay 
      }}
      className={cn(
        "relative bg-white border-[3px] border-[var(--on-background)] rounded-xl p-6 shadow-[6px_6px_0px_0px_rgba(0,30,46,1)]",
        "boiling-line hand-cut-edge",
        className
      )}
    >
      {/* Decorative Tape element */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-[#fdc003]/80 rotate-2 opacity-80 backdrop-blur-sm shadow-sm" style={{ clipPath: 'polygon(5% 0%, 95% 5%, 100% 95%, 0% 100%)' }} />
      {children}
    </motion.div>
  );
}

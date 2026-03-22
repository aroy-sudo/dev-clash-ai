'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ChunkyButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'accent' | 'outline';
  icon?: React.ReactNode;
}

export function ChunkyButton({ children, className, variant = 'primary', icon, ...props }: ChunkyButtonProps) {
  const baseStyles = "relative inline-flex items-center justify-center gap-3 px-6 py-4 font-bold tracking-tight rounded-xl border-4 border-[#133347] transition-colors boiling-line uppercase font-headline";
  
  const variants = {
    primary: "bg-[#00bfa5] text-[#133347] marker-shaded",
    secondary: "bg-[#f6faff] text-[#133347]",
    accent: "bg-[#fdc003] text-[#133347] marker-shaded",
    outline: "bg-transparent border-dashed text-[#133347] hover:bg-[#ebf5ff]"
  };

  return (
    <motion.button
      whileHover={{ y: -4, x: -2, boxShadow: "8px 8px 0px 0px rgba(19, 51, 71, 1)" }}
      whileTap={{ y: 2, x: 2, boxShadow: "2px 2px 0px 0px rgba(19, 51, 71, 1)" }}
      initial={{ boxShadow: "4px 4px 0px 0px rgba(19, 51, 71, 1)" }}
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      {icon && <span className="flex items-center justify-center">{icon}</span>}
      <span className="z-10 relative">{children}</span>
      {variant === 'accent' || variant === 'primary' ? (
        <span className="absolute inset-0 bg-white/10 opacity-0 hover:opacity-100 transition-opacity rounded-lg pointer-events-none" />
      ) : null}
    </motion.button>
  );
}

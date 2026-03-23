'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { BookOpen, Map, Target, HelpCircle, Brain, LayoutDashboard, PanelLeftClose, PanelLeftOpen, LogOut, RotateCcw } from 'lucide-react';

const navItems = [
  { href: '/hub', label: 'The Hub', icon: LayoutDashboard },
  { href: '/hub/roadmap', label: 'Roadmap', icon: Map },
  { href: '/hub/revision', label: 'Revision Hub', icon: RotateCcw },
  { href: '/hub/mock-test', label: 'Mock Test', icon: Target },
  { href: '/hub/doubt-solver', label: 'Doubt Solver', icon: HelpCircle },
  { href: '/hub/ai-assessment', label: 'AI Assessment', icon: Brain },
  // Phase 4: Legacy / Current Project
  { href: '/hub/pdf-reviewer', label: 'Legacy: PDF Reviewer', icon: BookOpen },
];

export function HandDrawnSidebar({ isCollapsed, onToggle }: { isCollapsed: boolean; onToggle: () => void }) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <motion.nav 
      initial={false}
      animate={{ width: isCollapsed ? 80 : 256 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="fixed left-0 top-20 h-[calc(100vh-5rem)] z-40 flex flex-col py-8 bg-[#f6faff] dark:bg-[#133347] border-r-[2px] border-[#133347]/10 hidden md:flex shadow-[4px_0px_0px_0px_rgba(19,51,71,0.05)] overflow-hidden"
    >
      <div className={cn("px-4 mb-12 flex items-center h-12", isCollapsed ? "justify-center" : "justify-between")}>
        <AnimatePresence mode="wait">
          {!isCollapsed && (
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="text-[#006b5c] font-black border-l-4 border-[#fdc003] pl-3"
            >
              <span className="font-['Space_Grotesk'] text-2xl tracking-tighter block font-bold leading-none">Vector.</span>
              <span className="text-[10px] opacity-60 font-bold uppercase tracking-widest text-[#133347]">Main Hub</span>
            </motion.div>
          )}
        </AnimatePresence>
        
        <button 
          onClick={onToggle} 
          className="p-2 shrink-0 hover:bg-[#00bfa5]/10 text-[#006b5c] rounded-xl transition-colors sketchy-border"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
        </button>
      </div>
      
      <div className="flex flex-col gap-2 w-full px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          
          return (
            <Link key={item.href} href={item.href} title={isCollapsed ? item.label : undefined}>
              <motion.div
                whileHover={{ x: isCollapsed ? 0 : 4, scale: isCollapsed ? 1.05 : 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={cn(
                  "flex items-center rounded-lg transition-all font-bold group border-transparent",
                  isCollapsed ? "justify-center py-4 border-2" : "pl-4 gap-4 py-3 border-l-4",
                  isActive 
                    ? (isCollapsed ? "text-[#006b5c] dark:text-[#00bfa5] border-[#fdc003] bg-[#00bfa5]/20 shadow-sm" : "text-[#006b5c] dark:text-[#00bfa5] border-[#fdc003] bg-[#00bfa5]/10") 
                    : "text-[#133347]/60 dark:text-[#f6faff]/60 hover:bg-[#00bfa5]/10 dark:hover:bg-[#00bfa5]/5 hover:text-[#006b5c] hover:border-[#fdc003]/50"
                )}
              >
                <item.icon className="w-5 h-5 shrink-0" />
                <AnimatePresence mode="wait">
                  {!isCollapsed && (
                    <motion.span 
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      className="font-headline text-sm uppercase tracking-widest whitespace-nowrap overflow-hidden"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            </Link>
          );
        })}
      </div>
      
      <div className="mt-auto px-4 w-full">
        <motion.button 
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => router.push("/onboarding/target")}
          className={cn(
            "w-full bg-white border-2 border-[#133347] text-[#133347] font-bold tracking-tight rounded-xl hover:bg-[#f6faff] transition-all font-headline uppercase shadow-[4px_4px_0px_0px_rgba(19,51,71,1)] flex items-center justify-center",
            isCollapsed ? "py-4 px-0" : "py-4 px-2 gap-2"
          )}
          title={isCollapsed ? "Exit Vector" : undefined}
        >
          {isCollapsed ? (
            <LogOut size={18} />
          ) : (
            <>
              <LogOut size={18} />
              <span className="text-sm">Exit Vector</span>
            </>
          )}
        </motion.button>
      </div>
    </motion.nav>
  );
}

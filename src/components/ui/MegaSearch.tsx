'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, FolderTree, Package, ArrowRight, X } from 'lucide-react';

interface MegaSearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MegaSearch({ isOpen, onClose }: MegaSearchProps) {
  const [query, setQuery] = React.useState('');
  const [activeBrand, setActiveBrand] = React.useState('All');

  const mockBrands = ['All', 'Callaway', 'Ogio', 'TravisMathew'];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose(); 
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[100] bg-background/60 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-x-4 top-[10%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-3xl z-[101] glass-panel rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]"
          >
            {/* Search Input Area */}
            <div className="flex items-center px-4 py-4 border-b border-border/50">
              <Search className="w-6 h-6 text-primary ml-2 hidden sm:block" />
              <input 
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products by SKU, name, or style..." 
                className="flex-1 bg-transparent border-none text-lg lg:text-xl px-4 focus:ring-0 focus:outline-none placeholder:text-foreground/40 text-foreground"
              />
              <button onClick={onClose} className="p-2 text-foreground/50 hover:text-foreground bg-black/5 dark:bg-white/5 rounded-xl transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Brand Filters */}
            <div className="px-6 py-3 border-b border-border/30 flex gap-2 overflow-x-auto hide-scrollbar">
              {mockBrands.map(b => (
                <button 
                  key={b} 
                  onClick={() => setActiveBrand(b)}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
                    activeBrand === b ? 'bg-primary text-white shadow-md shadow-primary/20' : 'bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-foreground/70'
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>

            {/* Results Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              <p className="px-2 pt-2 pb-1 text-xs font-bold text-foreground/40 uppercase tracking-wider">Quick Results</p>
              
              <motion.button whileHover={{ x: 4 }} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 group border border-transparent hover:border-border/50 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <Package size={18} />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-foreground group-hover:text-primary transition-colors">Queen Bed - Callaway Demo</p>
                    <p className="text-xs text-foreground/50 font-medium">SKU: SKU-BED-000 • Category: Home</p>
                  </div>
                </div>
                <ArrowRight size={16} className="text-foreground/30 group-hover:text-primary transition-colors" />
              </motion.button>
              
              <motion.button whileHover={{ x: 4 }} className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 group border border-transparent hover:border-border/50 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-500 flex items-center justify-center">
                    <FolderTree size={18} />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-foreground group-hover:text-purple-500 transition-colors">Callaway Apparel Brand Settings</p>
                    <p className="text-xs text-foreground/50 font-medium">Brand Management</p>
                  </div>
                </div>
                <ArrowRight size={16} className="text-foreground/30 group-hover:text-primary transition-colors" />
              </motion.button>

            </div>

            {/* Footer */}
            <div className="px-6 py-3 bg-black/5 dark:bg-white/5 border-t border-border/30 flex justify-between items-center">
              <span className="text-xs font-medium text-foreground/50">
                <kbd className="px-1.5 py-0.5 rounded-md bg-background border border-border mr-1">↑</kbd>
                <kbd className="px-1.5 py-0.5 rounded-md bg-background border border-border mr-2">↓</kbd>
                Navigate
              </span>
              <span className="text-xs font-medium text-foreground/50">
                <kbd className="px-1.5 py-0.5 rounded-md bg-background border border-border mr-1">↵</kbd>
                Select
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

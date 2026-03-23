'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTheme } from '../ThemeProvider';
import { LayoutDashboard, Package, FolderTree, Settings, Menu, Moon, Sun, Search, X, ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { MegaSearch } from '../ui/MegaSearch';

const NAV_ITEMS = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/admin' },
  { label: 'Orders', icon: ShoppingBag, href: '/admin/orders' },
  { label: 'Products', icon: Package, href: '/admin/products' },
  { label: 'Brands', icon: FolderTree, href: '/admin/brands' },
  { label: 'Customizer', icon: Settings, href: '/admin/customizer' },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const { theme, toggleTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans relative overflow-hidden text-foreground selection:bg-primary/30">
      <MegaSearch isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
      
      {/* Mobile Header Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar with Glass effect - Collapsible via Framer Motion */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarCollapsed ? 80 : 280 }}
        className={clsx(
          "fixed inset-y-0 left-0 z-50 glass-panel flex flex-col transform transition-transform duration-300 ease-out md:translate-x-0 md:static",
          mobileMenuOpen ? "translate-x-0 w-[280px]" : "-translate-x-full w-[280px]"
        )}
      >
        <div className="h-20 flex items-center justify-between px-6 border-b border-border/30 shrink-0">
          <AnimatePresence mode="popLayout">
            {!sidebarCollapsed && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Link href="/admin" className="text-2xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent truncate flex-1">
                  Callaway<span className="text-primary">One</span>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
          
          <button className="md:hidden text-foreground/70 hover:text-foreground shrink-0" onClick={() => setMobileMenuOpen(false)}>
            <X size={20} />
          </button>
          
          <button 
            className="hidden md:flex text-foreground/50 hover:text-foreground shrink-0 rounded-full p-1 bg-black/5 dark:bg-white/5" 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {sidebarCollapsed ? <ChevronRight size={18}/> : <ChevronLeft size={18}/>}
          </button>
        </div>

        <nav className="p-4 space-y-2 flex-1 overflow-x-hidden">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname.startsWith(item.href) && (item.href !== '/admin' || pathname === '/admin');
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                title={sidebarCollapsed ? item.label : undefined}
                className={clsx(
                  "flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-all duration-200 group relative overflow-hidden",
                  isActive
                    ? "text-primary shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]"
                    : "text-foreground/70 hover:text-foreground hover:bg-white/5 dark:hover:bg-white/5",
                  sidebarCollapsed ? "justify-center" : "justify-start"
                )}
              >
                {isActive && (
                  <motion.div 
                    layoutId="active-nav"
                    className="absolute inset-0 bg-primary/10 dark:bg-primary/20 rounded-xl"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <item.icon size={20} className={isActive ? "text-primary relative z-10 shrink-0" : "relative z-10 shrink-0 group-hover:scale-110 transition-transform"} />
                
                <AnimatePresence>
                  {!sidebarCollapsed && (
                    <motion.span 
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      className="relative z-10 whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            )
          })}
        </nav>
        
        {/* User Card in Sidebar */}
        <div className="p-4 border-t border-border/30 overflow-hidden">
          <div className={clsx("flex items-center gap-3", sidebarCollapsed ? "justify-center" : "px-2")}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary/80 to-primary/30 flex items-center justify-center font-bold text-white shrink-0 shadow-lg shadow-primary/20">
              JS
            </div>
            <AnimatePresence>
              {!sidebarCollapsed && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 min-w-0">
                  <p className="text-sm font-semibold truncate">Admin User</p>
                  <p className="text-xs text-foreground/50 truncate">Super Admin</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.aside>

      {/* Main Content Group */}
      <div className="flex-1 flex flex-col min-w-0 md:ml-2">
        {/* Spacious Top Header - Glass */}
        <header className="h-20 glass sticky top-0 z-30 flex items-center justify-between px-6 sm:px-10 shrink-0 mt-0 md:mt-2 md:mr-2 md:rounded-2xl">
          <div className="flex items-center gap-4 w-full max-w-xl">
            <button className="md:hidden p-2 text-foreground/80 hover:bg-black/5 dark:hover:bg-white/5 rounded-full transition-colors" onClick={() => setMobileMenuOpen(true)}>
              <Menu size={24} />
            </button>
            
            <div className="relative hidden w-full sm:block max-w-[400px]">
               <button 
                 onClick={() => setSearchOpen(true)}
                 className="w-full flex items-center justify-between bg-black/5 dark:bg-white/5 border border-border/50 rounded-full pl-4 pr-3 py-2.5 text-sm hover:bg-black/10 dark:hover:bg-white/10 transition-colors text-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40"
               >
                 <div className="flex items-center">
                   <Search className="text-foreground/40 mr-3" size={18} />
                   Search products or commands...
                 </div>
                 <kbd className="hidden lg:inline-flex items-center gap-1 font-mono text-[10px] bg-background border border-border/50 font-semibold px-2 py-1 rounded-md text-foreground/50">
                   <span className="text-xs">⌘</span>K
                 </kbd>
               </button>
            </div>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 border border-border/50 flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={18} className="text-amber-400" /> : <Moon size={18} className="text-slate-700" />}
            </motion.button>
          </div>
        </header>

        {/* Page Main Content with Framer Motion Route Transitions */}
        <main className="flex-1 p-6 sm:p-10 overflow-y-auto overflow-x-hidden">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="max-w-[1600px] mx-auto"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserCog, Package, Briefcase, Store, MapPin, Mail, Lock } from 'lucide-react';
import { signIn } from 'next-auth/react';

const roles = [
  { id: 'admin', name: 'Super Admin', desc: 'Full system access & overrides', icon: UserCog, color: 'text-blue-500', 
    mockEmail: 'admin@callaway.com' },
  { id: 'manager', name: 'Regional Manager', desc: 'Team oversight & approvals', icon: Briefcase, color: 'text-purple-500',
    mockEmail: 'manager.south@callaway.com' },
  { id: 'sales_rep', name: 'Sales Rep', desc: 'Drafting orders for retailers', icon: Package, color: 'text-emerald-500',
    mockEmail: 'j.smith@callaway.com' },
  { id: 'retailer', name: 'Retailer', desc: 'Direct catalog & purchasing', icon: Store, color: 'text-orange-500',
    mockEmail: 'info@premiumgolf.in' },
];

export default function LoginPage() {
  const [selectedRole, setSelectedRole] = useState(roles[0]);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await signIn('credentials', { role: selectedRole.id, callbackUrl: '/admin' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-background">
      {/* Dynamic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="glass-panel w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-border/50 relative z-10"
      >
        {/* Left Side - Brand & Features */}
        <div className="w-full md:w-5/12 p-8 md:p-12 relative flex flex-col justify-between overflow-hidden border-b md:border-b-0 md:border-r border-border/30 bg-black/5 dark:bg-white/5">
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent mb-2">
              Callaway<span className="text-primary">One</span>
            </h1>
            <p className="text-foreground/70 font-medium text-sm md:text-base">Next Generation B2B Commerce Platform</p>
          </div>
          
          <div className="relative z-10 mt-12 space-y-6">
            <div className="flex items-start gap-4 text-foreground/80">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Store size={20} />
              </div>
              <div>
                <h3 className="font-bold text-sm">Unified Ordering</h3>
                <p className="text-xs text-foreground/50 leading-relaxed mt-1">Seamlessly process apparel, hardgoods, and accessories in a single cart.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 text-foreground/80">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <MapPin size={20} />
              </div>
              <div>
                <h3 className="font-bold text-sm">Intelligent Routing</h3>
                <p className="text-xs text-foreground/50 leading-relaxed mt-1">Auto-allocate line items to the nearest warehouse (88, 90) dynamically.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Flow */}
        <div className="w-full md:w-7/12 p-8 md:p-12 bg-background/50 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <div className="mb-8 text-center md:text-left">
              <h2 className="text-2xl font-bold text-foreground">Sign In</h2>
              <p className="text-foreground/50 text-sm mt-2">Select a demo role to auto-fill credentials.</p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {roles.map((r) => {
                const isSelected = selectedRole.id === r.id;
                return (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    key={r.id}
                    onClick={() => setSelectedRole(r)}
                    type="button"
                    className={`p-4 rounded-2xl border text-left transition-all duration-200 relative overflow-hidden ${
                      isSelected 
                      ? 'border-primary bg-primary/5 shadow-md shadow-primary/10' 
                      : 'border-border/50 bg-background hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-50'
                    }`}
                    disabled={loading}
                  >
                    {isSelected && (
                      <motion.div layoutId="active-ring" className="absolute inset-0 rounded-2xl border-2 border-primary" transition={{ type: "spring", stiffness: 300, damping: 20 }} />
                    )}
                    <r.icon size={24} className={`${r.color} mb-3`} />
                    <h3 className="font-bold text-sm text-foreground">{r.name}</h3>
                    <p className="text-[10px] text-foreground/50 mt-1 leading-tight">{r.desc}</p>
                  </motion.button>
                )
              })}
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-4 bg-black/5 dark:bg-white/5 p-4 rounded-2xl border border-border/50">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" size={18} />
                  <input 
                    type="email" 
                    readOnly 
                    value={selectedRole.mockEmail}
                    className="w-full bg-background border border-border/50 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 font-medium text-foreground/80 transition-all opacity-80"
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" size={18} />
                  <input 
                    type="password" 
                    readOnly 
                    value="••••••••••••"
                    className="w-full bg-background border border-border/50 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 font-medium text-foreground/80 transition-all opacity-80"
                  />
                </div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit" 
                disabled={loading}
                className="w-full py-3.5 px-4 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center mt-6"
              >
                {loading ? (
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
                ) : (
                  `Login as ${selectedRole.name}`
                )}
              </motion.button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

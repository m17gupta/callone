'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings2, Crosshair, CheckCircle2, ChevronRight, Save } from 'lucide-react';

export default function CustomizerPage() {
  const [activeStep, setActiveStep] = useState(1);
  const [grind, setGrind] = useState('S-Grind');
  const [finish, setFinish] = useState('Platinum Chrome');
  
  const steps = [
    { id: 1, title: 'Wedge Selection', desc: 'Opus, Opus Platinum, or CB' },
    { id: 2, title: 'Loft & Grind', desc: 'Trajectory control parameters' },
    { id: 3, title: 'Finish & Stamping', desc: 'Aesthetic customizations' },
    { id: 4, title: 'Shaft & Grip', desc: 'Performance mechanics' }
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Opus Wedge Configurator</h1>
          <p className="text-foreground/60 text-sm mt-1">Design bespoke wedges utilizing 4-stage modular pipeline data.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2 bg-primary text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
          <Save size={18} /> Save Blueprint
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
        
        {/* Stages Sidebar */}
        <div className="lg:col-span-1 space-y-3">
          {steps.map((st) => (
            <div 
               key={st.id}
               onClick={() => setActiveStep(st.id)}
               className={`p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                 activeStep === st.id 
                 ? 'bg-primary/5 border-primary shadow-sm' 
                 : 'glass-panel hover:bg-black/5 dark:hover:bg-white/5 border-transparent'
               }`}
            >
              <div className="flex items-center gap-4 relative z-10">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  activeStep > st.id ? 'bg-primary text-white' : activeStep === st.id ? 'bg-primary/20 text-primary' : 'bg-black/10 dark:bg-white/10 text-foreground/50'
                }`}>
                  {activeStep > st.id ? <CheckCircle2 size={16}/> : st.id}
                </div>
                <div>
                  <p className={`font-bold text-sm ${activeStep === st.id ? 'text-primary' : 'text-foreground/80'}`}>{st.title}</p>
                  <p className="text-xs text-foreground/50">{st.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Configuration Area */}
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6 min-h-[500px] flex flex-col">
          <div className="flex-1 flex flex-col items-center justify-center">
             
             {/* 3D Visual Mock placeholder */}
             <motion.div 
               key={finish + grind}
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               className="relative w-64 h-64 sm:w-80 sm:h-80 mb-8"
             >
               <div className="absolute inset-0 bg-gradient-to-tr from-foreground/5 to-transparent rounded-full border border-border/50 animate-pulse" />
               <div className="absolute inset-4 rounded-full border border-dashed border-border/80 flex items-center justify-center">
                 <Settings2 size={64} className="text-foreground/20" />
               </div>
               
               {/* Annotations */}
               <div className="absolute top-1/4 -right-12 glass px-3 py-1.5 rounded-lg border border-border/50 shadow-sm text-xs font-bold text-foreground/70 hidden sm:block">
                 {finish} Base
               </div>
               <div className="absolute bottom-1/4 -left-12 glass px-3 py-1.5 rounded-lg border border-border/50 shadow-sm text-xs font-bold text-foreground/70 hidden sm:block w-max">
                 {grind}
               </div>
             </motion.div>

             {/* Dynamic Option Selections */}
             <div className="w-full max-w-md space-y-6">
               <div className="space-y-3">
                 <h3 className="text-sm font-bold flex items-center gap-2"><Crosshair size={16} className="text-primary"/> Select Grind Profile</h3>
                 <div className="grid grid-cols-2 gap-3">
                   {['S-Grind', 'W-Grind', 'C-Grind', 'T-Grind'].map(g => (
                     <button
                       key={g}
                       onClick={() => setGrind(g)}
                       className={`px-4 py-3 rounded-xl text-sm font-semibold border transition-all ${
                         grind === g 
                         ? 'border-primary bg-primary/10 text-primary' 
                         : 'border-border/50 bg-background hover:border-primary/50 text-foreground/70'
                       }`}
                     >
                       {g}
                     </button>
                   ))}
                 </div>
               </div>

               <div className="space-y-3">
                 <h3 className="text-sm font-bold flex items-center gap-2"><Crosshair size={16} className="text-primary"/> Finish Selection</h3>
                 <div className="grid grid-cols-2 gap-3">
                   {['Platinum Chrome', 'Black Plasma'].map(f => (
                     <button
                       key={f}
                       onClick={() => setFinish(f)}
                       className={`px-4 py-3 rounded-xl text-sm font-semibold border transition-all ${
                         finish === f 
                         ? 'border-primary bg-primary/10 text-primary' 
                         : 'border-border/50 bg-background hover:border-primary/50 text-foreground/70'
                       }`}
                     >
                       {f}
                     </button>
                   ))}
                 </div>
               </div>
               
             </div>
          </div>
          
          {/* Progress footer */}
          <div className="mt-8 pt-4 border-t border-border/30 flex justify-between items-center">
            <p className="text-sm font-bold">Estimated Configuration MSRP: <span className="text-primary text-lg ml-1">₹17,490</span></p>
            <button 
              onClick={() => setActiveStep(prev => prev < 4 ? prev + 1 : prev)}
              className="flex items-center gap-2 px-5 py-2.5 bg-foreground text-background rounded-xl text-sm font-bold hover:bg-foreground/90 transition-all"
            >
              Continue <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

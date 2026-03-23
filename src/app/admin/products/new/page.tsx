'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Save, Plus, Trash2, Box, Tag, DollarSign, List as ListIcon, Image as ImageIcon, Package } from 'lucide-react';
import Link from 'next/link';
import { createProduct } from '../actions';
import { useRouter } from 'next/navigation';

export default function ProductCreationPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('basic');
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([{ key: 'color', label: 'Color', values: 'Red, Blue' }]);
  
  const [formData, setFormData] = useState({
    name: '', sku: '', description: '', category: '', status: 'active'
  });

  const handlePublish = async () => {
    setLoading(true);
    const result = await createProduct(formData, options);
    setLoading(false);
    if (result.success) {
      router.push('/admin/products');
    } else {
      alert('Error creating product: ' + result.error);
    }
  };
  
  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: Box },
    { id: 'pricing', label: 'Pricing & Inventory', icon: DollarSign },
    { id: 'variants', label: 'Options & Variants', icon: ListIcon },
    { id: 'media', label: 'Media Gallery', icon: ImageIcon },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-20">
      <div className="flex items-center gap-4">
        <Link href="/admin/products" className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div className="flex-1">
          <h1 className="text-3xl font-extrabold tracking-tight">Create New Product</h1>
          <p className="text-foreground/60 text-sm mt-1">Configure variable products and assign warehouse routing.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-5 py-2 bg-background border border-border/50 rounded-xl text-sm font-semibold hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
            Save Draft
          </button>
          <button 
            disabled={loading}
            onClick={handlePublish}
            className="flex items-center gap-2 px-5 py-2 bg-primary text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all hover:-translate-y-0.5 disabled:opacity-50"
          >
            <Save size={18} /> {loading ? 'Saving...' : 'Publish'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 space-y-2">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all relative overflow-hidden ${
                  isActive 
                  ? 'text-primary shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)]' 
                  : 'text-foreground/70 hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                {isActive && (
                  <motion.div 
                    layoutId="active-tab"
                    className="absolute inset-0 bg-primary/10 dark:bg-primary/20 rounded-xl"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                <tab.icon size={18} className="relative z-10" />
                <span className="relative z-10">{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Form Body - Glass Panel */}
        <div className="lg:col-span-3 glass-panel rounded-2xl p-6 sm:p-8 min-h-[500px]">
          <AnimatePresence mode="wait">
            {activeTab === 'basic' && (
              <motion.div
                key="basic"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-xl font-bold flex items-center gap-2"><Tag size={20} className="text-primary"/> Basic Information</h2>
                  <p className="text-sm text-foreground/50 mt-1">Identifiers and catalog placement.</p>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-foreground/70 uppercase">Product Name</label>
                      <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Callaway Rogue Driver" className="w-full bg-background border border-border/50 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent transition-all" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-foreground/70 uppercase">Base SKU</label>
                      <input type="text" value={formData.sku} onChange={e => setFormData({...formData, sku: e.target.value})} placeholder="e.g. DR-ROGUE-20s" className="w-full bg-background border border-border/50 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent transition-all" />
                    </div>
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-foreground/70 uppercase">Description</label>
                    <textarea rows={5} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="Full product description..." className="w-full bg-background border border-border/50 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-transparent transition-all resize-none" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-foreground/70 uppercase">Brand Category</label>
                      <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-background border border-border/50 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all appearance-none cursor-pointer">
                        <option value="">Select Brand...</option>
                        <option value="callaway_hardgoods">Callaway Hardgoods</option>
                        <option value="callaway_apparel">Callaway Apparel</option>
                        <option value="ogio">Ogio</option>
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-foreground/70 uppercase">Status</label>
                      <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full bg-background border border-border/50 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all appearance-none cursor-pointer">
                        <option value="active">Active (Visible)</option>
                        <option value="draft">Draft (Hidden)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'variants' && (
              <motion.div
                key="variants"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold flex items-center gap-2"><ListIcon size={20} className="text-primary"/> Options & Variants</h2>
                    <p className="text-sm text-foreground/50 mt-1">Define properties that generate distinct SKUs (like Size/Color).</p>
                  </div>
                  <button onClick={() => setOptions([...options, { key: '', label: '', values: '' }])} className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-xs font-bold hover:bg-primary/20 transition-colors">
                    <Plus size={14} /> Add Option
                  </button>
                </div>

                <div className="space-y-4">
                  {options.map((opt, i) => (
                    <div key={i} className="flex gap-3 items-start p-4 bg-background/50 border border-border/50 rounded-xl">
                      <div className="flex-1 space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <input type="text" placeholder="Option Name (e.g. Size)" value={opt.label} onChange={e => {
                            const newOpts = [...options]; newOpts[i].label = e.target.value; setOptions(newOpts);
                          }} className="bg-background border border-border/50 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/40 focus:outline-none" />
                          <input type="text" placeholder="Internal Key (e.g. size)" value={opt.key} onChange={e => {
                            const newOpts = [...options]; newOpts[i].key = e.target.value; setOptions(newOpts);
                          }} className="bg-background border border-border/50 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/40 focus:outline-none font-mono" />
                        </div>
                        <input type="text" placeholder="Values (comma separated: S, M, L)" value={opt.values} onChange={e => {
                            const newOpts = [...options]; newOpts[i].values = e.target.value; setOptions(newOpts);
                        }} className="w-full bg-background border border-border/50 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-primary/40 focus:outline-none" />
                      </div>
                      <button onClick={() => setOptions(options.filter((_, idx) => idx !== i))} className="p-2 text-danger hover:bg-danger/10 rounded-lg transition-colors">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                  
                  {options.length > 0 && (
                     <div className="mt-6 p-4 border border-dashed border-border/80 rounded-xl bg-black/5 dark:bg-white/5 flex flex-col items-center justify-center text-center">
                       <Package size={32} className="text-foreground/30 mb-2" />
                       <p className="text-sm font-semibold text-foreground/70">Variants will be auto-generated upon saving.</p>
                       <p className="text-xs text-foreground/50 mt-1">SKUs, pricing, and independent warehouse inventory per variant will unlock after the base product is inserted.</p>
                     </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* Placeholders for other tabs for brevity */}
            {activeTab !== 'basic' && activeTab !== 'variants' && (
              <motion.div
                key="other"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-border/50 rounded-2xl"
              >
                <DollarSign size={40} className="text-foreground/20 mb-4" />
                <p className="text-foreground/50 font-medium">Coming Soon in Phase 4</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

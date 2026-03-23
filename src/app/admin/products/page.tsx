import React from 'react';
import { PlusCircle, Download, Upload, Filter, Image as ImageIcon } from 'lucide-react';
import dbConnect from '@/lib/db/connection';
import { Product } from '@/lib/db/models/Product';

// Force dynamic rendering (no caching)
export const dynamic = 'force-dynamic';

async function getProducts() {
  await dbConnect();
  
  // Aggregate products and variants
  // We want to fetch all products, and lookup their variants
  const products = await Product.aggregate([
    {
      $lookup: {
        from: 'variants',
        localField: '_id',
        foreignField: 'productId',
        as: 'variants'
      }
    }
  ]);
  
  // Parse JSON stringification to pass to client component / render purely
  return JSON.parse(JSON.stringify(products));
}

export default async function AdminProductsPage() {
  const products = await getProducts();
  
  const totalStock = (variants: any[]) => variants.reduce((sum, v) => sum + (v.stock || 0), 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Products Management</h1>
          <p className="text-foreground/60 text-sm mt-1">Manage catalog, pricing, and variants across all brands.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-black/5 dark:bg-white/5 border border-border/50 rounded-xl text-sm font-semibold hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
            <Upload size={16} /> Import
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-black/5 dark:bg-white/5 border border-border/50 rounded-xl text-sm font-semibold hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
            <Download size={16} /> Export
          </button>
          <button className="flex items-center gap-2 px-5 py-2 bg-primary text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all hover:-translate-y-0.5">
            <PlusCircle size={18} /> New Product
          </button>
        </div>
      </div>

      <div className="glass-panel flex flex-col rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-border/30 flex items-center justify-between bg-black/5 dark:bg-white/5">
          <div className="flex gap-2">
            <button className="px-3 py-1.5 bg-background border border-border/50 rounded-lg text-xs font-semibold flex items-center gap-2 hover:bg-black/5 transition-colors">
              <Filter size={14}/> Filter Category
            </button>
            <button className="px-3 py-1.5 bg-background border border-border/50 rounded-lg text-xs font-semibold flex items-center gap-2 hover:bg-black/5 transition-colors">
              Status: Active
            </button>
          </div>
          <div className="text-xs font-medium text-foreground/50">
            Showing {products.length} Products
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-black/5 dark:bg-white/5 text-foreground/70 uppercase text-[11px] font-bold tracking-wider border-b border-border/40">
              <tr>
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">SKU/Product Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Attributes</th>
                <th className="px-6 py-4">Price Range</th>
                <th className="px-6 py-4 text-center">Variants</th>
                <th className="px-6 py-4 text-center">Total Stock</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 && (
                <tr>
                  <td colSpan={9} className="px-6 py-12 text-center text-foreground/50 font-medium">
                    No products found. Please seed the database.
                  </td>
                </tr>
              )}
              {products.map((p: any) => {
                const stock = totalStock(p.variants);
                const isOutOfStock = stock === 0;
                
                return (
                  <tr key={p._id} className="border-b border-border/20 hover:bg-background/40 transition-colors group">
                    <td className="px-6 py-4">
                      {p.gallery && p.gallery.length > 0 ? (
                        <div className="w-12 h-12 rounded-lg overflow-hidden border border-border/50 relative shadow-sm">
                          <img src={p.gallery[0].url} alt={p.name} className="object-cover w-full h-full" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-black/5 dark:bg-white/5 border border-border/50 flex items-center justify-center text-foreground/40">
                          <ImageIcon size={20} />
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-foreground group-hover:text-primary transition-colors">{p.name}</div>
                      <div className="text-xs text-foreground/50 font-medium mt-0.5">{p.sku}</div>
                    </td>
                    <td className="px-6 py-4 font-medium text-foreground/80">
                      {p.categoryIds?.join(', ') || '-'}
                    </td>
                    <td className="px-6 py-4">
                       <div className="flex flex-wrap gap-1 max-w-[150px]">
                         {p.options?.filter((o:any) => o.useForVariants).map((opt:any) => (
                           <span key={opt.key} className="px-2 py-0.5 bg-black/5 dark:bg-white/10 rounded-md text-[10px] font-semibold text-foreground/70 uppercase">
                             {opt.label}
                           </span>
                         ))}
                       </div>
                    </td>
                    <td className="px-6 py-4 font-bold text-foreground/90">
                      ₹{p.price?.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary font-bold text-xs ring-1 ring-primary/20">
                        {p.variants?.length || 0}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`font-bold ${isOutOfStock ? 'text-danger' : 'text-success'}`}>
                        {stock}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        p.status === 'active' ? 'bg-success/10 text-success border border-success/20' : 
                        p.status === 'draft' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 
                        'bg-foreground/10 text-foreground/60 border border-foreground/20'
                      }`}>
                        {p.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-primary hover:text-primary/70 font-semibold text-xs border border-primary/20 hover:bg-primary/10 px-3 py-1.5 rounded-lg transition-colors">
                        Manage
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

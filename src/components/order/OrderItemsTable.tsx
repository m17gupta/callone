
"use client";

import React from "react";
import { CartItem } from "@/store/slices/cart/cartSlice";

interface OrderItemsTableProps {
  items: CartItem[];
}

export const OrderItemsTable = ({ items }: OrderItemsTableProps) => {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-black/20">
      <table className="w-full text-left text-xs">
        <thead className="bg-white/5 text-[10px] font-bold uppercase tracking-widest text-white/50">
          <tr>
            <th className="px-4 py-3">Brand</th>
            <th className="px-4 py-3">SKU</th>
            <th className="px-4 py-3">Description</th>
            <th className="px-4 py-3 text-center">Qty 88</th>
            <th className="px-4 py-3 text-center">Qty 90</th>
            <th className="px-4 py-3 text-center">QTY</th>
            <th className="px-4 py-3 text-right">MRP</th>
            <th className="px-4 py-3 text-right">Discount</th>
            <th className="px-4 py-3 text-right">Amount</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {items.map((item, index) => {
            const totalQty = (item.qty88 || 0) + (item.qty90 || 0) || item.qty || 0;
            return (
              <tr key={index} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-4 py-3 font-medium text-white/80">{item.brand || "—"}</td>
                <td className="px-4 py-3 font-mono text-white/60">{item.sku}</td>
                <td className="px-4 py-3 text-white/50">{item.description}</td>
                <td className="px-4 py-3 text-center text-white/70">{item.qty88 || 0}</td>
                <td className="px-4 py-3 text-center text-white/70">{item.qty90 || 0}</td>
                <td className="px-4 py-3 text-center font-bold text-primary">{totalQty}</td>
                <td className="px-4 py-3 text-right text-white/60">₹{item.mrp?.toLocaleString()}</td>
                <td className="px-4 py-3 text-right text-rose-400/80">₹{item.discount?.toLocaleString() || 0}</td>
                <td className="px-4 py-3 text-right font-bold text-white">₹{item.finalAmount?.toLocaleString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

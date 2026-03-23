import React from 'react';
import { Package, ShoppingBag, Users as UsersIcon, FileText } from 'lucide-react';

const stats = [
  { title: "Total Orders", value: "1,248", icon: ShoppingBag, change: "+12%" },
  { title: "Active Products", value: "3,842", icon: Package, change: "+3%" },
  { title: "Retailers", value: "64", icon: UsersIcon, change: "0%" },
  { title: "Pending Approvals", value: "12", icon: FileText, change: "-2%" },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-foreground/60 text-sm mt-1">Metrics across all Callaway B2B portals.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.title} className="p-6 bg-surface border border-border flex flex-col gap-2 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground/70">{stat.title}</span>
              <stat.icon size={20} className="text-primary" />
            </div>
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold">{stat.value}</span>
              <span className={stat.change.startsWith('+') ? "text-success text-sm font-medium pb-1" : "text-danger text-sm font-medium pb-1"}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Spacer for aesthetics */}
      <div className="h-48 border-2 border-dashed border-border rounded-xl flex items-center justify-center text-foreground/40 text-sm font-medium mt-8">
        Recent Activity Chart Placeholder
      </div>
    </div>
  );
}

import React from 'react';
import { Download, Filter, Search, MoreHorizontal, ArrowUpRight } from 'lucide-react';
import dbConnect from '@/lib/db/connection';
import { Order } from '@/lib/db/models/Order';

export const dynamic = 'force-dynamic';

async function getOrders() {
  await dbConnect();
  // Fetch mock orders if DB is empty for demo, otherwise fetch real ones.
  const orders = await Order.find().sort({ createdAt: -1 }).limit(20);
  
  // Return pure stringified JSON for Server to Client component handoff
  return JSON.parse(JSON.stringify(orders));
}

// Generate some fake orders if none exist
const mockOrders = [
  { _id: '1', orderNumber: 'ORD-2024-X9F2A', status: 'submit_pending', finalTotal: 45000, createdAt: new Date().toISOString() },
  { _id: '2', orderNumber: 'ORD-2024-K2L9M', status: 'manager_approval', finalTotal: 120500, createdAt: new Date(Date.now() - 86400000).toISOString() },
  { _id: '3', orderNumber: 'ORD-2024-B8C3X', status: 'availability_check', finalTotal: 15200, createdAt: new Date(Date.now() - 172800000).toISOString() },
  { _id: '4', orderNumber: 'ORD-2024-R4T7Y', status: 'completed', finalTotal: 89000, createdAt: new Date(Date.now() - 259200000).toISOString() },
];

export default async function AdminOrdersPage() {
  let ordersList = await getOrders();
  if (ordersList.length === 0) {
    ordersList = mockOrders;
  }

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'submit_pending': return 'bg-orange-500/10 text-orange-500 border-orange-500/20';
      case 'availability_check': return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      case 'manager_approval': return 'bg-purple-500/10 text-purple-500 border-purple-500/20';
      case 'completed': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
      default: return 'bg-foreground/10 text-foreground/60 border-foreground/20';
    }
  };

  const formatStatus = (status: string) => {
    return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Orders Pipeline</h1>
          <p className="text-foreground/60 text-sm mt-1">Manage B2B incoming orders, approvals, and fulfillment.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-black/5 dark:bg-white/5 border border-border/50 rounded-xl text-sm font-semibold hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
            <Download size={16} /> Export CSV
          </button>
          <button className="flex items-center gap-2 px-5 py-2 bg-primary text-white rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all hover:-translate-y-0.5">
            Create Order
          </button>
        </div>
      </div>

      <div className="glass-panel flex flex-col rounded-2xl overflow-hidden">
        <div className="p-5 border-b border-border/30 flex items-center justify-between bg-black/5 dark:bg-white/5 gap-4">
          <div className="relative max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" size={16}/>
            <input 
              type="text" 
              placeholder="Search order number..." 
              className="w-full pl-9 pr-4 py-2 bg-background border border-border/50 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
          <button className="px-3 py-2 bg-background border border-border/50 rounded-xl text-xs font-semibold flex items-center gap-2 hover:bg-black/5 transition-colors shrink-0">
            <Filter size={14}/> Pipeline Stage
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-black/5 dark:bg-white/5 text-foreground/70 uppercase text-[11px] font-bold tracking-wider border-b border-border/40">
              <tr>
                <th className="px-6 py-4">Order Details</th>
                <th className="px-6 py-4">Date Submitted</th>
                <th className="px-6 py-4">Total Value</th>
                <th className="px-6 py-4">Pipeline Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {ordersList.map((order: any) => (
                <tr key={order._id} className="border-b border-border/20 hover:bg-background/40 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                        <ArrowUpRight size={18} />
                      </div>
                      <div>
                        <div className="font-bold text-foreground group-hover:text-primary transition-colors cursor-pointer">{order.orderNumber}</div>
                        <div className="text-xs text-foreground/50 font-medium mt-0.5">Retailer Auth</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-foreground/80">
                    {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 font-bold text-foreground/90">
                    ₹{order.finalTotal?.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider border ${getStatusColor(order.status)}`}>
                      {formatStatus(order.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-foreground/50 hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 rounded-lg transition-colors inline-flex">
                      <MoreHorizontal size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

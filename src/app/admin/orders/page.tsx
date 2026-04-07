"use client";

import { PageHeader } from "@/components/admin/PageHeader";
import { OrderList } from "@/components/order/OrderList";
import { ShoppingBag } from "lucide-react";

export default function OrdersPage() {
  return (
    <div className="space-y-8 min-h-screen pb-20">
      <PageHeader
        title="Order Management"
        description="Monitor, update, and manage your workspace orders with an enhanced tabbed interface."
        icon={ShoppingBag}
      />

      <OrderList />
    </div>
  );
}

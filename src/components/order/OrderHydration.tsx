'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/store';
import { fetchOrders } from '@/store/slices/order/orderThunks';
import { setCurrentOrder } from '@/store/slices/order/OrderSlice';
import { setCartFromOrder } from '@/store/slices/cart/cartSlice';
import { fetchUsersByRole } from '@/store/slices/users/userThunks';

export default function OrderHydration() {
  const params = useParams();
  const orderNumber = params?.orderNumber as string;
  const dispatch = useDispatch<AppDispatch>();
  
  const { allOrders, currentOrder, isFetchedOrders } = useSelector((state: RootState) => state.order);
  const { allRetailer, allManager, allSaleRep, isFetchedAllRetailer, isFetchedAllManager, isFetchedAllSaleRep } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    // Fetch base data if missing
    if (!isFetchedOrders) dispatch(fetchOrders());
    if (!isFetchedAllRetailer) dispatch(fetchUsersByRole('retailer'));
    if (!isFetchedAllManager) dispatch(fetchUsersByRole('manager'));
    if (!isFetchedAllSaleRep) dispatch(fetchUsersByRole('sales_rep'));
  }, [dispatch, isFetchedOrders, isFetchedAllRetailer, isFetchedAllManager, isFetchedAllSaleRep]);

  useEffect(() => {
    if (orderNumber && orderNumber !== 'new' && isFetchedOrders && isFetchedAllRetailer && isFetchedAllManager && isFetchedAllSaleRep) {
      // Find the order by orderNumber
      const order = allOrders.find(o => o.orderNumber === orderNumber);
      
      if (order && (!currentOrder || currentOrder.orderNumber !== orderNumber)) {
        // Find corresponding user objects
        const retailer = allRetailer.find(r => r._id === order.retailer_id);
        const manager = allManager.find(m => m._id === order.manager_id);
        const salesRep = allSaleRep.find(s => s._id === order.salesrep_id);

        // Hydrate Redux state
        dispatch(setCurrentOrder(order));
        dispatch(setCartFromOrder({
          items: order.items || [],
          selectedRetailer: retailer || null,
          selectedManager: manager || null,
          selectedSalesRep: salesRep || null,
          discountType: order.discount_type,
          discountValue: order.discount_percent,
          cartId: order._id
        }));
      }
    }
  }, [
    orderNumber, 
    allOrders, 
    currentOrder, 
    isFetchedOrders, 
    isFetchedAllRetailer, 
    isFetchedAllManager, 
    isFetchedAllSaleRep, 
    allRetailer, 
    allManager, 
    allSaleRep, 
    dispatch
  ]);

  return null; // This component handles side effects only
}

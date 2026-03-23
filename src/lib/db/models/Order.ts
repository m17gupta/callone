import mongoose, { Schema, Document } from 'mongoose';

export interface IOrderItem {
  variantId: mongoose.Types.ObjectId;
  sku: string;
  name: string;
  qty: number;
  price: number;
  discountType: 'percentage' | 'flat' | 'none';
  discountAmount: number;
  subtotal: number;
}

export interface IOrder extends Document {
  orderNumber: string;
  userId: mongoose.Types.ObjectId;       // Usually the Retailer
  salesRepId?: mongoose.Types.ObjectId;  // Forwarded on behalf
  status: 'draft' | 'submit_pending' | 'availability_check' | 'manager_approval' | 'completed' | 'cancelled';
  items: IOrderItem[];
  
  // High level order discounts (Global coupon)
  globalDiscountType?: 'percentage' | 'flat';
  globalDiscountValue?: number;
  
  // Financials
  subTotal: number;
  taxTotal: number;
  discountTotal: number;
  finalTotal: number;
  
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>({
  variantId: { type: Schema.Types.ObjectId, ref: 'Variant', required: true },
  sku: { type: String, required: true },
  name: { type: String, required: true },
  qty: { type: Number, required: true, min: 1 },
  price: { type: Number, required: true },
  discountType: { type: String, enum: ['percentage', 'flat', 'none'], default: 'none' },
  discountAmount: { type: Number, default: 0 },
  subtotal: { type: Number, required: true },
});

const OrderSchema = new Schema<IOrder>(
  {
    orderNumber: { type: String, required: true, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    salesRepId: { type: Schema.Types.ObjectId, ref: 'User' },
    status: { 
      type: String, 
      enum: ['draft', 'submit_pending', 'availability_check', 'manager_approval', 'completed', 'cancelled'],
      default: 'draft'
    },
    items: [OrderItemSchema],
    globalDiscountType: { type: String, enum: ['percentage', 'flat'] },
    globalDiscountValue: { type: Number },
    subTotal: { type: Number, required: true },
    taxTotal: { type: Number, required: true },
    discountTotal: { type: Number, required: true },
    finalTotal: { type: Number, required: true },
    notes: { type: String },
  },
  { timestamps: true }
);

// Auto-generate OrderNumber pre-save
OrderSchema.pre('validate', function(this: IOrder, next: any) {
  if (!this.orderNumber) {
    const randomStr = Math.random().toString(36).substring(2, 7).toUpperCase();
    this.orderNumber = `ORD-${Date.now().toString().slice(-4)}-${randomStr}`;
  }
  next();
});

export const Order = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

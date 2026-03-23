import mongoose, { Schema, Document } from 'mongoose';

export interface IVariant extends Document {
  productId: mongoose.Types.ObjectId;
  sku: string;
  title: string;
  price: number;
  stock: number;
  compareAtPrice: number;
  cost: number;
  optionValues: Record<string, string>;
  imageId: string;
  status: 'active' | 'draft' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

const VariantSchema = new Schema<IVariant>(
  {
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    sku: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    compareAtPrice: { type: Number, default: 0 },
    cost: { type: Number, default: 0 },
    optionValues: { type: Map, of: String },
    imageId: { type: String },
    status: { type: String, enum: ['active', 'draft', 'archived'], default: 'active' },
  },
  { timestamps: true }
);

export const Variant = mongoose.models.Variant || mongoose.model<IVariant>('Variant', VariantSchema);

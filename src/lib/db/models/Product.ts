import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  type: string;
  name: string;
  slug: string;
  sku: string;
  price: number;
  description: string;
  status: 'active' | 'draft' | 'archived';
  categoryIds: string[];
  attributeSetId?: string;
  businessType?: string;
  pricing: {
    price: number;
    compareAtPrice: number;
    costPerItem: number;
    chargeTax: boolean;
    trackQuantity: boolean;
  };
  options: {
    key: string;
    label: string;
    values: string[];
    useForVariants: boolean;
  }[];
  gallery: {
    id: string;
    url: string;
    alt: string;
    order: number;
  }[];
  primaryImageId: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    type: { type: String, required: true },
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    sku: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    description: { type: String },
    status: { type: String, enum: ['active', 'draft', 'archived'], default: 'active' },
    categoryIds: [{ type: String }],
    attributeSetId: { type: String },
    businessType: { type: String },
    pricing: {
      price: { type: Number },
      compareAtPrice: { type: Number },
      costPerItem: { type: Number },
      chargeTax: { type: Boolean, default: true },
      trackQuantity: { type: Boolean, default: true },
    },
    options: [
      {
        key: { type: String, required: true },
        label: { type: String, required: true },
        values: [{ type: String }],
        useForVariants: { type: Boolean, default: false },
      },
    ],
    gallery: [
      {
        id: { type: String },
        url: { type: String },
        alt: { type: String },
        order: { type: Number },
      },
    ],
    primaryImageId: { type: String },
  },
  { timestamps: true }
);

export const Product = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

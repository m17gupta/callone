'use server';

import dbConnect from '@/lib/db/connection';
import { Product } from '@/lib/db/models/Product';
import { Variant } from '@/lib/db/models/Variant';
import { revalidatePath } from 'next/cache';

export async function createProduct(formData: any, options: any[]) {
  try {
    await dbConnect();

    // 1. Create Base Product
    const newProduct = await Product.create({
      type: 'apparel',
      name: formData.name,
      slug: `prd-${Date.now()}`,
      sku: formData.sku,
      description: formData.description,
      status: formData.status,
      categoryIds: [formData.category],
      options: options.map((opt: any) => ({
        key: opt.key,
        label: opt.label,
        values: opt.values.split(',').map((v: string) => v.trim()),
        useForVariants: true
      }))
    });

    // 2. Auto-generate Variants based on permutations (Simplified for Phase 4 Demo)
    // For a real production app, we'd use a cartesian product generator here.
    if (options.length > 0) {
      // Just an example dummy variant for the demo flow
      await Variant.create({
        productId: newProduct._id,
        sku: `${formData.sku}-V1`,
        title: 'Default auto-generated variant',
        price: 0,
        stock: 0,
        status: 'draft'
      });
    }

    revalidatePath('/admin/products');
    return { success: true, productId: newProduct._id.toString() };

  } catch (error: any) {
    console.error('Error creating product:', error);
    return { success: false, error: error.message };
  }
}

import mongoose from 'mongoose';
import { Product } from '../lib/db/models/Product';
import { Variant } from '../lib/db/models/Variant';
import { AttributeSet } from '../lib/db/models/AttributeSet';

const MONGODB_URI = 'mongodb+srv://raideepak:Jaipur%40302030@payload-10.kxlklht.mongodb.net/callone';

const seedData = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to DB');

    // Clean existing data
    await Product.deleteMany({});
    await Variant.deleteMany({});
    await AttributeSet.deleteMany({});

    // 1. Create Attribute Set
    const attrSet = await AttributeSet.create({
      key: 'general-product-attributes',
      name: 'Core Attributes',
      appliesTo: 'product',
      contexts: ['online-store'],
      attributes: [
        { key: 'title', label: 'Title', type: 'text', options: [], hint: '' },
        { key: 'category', label: 'Category', type: 'text', options: [], hint: '' },
        { key: 'status', label: 'Status', type: 'select', options: ['Active', 'Draft', 'Archived'], hint: '' }
      ],
      isSystem: true,
      source: 'business-template-catalog'
    });

    // 2. Create Base Product
    const product = await Product.create({
      type: 'physical',
      name: 'Queen Bed',
      slug: 'queen-bed',
      sku: 'SKU-BED-000',
      price: 30000,
      description: 'Queen Size Bed',
      status: 'active',
      categoryIds: ['home-and-living'],
      attributeSetId: attrSet._id,
      businessType: 'Ready-Made Furniture Sales',
      pricing: {
        price: 30000,
        compareAtPrice: 30000,
        costPerItem: 39999,
        chargeTax: true,
        trackQuantity: true
      },
      options: [
        { key: 'primary_material', label: 'Primary Material', values: ['Solid Wood'], useForVariants: false },
        { key: 'color', label: 'Color', values: ['Walnut', 'Teak'], useForVariants: true },
        { key: 'surface_texture', label: 'Surface Texture', values: ['Smooth'], useForVariants: false }
      ],
      gallery: [
        {
          id: 'gallery-1773221615660-zmu8h',
          url: 'https://images.unsplash.com/photo-1714138100706-790c1b19056a?q=80&w=871&auto=format&fit=crop',
          alt: '',
          order: 0
        },
        {
          id: 'gallery-1773221622420-7140h',
          url: 'https://images.unsplash.com/photo-1560185128-e173042f79dd?q=80&w=811&auto=format&fit=crop',
          alt: '',
          order: 1
        }
      ],
      primaryImageId: 'gallery-1773221615660-zmu8h'
    });

    // 3. Create Variants
    await Variant.create([
      {
        productId: product._id,
        sku: 'SKU-BED-000-1',
        title: 'Color: Walnut',
        price: 30000,
        stock: 12,
        compareAtPrice: 30000,
        cost: 40000,
        optionValues: { color: 'Walnut' },
        imageId: 'gallery-1773221615660-zmu8h',
        status: 'active'
      },
      {
        productId: product._id,
        sku: 'SKU-BED-000-2',
        title: 'Color: Teak',
        price: 30000,
        stock: 3,
        compareAtPrice: 30000,
        cost: 40000,
        optionValues: { color: 'Teak' },
        imageId: 'gallery-1773221622420-7140h',
        status: 'active'
      }
    ]);

    console.log('Seed completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seed Error:', error);
    process.exit(1);
  }
};

seedData();

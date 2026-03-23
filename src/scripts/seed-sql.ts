import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import { Product } from '../lib/db/models/Product';
import { Variant } from '../lib/db/models/Variant';
import { AttributeSet } from '../lib/db/models/AttributeSet';

const MONGODB_URI = 'mongodb+srv://raideepak:Jaipur%40302030@payload-10.kxlklht.mongodb.net/callone';

const seedLegacySQL = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to DB for Legacy Seeding');

    const sqlPath = path.join(process.cwd(), 'u683660902_calloms_full.sql');
    if (!fs.existsSync(sqlPath)) {
      console.error('SQL File not found at:', sqlPath);
      process.exit(1);
    }

    const sqlContent = fs.readFileSync(sqlPath, 'utf8');

    // Make sure we have the core attribute set
    let attrSet = await AttributeSet.findOne({ key: 'general-product-attributes' });
    if (!attrSet) {
      attrSet = await AttributeSet.create({
        key: 'general-product-attributes',
        name: 'Core Attributes',
        appliesTo: 'product',
        contexts: ['online-store'],
        attributes: [
          { key: 'category', label: 'Category', type: 'text', options: [] },
          { key: 'gender', label: 'Gender', type: 'text', options: [] },
        ],
        isSystem: true
      });
    }

    console.log('Parsing Callaway Apparel...');
    const apparelInsertsMatch = sqlContent.match(/INSERT INTO `callaway_apparel`[\s\S]*?VALUES\n([\s\S]*?);/);
    if (apparelInsertsMatch) {
      const valuesStr = apparelInsertsMatch[1];
      // Regex to roughly extract tuple strings like ('sku', 'name', ...)
      const tuples = valuesStr.split(/(?<=\)),\s*(?=\()/);
      
      let count = 0;
      for (const tuple of tuples) {
        if(count >= 20) break; // Limit to 20 for speed/demo
        
        const cleanTuple = tuple.trim().replace(/^\(/, '').replace(/\)$/, '');
        // Super simple parser, assumes no commas inside strings or uses regex to respect quotes
        const cols = cleanTuple.split(/,\s*(?=(?:[^']*'[^']*')*[^']*$)/).map(s => s.replace(/^'|'$/g, '').trim());
        
        // Cols: sku, name, description, mrp, gst, color, size, category, gender, series, type, style_id, sleeves, season, stock_88, stock_90...
        if (cols.length >= 16) {
          const sku = cols[0];
          const name = cols[1];
          const desc = cols[2];
          const mrp = parseFloat(cols[3]) || 0;
          const color = cols[5];
          const size = cols[6];
          const stock = (parseInt(cols[14]) || 0) + (parseInt(cols[15]) || 0);

          // Find or create base product
          const baseSku = sku.replace(/-\w+$/, ''); // Attempt to group by base SKU if variant convention was used
          let product = await Product.findOne({ sku: baseSku });
          
          if (!product) {
            product = await Product.create({
              type: 'apparel',
              name: name || `Callaway Apparel ${baseSku}`,
              slug: `apparel-${baseSku}-${Date.now()}`,
              sku: baseSku,
              price: mrp,
              description: desc || '',
              status: 'active',
              categoryIds: [cols[7] || 'apparel'],
              attributeSetId: attrSet._id,
              pricing: { price: mrp, compareAtPrice: mrp, chargeTax: true, trackQuantity: true },
              options: [
                { key: 'color', label: 'Color', values: [color].filter(Boolean), useForVariants: true },
                { key: 'size', label: 'Size', values: [size].filter(Boolean), useForVariants: true }
              ]
            });
          } else {
            // Update options array if new colors/sizes found
            if (color && !product.options.find((o: any) => o.key === 'color')?.values.includes(color)) {
              product.options.find((o: any) => o.key === 'color')?.values.push(color);
            }
            if (size && !product.options.find((o: any) => o.key === 'size')?.values.includes(size)) {
              product.options.find((o: any) => o.key === 'size')?.values.push(size);
            }
            await product.save();
          }

          // Create Variant
          await Variant.findOneAndUpdate({ sku }, {
            productId: product._id,
            sku: sku,
            title: `${color ? color + ' ' : ''}${size ? size : ''}`.trim() || 'Default Title',
            price: mrp,
            stock: stock,
            optionValues: { color, size },
            status: 'active'
          }, { upsert: true });

          count++;
        }
      }
      console.log(`Upserted ${count} Apparel products.`);
    }

    console.log('Legacy Seed Completed Successfully!');
    process.exit(0);

  } catch (error) {
    console.error('Seed Error:', error);
    process.exit(1);
  }
};

seedLegacySQL();

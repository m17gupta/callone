This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

### ✅ Completed Work (Phase 1, 2 & 3)
- **Next.js 14 App Router** initialized with Tailwind CSS.
- **Sleek Glassmorphism Admin UI**: Framer Motion integrated for smooth page transitions and sidebar animations. `AdminShell` and `globals.css` use `.glass-panel` utilities for a modern, digital aesthetic.
- **Interactive UI**: Added `MegaSearch` (cmd+k) support with brand filters and a Collapsible Sidebar mechanism.
- **Database Architecture mapped to Mongoose Models**:
  - `src/lib/db/connection.ts` (Singleton Mongoose connector)
  - `src/lib/db/models/Product.ts`, `Variant.ts`, `AttributeSet.ts`, `Order.ts`
- **Authentication**: `NextAuth.js` role-based dummy login built at `/login` featuring interactive Framer Motion selection cards, protected by standard `middleware.ts`.
- **Legacy Database Migration (Seeding)**: Custom `seed-sql.ts` parses the 4.3MB `u683660902_calloms_full.sql` file natively into the Mongoose environment without manual entry.
- **Admin Routing**: `/admin/products` fetches live Mongoose data. `/admin/products/new` features a robust client-side multi-variable Form builder.

### 🔄 Up Next — Phase 4: Server Actions & Order Logistics
1. **Server Actions (CRUD)**: Wire the Product Creation form (`/admin/products/new`) directly to MongoDB via Next.js 14 Server Actions to facilitate physical insertions.
2. **Order Management UI**: Build the `/admin/orders` table to showcase the 4-step pipeline and handle nested discounts.
3. **Product Customizer UI**: Scaffold the custom Wedge configurator UI (Opus Wedge representation).

---

## Learn More

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

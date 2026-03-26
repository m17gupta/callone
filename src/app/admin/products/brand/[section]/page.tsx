import {notFound} from "next/navigation";
import {getCatalogSection} from "@/lib/admin/catalog-sections";
import TravisHome from "@/components/products/travismethew/TravisHome";

export const dynamic = "force-dynamic";

export default async function ProductSectionPage({
  params,
}: {
  params: {section: string};
}) {
  const section = getCatalogSection(params.section);

  if (!section) {
    notFound();
  }

  return (
    <TravisHome/>
  );
}

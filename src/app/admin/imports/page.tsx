import dbConnect from "@/lib/db/connection";
import {SheetDataset} from "@/lib/db/models/SheetDataset";
import {toPlainObject} from "@/lib/utils/serialization";
import {CallCheckWorkspace} from "@/components/call-check";

export const dynamic = "force-dynamic";

type CallCheckPageProps = {
  searchParams?: {
    sheet?: string;
  };
};

export default async function CallCheckPage({searchParams}: CallCheckPageProps) {
  await dbConnect();

  const datasetsRaw = await SheetDataset.find({type: "generic"}).sort({createdAt: -1}).lean();
  const datasets = toPlainObject(datasetsRaw).map((dataset) => ({
    id: dataset._id.toString(),
    name: dataset.name,
    slug: dataset.slug,
    type: "generic" as const,
    sourceFileName: dataset.sourceFileName,
    description: dataset.description,
    columns: dataset.columns,
    rowCount: dataset.rowCount,
    createdAt: dataset.createdAt ? new Date(dataset.createdAt).toISOString() : new Date(0).toISOString(),
  }));

  return <CallCheckWorkspace initialDatasets={datasets} initialDatasetSlug={searchParams?.sheet ?? null} />;
}

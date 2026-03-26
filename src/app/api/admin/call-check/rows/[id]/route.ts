import {NextRequest, NextResponse} from "next/server";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth/options";
import dbConnect from "@/lib/db/connection";
import {SheetRow} from "@/lib/db/models/SheetRow";

export async function PUT(
  request: NextRequest,
  {params}: {params: {id: string}}
) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({error: "Unauthorized"}, {status: 401});
  }

  await dbConnect();
  const body = (await request.json()) as Record<string, unknown>;
  const data = {...body};
  delete data._id;

  const updatedRow = await SheetRow.findByIdAndUpdate(
    params.id,
    {data},
    {new: true}
  ).lean();

  if (!updatedRow) {
    return NextResponse.json({error: "Row not found"}, {status: 404});
  }

  return NextResponse.json({
    row: {
      _id: updatedRow._id.toString(),
      ...updatedRow.data,
    },
  });
}

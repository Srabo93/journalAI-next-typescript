import { getUserByClerkID } from "@/util/auth";
import prisma from "@/util/db";
import { NextResponse } from "next/server";

export const PATCH = async (
  request: Request,
  { params }: { params: { id: string } },
) => {
  const { content } = await request.json();

  const user = await getUserByClerkID();
  if (!user) return;

  const updatedEntry = await prisma.journalEntry.update({
    where: {
      userId: user.id,
      id: params.id,
    },
    data: {
      content,
    },
  });
  return NextResponse.json({ data: updatedEntry });
};

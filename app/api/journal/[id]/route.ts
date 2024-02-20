import { analyze } from "@/util/ai";
import { getUserByClerkID } from "@/util/auth";
import prisma from "@/util/db";
import { Prisma } from "@prisma/client";
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

  let analysis = await analyze(updatedEntry.content);

  if (!analysis) return;

  const updatedAnalysis = await prisma.analysis.upsert({
    where: {
      entryId: updatedEntry.id,
    },
    create: {
      userId: user.id,
      entryId: updatedEntry.id,
      ...analysis,
    } as Prisma.AnalysisCreateManyInput,
    update: analysis,
  });

  return NextResponse.json({
    data: { ...updatedEntry, analysis: updatedAnalysis },
  });
};

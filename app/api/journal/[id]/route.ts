import { analyze } from "@/util/ai";
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

  let analysis = await analyze(updatedEntry.content);

  if (!analysis) {
    analysis = {
      summary: "",
      mood: "",
      negative: false,
      subject: "",
      color: "#FFF",
    };
  }

  const updatedAnalysis = await prisma.analysis.upsert({
    where: {
      entryId: updatedEntry.id,
    },
    create: {
      entryId: updatedEntry.id,
      ...analysis,
    },
    update: analysis,
  });

  return NextResponse.json({
    data: { ...updatedEntry, analysis: updatedAnalysis },
  });
};

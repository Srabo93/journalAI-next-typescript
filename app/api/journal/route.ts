import { NextResponse } from "next/server";
import { getUserByClerkID } from "@/util/auth";
import prisma from "@/util/db";
import { revalidatePath } from "next/cache";
import { analyze } from "@/util/ai";
import { Prisma } from "@prisma/client";

export const POST = async () => {
  const user = await getUserByClerkID();
  if (!user) return;

  const entry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      content: "Write about your day! Amazing!",
    },
  });

  const analysis = await analyze(entry.content);

  if (!analysis) return;

  await prisma.analysis.create({
    data: {
      userId: user.id,
      entryId: entry.id,
      ...analysis,
    } as Prisma.AnalysisCreateManyInput,
  });

  revalidatePath("/journal");

  return NextResponse.json({ data: entry });
};

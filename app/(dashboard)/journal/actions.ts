"use server";
import { getUserByClerkID } from "@/util/auth";
import prisma from "@/util/db";
import { analyze } from "@/util/ai";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createNewEntry = async () => {
  const user = await getUserByClerkID();
  if (!user) return;

  const entry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      content: "Write about your day!",
    },
  });

  const analysis = await analyze(entry.content);

  if (!analysis) return;

  try {
    await prisma.analysis.create({
      data: {
        userId: user.id,
        entryId: entry.id,
        ...analysis,
      } as Prisma.AnalysisCreateManyInput,
    });
    revalidatePath("/journal", "page");
    return { id: entry.id, message: "Entry created" };
  } catch (error) {
    throw new Error(`Error while updating Analysis: ${error}`);
  }
};

export const updateEntry = async (id: string, content: string) => {
  const user = await getUserByClerkID();
  if (!user) return;

  const updatedEntry = await prisma.journalEntry.update({
    where: {
      userId: user.id,
      id,
    },
    data: {
      content,
    },
  });

  try {
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

    revalidatePath("/journal", "page");

    return {
      ...updatedEntry,
      analysis: updatedAnalysis,
      message: "Entry got updated successfully",
    };
  } catch (error) {
    throw new Error(`Error while updating Analysis: ${error}`);
  }
};

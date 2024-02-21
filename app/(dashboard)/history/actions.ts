"use server";
import { qa } from "@/util/ai";
import { getUserByClerkID } from "@/util/auth";
import prisma from "@/util/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const askQuestion = async (question: string) => {
  const user = await getUserByClerkID();
  if (!user) return;

  const schema = z.object({
    question: z.string().min(1),
  });

  const data = schema.parse({
    question,
  });

  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user.id,
    },
    select: {
      id: true,
      content: true,
      createdAt: true,
    },
  });

  if (!entries) return;

  const answer = await qa(data.question, entries);
  return { data: answer, message: "Question prompt successfull" };
};

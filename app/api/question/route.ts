import { qa } from "@/util/ai";
import { getUserByClerkID } from "@/util/auth";
import prisma from "@/util/db";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  const { question } = await request.json();
  const user = await getUserByClerkID();

  if (!user) return;

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

  const answer = await qa(question, entries);

  return NextResponse.json({ data: answer });
};

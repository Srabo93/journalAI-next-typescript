import { NextResponse } from "next/server";
import { getUserByClerkID } from "@/util/auth";
import prisma from "@/util/db";
import { revalidatePath } from "next/cache";

export const POST = async () => {
  const user = await getUserByClerkID();
  if (!user) return;

  const entry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      content: "Write about your day! Amazing!",
    },
  });

  revalidatePath("/journal");

  return NextResponse.json({ data: entry });
};

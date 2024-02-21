import EntryCard from "@/components/EntryCard";
import NewEntryCard from "@/components/NewEntryCard";
import { getUserByClerkID } from "@/util/auth";
import prisma from "@/util/db";
import Link from "next/link";
import Question from "@/components/Question";
import { Analysis, JournalEntry } from "@prisma/client";

const getEntries = async () => {
  const user = await getUserByClerkID();

  const entries = await prisma.journalEntry.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      analysis: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return entries;
};

const JournalPage = async () => {
  const entries = await getEntries();

  return (
    <div className=" bg-zinc-400/10 p-5">
      <h2 className="mb-8 text-3xl">Journal</h2>
      <div className="py-8">
        <Question />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <NewEntryCard />
        {entries.map((entry) => (
          <Link href={`/journal/${entry.id}`} key={entry.id}>
            <EntryCard
              entry={entry as JournalEntry & { analysis?: Analysis }}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default JournalPage;

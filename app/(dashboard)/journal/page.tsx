import EntryCard from "@/components/journal/EntryCard";
import NewEntryCard from "@/components/journal/NewEntryCard";
import Question from "@/components/journal/Question";
import Link from "next/link";
import { getUserByClerkID } from "@/util/auth";
import prisma from "@/util/db";
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
    <div className="flex flex-col bg-zinc-400/10 p-5">
      <h2 className="mb-8 text-3xl">Journal</h2>
      <div className="mb-4 py-4">
        <Question />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
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

import Editor from "@/components/Editor";
import { getUserByClerkID } from "@/util/auth";
import prisma from "@/util/db";
import { JournalEntry } from "@prisma/client";

const getEntry = async (id: string) => {
  const user = await getUserByClerkID();
  if (!user) return;

  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId: user.id,
      id,
    },
  });

  return entry;
};
const EntryPage = async ({ params }: { params: { id: string } }) => {
  const entry = await getEntry(params.id);

  return (
    <div>
      <Editor entry={entry as JournalEntry} />
    </div>
  );
};

export default EntryPage;

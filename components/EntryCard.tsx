import { Prisma } from "@prisma/client";

const EntryCard = ({
  entry,
}: {
  entry: Prisma.JournalEntrySelect & { analysis?: Prisma.AnalysisSelect };
}) => {
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded bg-white shadow">
      <div className="px-4 py-5">{entry.createdAt?.toLocaleString()}</div>
      <div className="px-4 py-5">{entry.analysis?.summary}</div>
      <div className="px-4 py-5">{entry.analysis?.mood}</div>
    </div>
  );
};

export default EntryCard;

import { Analysis, JournalEntry } from "@prisma/client";
const EntryCard = ({
  entry,
}: {
  entry: JournalEntry & { analysis?: Analysis };
}) => {
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded bg-white shadow">
      <div className="px-4 py-5">{entry.createdAt?.toLocaleString()}</div>
      <div className="min-h-28 px-4 py-5">{entry.analysis?.summary}</div>
      <div className="px-4 py-5">{entry.analysis?.mood}</div>
    </div>
  );
};

export default EntryCard;

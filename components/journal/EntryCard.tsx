import { Analysis, JournalEntry } from "@prisma/client";
const EntryCard = ({
  entry,
}: {
  entry: JournalEntry & { analysis?: Analysis };
}) => {
  return (
    <div className="divide-y divide-gray-200 overflow-hidden rounded bg-white shadow">
      <div className="px-4 py-5">
        <span className="font-bold">Created: </span>
        <span>{entry.createdAt?.toLocaleString()}</span>
      </div>
      <div className="min-h-28 px-4 py-5">
        <span className="font-bold">Summary: </span>
        <span>{entry.analysis?.summary}</span>
      </div>
      <div className="px-4 py-5">
        <span className="font-bold">Mood: </span>
        <span>{entry.analysis?.mood}</span>
      </div>
    </div>
  );
};

export default EntryCard;

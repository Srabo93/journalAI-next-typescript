import { Analysis, JournalEntry } from "@prisma/client";

type EntryProps = {
  entry: JournalEntry & { analysis?: Analysis };
};

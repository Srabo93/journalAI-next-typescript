import { Analysis, JournalEntry } from "@prisma/client";

type EntryProps = {
  entry: JournalEntry & { analysis?: Analysis };
};

type CustomTooltipProps = {
  label?: string | number | Date;
  payload?: any[];
  active?: boolean;
};

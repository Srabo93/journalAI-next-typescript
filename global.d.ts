import { Analysis, JournalEntry } from "@prisma/client";

type EntryProps = {
  entry: JournalEntry & { analysis?: Analysis };
};

type NavLink = { href: string; label: string };
type NavLinks = NavLink[];
type NavigationProps = {
  links: NavLinks;
};

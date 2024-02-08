"use client";
import { EntryProps } from "@/global";

const Editor = ({ entry }: EntryProps) => {
  return <div>{entry.content}</div>;
};

export default Editor;

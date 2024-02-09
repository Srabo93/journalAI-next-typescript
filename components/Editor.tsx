"use client";
import { EntryProps } from "@/global";
import { updateEntry } from "@/util/api";
import { useState } from "react";
import { useAutosave } from "react-autosave";

const Editor = ({ entry }: EntryProps) => {
  const [value, setValue] = useState(entry.content);
  const [isSaving, setIsSaving] = useState(false);

  useAutosave({
    data: value,
    onSave: async (changedValue) => {
      setIsSaving(true);
      const updated = await updateEntry(entry.id, changedValue);
      setIsSaving(false);
    },
  });

  return (
    <div className="m-5 h-5/6 w-5/6 rounded shadow-lg">
      {isSaving && <div>...saving</div>}
      <textarea
        className="h-full w-full p-8 text-xl"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></textarea>
    </div>
  );
};

export default Editor;

"use client";
import { updateEntry } from "@/actions/journal";
import { EntryProps } from "@/global";
import { Analysis } from "@prisma/client";
import { useState } from "react";
import { useAutosave } from "react-autosave";

const Editor = ({ entry }: EntryProps) => {
  const [value, setValue] = useState(entry.content);
  const [isSaving, setIsSaving] = useState(false);
  const [analysis, setAnalysis] = useState(entry.analysis);

  const { mood, summary, color, negative, subject } = analysis as Analysis;

  const analysisData = [
    { name: "Summary", value: summary },
    { name: "Subject", value: subject },
    { name: "Mood", value: mood },
    { name: "Negative", value: negative ? "True" : "False" },
  ];

  useAutosave({
    data: value,
    onSave: async (changedValue) => {
      setIsSaving(true);
      const data = await updateEntry(entry.id, changedValue);
      setAnalysis(data?.analysis);
      setIsSaving(false);
    },
  });

  return (
    <div className="grid h-full w-full grid-cols-3 gap-2">
      <div className="col-span-2">
        <div className="m-5 h-5/6 w-5/6 rounded shadow-lg">
          {isSaving && <div>...saving</div>}
          <textarea
            className="h-full w-full p-8 text-xl"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      </div>
      <div className="col-span-1 border-l border-black/10">
        <div className="px-6 py-10" style={{ backgroundColor: color }}>
          <h2 className="text-2xl">Analysis</h2>
        </div>
        <div>
          <ul>
            {analysisData.map((item) => (
              <li
                key={item.name}
                className="flex flex-col items-start border-t border-black/10 px-2 py-4"
              >
                <span className="text-lg font-semibold">{item.name}</span>
                <span className="text-md">{item.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Editor;

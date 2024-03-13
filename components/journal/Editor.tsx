"use client";
import { deleteEntry, updateEntry } from "@/actions/journal";
import { EntryProps } from "@/global";
import { Analysis } from "@prisma/client";
import { useState } from "react";
import { useAutosave } from "react-autosave";
import { ImSpinner8 } from "react-icons/im";
import { RxTrash } from "react-icons/rx";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

const Editor = ({ entry }: EntryProps) => {
  const router = useRouter();
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

  const onDeleteHandler = (id: string) => {
    deleteEntry(id);
    router.push("/journal");
    return;
  };

  return (
    <div className="grid h-full w-full grid-cols-3 gap-2">
      <div className="col-span-3 md:col-span-2">
        <div className="rounded shadow-lg sm:h-full sm:w-full md:m-5 md:h-5/6 md:w-5/6">
          {isSaving && (
            <ImSpinner8
              size="3em"
              title="saving entry"
              color="blue"
              className="m-auto my-3 animate-spin"
            />
          )}
          <textarea
            className="h-full w-full p-8 text-xl"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
      </div>
      <div className="col-span-3 border-l  border-black/10 md:col-span-1">
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
            <li className="flex flex-col items-start border-t border-black/10 px-2 py-4">
              <AlertDialog>
                <AlertDialogTrigger>
                  <RxTrash size={50} color="red" />
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Do you want to delete this entry?
                    </AlertDialogTitle>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      color="red"
                      onClick={() => onDeleteHandler(entry.id)}
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Editor;

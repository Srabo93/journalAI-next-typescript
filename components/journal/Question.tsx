"use client";

import { askQuestion } from "@/actions/history";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { ChangeEvent, FormEvent, useState } from "react";

const Question = () => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | undefined>();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const answer = await askQuestion(value);
    setResponse(answer?.data);
    setValue("");
    setLoading(false);
  };

  return (
    <div className="">
      <form
        onSubmit={handleSubmit}
        className="flex max-w-md  flex-col items-center justify-start sm:flex-row sm:justify-between"
      >
        <Input
          onChange={onChange}
          type="text"
          name="question"
          placeholder="Ask a question related to your journal"
          value={value}
          className="mx-4 my-2 rounded-lg border border-black/20 p-2 text-lg"
          disabled={loading}
        />
        <Button
          type="submit"
          disabled={loading}
          className="my-2 w-full rounded-lg px-4 py-2 text-lg sm:w-auto"
        >
          Ask
        </Button>
      </form>
      {loading && (
        <Skeleton className="my-2 h-[300px] w-full rounded-xl bg-gray-400/20" />
      )}
      {response && (
        <div className="my-2 rounded-lg bg-zinc-200/50 p-4 shadow-sm shadow-black/30">
          {response}
        </div>
      )}
    </div>
  );
};

export default Question;

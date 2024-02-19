"use client";

import { askQuestion } from "@/util/api";
import { ChangeEvent, FormEvent, useState } from "react";

const Question = () => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    const answer = await askQuestion(value);
    setResponse(answer);
    setValue("");
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={onChange}
          type="text"
          placeholder="Ask question"
          value={value}
          className="mx-4 rounded-lg border border-black/20 p-2 text-lg"
          disabled={loading}
        />
        <button
          type="submit"
          className="rounded-lg bg-blue-400 px-4 py-2 text-lg"
          disabled={loading}
        >
          Ask
        </button>
      </form>
      {loading && <div>...loading</div>}
      {response && <div>{response}</div>}
    </div>
  );
};

export default Question;

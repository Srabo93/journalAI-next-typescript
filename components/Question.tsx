"use client";

import { ChangeEvent, FormEvent, useState } from "react";

const Question = () => {
  const [value, setValue] = useState("");

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        />
        <button
          type="submit"
          className="rounded-lg bg-blue-400 px-4 py-2 text-lg"
        >
          Ask
        </button>
      </form>
    </div>
  );
};

export default Question;

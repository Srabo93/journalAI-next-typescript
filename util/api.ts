import { Analysis, JournalEntry } from "@prisma/client";

//TODO:Well turns out if using Serveractions u can revalidate routes, guess time to rework this already
const createURL = (path: string) => {
  return window.location.origin + path;
};

export const createNewEntry = async () => {
  const res = await fetch(
    new Request(createURL("/api/journal"), {
      method: "POST",
    }),
  );

  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
};

export const updateEntry = async (
  id: string,
  content: string,
): Promise<(JournalEntry & { analysis?: Analysis }) | undefined> => {
  const res = await fetch(
    new Request(createURL(`/api/journal/${id}`), {
      method: "PATCH",
      body: JSON.stringify({ content }),
    }),
  );

  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
};

export const askQuestion = async (question: string) => {
  const res = await fetch(
    new Request(createURL(`/api/question`), {
      method: "POST",
      body: JSON.stringify({ question }),
    }),
  );

  if (res.ok) {
    const data = await res.json();
    return data.data;
  }
};

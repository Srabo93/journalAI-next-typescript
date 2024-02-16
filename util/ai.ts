import { OpenAI } from "langchain/llms/openai";
import { z } from "zod";

export const analyze = async (prompt) => {
  const model = new OpenAI({ temperature: 0, modelName: "gpt-3.5-turbo" });
  const result = await model.invoke(prompt);
};

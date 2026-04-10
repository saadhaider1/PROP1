import OpenAI from "openai";
import { systemKnowledge } from "../knowledge/systemknowledge.js";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateAIResponse(message) {
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemKnowledge },
      { role: "user", content: message },
    ],
  });

  return completion.choices[0].message.content;
}
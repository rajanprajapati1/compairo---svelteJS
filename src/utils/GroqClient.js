import Groq from "groq-sdk";

const groq1 = new Groq({
  apiKey: `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` || `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`,
});

const groq = new Groq({
    apiKey: `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`,
  });
  
export const GroqClient = async (content) => {
  const res = await groq1.chat.completions.create({
    messages: [
      {
        role: "user",
        content,
      },
    ],
    model: "llama3-8b-8192",
  });
  return res;
};


export const reqGroqAI = async (content) => {
  const res = await groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content,
      },
    ],
    model: "mixtral-8x7b-32768",
  });
  return res;
};
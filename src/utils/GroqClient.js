import Groq from "groq-sdk";

const groq1 = new Groq({
});

const groq = new Groq({
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

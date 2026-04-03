import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

export async function improveReview(review) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `
        You are an expert literary reviewer.

        I will give you a raw book review written by a user. Your task is to improve it.

        Instructions:
        - Keep the original meaning and opinion
        - Rewrite it to sound more clear, engaging, and professional
        - Fix grammar and structure
        - Make it more fluent and natural
        - Do NOT make it longer than necessary
        - Keep it concise (max 150-200 words)
        - Do not add new opinions or information

        Return ONLY the improved review, without explanations.

        Original review:
        ${review}
        `
  });
  console.log(response.text);
}


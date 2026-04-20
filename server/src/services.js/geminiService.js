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

export async function suggestBook(bookData) {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `
        You are an expert literary reviewer.

        I will give you the data of a book that is added to a list of wishes or readings ot the user. Your task is to recommend a new book for the user to read.

        Instructions:
        - Based on the given book data, suggest a similar book that the user might enjoy
        - Consider the genre, themes, writing style, and overall tone of the original book
        - Provide a brief explanation of why you are recommending this book (1-2 sentences)
        - Do NOT suggest books that are too similar or from the same author
        - Do NOT suggest books that are too different or from a completely different genre

        Return only the names of the books each of them separated by a /.
        BookData:
        ${bookData}
        `
  });
  console.log(response.text);
}


import { GoogleGenAI } from "@google/genai";

const obtenerAi = () => new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function sugerirLibro(infoLibro) {
  const ai = obtenerAi();
  const respuesta = await ai.models.generateContent({
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
        ${infoLibro}
        `
  });
  return respuesta.text;
}

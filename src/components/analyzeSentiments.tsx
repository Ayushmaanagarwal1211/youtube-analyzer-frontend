import { GoogleGenerativeAI } from "@google/generative-ai";
interface ImportMetaEnv {
  readonly VITE_GEMINI_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

const GEMINI_API_KEY: string = import.meta.env.VITE_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export const analyzeSentiments = async (comments) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
    Analyze the sentiments of all the comments in an array and return a JSON array of sentiment labels. 
    Each label should be one of these options: "Agree", "Disagree", or "Neutral". 
    Return only the JSON array without any additional text or explanation.
  
    Comments: ${JSON.stringify(comments)}
  `;
    const result = await model.generateContent(prompt);
    let sentimentArray = result.response.text().trim()
    .replace(/[​-‍﻿]/g, '')
    .replace(/\n/g, '')                   
    .replace(/\"/g, '"');                  

const match = sentimentArray.match(/\[.*\]/);
const parsedSentiments = match ? JSON.parse(match[0]) : [];

    return parsedSentiments;
  } catch (error) {
    console.error("Error analyzing sentiment:", error);
    return "Unknown"; 
  }
};
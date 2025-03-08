import React, { useContext } from "react";
import { Context } from "./Context";


const commonWords = new Set<string>([
    "the", "is", "and", "in", "on", "to", "for", "it", "with", "at", "by", "a", "an", "of", 
    "this", "that", "be", "are", "was", "were", "will", "can", "but", "or", "as", "so", "we",
    "you", "I", "me", "my", "our", "us", "your", "their", "they", "them", "she", "he", "him",
    "her", "its", "not", "from", "about", "up", "down", "out", "then", "if", "which", "just",
    "what", "who", "how", "when", "where", "why", "because"
  ]);

const TopKeywords: React.FC = () => {
  const context = useContext(Context);
  if (!context) {
    throw new Error("Context not found. Make sure your Provider wraps this component.");
  }
  const { comments } = context;  const keywordCounts: Record<string, number> = {};

  comments.forEach((comment : any) => {
    comment.comment.split(' ').forEach((word : string) => {
      if (!commonWords.has(word) && word.length > 5 && /^[a-zA-Z]+$/.test(word)) {  
        keywordCounts[word] = (keywordCounts[word] || 0) + 1;
      }
    });
  });

  let arr: [string, number][] = [];
  for (let word in keywordCounts) {
    arr.push([word, keywordCounts[word]]);
  }

  arr = arr.slice(0, 30).sort((a, b) => b[1] - a[1]);

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Top Keywords</h3>
      <div className="flex flex-wrap gap-2">
        {arr.map(([word, count], index) => (
          <span key={index} className="bg-gray-700 px-3 py-1 rounded-lg text-sm">
            {word} ({count})
          </span>
        ))}
      </div>
    </div>
  );
};

export default TopKeywords;
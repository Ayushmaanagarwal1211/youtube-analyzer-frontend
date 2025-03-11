import React, { useContext } from "react";
import { Context } from "./Context";

const SentimentDistribution: React.FC = () => {
    const { sentiments } = useContext(Context);

    const distribution: Record<string, number> = {
        "agree": 0,
        "disagree": 0,
        "neutral": 0
    };

    if (sentiments && sentiments instanceof Array) {
        sentiments.forEach(sentiment => {
            const key = sentiment.toLowerCase();
            if (distribution.hasOwnProperty(key)) {
                distribution[key]++;
            }
        });
    }

    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Sentiment Distribution</h3>
            <div className="space-y-2">
                {Object.entries(distribution).map(([key, value]) => (
                    <div key={key}>
                        <div className="flex justify-between text-sm">
                            <span>{key.charAt(0).toUpperCase() + key.slice(1)} {value}</span>
                            <span>{((value / Math.max(sentiments.length, 1)) * 100).toFixed(2)}%</span>
                        </div>
                        <div className="w-full bg-gray-700 h-2 rounded">
                            <div 
                                className={`h-2 rounded transition-all duration-600 ease-in ${
                                    key === "agree" ? "bg-green-500" : key === "disagree" ? "bg-red-500" : "bg-blue-500"
                                }`} 
                                style={{ width: `${((value / Math.max(sentiments.length, 1)) * 100)}%` }}
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SentimentDistribution;

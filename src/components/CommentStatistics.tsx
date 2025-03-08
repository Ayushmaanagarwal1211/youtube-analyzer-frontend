import React, { useContext } from "react";
import { Context } from "./Context";

const CommentStatistics = () => {
  const {sentiments} = useContext(Context)
  const distribution = {
    "agree" : 0,
    "disagree" : 0,
    "neutral" : 0
}
sentiments.map(sentiment=>distribution[sentiment.toLowerCase()]++)
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold mb-4">Comment Statistics</h3>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-700 p-4 rounded-lg">
          <p className="text-sm text-gray-400">Total Comments</p>
          <p className="text-2xl font-bold">{sentiments.length}</p>
        </div>

        <div className="bg-green-900 p-4 rounded-lg">
          <p className="text-sm text-gray-300">Agree</p>
          <p className="text-2xl font-bold text-green-400">{distribution.agree}</p>
        </div>

        <div className="bg-red-900 p-4 rounded-lg">
          <p className="text-sm text-gray-300">Disagree</p>
          <p className="text-2xl font-bold text-red-400">{distribution.disagree}</p>
        </div>

        <div className="bg-blue-900 p-4 rounded-lg">
          <p className="text-sm text-gray-300">Neutral</p>
          <p className="text-2xl font-bold text-blue-400">{distribution.neutral}</p>
        </div>
      </div>
    </div>
  );
};

export default CommentStatistics;

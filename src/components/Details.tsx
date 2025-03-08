import React from "react";
import SentimentDistribution from "./SentimentDistribution";
import CommentStatistics from "./CommentStatistics";
import MonthlyDistribution from "./MonthlyDistribution";
import TopKeywords from "./TopKeywords";
import ExportCsv from "./ExportCsv";
import YoutubeContext from "./Context";

const Details: React.FC = () => {
  return (
    <YoutubeContext>
      <div className="min-h-screen bg-gray-900 text-white p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold">Analysis Results</h2>
          <ExportCsv />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <SentimentDistribution />
          <CommentStatistics />
          <MonthlyDistribution />
          <TopKeywords />
        </div>
      </div>
    </YoutubeContext>
  );
};

export default Details;

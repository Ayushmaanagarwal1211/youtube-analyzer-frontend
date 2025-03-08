import React, { useState } from "react";
import { Link } from "react-router";

const YoutubeAnalyzer: React.FC = () => {
  const [videoUrl, setVideoUrl] = useState<string>("");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-blue-100">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-96">
        <h2 className="text-xl font-semibold text-center text-purple-700 mb-4">
          YouTube Comments Analyzer
        </h2>

        <label className="block text-gray-700 text-sm mb-2">YouTube Video URL</label>
        <input
          type="text"
          placeholder="https://youtube.com/watch?v=..."
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />

        <Link
          to={`/details/${videoUrl && videoUrl.split("=")[1].trim()}`}
          className="mt-4 w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition duration-300 flex items-center justify-center"
        >
          Analyze Comments →
        </Link>
      </div>
    </div>
  );
};

export default YoutubeAnalyzer;

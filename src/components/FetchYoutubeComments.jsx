import axios from "axios";

const API_KEY = "AIzaSyBVuceVgTNrE6BemuIXcs6g3OWhUvEtrPQ";
const BASE_URL = "https://www.googleapis.com/youtube/v3/commentThreads";




export const fetchYouTubeComments = async (videoId) => {
  let comments = [];
  let totalComments = 0;
  let nextPageToken = null;
  let monthlyCommentCounts = {}; // Track monthly counts

  try {
      const response = await axios.get(BASE_URL, {
        params: {
          part: "snippet",
          videoId: videoId,
          key: API_KEY,
          maxResults: 50,
        },
      });

      if (totalComments === 0) {
        totalComments = response.data.pageInfo.totalResults;
      }

      const newComments = await Promise.all(
        response.data.items.map(async (item) => {
          const username = item.snippet.topLevelComment.snippet.authorDisplayName;
          const commentText = item.snippet.topLevelComment.snippet.textDisplay;
          const publishedAt = item.snippet.topLevelComment.snippet.publishedAt;
          const commentId = item.id;

          // Extract month & year from timestamp
          const date = new Date(publishedAt);
          const monthYear = `${date.toLocaleString("default", { month: "short" })} ${date.getFullYear()}`;

          monthlyCommentCounts[monthYear] = (monthlyCommentCounts[monthYear] || 0) + 1;
            axios.post(`http://localhost:5000/comment/${commentId}`,{
               username, comment: commentText, publishedAt
            })

          return { username, comment: commentText, publishedAt,commentId };
        })
      );

      comments = [...comments, ...newComments];
      nextPageToken = response.data.nextPageToken;
    
console.log('sdddddddddd')
    // Convert monthly data to an array sorted by date
    const monthlyData = Object.entries(monthlyCommentCounts)
      .map(([month, count]) => ({ month, count }))
      .sort((a, b) => new Date(a.month) - new Date(b.month));

    return { comments, totalComments, monthlyData };
  } catch (error) {
    console.error("Error fetching YouTube comments:", error);
    return { comments: [], totalComments: 0, monthlyData: [] };
  }
};

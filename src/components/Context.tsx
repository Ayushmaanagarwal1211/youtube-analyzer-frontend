import React, { useState, useEffect, ReactNode } from "react";
import { useParams } from "react-router";
import { analyzeSentiments } from "./analyzeSentiments";
import axios from "axios";
import { comment } from "postcss";

interface ContextType {
  comments: Comment[];
  monthlyData: any[]; 
  sentiments: string[];
}

export const Context = React.createContext<ContextType | undefined>(undefined);

interface YoutubeContextProps {
  children: ReactNode;
}

const YoutubeContext: React.FC<YoutubeContextProps> = ({ children }) => {
  const [comments, setComments] = useState([]);
  const [monthlyData, setMonthlyData] = useState<any[]>([]);
  const [sentiments, setSentiments] = useState<string[]>([]);
  const params = useParams<{ url: string }>();

  async function fetchData() {
    const comments = []
    let lastIndex = 0
    try {
        const response = await fetch(`https://youtube-analyzer-backend-12.onrender.com/youtube/comments/${params.url}`);

        if (!response.body) {
            throw new Error('No response body');
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder(); 


        let partialData = '';
        while (true) {
            const { value, done } = await reader.read();
            if (done){
                console.log(comments,"COMMENTTTTTT")
                let text = comments.map(comment=>comment.comment)
                console.log(text,"TEXTXXXX")
                analyzeSentiments(text).then(res=>{console.log(res,"REESPONSSSSS");
                    setSentiments(res)
                });
                break};

            partialData += decoder.decode(value, { stream: true });

             // ✅ Improved JSON extraction logic
    const jsonMatches = partialData.match(/\{.*?\}/g); // Extracts full JSON objects
    if (jsonMatches) {
        jsonMatches.forEach((chunk) => {
            try {
                const parsedData = JSON.parse(chunk);
                // ✅ Separate data storage logic

                if (parsedData.username) {
                    setComments((prev) => [...prev, parsedData]);
                    comments.push(parsedData)
                    lastIndex = comments.length-1
                }
                else {
                    console.log(parsedData,"MONTHKLY DATAAA")
                    setMonthlyData((prev) => [...prev, parsedData]);
                }
                // if (parsedData.totalComments) {
                //     setTotalComments(parsedData.totalComments); // Only need to set this once
                // }
            } catch (e) {
                console.warn('Invalid JSON chunk:', chunk);
            }
        });

        // ✅ Clear processed data from `partialData`
        partialData = partialData.slice(partialData.lastIndexOf('}') + 1);
    }

            // Keep the last incomplete chunk to be processed in the next iteration
        }
    } catch (err) {
        console.error('Error fetching comments:', err);
        // setError('Failed to fetch comments.');
    } finally {
        // setLoading(false);
    }
    // try {
    //   const result = await axios.get(`http://localhost:5000/youtube/comments/${params.url}`);
    //   setComments(result.data.comments);
    //   setMonthlyData(result.data.monthlyData);
    //   analyzeSentiments(result.data.comments).then(setSentiments);
    // } catch (error) {
    //   console.error("Error fetching data:", error);
    // }
  }

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <Context.Provider value={{ comments, monthlyData, sentiments }}>
      {children}
    </Context.Provider>
  );
};

export default YoutubeContext;

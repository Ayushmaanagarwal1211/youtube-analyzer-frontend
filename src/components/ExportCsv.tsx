import React, { useContext } from 'react';
import { Context } from './Context';

interface Comment {
    commentId: string;
    username: string;
    comment: string;
    publishedAt: string;
}

const ExportCsv: React.FC = () => {
    const { comments  } = useContext(Context) ?? { comments: [] };

    const handleExportCSV = () => {
        if (!comments || comments.length === 0) {
            alert("No comments available to export.");
            return;
        }

        let csv = "Comment_ID,Username,Comment,Published_At\n";
        comments.forEach((comment: Comment) => {
            csv += `"${comment.commentId}","${comment.username}","${comment.comment.replace(/"/g, '""')}","${comment.publishedAt}"\n`;
        });

        const blob = new Blob([csv], { type: "text/csv" });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "youtube_comments.csv";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    };

    return (
        <button 
            onClick={handleExportCSV} 
            className="bg-purple-600 px-4 py-2 rounded-lg text-sm hover:bg-purple-700 flex items-center"
        >
            📥 Export CSV
        </button>
    );
};

export default ExportCsv;

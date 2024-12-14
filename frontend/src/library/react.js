import { create } from "zustand";

export const useReact = create((set) => ({
    react: false,
    setReact: (bool) => set({ react: bool }),
    createReportReact: async (reportreact) => {
        try {
            const response = await fetch("http://localhost:3000/react/report/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(reportreact),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }  
    },
    deleteReportReact: async (rprt_id, ctzn_id) => {
        try {
            await fetch(`http://localhost:3000/react/report/${rprt_id}/citizen/${ctzn_id}`, {
                method: "DELETE",
            });
            
        } catch (error) {
            console.error(error);
        }
    },
    createCommentReact: async (commentreact) => {
        try {
            const response = await fetch("http://localhost:3000/react/comment/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(commentreact),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    },
    deleteCommentReact: async (comment_id, ctzn_id) => {
        try {
            await fetch(`http://localhost:3000/react/comment/${comment_id}/citizen/${ctzn_id}`, {
                method: "DELETE",
            });
            
        } catch (error) {
            console.error(error);
        }
    },
}));
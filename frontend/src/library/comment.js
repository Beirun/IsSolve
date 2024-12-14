import { create } from "zustand";

export const useComment = create((set) => ({
    comments: [],
    setComments: (comments) => set({ comments }),
    getReportComments: async (id,ctzn_id) => {
        try {
            const response = await fetch(`http://localhost:3000/comment/report/${id}/citizen/${ctzn_id}`);
            const data = await response.json();
            set((state) => ({ comments: data }));
            return data;
        } catch (error) {
            console.error(error);
        }
    },
    createComment: async (comment) => {
        try {
            const response = await fetch("http://localhost:3000/comment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(comment),
            });
            const data = await response.json();
            set((state) => ({ comments: [...state.comments, data] }));
            return data;
        } catch (error) {
            console.error(error);
        }
    },
}))
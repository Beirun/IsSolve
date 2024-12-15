import {create} from "zustand";

export const useReport = create((set) => ({
    reports: [],
    setReports: (reports) => set({ reports: reports }),
    createReport: async (citizen) => {
        try {
            const response = await fetch("http://localhost:3000/report", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(citizen),
            });
            const data = await response.json();
            set((state) => ({ reports: [...state.reports, data] }));
            return data;
        } catch (error) { 
            console.error(error);
        }
    },
    getIssueTypeCount: async () => {
        try {
            const response = await fetch(`http://localhost:3000/report/count/type`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    },
    getIssueStatusCount: async () => {
        try {
            const response = await fetch(`http://localhost:3000/report/count/status`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    },
    getReportCount: async () => {
        try {
            const response = await fetch(`http://localhost:3000/report/count/report`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    },
    getAllReports: async () => {
        try {
            const response = await fetch(`http://localhost:3000/report`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    },
    getUserReports: async (id) => {
            try {
                const response = await fetch(`http://localhost:3000/report/${id}`);
                const data = await response.json();
                return data;
            } catch (error) {
                console.error(error);
            }
        },
    getReports: async () => {
        try {
            const response = await fetch(`http://localhost:3000/report`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    },

    getViewReport: async (id, ctzn_id) => {
        try {
            const response = await fetch(`http://localhost:3000/report/view/${id}/citizen/${ctzn_id}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    },
    
    getReportLocation: async (latitude, longitude) => {
        try {
            const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
            const response = await fetch(url);
            const data = await response.json();
            return data;

          } catch (error) {
            console.error('Error fetching address:', error);
          }
    },
    getRecentReports: async () => {
        try {
            const response = await fetch(`http://localhost:3000/report/recent`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    },
    getTrendingReport: async () => {
        try {
            const response = await fetch(`http://localhost:3000/report/trending`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    },
}));
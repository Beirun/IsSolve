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
    getUserReports: async (id) => {
            try {
                const response = await fetch(`http://localhost:3000/report/${id}`);
                const data = await response.json();
                console.log('data',data)
                const promises = data.map((report) => {
                    const { latitude, longitude } = report;
                    const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
                    return fetch(url)
                      .then((response) => response.json())
                      .then((data) => data.display_name.split(', '))
                      .then((location) => ({ ...report, location }));
                });
                const dataWithLocation = await Promise.all(promises);
                set((state) => ({ reports: dataWithLocation }));
                console.log('dataWithLocation',dataWithLocation)
                return dataWithLocation;
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
    getReportLocation: async (report) => {
        try {
            const { latitude, longitude } = report;
            const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
            const response = await fetch(url);
            const data = await response.json();
            return data.display_name.split(', ');
          } catch (error) {
            console.error('Error fetching address:', error);
          }
    }
}));
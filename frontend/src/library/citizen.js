import {create} from "zustand";

export const useCitizen = create((set) => ({
    citizens: [],
    setCitizens: (citizens) => set({ citizens }),
    getCitizens: async () => {
        try {
            const response = await fetch("http://localhost:3000/citizen");
            const data = await response.json();
            set({ citizens: data });
        } catch (error) {
            console.error(error);
        }
    },
    createCitizen: async (citizen) => {
        try {
            const response = await fetch("http://localhost:3000/citizen", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(citizen),
            });
            const data = await response.json();
            set((state) => ({ citizens: [...state.citizens, data] }));
            return data;
        } catch (error) { 
            console.error(error);
        }
    },
    updateCitizen: async (citizen) => {
        try {
            const response = await fetch(`http://localhost:3000/citizen/${citizen.ctzn_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(citizen),
            });
            const data = await response.json();
            set((state) => ({
                citizens: state.citizens.map((c) => (c.ctzn_id === data.ctzn_id ? data : c)),
            }));
            return data;
        } catch (error) {
            console.error(error);
        }
    },
    deleteCitizen: async (id) => {
        try {
            await fetch(`http://localhost:3000/citizen/${id}`, {
                method: "DELETE",
            });
            set((state) => ({
                citizens: state.citizens.filter((c) => c.ctzn_id !== id),
            }));
        } catch (error) {
            console.error(error);
        }
    },
    getCitizenEmail: async (email) => {
        try {
            if (!email) {
                return null;
            }
            const response = await fetch(`http://localhost:3000/citizen/email/${email}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    },
    getCitizenUsername: async (username) => {
        try {
            if (!username) {
                return null;
            }
            const response = await fetch(`http://localhost:3000/citizen/username/${username.toLowerCase()}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
            console.error(error);
        }
    },
}));
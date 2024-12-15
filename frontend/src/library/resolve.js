import { create } from "zustand";


export const useResolve = create((set) => ({
    resolve: false,
    setResolve: (value) => set({ resolve: value }),
    getResolve: async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/resolve/${id}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    },
    updateReport: async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/resolve/update/${id}`, {
                method: "PUT",
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    },
    resolveReport: async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/resolve/resolve/${id}`, {
                method: "PUT",
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    },
    addResolve: async (resolve) => {
        try {
            const response = await fetch("http://localhost:3000/resolve/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(resolve),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    }
}));
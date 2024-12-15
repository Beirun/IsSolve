import {create } from "zustand";

export const useReset = create((set) => ({
    reset: false,
    setReset: (bool) => set({ reset: bool }),
    sendVerificationCode: async (email) => {
        try {
            const response = await fetch("http://localhost:3000/reset/send", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(email),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    },
    resetPassword: async (email,password) => {
        try {
            const response = await fetch(`http://localhost:3000/reset/email/${email}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(password),
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
        }
    },
}));
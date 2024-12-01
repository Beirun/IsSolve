import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCurrent = create(persist((set) => ({
    signedIn : false,
    setSignedIn: (bool) => set({ signedIn: bool}),
    isAdmin: false,
    setAdmin: (bool) => set({ isAdmin: bool }),
})));
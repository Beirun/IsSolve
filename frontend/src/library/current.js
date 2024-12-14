import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCurrent = create(persist((set) => ({
    signedInAccount: null,
    setSignedInAccount: (account) => set({ signedInAccount: account }),
    isAdmin: false,
    setAdmin: (bool) => set({ isAdmin: bool }),
})));
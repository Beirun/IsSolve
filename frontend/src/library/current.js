import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCurrent = create(persist((set) => ({
    signedInAccount: null,
    setSignedInAccount: (account) => set({ signedInAccount: account }),
    isAdmin: false,
    setIsAdmin: (bool) => set({ isAdmin: bool }),
    signUpClicked: false,
    setSignUpClicked: (bool) => set({ signUpClicked: bool }),
})));
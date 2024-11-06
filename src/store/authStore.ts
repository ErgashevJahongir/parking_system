import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { IUser } from "@/types";

interface AuthState {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  token: string | null;
  setToken: (token: string | null) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token: token }),
    }),
    {
      name: "cpm-admin",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

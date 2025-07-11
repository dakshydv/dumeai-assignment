import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "next-auth";

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
  setIsAuthenticated: (auth: boolean) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: true }),
      clearUser: () => set({ user: null, isAuthenticated: false }),
      setIsAuthenticated: (auth) =>
        set((state) => ({
          isAuthenticated: auth,
          user: auth ? state.user : null,
        })),
    }),
    {
      name: "user-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

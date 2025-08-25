import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppState {
  isOnline: boolean;
  queue: Array<{ url: string; data: any }>; // Cola offline

  setOnline: (online: boolean) => void;
  addToQueue: (item: { url: string; data: any }) => void;
  clearQueue: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      isOnline: true,
      queue: [],

      setOnline: (online) => set({ isOnline: online }),
      addToQueue: (item) => set((state) => ({ queue: [...state.queue, item] })),
      clearQueue: () => set({ queue: [] }),
    }),
    { name: "app-storage" }
  )
);

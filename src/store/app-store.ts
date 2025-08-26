import { create } from "zustand";
import { persist } from "zustand/middleware";

interface QueueItem<T = Record<string, unknown>> {
	url: string;
	data: T;
}

interface AppState {
	isOnline: boolean;
	queue: Array<QueueItem>;

	setOnline: (online: boolean) => void;
	addToQueue: <T = Record<string, unknown>>(item: QueueItem<T>) => void;
	clearQueue: () => void;
}

export const useAppStore = create<AppState>()(
	persist(
		(set) => ({
			isOnline: true,
			queue: [],

			setOnline: (online) => set({ isOnline: online }),
			addToQueue: <T = Record<string, unknown>>(item: QueueItem<T>) =>
				set((state) => ({
					queue: [...state.queue, item as QueueItem],
				})),
			clearQueue: () => set({ queue: [] }),
		}),
		{ name: "app-storage" },
	),
);

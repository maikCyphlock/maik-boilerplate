"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { type ReactNode, useState } from "react";
import type { QueryClientConfig } from "@tanstack/react-query";
const QueryConfiguration:QueryClientConfig = {
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			retry: 2,
			staleTime: 1000 * 60, // 1 minuto
			gcTime: 5 * 60 * 1000, // 5 minutos
			
		},
		mutations: {
			retry: false, // No se puede hacer retry de mutations
		},
	},
};

export function ReactQueryProvider({ children }: { children: ReactNode }) {
	const [queryClient] = useState(() => new QueryClient(QueryConfiguration));

	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	);
}

'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const QueryConfiguration = {
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 2,
            staleTime: 1000 * 60, // 1 minuto
        },
        mutations: {
            retry: 1,
        },
    }
}


export function ReactQueryProvider({ children }: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient(QueryConfiguration));

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}

📂 Estructura de carpetas
src/
 ├─ app/                # Rutas Next.js App Router
 │   ├─ layout.tsx
 │   └─ page.tsx
 │
 ├─ lib/
 │   ├─ queryClient.ts  # Configuración de TanStack Query
 │   └─ zustand/        # Stores de Zustand
 │       └─ appStore.ts
 │
 ├─ hooks/
 │   ├─ useAuth.ts      # Ejemplo de hook auth
 │   └─ useOfflineQueue.ts # Hook para cola offline
 │
 ├─ services/           # Funciones fetch/axios centralizadas
 │   └─ api.ts
 │
 └─ utils/
     └─ index.ts

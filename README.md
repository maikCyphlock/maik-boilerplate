# Maik Boilerplate

Un boilerplate moderno para aplicaciones web construido con Next.js, TypeScript, y las últimas tecnologías del ecosistema React.

## Tecnologías Principales

- **Next.js 15** - Framework React con renderizado híbrido
- **TypeScript** - Tipado estático para JavaScript
- **Tailwind CSS** - Framework CSS utility-first
- **React Query** - Manejo de estado del servidor y caché
- **Zustand** - Gestión de estado global
- **React Hook Form** - Manejo de formularios
- **Zod** - Validación de esquemas
- **Axios** - Cliente HTTP

## Requisitos Previos

- Node.js 18+
- npm o pnpm o yarn

## Instalación

1. Clona el repositorio:
   ```bash
   git clone [URL_DEL_REPOSITORIO]
   cd maik-boilerplate
   ```

2. Instala las dependencias:
   ```bash
   npm install
   # o
   pnpm install
   # o
   yarn install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   # o
   pnpm dev
   # o
   yarn dev
   ```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## Estructura del Proyecto

```
maik-boilerplate/
├── public/            # Archivos estáticos
├── src/
│   ├── app/           # Rutas de la aplicación (App Router)
│   │   ├── api/       # Rutas de la API
│   │   └── ...        # Otras páginas
│   ├── components/    # Componentes reutilizables
│   ├── hooks/         # Custom hooks
│   ├── lib/           # Utilidades y configuraciones
│   │   └── api/       # Configuración de API
│   ├── services/      # Lógica de negocio y llamadas a API
│   └── store/         # Estado global con Zustand
├── .eslintrc.js       # Configuración de ESLint
├── next.config.js     # Configuración de Next.js
├── package.json       # Dependencias y scripts
└── tsconfig.json      # Configuración de TypeScript
```

## Manejo de Estado

### Estado del Servidor (React Query)
Para manejar datos del servidor, el boilerplate utiliza React Query. Ejemplo de uso:

```typescript
import { useQuery } from '@tanstack/react-query';

function Todos() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['todos'],
    queryFn: () => fetch('/api/todos').then(res => res.json())
  });
  
  // Renderizar datos...
}
```

### Estado Global (Zustand)
Para estado global compartido entre componentes:

```typescript
import { create } from 'zustand';

interface Store {
  count: number;
  increment: () => void;
}

const useStore = create<Store>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

// Uso en componentes
function Counter() {
  const { count, increment } = useStore();
  return <button onClick={increment}>{count}</button>;
}
```

## Formularios

El boilerplate incluye React Hook Form con validación Zod:

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
});

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} />
      {errors.email && <span>{errors.email.message}</span>}
      
      <input type="password" {...register('password')} />
      {errors.password && <span>{errors.password.message}</span>}
      
      <button type="submit">Iniciar sesión</button>
    </form>
  );
}
```

## Comandos Útiles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm start` - Inicia la aplicación en producción
- `npm run lint` - Ejecuta ESLint

## Despliegue

Puedes desplegar este boilerplate en cualquier plataforma que soporte Node.js, como:

- [Vercel](https://vercel.com/)
- [Netlify](https://www.netlify.com/)
- [Railway](https://railway.app/)
- O cualquier otro proveedor de hosting Node.js

## Licencia

Este proyecto está bajo la licencia MIT. Ver el archivo `LICENSE` para más detalles.

"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getTodos, addTodo } from "@/services/example/api";
import {toast} from 'sonner'

export default function Home() {
  const queryClient = useQueryClient();
  const [input, setInput] = useState("");

  const { data: todos, isLoading, error } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: addTodo,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
    onError: (err: Error) => {
      console.error(err.message)
      toast.error(err.message)
    },
    
  });

  if (isLoading) return <p className="text-gray-500">Cargando...</p>;
  if (error) return <p className="text-red-500">❌ Error cargando tareas {error.message}</p>;

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center p-8">
      <div className="w-full max-w-lg">
        <h1 className="text-3xl font-serif font-semibold text-center text-gray-900 tracking-tight mb-6">
          Mis Tareas
        </h1>

        {/* Lista de tareas */}
        <ul className="space-y-2">
          {todos?.map((t: any) => (
            <li
              key={t.id}
              className="bg-white rounded-2xl px-4 py-3 shadow-sm border border-gray-200 flex items-center justify-between hover:shadow-md transition"
            >
              <span className="text-gray-800">{t.text}</span>
            </li>
          ))}
        </ul>

        {/* Input y botón */}
        <div className="mt-6 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe una tarea..."
            className="flex-1 px-4 py-2 rounded-xl border border-gray-300 bg-white/70 text-black shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <button
            onClick={() => {
              if (!input.trim()) return;
              mutate({ text: input });
              setInput("");
            }}
            type="button"
            disabled={isPending}
            className="px-5 py-2 rounded-xl bg-gradient-to-b from-blue-500 to-blue-600 text-white shadow-md hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 transition font-serif font-extrabold"
          >
            {isPending ? "Agregando…" : "Agregar"}
          </button>
        </div>

      </div>
    </main>
  );
}

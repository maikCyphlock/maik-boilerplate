"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getTodos, addTodo } from "@/services/example/api";
import { toast } from "sonner";

export default function Home() {
	const queryClient = useQueryClient();
	const [input, setInput] = useState("");

	const {
		data: todos,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["todos"],
		queryFn: getTodos,
	});

	const { mutate, isPending } = useMutation({
		mutationFn: addTodo,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
		//
		onError: (err: Error | unknown) => {
			if (err instanceof Error) {
				console.error(err.message);
				toast.error(err.message);
			}
		},
	});

	if (isLoading) return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-white">
      <div className="bg-white/80 rounded-3xl shadow-2xl px-10 py-12 flex flex-col items-center max-w-md w-full animate-pulse">

        <ul className="space-y-3 w-full mb-8">
          {[...Array(4)].map((id) => (
            <li key={id} className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-200 rounded-full" />
              <div className="flex-1 h-4 bg-gray-200 rounded" />
            </li>
          ))}
        </ul>
        <div className="flex gap-2 w-full">
          <div className="flex-1 h-10 bg-gray-200 rounded-xl" />
          <div className="w-24 h-10 bg-gray-200 rounded-xl" />
        </div>
      </div>
    </div>
  );
  
	if (error)
		return (
			<div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-red-100 to-red-300">
				<div className="bg-white/80 rounded-3xl shadow-2xl px-10 py-12 flex flex-col items-center max-w-md">
					<span className="text-6xl mb-4 animate-bounce">❌</span>
					<h2 className="text-3xl font-bold text-red-700 mb-2 font-serif text-center">¡Ups! Ocurrió un error</h2>
					<p className="text-lg text-red-600 mb-4 text-center">No se pudieron cargar tus tareas.</p>
					{error?.message && (
						<p className="text-sm text-gray-700 bg-red-200 rounded-lg px-4 py-2 mb-4 text-center">
							{error.message}
						</p>
					)}
					<button
						onClick={() => window.location.reload()}
            type="button"
						className="mt-2 px-6 py-2 rounded-xl bg-gradient-to-b from-red-500 to-red-700 text-white font-semibold shadow hover:from-red-600 hover:to-red-800 transition"
					>
						Reintentar
					</button>
				</div>
			</div>
		);

	return (
		<main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center p-8">
			<div className="w-full max-w-lg">
				<h1 className="text-3xl font-serif font-semibold text-center text-gray-900 tracking-tight mb-6">
					Mis Tareas
				</h1>

				{/* Lista de tareas */}
				<ul className="space-y-2">
					{todos?.map((t: { id: string; text: string }) => (
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

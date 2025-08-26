// lib/api/steps.ts
import type { PipeStep } from "./pipe";
import { createClient } from "@/lib/supabase/server";
import { AuthError } from "@supabase/supabase-js";
interface TodoRequestBody {
	text: string;
}

const supabaseServerClient = createClient();

// Valida que haya body
export const requireBody: PipeStep = async (ctx) => {
	const body = await ctx.req.json().catch(() => null);
	if (!body) throw new Error("Missing body");
	return { ...ctx, body };
};

// Autenticación básica
export const requireAuth: PipeStep = async (ctx) => {
	const { data: user, error } = await (
		await supabaseServerClient
	).auth.getUser();

	if (error) {
		if (
			error instanceof AuthError &&
			error.message === "Auth session missing!"
		) {
			throw new Error("Unauthorized", {
				cause: {
					status: 401,
				},
			});
		}
		console.error(error);
		throw new Error(error.message);
	}
	if (!user) {
		throw new Error("Unauthorized", { cause: { status: 401 } });
	}
	return { ...ctx, user };
};

const todos: Array<{ id: number; text: string }> = [
	{ id: 1, text: "Aprender React Query" },
];
// Lógica de negocio
export const createTodo: PipeStep = async (ctx) => {
	const body = ctx.body as TodoRequestBody;
	const { text } = body;
	if (!text) throw new Error("Text is required");

	// Aquí podrías llamar a DB
	const newTodo = { id: Date.now(), text };
	todos.push(newTodo);
	return { ...ctx, result: newTodo };
};

export const getTodos: PipeStep = async (ctx) => {
	return { ...ctx, data: todos };
};

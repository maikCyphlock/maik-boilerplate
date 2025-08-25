// lib/api/steps.ts
import type {  PipeStep } from "./pipe";

// Valida que haya body
export const requireBody: PipeStep = async (ctx) => {
  const body = await ctx.req.json().catch(() => null);
  if (!body) throw new Error("Missing body");
  return { ...ctx, body };
};

// Autenticación básica
export const requireAuth: PipeStep = async (ctx) => {
  const token = ctx.req.headers.get("authorization");
  if (!token || token !== "Bearer secret") {
    throw { message: "Unauthorized", status: 401 };
  }
  return ctx;
};


const todos = [{ id: 1, text: 'Aprender React Query' }];
// Lógica de negocio
export const createTodo: PipeStep = async (ctx) => {
  const { text } = ctx.body;
  if (!text) throw new Error("Text is required");

  // Aquí podrías llamar a DB
  const newTodo = { id: Date.now(), text };
  todos.push(newTodo);

  return { ...ctx, data: newTodo };
};

export const getTodos: PipeStep = async (ctx) => {
    return {...ctx, data:todos}
}
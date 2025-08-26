import { api } from "../api.conf";


// GET: obtener todos los todos
export async function getTodos() {
  const { data } = await api.get("/todos");
  return data;
}

// POST: crear un nuevo todo
export async function addTodo(todo: { text: string }) {
  const { data } = await api.post("/todos", todo);
  return data;
}
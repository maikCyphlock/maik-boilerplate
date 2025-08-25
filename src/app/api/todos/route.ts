import type { NextRequest} from 'next/server';
import { runPipeline } from '@/lib/api/pipe';
import { createTodo, getTodos, requireAuth, requireBody } from '@/lib/api/step';



export async function GET(req:NextRequest) {
  return runPipeline({req}, [
    getTodos
  ]);
}

export async function POST(req:NextRequest) {
  return runPipeline({ req }, [
    requireBody,
    requireAuth,
    createTodo,
  ]);
}
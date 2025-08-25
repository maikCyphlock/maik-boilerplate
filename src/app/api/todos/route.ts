import { runPipeline } from '@/lib/api/pipe';
import { createTodo, getTodos, requireAuth, requireBody } from '@/lib/api/step';
import { NextRequest} from 'next/server';



export async function GET(req:NextRequest) {
  return runPipeline({req}, [
    getTodos
  ]);
}

export async function POST(req:NextRequest) {
  return runPipeline({ req }, [
    requireBody,
    createTodo,
  ]);
}
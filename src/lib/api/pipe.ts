// lib/api/pipe.ts
import  { type NextRequest, NextResponse } from "next/server";

export type PipeContext<T = unknown, B = unknown> = {
  req: NextRequest;
  body?: B;
  data?: T; // para pasar información entre pasos
};

export type PipeStep<T = unknown, B = unknown> = (
  ctx: PipeContext<T, B>
) => Promise<PipeContext<T, B>>;

export async function runPipeline<T, B>(
  ctx: PipeContext<T, B>,
  steps: PipeStep<T, B>[]
): Promise<NextResponse> {
  try {
    let current = ctx;
    for (const step of steps) {
      current = await step(current);
    }
    return NextResponse.json(current.data ?? { ok: true });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    const status = error && typeof error === 'object' && 'status' in error && typeof error.status === 'number' 
      ? error.status 
      : 500;
      
    return NextResponse.json(
      { error: message },
      { status }
    );
  }
}

// lib/api/pipe.ts
import type { NextRequest, NextResponse } from "next/server";

export type PipeContext<T = any> = {
  req: NextRequest;
  body?: any;
  data?: T; // para pasar información entre pasos
};

export type PipeStep<T = any> = (
  ctx: PipeContext<T>
) => Promise<PipeContext<T>>;

export async function runPipeline<T>(
  ctx: PipeContext<T>,
  steps: PipeStep<T>[]
): Promise<NextResponse> {
  try {
    let current = ctx;
    for (const step of steps) {
      current = await step(current);
    }
    return NextResponse.json(current.data ?? { ok: true });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message ?? "Internal Server Error" },
      { status: error.status ?? 500 }
    );
  }
}

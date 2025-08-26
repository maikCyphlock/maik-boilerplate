import type { NextRequest } from "next/server";
import { runPipeline } from "@/lib/api/pipe";
import {  requireAuth } from "@/lib/api/step";

export async function GET(req: NextRequest) {
	return runPipeline({ req }, [
        
    ]);
}

export async function POST(req: NextRequest) {
	return runPipeline({ req }, [ requireAuth]);
}

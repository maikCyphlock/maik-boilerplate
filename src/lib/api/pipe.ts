// lib/api/pipe.ts
import { type NextRequest, NextResponse } from "next/server";

export type PipeContext<T = unknown, B = unknown> = {
	req: NextRequest;
	body?: B;
	data?: T; // para pasar información entre pasos
};

export type PipeStep<T = unknown, B = unknown> = (
	ctx: PipeContext<T, B>,
) => Promise<PipeContext<T, B>> | Promise<never>;

export async function runPipeline<T, B>(
	ctx: PipeContext<T, B>,
	steps: PipeStep<T, B>[],
): Promise<NextResponse> {
	try {
		let current = ctx;
		for (const step of steps) {
			current = await step(current);
		}
		return NextResponse.json(current.data ?? { ok: true });
	} catch (error: unknown) {
		// Handle different error types
		if (error instanceof Error) {
			// Handle standard Error instances
			const status =
				"cause" in error &&
				typeof error.cause === "object" &&
				error.cause &&
				"status" in error.cause &&
				typeof error.cause.status === "number"
					? error.cause.status
					: 500;

			// Log the full error in development
			if (process.env.NODE_ENV === "development") {
				console.error("Pipeline Error:", {
					message: error.message,
					name: error.name,
					stack: error.stack,
					cause: error.cause,
				});
			}

			// Type assertion for error cause
			const cause = error.cause as
				| { code?: string; validationErrors?: unknown }
				| undefined;

			// Build response data
			const responseData: Record<string, unknown> = {
				error: error.message,
			};

			if (cause?.code) responseData.code = cause.code;
			if (cause?.validationErrors)
				responseData.validationErrors = cause.validationErrors;

			return NextResponse.json(responseData, {
				status,
				// Include error details in development
				...(process.env.NODE_ENV === "development" && {
					headers: {
						"X-Error-Details": JSON.stringify({
							name: error.name,
							stack: error.stack?.split("\n"),
						}),
					},
				}),
			});
		}

		// Handle non-Error thrown values
		console.error("Non-Error thrown in pipeline:", error);
		return NextResponse.json(
			{
				error: "Internal Server Error",
				code: "INTERNAL_SERVER_ERROR",
			},
			{ status: 500 },
		);
	}
}

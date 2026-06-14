import { Effect, Schema } from "effect";
import { Hono } from "hono";

const app = new Hono();

class StaticFileReadError extends Schema.TaggedErrorClass<StaticFileReadError>()(
	"StaticFileReadError",
	{
		cause: Schema.Defect(),
		path: Schema.String,
	},
) {
	override get message(): string {
		return `Failed to read static file: ${this.path}`;
	}
}

const mimeTypes = new Map([
	[".css", "text/css; charset=utf-8"],
	[".html", "text/html; charset=utf-8"],
	[".js", "text/javascript; charset=utf-8"],
	[".map", "application/json; charset=utf-8"],
	[".svg", "image/svg+xml"],
]);

const contentTypeForPath = (path: string): string => {
	const extensionStart = path.lastIndexOf(".");
	const extension =
		extensionStart >= 0 ? path.slice(extensionStart).toLowerCase() : undefined;

	return extension !== undefined
		? (mimeTypes.get(extension) ?? "application/octet-stream")
		: "application/octet-stream";
};

const servePublicFile = Effect.fnUntraced(function* (
	path: string,
): Effect.fn.Return<Response, StaticFileReadError> {
	const file = Bun.file(`public${path}`);
	const exists = yield* Effect.tryPromise({
		catch: (cause) => StaticFileReadError.make({ cause, path }),
		try: () => file.exists(),
	});

	if (!exists) {
		return new Response("Not found", { status: 404 });
	}

	return new Response(file, {
		headers: {
			"content-type": contentTypeForPath(path),
		},
	});
});

const runServePublicFile = (path: string): Promise<Response> =>
	Effect.runPromise(
		servePublicFile(path).pipe(
			Effect.catchTag("StaticFileReadError", (error) =>
				Effect.succeed(
					new Response(error.message, {
						status: 500,
					}),
				),
			),
		),
	);

app.get("/assets/*", (context) => runServePublicFile(context.req.path));
app.get("*", () => runServePublicFile("/index.html"));

Bun.serve({
	fetch: app.fetch,
	port: Number(Bun.env["PORT"] ?? 3000),
});

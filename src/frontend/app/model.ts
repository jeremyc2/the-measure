import { Schema } from "effect";
import { EssaySchema, EssaySummarySchema } from "../../shared/the-measure";
import { AppRouteSchema } from "../routing";
import type { EssayCatalog } from "../services/EssayCatalog/EssayCatalog";

export type AppServices = EssayCatalog;

export const Model = Schema.Struct({
	activeEssay: Schema.UndefinedOr(EssaySchema),
	catalogLoadStatus: Schema.Literals(["failed", "loading", "ready"]),
	colorScheme: Schema.Literals(["dark", "light"]),
	loadMessage: Schema.UndefinedOr(Schema.String),
	essayLoadStatus: Schema.Literals(["failed", "idle", "loading", "ready"]),
	essays: Schema.Array(EssaySummarySchema),
	route: AppRouteSchema,
});

export type Model = typeof Model.Type;

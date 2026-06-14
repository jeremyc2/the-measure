import { Schema } from "effect";
import {
	BlogPostSchema,
	BlogPostSummarySchema,
} from "../../shared/the-measure";
import { AppRouteSchema } from "../routing";
import type { PostCatalog } from "../services/PostCatalog/PostCatalog";

export type AppServices = PostCatalog;

export const Model = Schema.Struct({
	activePost: Schema.UndefinedOr(BlogPostSchema),
	catalogLoadStatus: Schema.Literals(["failed", "loading", "ready"]),
	colorScheme: Schema.Literals(["dark", "light"]),
	loadMessage: Schema.UndefinedOr(Schema.String),
	postLoadStatus: Schema.Literals(["failed", "idle", "loading", "ready"]),
	posts: Schema.Array(BlogPostSummarySchema),
	route: AppRouteSchema,
});

export type Model = typeof Model.Type;

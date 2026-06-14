import { type AppRoute, isPostRoute } from "../routing";
import { resolveColorScheme } from "../theme";
import type { Model } from "./model";

export const emptyModelFields = (route: AppRoute): Model => ({
	activePost: undefined,
	catalogLoadStatus: "loading",
	colorScheme: resolveColorScheme(),
	loadMessage: undefined,
	postLoadStatus: isPostRoute(route) ? "loading" : "idle",
	posts: [],
	route,
});

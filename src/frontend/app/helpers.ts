import { type AppRoute, isEssayRoute } from "../routing";
import { resolveColorScheme } from "../theme";
import type { Model } from "./model";

export const emptyModelFields = (route: AppRoute): Model => ({
	activeEssay: undefined,
	catalogLoadStatus: "loading",
	colorScheme: resolveColorScheme(),
	loadMessage: undefined,
	essayLoadStatus: isEssayRoute(route) ? "loading" : "idle",
	essays: [],
	route,
});

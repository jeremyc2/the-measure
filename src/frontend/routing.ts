import { Predicate, pipe, Schema } from "effect";
import { Route, type Url } from "foldkit";

export const HomeRoute = Route.r("HomeRoute");
export const EssaysRoute = Route.r("EssaysRoute");
export const MethodRoute = Route.r("MethodRoute");
export const EssayRoute = Route.r("EssayRoute", { slug: Schema.String });
export const NotFoundRoute = Route.r("NotFoundRoute", { path: Schema.String });

export const AppRouteSchema = Schema.Union([
	HomeRoute,
	EssaysRoute,
	MethodRoute,
	EssayRoute,
	NotFoundRoute,
]);

export type AppRoute = typeof AppRouteSchema.Type;

export const isHomeRoute = Predicate.isTagged("HomeRoute");
export const isEssaysRoute = Predicate.isTagged("EssaysRoute");
export const isMethodRoute = Predicate.isTagged("MethodRoute");
export const isEssayRoute = Predicate.isTagged("EssayRoute");
export const isNotFoundRoute = Predicate.isTagged("NotFoundRoute");

const homeRouter = pipe(Route.root, Route.mapTo(HomeRoute));
const essaysRouter = pipe(Route.literal("essays"), Route.mapTo(EssaysRoute));
const methodRouter = pipe(Route.literal("method"), Route.mapTo(MethodRoute));
const essayRouter = pipe(
	Route.literal("essays"),
	Route.slash(Route.string("slug")),
	Route.mapTo(EssayRoute),
);

const appRouteParser = Route.oneOf(
	essayRouter,
	essaysRouter,
	methodRouter,
	homeRouter,
);

const parseAppRoute = Route.parseUrlWithFallback(appRouteParser, NotFoundRoute);

export const routeHref = (route: AppRoute): string => {
	if (isEssayRoute(route)) {
		return essayRouter({ slug: route.slug });
	}

	if (isEssaysRoute(route)) {
		return essaysRouter();
	}

	if (isMethodRoute(route)) {
		return methodRouter();
	}

	return homeRouter();
};

export const parseUrlRoute = (url: Url.Url): AppRoute => parseAppRoute(url);

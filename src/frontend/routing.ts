import { Predicate, pipe, Schema } from "effect";
import { Route, type Url } from "foldkit";

export const HomeRoute = Route.r("HomeRoute");
export const PostsRoute = Route.r("PostsRoute");
export const MethodRoute = Route.r("MethodRoute");
export const PostRoute = Route.r("PostRoute", { slug: Schema.String });
export const NotFoundRoute = Route.r("NotFoundRoute", { path: Schema.String });

export const AppRouteSchema = Schema.Union([
	HomeRoute,
	PostsRoute,
	MethodRoute,
	PostRoute,
	NotFoundRoute,
]);

export type AppRoute = typeof AppRouteSchema.Type;

export const isHomeRoute = Predicate.isTagged("HomeRoute");
export const isPostsRoute = Predicate.isTagged("PostsRoute");
export const isMethodRoute = Predicate.isTagged("MethodRoute");
export const isPostRoute = Predicate.isTagged("PostRoute");
export const isNotFoundRoute = Predicate.isTagged("NotFoundRoute");

const homeRouter = pipe(Route.root, Route.mapTo(HomeRoute));
const postsRouter = pipe(Route.literal("posts"), Route.mapTo(PostsRoute));
const methodRouter = pipe(Route.literal("method"), Route.mapTo(MethodRoute));
const postRouter = pipe(
	Route.literal("posts"),
	Route.slash(Route.string("slug")),
	Route.mapTo(PostRoute),
);

const appRouteParser = Route.oneOf(
	postRouter,
	postsRouter,
	methodRouter,
	homeRouter,
);

const parseAppRoute = Route.parseUrlWithFallback(appRouteParser, NotFoundRoute);

export const routeHref = (route: AppRoute): string => {
	if (isPostRoute(route)) {
		return postRouter({ slug: route.slug });
	}

	if (isPostsRoute(route)) {
		return postsRouter();
	}

	if (isMethodRoute(route)) {
		return methodRouter();
	}

	return homeRouter();
};

export const parseUrlRoute = (url: Url.Url): AppRoute => parseAppRoute(url);

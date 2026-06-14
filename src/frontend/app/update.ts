import { Match, Predicate } from "effect";
import type { Command } from "foldkit";
import { evo as evolve } from "foldkit/struct";
import { type AppRoute, isPostRoute, parseUrlRoute } from "../routing";
import { toggleColorScheme } from "../theme";
import { LoadExternalUrl, LoadPost, PushUrl } from "./commands";
import type { Message } from "./messages";
import type { AppServices, Model } from "./model";

const routeCommands = (
	route: AppRoute,
): ReadonlyArray<Command.Command<Message, never, AppServices>> =>
	isPostRoute(route) ? [LoadPost({ slug: route.slug })] : [];

export const update = (
	model: Model,
	message: Message,
): readonly [
	Model,
	ReadonlyArray<Command.Command<Message, never, AppServices>>,
] =>
	Match.value(message).pipe(
		Match.withReturnType<
			readonly [
				Model,
				ReadonlyArray<Command.Command<Message, never, AppServices>>,
			]
		>(),
		Match.tagsExhaustive({
			ChangedUrl: ({ url }) => {
				const nextRoute = parseUrlRoute(url);
				const nextModel = evolve(model, {
					activePost: () => undefined,
					loadMessage: () => undefined,
					postLoadStatus: () => (isPostRoute(nextRoute) ? "loading" : "idle"),
					route: () => nextRoute,
				});

				return [nextModel, routeCommands(nextRoute)];
			},
			ClickedToggleColorScheme: () => [
				evolve(model, {
					colorScheme: (colorScheme) => toggleColorScheme(colorScheme),
				}),
				[],
			],
			FailedNavigation: ({ message }) => [
				evolve(model, { loadMessage: () => message }),
				[],
			],
			FailedPostCatalogLoad: ({ message }) => [
				evolve(model, {
					catalogLoadStatus: () => "failed" as const,
					loadMessage: () => message,
				}),
				[],
			],
			FailedPostLoad: ({ message }) => [
				evolve(model, {
					activePost: () => undefined,
					loadMessage: () => message,
					postLoadStatus: () => "failed" as const,
				}),
				[],
			],
			RequestedUrl: ({ request }) =>
				Predicate.isTagged("Internal")(request)
					? [model, [PushUrl({ url: request.url })]]
					: [model, [LoadExternalUrl({ href: request.href })]],
			SucceededNavigation: () => [model, []],
			SucceededPostCatalogLoad: ({ posts }) => [
				evolve(model, {
					catalogLoadStatus: () => "ready" as const,
					posts: () => posts,
				}),
				[],
			],
			SucceededPostLoad: ({ post }) => [
				evolve(model, {
					activePost: () => post,
					loadMessage: () => undefined,
					postLoadStatus: () => "ready" as const,
				}),
				[],
			],
		}),
	);

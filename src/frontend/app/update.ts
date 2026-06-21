import { Match, Predicate } from "effect";
import type { Command } from "foldkit";
import { evo as evolve } from "foldkit/struct";
import { type AppRoute, isEssayRoute, parseUrlRoute } from "../routing";
import { toggleColorScheme } from "../theme";
import { LoadEssay, LoadExternalUrl, PushUrl } from "./commands";
import type { Message } from "./messages";
import type { AppServices, Model } from "./model";

const routeCommands = (
	route: AppRoute,
): ReadonlyArray<Command.Command<Message, never, AppServices>> =>
	isEssayRoute(route) ? [LoadEssay({ slug: route.slug })] : [];

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
					activeEssay: () => undefined,
					loadMessage: () => undefined,
					essayLoadStatus: () => (isEssayRoute(nextRoute) ? "loading" : "idle"),
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
			FailedEssayCatalogLoad: ({ message }) => [
				evolve(model, {
					catalogLoadStatus: () => "failed" as const,
					loadMessage: () => message,
				}),
				[],
			],
			FailedEssayLoad: ({ message }) => [
				evolve(model, {
					activeEssay: () => undefined,
					loadMessage: () => message,
					essayLoadStatus: () => "failed" as const,
				}),
				[],
			],
			RequestedUrl: ({ request }) =>
				Predicate.isTagged("Internal")(request)
					? [model, [PushUrl({ url: request.url })]]
					: [model, [LoadExternalUrl({ href: request.href })]],
			SucceededNavigation: () => [model, []],
			SucceededEssayCatalogLoad: ({ essays }) => [
				evolve(model, {
					catalogLoadStatus: () => "ready" as const,
					essays: () => essays,
				}),
				[],
			],
			SucceededEssayLoad: ({ essay }) => [
				evolve(model, {
					activeEssay: () => essay,
					loadMessage: () => undefined,
					essayLoadStatus: () => "ready" as const,
				}),
				[],
			],
		}),
	);

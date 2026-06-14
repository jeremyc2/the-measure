import { Effect, Schema } from "effect";
import { Command, Navigation, Url } from "foldkit";
import { PostCatalog } from "../services/PostCatalog/PostCatalog";
import type { Message } from "./messages";
import {
	FailedNavigation,
	FailedPostCatalogLoad,
	FailedPostLoad,
	SucceededNavigation,
	SucceededPostCatalogLoad,
	SucceededPostLoad,
} from "./messages";
import type { AppServices } from "./model";

const navigationFailureMessage = (error: unknown): string =>
	error instanceof Error ? error.message : "Navigation failed.";

export const PushUrl = Command.define(
	"PushUrl",
	{ url: Url.Url },
	SucceededNavigation,
	FailedNavigation,
)(({ url }) =>
	Navigation.pushUrl(Url.toString(url)).pipe(
		Effect.match({
			onFailure: (error) =>
				FailedNavigation({ message: navigationFailureMessage(error) }),
			onSuccess: SucceededNavigation,
		}),
	),
);

export const LoadExternalUrl = Command.define(
	"LoadExternalUrl",
	{ href: Schema.NonEmptyString },
	SucceededNavigation,
	FailedNavigation,
)(({ href }) =>
	Navigation.load(href).pipe(
		Effect.match({
			onFailure: (error) =>
				FailedNavigation({ message: navigationFailureMessage(error) }),
			onSuccess: SucceededNavigation,
		}),
	),
);

export const LoadPostCatalog = Command.define(
	"LoadPostCatalog",
	SucceededPostCatalogLoad,
	FailedPostCatalogLoad,
)(
	Effect.gen(function* () {
		const postCatalog = yield* PostCatalog;
		return yield* postCatalog.list.pipe(
			Effect.match({
				onFailure: () =>
					FailedPostCatalogLoad({
						message: "The post catalog failed to load.",
					}),
				onSuccess: (posts) => SucceededPostCatalogLoad({ posts }),
			}),
		);
	}),
);

export const LoadPost = Command.define(
	"LoadPost",
	{ slug: Schema.String },
	SucceededPostLoad,
	FailedPostLoad,
)(
	Effect.fnUntraced(function* ({ slug }) {
		const postCatalog = yield* PostCatalog;
		return yield* postCatalog.findBySlug(slug).pipe(
			Effect.match({
				onFailure: (error) => FailedPostLoad({ message: error.message }),
				onSuccess: (post) => SucceededPostLoad({ post }),
			}),
		);
	}),
);

export type AppCommand = Command.Command<Message, never, AppServices>;

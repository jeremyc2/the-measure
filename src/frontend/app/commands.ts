import { Effect, Schema } from "effect";
import { Command, Navigation, Url } from "foldkit";
import { EssayCatalog } from "../services/EssayCatalog/EssayCatalog";
import type { Message } from "./messages";
import {
	FailedEssayCatalogLoad,
	FailedEssayLoad,
	FailedNavigation,
	SucceededEssayCatalogLoad,
	SucceededEssayLoad,
	SucceededNavigation,
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

export const LoadEssayCatalog = Command.define(
	"LoadEssayCatalog",
	SucceededEssayCatalogLoad,
	FailedEssayCatalogLoad,
)(
	Effect.gen(function* () {
		const essayCatalog = yield* EssayCatalog;
		return yield* essayCatalog.list.pipe(
			Effect.match({
				onFailure: () =>
					FailedEssayCatalogLoad({
						message: "The essay catalog failed to load.",
					}),
				onSuccess: (essays) => SucceededEssayCatalogLoad({ essays }),
			}),
		);
	}),
);

export const LoadEssay = Command.define(
	"LoadEssay",
	{ slug: Schema.String },
	SucceededEssayLoad,
	FailedEssayLoad,
)(
	Effect.fnUntraced(function* ({ slug }) {
		const essayCatalog = yield* EssayCatalog;
		return yield* essayCatalog.findBySlug(slug).pipe(
			Effect.match({
				onFailure: (error) => FailedEssayLoad({ message: error.message }),
				onSuccess: (essay) => SucceededEssayLoad({ essay }),
			}),
		);
	}),
);

export type AppCommand = Command.Command<Message, never, AppServices>;

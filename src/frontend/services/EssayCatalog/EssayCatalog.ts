import { Context, Effect, Layer } from "effect";
import type { Essay, EssaySummary } from "../../../shared/the-measure";
import { essays } from "../../essays/catalog";
import { EssayCatalogError, EssayNotFound } from "./EssayCatalog.errors";
import { toSortedEssaySummaries } from "./EssayCatalog.helpers";

export class EssayCatalog extends Context.Service<
	EssayCatalog,
	{
		readonly findBySlug: (
			slug: string,
		) => Effect.Effect<Essay, EssayCatalogError>;
		readonly list: Effect.Effect<ReadonlyArray<EssaySummary>>;
	}
	// The key mirrors the file path so Effect diagnostics stay deterministic.
>()("the-measure/frontend/services/EssayCatalog/EssayCatalog") {
	static readonly layer = Layer.succeed(
		EssayCatalog,
		EssayCatalog.of({
			findBySlug: (slug) => {
				const essay = essays.find((candidate) => candidate.slug === slug);

				return essay !== undefined
					? Effect.succeed(essay)
					: Effect.fail(
							EssayCatalogError.make({
								reason: EssayNotFound.make({ slug }),
							}),
						);
			},
			list: Effect.succeed(toSortedEssaySummaries(essays)),
		}),
	);
}

import { Context, Effect, Layer } from "effect";
import type { BlogPost, BlogPostSummary } from "../../../shared/the-measure";
import { blogPosts } from "../../posts/catalog";
import { PostCatalogError, PostNotFound } from "./PostCatalog.errors";
import { toSortedPostSummaries } from "./PostCatalog.helpers";

export class PostCatalog extends Context.Service<
	PostCatalog,
	{
		readonly findBySlug: (
			slug: string,
		) => Effect.Effect<BlogPost, PostCatalogError>;
		readonly list: Effect.Effect<ReadonlyArray<BlogPostSummary>>;
	}
	// The key mirrors the file path so Effect diagnostics stay deterministic.
>()("the-measure/frontend/services/PostCatalog/PostCatalog") {
	static readonly layer = Layer.succeed(
		PostCatalog,
		PostCatalog.of({
			findBySlug: (slug) => {
				const post = blogPosts.find((candidate) => candidate.slug === slug);

				return post !== undefined
					? Effect.succeed(post)
					: Effect.fail(
							PostCatalogError.make({
								reason: PostNotFound.make({ slug }),
							}),
						);
			},
			list: Effect.succeed(toSortedPostSummaries(blogPosts)),
		}),
	);
}

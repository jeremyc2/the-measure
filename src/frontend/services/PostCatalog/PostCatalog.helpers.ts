import type { BlogPost, BlogPostSummary } from "../../../shared/the-measure";
import { summarizePost } from "../../../shared/the-measure";

export const toSortedPostSummaries = (
	posts: ReadonlyArray<BlogPost>,
): ReadonlyArray<BlogPostSummary> =>
	posts.map(summarizePost).toSorted((left, right) => {
		const leftPublishedAt = left.publishedAt ?? "9999-12-31";
		const rightPublishedAt = right.publishedAt ?? "9999-12-31";

		return rightPublishedAt.localeCompare(leftPublishedAt);
	});

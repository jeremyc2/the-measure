import type { Essay, EssaySummary } from "../../../shared/the-measure";
import { summarizeEssay } from "../../../shared/the-measure";

export const toSortedEssaySummaries = (
	essays: ReadonlyArray<Essay>,
): ReadonlyArray<EssaySummary> =>
	essays.map(summarizeEssay).toSorted((left, right) => {
		const leftPublishedAt = left.publishedAt ?? "9999-12-31";
		const rightPublishedAt = right.publishedAt ?? "9999-12-31";

		return rightPublishedAt.localeCompare(leftPublishedAt);
	});

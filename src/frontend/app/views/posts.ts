import { type Html, html } from "foldkit/html";
import type { BlogPostSummary } from "../../../shared/the-measure";
import { provenanceLabel } from "../../../shared/the-measure";
import { PostRoute, routeHref } from "../../routing";
import {
	displayTitleClass,
	provenancePillClass,
	surfaceCardClass,
} from "../../shared-ui";
import type { Message } from "../messages";
import type { Model } from "../model";

export const postCardView = (post: BlogPostSummary): Html => {
	const typedHtml = html<Message>();

	return typedHtml.article(
		[
			typedHtml.Class(
				`${surfaceCardClass} ${post.backgroundClass} grid min-h-52 gap-4 p-5`,
			),
		],
		[
			typedHtml.div(
				[typedHtml.Class("flex flex-wrap gap-2")],
				post.attribution.map((item) =>
					typedHtml.span(
						[typedHtml.Class(provenancePillClass)],
						[provenanceLabel(item.kind)],
					),
				),
			),
			typedHtml.div(
				[typedHtml.Class("grid gap-2")],
				[
					typedHtml.h2(
						[
							typedHtml.Class(
								`${displayTitleClass} text-xl text-neutral-950 dark:text-zinc-100`,
							),
						],
						[
							typedHtml.a(
								[
									typedHtml.Class(
										"rounded-lg outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500",
									),
									typedHtml.Href(routeHref(PostRoute({ slug: post.slug }))),
								],
								[post.title],
							),
						],
					),
					...(post.summary !== undefined
						? [
								typedHtml.p(
									[
										typedHtml.Class(
											"text-sm leading-6 text-neutral-600 dark:text-zinc-300",
										),
									],
									[post.summary],
								),
							]
						: []),
				],
			),
		],
	);
};

export const postsView = (model: Model): Html => {
	const typedHtml = html<Message>();

	if (model.catalogLoadStatus === "failed") {
		return typedHtml.p(
			[typedHtml.Class("text-sm text-red-700 dark:text-red-300")],
			[model.loadMessage ?? "Could not load posts."],
		);
	}

	if (model.posts.length === 0) {
		return typedHtml.div(
			[
				typedHtml.Class(
					`${surfaceCardClass} mx-auto max-w-2xl p-6 text-center`,
				),
			],
			[
				typedHtml.h2(
					[
						typedHtml.Class(
							`${displayTitleClass} text-2xl text-neutral-950 dark:text-zinc-100`,
						),
					],
					["No posts yet"],
				),
				typedHtml.p(
					[
						typedHtml.Class(
							"mt-2 text-sm leading-6 text-neutral-600 dark:text-zinc-300",
						),
					],
					[
						model.catalogLoadStatus === "loading"
							? "Loading the post catalog..."
							: "Add the first post only when its provenance summary, section labels, and interactive boundaries are ready.",
					],
				),
			],
		);
	}

	return typedHtml.div(
		[typedHtml.Class("grid gap-4 md:grid-cols-2")],
		model.posts.map((post) => postCardView(post)),
	);
};

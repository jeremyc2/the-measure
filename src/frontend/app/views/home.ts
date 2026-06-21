import { type Html, html } from "foldkit/html";
import { MethodRoute, PostsRoute, routeHref } from "../../routing";
import {
	displayTitleClass,
	hotPinkBoundaryClass,
	primaryButtonClass,
	secondaryButtonClass,
	surfaceCardClass,
} from "../../shared-ui";
import type { Message } from "../messages";
import type { Model } from "../model";
import { postCardView } from "./posts";

const emptyPostsMessage = (model: Model): string => {
	if (model.catalogLoadStatus === "loading") {
		return "Loading the post catalog...";
	}

	return "No blog posts have been published in this scaffold yet.";
};

const latestPostsContent = (
	model: Model,
	previewPosts: Model["posts"],
): Html => {
	const typedHtml = html<Message>();

	if (previewPosts.length > 0) {
		return typedHtml.div(
			[typedHtml.Class("grid gap-4 md:grid-cols-3")],
			previewPosts.map((post) => postCardView(post)),
		);
	}

	return typedHtml.div(
		[typedHtml.Class(`${surfaceCardClass} p-5`)],
		[
			typedHtml.p(
				[
					typedHtml.Class(
						"text-sm leading-6 text-neutral-600 dark:text-zinc-300",
					),
				],
				[emptyPostsMessage(model)],
			),
		],
	);
};

export const homeView = (model: Model): Html => {
	const typedHtml = html<Message>();
	const previewPosts = model.posts.slice(0, 3);

	return typedHtml.div(
		[typedHtml.Class("grid gap-8")],
		[
			typedHtml.section(
				[
					typedHtml.Class(
						"grid gap-6 rounded-lg border border-neutral-200 bg-neutral-50 p-5 dark:border-zinc-800 dark:bg-zinc-900/70 lg:grid-cols-[minmax(0,1fr)_18rem] lg:p-8",
					),
				],
				[
					typedHtml.div(
						[typedHtml.Class("grid content-center gap-5")],
						[
							typedHtml.p(
								[
									typedHtml.Class(
										"text-sm font-bold uppercase tracking-[0.18em] text-pink-600 dark:text-pink-300",
									),
								],
								["Book-club essays about The Measure by Nikki Erlick"],
							),
							typedHtml.h2(
								[
									typedHtml.Class(
										`${displayTitleClass} max-w-3xl text-4xl text-neutral-950 dark:text-zinc-100 md:text-5xl`,
									),
								],
								[
									"What would we do if every life arrived with a visible measure?",
								],
							),
							typedHtml.div(
								[typedHtml.Class("flex flex-wrap gap-3")],
								[
									typedHtml.a(
										[
											typedHtml.Class(primaryButtonClass),
											typedHtml.Href(routeHref(PostsRoute())),
										],
										["View posts"],
									),
									typedHtml.a(
										[
											typedHtml.Class(secondaryButtonClass),
											typedHtml.Href(routeHref(MethodRoute())),
										],
										["Attribution method"],
									),
								],
							),
						],
					),
					typedHtml.div(
						[
							typedHtml.Class(
								`${hotPinkBoundaryClass} grid content-center gap-3`,
							),
						],
						[
							typedHtml.p(
								[
									typedHtml.Class(
										"text-xs font-bold uppercase tracking-[0.18em] text-pink-700 dark:text-pink-200",
									),
								],
								["Post boundary preview"],
							),
							typedHtml.p(
								[
									typedHtml.Class(
										"text-sm leading-6 text-neutral-700 dark:text-zinc-300",
									),
								],
								["Future AI sections render inside this hot pink boundary."],
							),
						],
					),
				],
			),
			typedHtml.section(
				[typedHtml.Class("grid gap-4")],
				[
					typedHtml.div(
						[typedHtml.Class("flex items-end justify-between gap-4")],
						[
							typedHtml.h2(
								[
									typedHtml.Class(
										`${displayTitleClass} text-2xl text-neutral-950 dark:text-zinc-100`,
									),
								],
								["Latest posts"],
							),
							typedHtml.a(
								[
									typedHtml.Class(
										"text-sm font-semibold text-pink-700 hover:text-pink-600 dark:text-pink-300 dark:hover:text-pink-200",
									),
									typedHtml.Href(routeHref(PostsRoute())),
								],
								["All posts"],
							),
						],
					),
					latestPostsContent(model, previewPosts),
				],
			),
		],
	);
};

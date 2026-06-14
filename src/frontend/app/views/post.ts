import { type Html, html } from "foldkit/html";
import type {
	BlogPost,
	PostSection,
	Provenance,
} from "../../../shared/the-measure";
import { provenanceLabel } from "../../../shared/the-measure";
import { renderCodexComponent } from "../../codex-components/registry";
import {
	displayTitleClass,
	hotPinkBoundaryClass,
	provenancePillClass,
	surfaceCardClass,
} from "../../shared-ui";
import type { Message } from "../messages";
import type { Model } from "../model";

const provenanceRowView = (item: Provenance): Html => {
	const typedHtml = html<Message>();

	return typedHtml.li(
		[
			typedHtml.Class(
				"grid gap-1 rounded-lg border border-pink-200 p-3 dark:border-pink-900",
			),
		],
		[
			typedHtml.div(
				[typedHtml.Class("flex flex-wrap items-center gap-2")],
				[
					typedHtml.span(
						[typedHtml.Class(provenancePillClass)],
						[provenanceLabel(item.kind)],
					),
					typedHtml.span(
						[
							typedHtml.Class(
								"text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500 dark:text-zinc-400",
							),
						],
						[item.area],
					),
				],
			),
			typedHtml.p(
				[
					typedHtml.Class(
						"text-sm leading-6 text-neutral-700 dark:text-zinc-300",
					),
				],
				[item.note],
			),
		],
	);
};

const provenanceSummaryView = (post: BlogPost): Html => {
	const typedHtml = html<Message>();

	return typedHtml.aside(
		[typedHtml.Class(`${surfaceCardClass} grid gap-4 border-pink-300 p-4`)],
		[
			typedHtml.div(
				[typedHtml.Class("grid gap-1")],
				[
					typedHtml.h2(
						[
							typedHtml.Class(
								`${displayTitleClass} text-xl text-neutral-950 dark:text-zinc-100`,
							),
						],
						["Provenance"],
					),
					typedHtml.p(
						[
							typedHtml.Class(
								"text-sm leading-6 text-neutral-600 dark:text-zinc-300",
							),
						],
						[
							"This summary is required before the post body so readers can see what is human-authored, AI-assisted, or AI-generated.",
						],
					),
				],
			),
			typedHtml.ul(
				[typedHtml.Class("grid gap-3 md:grid-cols-2")],
				post.attribution.map((item) => provenanceRowView(item)),
			),
		],
	);
};

const sectionLabelView = (section: PostSection): Html => {
	const typedHtml = html<Message>();

	return typedHtml.div(
		[typedHtml.Class("mb-3 flex flex-wrap items-center gap-2")],
		[
			typedHtml.span(
				[typedHtml.Class(provenancePillClass)],
				[provenanceLabel(section.provenance.kind)],
			),
			typedHtml.span(
				[
					typedHtml.Class(
						"text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500 dark:text-zinc-400",
					),
				],
				[section.provenance.area],
			),
		],
	);
};

const isAiProvenance = (section: PostSection): boolean =>
	section.provenance.kind === "ai-assisted" ||
	section.provenance.kind === "ai-generated";

const sectionContainerClass = (section: PostSection): string =>
	isAiProvenance(section) ? `${hotPinkBoundaryClass} grid gap-3` : "grid gap-3";

const proseSectionView = (
	section: Extract<PostSection, { kind: "prose" }>,
): Html => {
	const typedHtml = html<Message>();

	return typedHtml.section(
		[typedHtml.Class(sectionContainerClass(section))],
		[
			sectionLabelView(section),
			...(section.heading !== undefined
				? [
						typedHtml.h2(
							[
								typedHtml.Class(
									`${displayTitleClass} text-2xl text-neutral-950 dark:text-zinc-100`,
								),
							],
							[section.heading],
						),
					]
				: []),
			...section.body.map((paragraph) =>
				typedHtml.p(
					[
						typedHtml.Class(
							"text-base leading-8 text-neutral-700 dark:text-zinc-300",
						),
					],
					[paragraph],
				),
			),
		],
	);
};

const interactiveSectionView = (
	section: Extract<PostSection, { kind: "interactive" }>,
): Html => {
	const typedHtml = html<Message>();

	return typedHtml.section(
		[typedHtml.Class(sectionContainerClass(section))],
		[
			sectionLabelView(section),
			typedHtml.div(
				[typedHtml.Class("grid gap-2")],
				[
					typedHtml.h2(
						[
							typedHtml.Class(
								`${displayTitleClass} text-2xl text-neutral-950 dark:text-zinc-100`,
							),
						],
						[section.heading],
					),
					typedHtml.p(
						[
							typedHtml.Class(
								"text-sm leading-6 text-neutral-600 dark:text-zinc-300",
							),
						],
						[section.description],
					),
				],
			),
			renderCodexComponent(section),
		],
	);
};

const sectionView = (section: PostSection): Html =>
	section.kind === "interactive"
		? interactiveSectionView(section)
		: proseSectionView(section);

const readyPostView = (post: BlogPost): Html => {
	const typedHtml = html<Message>();

	return typedHtml.article(
		[typedHtml.Class(`${post.backgroundClass} grid gap-8 rounded-lg`)],
		[
			typedHtml.header(
				[typedHtml.Class("grid gap-3")],
				[
					typedHtml.h2(
						[
							typedHtml.Class(
								`${displayTitleClass} text-3xl text-neutral-950 dark:text-zinc-100`,
							),
						],
						[post.title],
					),
					...(post.summary !== undefined
						? [
								typedHtml.p(
									[
										typedHtml.Class(
											"text-base leading-7 text-neutral-700 dark:text-zinc-300",
										),
									],
									[post.summary],
								),
							]
						: []),
				],
			),
			provenanceSummaryView(post),
			typedHtml.div(
				[typedHtml.Class("grid gap-8")],
				post.sections.map((section) => sectionView(section)),
			),
		],
	);
};

export const postView = (model: Model): Html => {
	const typedHtml = html<Message>();

	if (model.postLoadStatus === "loading") {
		return typedHtml.p(
			[typedHtml.Class("text-sm text-neutral-600 dark:text-zinc-300")],
			["Loading post..."],
		);
	}

	if (model.postLoadStatus === "failed") {
		return typedHtml.p(
			[typedHtml.Class("text-sm text-red-700 dark:text-red-300")],
			[model.loadMessage ?? "Could not load this post."],
		);
	}

	return model.activePost !== undefined
		? readyPostView(model.activePost)
		: typedHtml.p(
				[typedHtml.Class("text-sm text-neutral-600 dark:text-zinc-300")],
				["No post is selected."],
			);
};

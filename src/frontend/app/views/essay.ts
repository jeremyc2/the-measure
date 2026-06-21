import { type Html, html } from "foldkit/html";
import type { Essay, EssaySection } from "../../../shared/the-measure";
import { renderInteractiveComponent } from "../../components/registry";
import {
	displayTitleClass,
	hotPinkBoundaryClass,
	provenancePillClass,
	surfaceCardClass,
} from "../../shared-ui";
import type { Message } from "../messages";
import type { Model } from "../model";

const provenancePillView = (provenance: Essay["attribution"][number]): Html => {
	const typedHtml = html<Message>();

	return typedHtml.span([typedHtml.Class(provenancePillClass)], [provenance]);
};

const provenanceSummaryView = (essay: Essay): Html => {
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
							"This summary is required before the essay body so readers can see what is Human and what is AI.",
						],
					),
				],
			),
			typedHtml.div(
				[typedHtml.Class("flex flex-wrap gap-2")],
				essay.attribution.map((item) => provenancePillView(item)),
			),
		],
	);
};

const sectionLabelView = (section: EssaySection): Html => {
	const typedHtml = html<Message>();

	return typedHtml.div(
		[typedHtml.Class("mb-3 flex flex-wrap items-center gap-2")],
		[
			typedHtml.span(
				[typedHtml.Class(provenancePillClass)],
				[section.provenance],
			),
		],
	);
};

const isAiProvenance = (section: EssaySection): boolean =>
	section.provenance === "AI";

const sectionContainerClass = (section: EssaySection): string =>
	isAiProvenance(section) ? `${hotPinkBoundaryClass} grid gap-3` : "grid gap-3";

const proseSectionView = (
	section: Extract<EssaySection, { kind: "prose" }>,
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
	section: Extract<EssaySection, { kind: "interactive" }>,
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
			renderInteractiveComponent(section),
		],
	);
};

const sectionView = (section: EssaySection): Html =>
	section.kind === "interactive"
		? interactiveSectionView(section)
		: proseSectionView(section);

const readyEssayView = (essay: Essay): Html => {
	const typedHtml = html<Message>();

	return typedHtml.article(
		[typedHtml.Class(`${essay.backgroundClass} grid gap-8 rounded-lg`)],
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
						[essay.title],
					),
					...(essay.summary !== undefined
						? [
								typedHtml.p(
									[
										typedHtml.Class(
											"text-base leading-7 text-neutral-700 dark:text-zinc-300",
										),
									],
									[essay.summary],
								),
							]
						: []),
				],
			),
			provenanceSummaryView(essay),
			typedHtml.div(
				[typedHtml.Class("grid gap-8")],
				essay.sections.map((section) => sectionView(section)),
			),
		],
	);
};

export const essayView = (model: Model): Html => {
	const typedHtml = html<Message>();

	if (model.essayLoadStatus === "loading") {
		return typedHtml.p(
			[typedHtml.Class("text-sm text-neutral-600 dark:text-zinc-300")],
			["Loading essay..."],
		);
	}

	if (model.essayLoadStatus === "failed") {
		return typedHtml.p(
			[typedHtml.Class("text-sm text-red-700 dark:text-red-300")],
			[model.loadMessage ?? "Could not load this essay."],
		);
	}

	return model.activeEssay !== undefined
		? readyEssayView(model.activeEssay)
		: typedHtml.p(
				[typedHtml.Class("text-sm text-neutral-600 dark:text-zinc-300")],
				["No essay is selected."],
			);
};

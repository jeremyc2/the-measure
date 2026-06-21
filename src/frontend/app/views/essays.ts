import { type Html, html } from "foldkit/html";
import type { EssaySummary } from "../../../shared/the-measure";
import { EssayRoute, routeHref } from "../../routing";
import {
	displayTitleClass,
	provenancePillClass,
	surfaceCardClass,
} from "../../shared-ui";
import type { Message } from "../messages";
import type { Model } from "../model";

export const essayCardView = (essay: EssaySummary): Html => {
	const typedHtml = html<Message>();

	return typedHtml.article(
		[
			typedHtml.Class(
				`${surfaceCardClass} ${essay.backgroundClass} grid min-h-52 gap-4 p-5`,
			),
		],
		[
			typedHtml.div(
				[typedHtml.Class("flex flex-wrap gap-2")],
				essay.attribution.map((item) =>
					typedHtml.span([typedHtml.Class(provenancePillClass)], [item]),
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
									typedHtml.Href(routeHref(EssayRoute({ slug: essay.slug }))),
								],
								[essay.title],
							),
						],
					),
					...(essay.summary !== undefined
						? [
								typedHtml.p(
									[
										typedHtml.Class(
											"text-sm leading-6 text-neutral-600 dark:text-zinc-300",
										),
									],
									[essay.summary],
								),
							]
						: []),
				],
			),
		],
	);
};

export const essaysView = (model: Model): Html => {
	const typedHtml = html<Message>();

	if (model.catalogLoadStatus === "failed") {
		return typedHtml.p(
			[typedHtml.Class("text-sm text-red-700 dark:text-red-300")],
			[model.loadMessage ?? "Could not load essays."],
		);
	}

	if (model.essays.length === 0) {
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
					["No essays yet"],
				),
				typedHtml.p(
					[
						typedHtml.Class(
							"mt-2 text-sm leading-6 text-neutral-600 dark:text-zinc-300",
						),
					],
					[
						model.catalogLoadStatus === "loading"
							? "Loading the essay catalog..."
							: "Add the first essay only when its provenance summary, section labels, and AI boundaries are ready.",
					],
				),
			],
		);
	}

	return typedHtml.div(
		[typedHtml.Class("grid gap-4 md:grid-cols-2")],
		model.essays.map((essay) => essayCardView(essay)),
	);
};

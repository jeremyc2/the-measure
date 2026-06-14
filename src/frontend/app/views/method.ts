import { type Html, html } from "foldkit/html";
import { displayTitleClass, surfaceCardClass } from "../../shared-ui";
import type { Message } from "../messages";

const ruleCard = (
	title: string,
	description: string,
	accentClass: string,
): Html => {
	const typedHtml = html<Message>();

	return typedHtml.article(
		[typedHtml.Class(`${surfaceCardClass} grid gap-3 p-5`)],
		[
			typedHtml.div([typedHtml.Class(`h-1 rounded-full ${accentClass}`)], []),
			typedHtml.h2(
				[
					typedHtml.Class(
						`${displayTitleClass} text-xl text-neutral-950 dark:text-zinc-100`,
					),
				],
				[title],
			),
			typedHtml.p(
				[
					typedHtml.Class(
						"text-sm leading-6 text-neutral-600 dark:text-zinc-300",
					),
				],
				[description],
			),
		],
	);
};

export const methodView = (): Html => {
	const typedHtml = html<Message>();

	return typedHtml.div(
		[typedHtml.Class("grid gap-6")],
		[
			typedHtml.section(
				[typedHtml.Class("grid gap-4 md:grid-cols-3")],
				[
					ruleCard(
						"Human authored",
						"Writing or design that comes primarily from Jeremy's own thinking, with ordinary editing support at most.",
						"bg-lime-400",
					),
					ruleCard(
						"AI assisted",
						"Work where AI shaped drafts, code, structure, or exploration, but a human directed and materially edited the result.",
						"bg-pink-500",
					),
					ruleCard(
						"AI generated",
						"Sections that are mostly generated output, including future interactive components or generated media.",
						"bg-cyan-400",
					),
				],
			),
			typedHtml.section(
				[typedHtml.Class(`${surfaceCardClass} grid gap-3 p-5`)],
				[
					typedHtml.h2(
						[
							typedHtml.Class(
								`${displayTitleClass} text-xl text-neutral-950 dark:text-zinc-100`,
							),
						],
						["Local interactive sections"],
					),
					typedHtml.p(
						[
							typedHtml.Class(
								"text-sm leading-6 text-neutral-600 dark:text-zinc-300",
							),
						],
						[
							"Interactive sections run in this app's own client-side code. They are not third-party embeds, and they carry the same provenance labels as prose.",
						],
					),
				],
			),
		],
	);
};

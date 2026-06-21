import { type Html, html } from "foldkit/html";
import { displayTitleClass, surfaceCardClass } from "../../shared-ui";
import type { Message } from "../messages";

const ruleCard = (title: string, accentClass: string): Html => {
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
		],
	);
};

export const methodView = (): Html => {
	const typedHtml = html<Message>();

	return typedHtml.div(
		[typedHtml.Class("grid gap-6")],
		[
			typedHtml.section(
				[typedHtml.Class("grid gap-4 md:grid-cols-2")],
				[ruleCard("Human", "bg-lime-400"), ruleCard("AI", "bg-pink-500")],
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
						["Section boundaries"],
					),
					typedHtml.p(
						[
							typedHtml.Class(
								"text-sm leading-6 text-neutral-600 dark:text-zinc-300",
							),
						],
						[
							"Hot pink boundaries mark AI sections. Interactive sections can be Human or AI, depending on their displayed content.",
						],
					),
				],
			),
		],
	);
};

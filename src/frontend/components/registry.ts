import { type Html, html } from "foldkit/html";
import type { InteractiveSection } from "../../shared/the-measure";
import type { Message } from "../app/messages";
import { provenancePillClass, surfaceCardClass } from "../shared-ui";

export const renderInteractiveComponent = (
	section: InteractiveSection,
): Html => {
	const typedHtml = html<Message>();

	return typedHtml.div(
		[typedHtml.Class(`${surfaceCardClass} grid gap-3 border-dashed p-5`)],
		[
			typedHtml.div(
				[typedHtml.Class("flex flex-wrap items-center gap-2")],
				[
					typedHtml.span(
						[typedHtml.Class(provenancePillClass)],
						["Interactive component slot"],
					),
					typedHtml.code(
						[
							typedHtml.Class(
								"rounded bg-neutral-100 px-2 py-1 text-xs text-neutral-700 dark:bg-zinc-800 dark:text-zinc-200",
							),
						],
						[section.componentId],
					),
				],
			),
			typedHtml.p(
				[
					typedHtml.Class(
						"text-sm leading-6 text-neutral-600 dark:text-zinc-300",
					),
				],
				[
					"This local interactive section has a typed place in the essay contract. Add its Foldkit renderer here when the essay exists.",
				],
			),
		],
	);
};

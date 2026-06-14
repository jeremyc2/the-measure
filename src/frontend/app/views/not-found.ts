import { type Html, html } from "foldkit/html";
import { HomeRoute, isNotFoundRoute, routeHref } from "../../routing";
import {
	displayTitleClass,
	secondaryButtonClass,
	surfaceCardClass,
} from "../../shared-ui";
import type { Message } from "../messages";
import type { Model } from "../model";

export const notFoundView = (model: Model): Html => {
	const typedHtml = html<Message>();
	const path = isNotFoundRoute(model.route) ? model.route.path : "this URL";

	return typedHtml.div(
		[typedHtml.Class(`${surfaceCardClass} mx-auto max-w-xl p-6 text-center`)],
		[
			typedHtml.h2(
				[
					typedHtml.Class(
						`${displayTitleClass} text-2xl text-neutral-950 dark:text-zinc-100`,
					),
				],
				["Route not found"],
			),
			typedHtml.p(
				[
					typedHtml.Class(
						"mt-2 text-sm leading-6 text-neutral-600 dark:text-zinc-300",
					),
				],
				[`No static route is registered for ${path}.`],
			),
			typedHtml.a(
				[
					typedHtml.Class(`${secondaryButtonClass} mt-4`),
					typedHtml.Href(routeHref(HomeRoute())),
				],
				["Back home"],
			),
		],
	);
};

import { type Html, html } from "foldkit/html";
import { bookOpenIcon, moonIcon, sunIcon } from "../../icons";
import {
	EssaysRoute,
	HomeRoute,
	isEssaysRoute,
	isHomeRoute,
	isMethodRoute,
	MethodRoute,
	routeHref,
} from "../../routing";
import { displayTitleClass } from "../../shared-ui";
import type { ColorScheme } from "../../theme";
import { ClickedToggleColorScheme, type Message } from "../messages";
import type { Model } from "../model";

const navLinkClass = (active: boolean): string =>
	active
		? "rounded-lg bg-pink-100 px-3 py-2 text-sm font-semibold text-pink-700 dark:bg-pink-950/60 dark:text-pink-200"
		: "rounded-lg px-3 py-2 text-sm font-semibold text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100";

const themeToggleLabel = (colorScheme: ColorScheme): string =>
	colorScheme === "dark" ? "Switch to light mode" : "Switch to dark mode";

const iconControlClass =
	"inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 bg-white text-sm font-semibold text-neutral-700 shadow-sm transition duration-150 ease-out hover:border-pink-400 hover:bg-pink-50 hover:text-neutral-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-500 active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100 dark:border-zinc-600 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-pink-400 dark:hover:bg-pink-950/40 dark:hover:text-zinc-100";

const themeToggleView = (model: Model): Html => {
	const typedHtml = html<Message>();

	return typedHtml.button(
		[
			typedHtml.AriaLabel(themeToggleLabel(model.colorScheme)),
			typedHtml.Class(iconControlClass),
			typedHtml.OnClick(ClickedToggleColorScheme()),
			typedHtml.Type("button"),
		],
		[
			model.colorScheme === "dark"
				? sunIcon(typedHtml, "h-5 w-5")
				: moonIcon(typedHtml, "h-5 w-5"),
		],
	);
};

const navView = (model: Model): Html => {
	const typedHtml = html<Message>();

	return typedHtml.nav(
		[typedHtml.Class("flex flex-wrap gap-1")],
		[
			typedHtml.a(
				[
					typedHtml.Class(navLinkClass(isHomeRoute(model.route))),
					typedHtml.Href(routeHref(HomeRoute())),
				],
				["Home"],
			),
			typedHtml.a(
				[
					typedHtml.Class(navLinkClass(isEssaysRoute(model.route))),
					typedHtml.Href(routeHref(EssaysRoute())),
				],
				["Essays"],
			),
			typedHtml.a(
				[
					typedHtml.Class(navLinkClass(isMethodRoute(model.route))),
					typedHtml.Href(routeHref(MethodRoute())),
				],
				["Method"],
			),
		],
	);
};

export const headerView = (
	model: Model,
	title: string,
	subtitle: string | undefined,
): Html => {
	const typedHtml = html<Message>();

	return typedHtml.header(
		[typedHtml.Class("border-b border-neutral-200 pb-5 dark:border-zinc-800")],
		[
			typedHtml.div(
				[typedHtml.Class("flex items-center justify-between gap-3")],
				[
					typedHtml.a(
						[
							typedHtml.Class(
								"inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-neutral-700 dark:text-zinc-200",
							),
							typedHtml.Href(routeHref(HomeRoute())),
						],
						[
							bookOpenIcon(typedHtml, "h-4 w-4 text-pink-500"),
							"Book club reading companion",
						],
					),
					themeToggleView(model),
				],
			),
			typedHtml.div(
				[
					typedHtml.Class(
						"mt-5 grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end",
					),
				],
				[
					typedHtml.div(
						[typedHtml.Class("min-w-0")],
						[
							typedHtml.h1(
								[
									typedHtml.Class(
										`${displayTitleClass} text-3xl tracking-tight text-neutral-950 dark:text-zinc-100 md:text-4xl`,
									),
								],
								[title],
							),
							...(subtitle !== undefined
								? [
										typedHtml.p(
											[
												typedHtml.Class(
													"mt-2 max-w-3xl text-base leading-7 text-neutral-600 dark:text-zinc-400",
												),
											],
											[subtitle],
										),
									]
								: []),
						],
					),
					navView(model),
				],
			),
		],
	);
};

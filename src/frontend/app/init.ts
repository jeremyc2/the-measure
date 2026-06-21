import type { Runtime, Url } from "foldkit";
import { isEssayRoute, parseUrlRoute } from "../routing";
import { applyColorScheme } from "../theme";
import { type AppCommand, LoadEssay, LoadEssayCatalog } from "./commands";
import { emptyModelFields } from "./helpers";
import type { Message } from "./messages";
import type { AppServices, Model } from "./model";

const routeCommands = (route: Model["route"]): ReadonlyArray<AppCommand> =>
	isEssayRoute(route) ? [LoadEssay({ slug: route.slug })] : [];

export const init: Runtime.RoutingApplicationInit<
	Model,
	Message,
	void,
	AppServices
> = (url: Url.Url) => {
	const route = parseUrlRoute(url);
	const model = emptyModelFields(route);
	applyColorScheme(model.colorScheme);

	return [model, [LoadEssayCatalog(), ...routeCommands(route)]];
};

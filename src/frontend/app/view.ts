import { type Document, type Html, html } from "foldkit/html";
import {
	isEssayRoute,
	isEssaysRoute,
	isHomeRoute,
	isMethodRoute,
} from "../routing";
import { appShellClass } from "../shared-ui";
import type { Message } from "./messages";
import type { Model } from "./model";
import { essayView } from "./views/essay";
import { essaysView } from "./views/essays";
import { homeView } from "./views/home";
import { headerView } from "./views/layout";
import { methodView } from "./views/method";
import { notFoundView } from "./views/not-found";

const pageTitle = (model: Model): string => {
	if (isHomeRoute(model.route)) {
		return "The Measure";
	}

	if (isEssaysRoute(model.route)) {
		return "Essays";
	}

	if (isMethodRoute(model.route)) {
		return "Method";
	}

	if (isEssayRoute(model.route)) {
		return model.activeEssay?.title ?? "Essay";
	}

	return "Not found";
};

const pageSubtitle = (model: Model): string | undefined => {
	if (isHomeRoute(model.route)) {
		return "Smart reads, sharp takes, questions and answers, interactive playgrounds... follow my personal reading journey.";
	}

	if (isEssaysRoute(model.route)) {
		return "Future essays will appear here once they have provenance metadata and section boundaries.";
	}

	if (isMethodRoute(model.route)) {
		return "How essays mark Human and AI sections.";
	}

	return undefined;
};

const pageBodyContent = (model: Model): Html => {
	if (isHomeRoute(model.route)) {
		return homeView(model);
	}

	if (isEssaysRoute(model.route)) {
		return essaysView(model);
	}

	if (isMethodRoute(model.route)) {
		return methodView();
	}

	if (isEssayRoute(model.route)) {
		return essayView(model);
	}

	return notFoundView(model);
};

export const view = (model: Model): Document => {
	const typedHtml = html<Message>();
	const title = pageTitle(model);
	const bodyContent = pageBodyContent(model);

	return {
		body: typedHtml.main(
			[typedHtml.Class(appShellClass)],
			[
				typedHtml.section(
					[typedHtml.Class("mx-auto grid max-w-6xl gap-8 px-4 py-8 lg:px-8")],
					[headerView(model, title, pageSubtitle(model)), bodyContent],
				),
			],
		),
		title,
	};
};

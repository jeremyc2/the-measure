import type { Html } from "foldkit/html";

type IconFactory = <Message>(
	typedHtml: ReturnType<typeof import("foldkit/html").html<Message>>,
	className: string,
) => Html;

const lucideIcon =
	(paths: ReadonlyArray<string>): IconFactory =>
	(typedHtml, className) =>
		typedHtml.svg(
			[
				typedHtml.Class(className),
				typedHtml.Fill("none"),
				typedHtml.Stroke("currentColor"),
				typedHtml.StrokeLinecap("round"),
				typedHtml.StrokeLinejoin("round"),
				typedHtml.StrokeWidth("2"),
				typedHtml.ViewBox("0 0 24 24"),
				typedHtml.Xmlns("http://www.w3.org/2000/svg"),
				typedHtml.AriaHidden(true),
			],
			paths.map((path) => typedHtml.path([typedHtml.D(path)], [])),
		);

/** Lucide `book-open` for the site mark. */
export const bookOpenIcon: IconFactory = lucideIcon([
	"M12 7v14",
	"M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z",
]);

/** Lucide `sun` for light-mode toggle. */
export const sunIcon: IconFactory = lucideIcon([
	"M12 3v1",
	"M18.364 5.636l-.707.707",
	"M21 12h-1",
	"M18.364 18.364l-.707-.707",
	"M12 21v-1",
	"M4.636 18.364l.707-.707",
	"M3 12h1",
	"M4.636 5.636l.707.707",
	"M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z",
]);

/** Lucide `moon` for dark-mode toggle. */
export const moonIcon: IconFactory = lucideIcon([
	"M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z",
]);

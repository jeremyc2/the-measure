const queries = [
	"The Measure Nikki Erlick official publisher synopsis",
	"The Measure Nikki Erlick reading guide discussion questions",
	"The Measure Nikki Erlick characters summary",
	"The Measure Nikki Erlick interview themes",
	"The Measure Nikki Erlick review themes mortality strings",
];

const seedUrls = [
	"https://www.simonandschuster.com/books/The-Measure/Nikki-Erlick/9780063204201",
	"https://www.nikkierlick.com/the-measure",
	"https://www.readinggroupguides.com/reviews/the-measure/guide",
	"https://www.litlovers.com/reading-guides/fiction/11739-measure-erlick",
];

const decodeHtml = (value) =>
	value
		.replaceAll("&amp;", "&")
		.replaceAll("&quot;", '"')
		.replaceAll("&#x27;", "'")
		.replaceAll("&#39;", "'")
		.replaceAll("&lt;", "<")
		.replaceAll("&gt;", ">")
		.replaceAll("&nbsp;", " ");

const stripTags = (value) => {
	// Replace each HTML tag-like span with a space before decoding entities.
	const withoutTags = value.replace(/<[^>]+>/g, " ");
	// Collapse repeated whitespace introduced by tag removal into single spaces.
	return decodeHtml(withoutTags).replace(/\s+/g, " ").trim();
};

const fetchText = async (url) => {
	try {
		const response = await fetch(url, {
			headers: {
				"user-agent": "Mozilla/5.0 research helper for personal book notes",
			},
		});

		if (!response.ok) {
			console.error(`Fetch failed ${response.status}: ${url}`);
			return undefined;
		}

		return await response.text();
	} catch (error) {
		console.error(`Fetch crashed: ${url}`, error);
		return undefined;
	}
};

const searchDuckDuckGo = async (query) => {
	const url = `https://duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
	const html = await fetchText(url);
	if (html === undefined) {
		return [];
	}

	const results = [];
	// Match each DuckDuckGo result block so the title link and snippet stay associated.
	const resultBlockPattern =
		/<div class="result results_links[\s\S]*?<\/div>\s*<\/div>/g;
	const blocks = html.match(resultBlockPattern) ?? [];

	for (const block of blocks.slice(0, 8)) {
		// Capture the result title anchor href and inner HTML from DuckDuckGo's HTML endpoint.
		const linkMatch = block.match(
			/<a rel="nofollow" class="result__a" href="([^"]+)">([\s\S]*?)<\/a>/,
		);
		if (linkMatch === null) {
			continue;
		}

		const rawHref = decodeHtml(linkMatch[1]);
		const redirectUrl = new URL(rawHref, "https://duckduckgo.com");
		const uddg = redirectUrl.searchParams.get("uddg");
		const resultUrl = uddg ?? rawHref;
		// Capture the optional DuckDuckGo snippet paragraph for quick source triage.
		const snippetMatch = block.match(
			/<a class="result__snippet"[\s\S]*?>([\s\S]*?)<\/a>/,
		);
		const snippet =
			snippetMatch === null ? undefined : stripTags(snippetMatch[1]);

		results.push({
			title: stripTags(linkMatch[2]),
			url: resultUrl,
			snippet,
		});
	}

	return results;
};

const snapshotPage = async (url) => {
	const html = await fetchText(url);
	if (html === undefined) {
		return undefined;
	}

	// Capture the first HTML title tag for a compact citation label.
	const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
	// Capture common meta description content without assuming attribute order across sites.
	const descriptionMatch =
		html.match(
			/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["'][^>]*>/i,
		) ??
		html.match(
			/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']description["'][^>]*>/i,
		);
	// Capture h1-h3 headings to reveal article structure without saving full article text.
	const headingPattern = /<h[1-3][^>]*>([\s\S]*?)<\/h[1-3]>/gi;
	const headings = [...html.matchAll(headingPattern)]
		.map((match) => stripTags(match[1]))
		.filter((heading) => heading.length > 0)
		.slice(0, 20);

	return {
		url,
		title: titleMatch === null ? undefined : stripTags(titleMatch[1]),
		description:
			descriptionMatch === null ? undefined : stripTags(descriptionMatch[1]),
		headings,
	};
};

const outputDir = new URL("../sources/", import.meta.url);
await Bun.write(new URL(".gitkeep", outputDir), "keep\n");

const searchEntries = await Promise.all(
	queries.map(async (query) => ({
		query,
		results: await searchDuckDuckGo(query),
	})),
);

const discoveredUrls = [
	...new Set(
		searchEntries.flatMap((entry) => entry.results.map((result) => result.url)),
	),
];
const urlsToSnapshot = [...new Set([...seedUrls, ...discoveredUrls])].slice(
	0,
	30,
);
const snapshots = (
	await Promise.all(urlsToSnapshot.map((url) => snapshotPage(url)))
).filter((snapshot) => snapshot !== undefined);

await Bun.write(
	new URL("search-results.json", outputDir),
	`${JSON.stringify({ generatedAt: new Date().toISOString(), searchEntries }, null, 2)}\n`,
);
await Bun.write(
	new URL("page-snapshots.json", outputDir),
	`${JSON.stringify({ generatedAt: new Date().toISOString(), snapshots }, null, 2)}\n`,
);

console.log(
	`Wrote ${searchEntries.length} search groups and ${snapshots.length} page snapshots.`,
);

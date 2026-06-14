import { Schema } from "effect";

export const ProvenanceKindSchema = Schema.Literals([
	"ai-assisted",
	"ai-generated",
	"human-authored",
]);

export type ProvenanceKind = typeof ProvenanceKindSchema.Type;

export const ContributionAreaSchema = Schema.Literals([
	"code",
	"interactive",
	"media",
	"prose",
	"structure",
]);

export type ContributionArea = typeof ContributionAreaSchema.Type;

export const ProvenanceSchema = Schema.Struct({
	area: ContributionAreaSchema,
	kind: ProvenanceKindSchema,
	note: Schema.NonEmptyString,
});

export type Provenance = typeof ProvenanceSchema.Type;

export const ProseSectionSchema = Schema.Struct({
	body: Schema.Array(Schema.NonEmptyString),
	heading: Schema.optional(Schema.NonEmptyString),
	id: Schema.NonEmptyString,
	kind: Schema.Literal("prose"),
	provenance: ProvenanceSchema,
});

export type ProseSection = typeof ProseSectionSchema.Type;

export const InteractiveSectionSchema = Schema.Struct({
	componentId: Schema.NonEmptyString,
	description: Schema.NonEmptyString,
	heading: Schema.NonEmptyString,
	id: Schema.NonEmptyString,
	kind: Schema.Literal("interactive"),
	provenance: ProvenanceSchema,
});

export type InteractiveSection = typeof InteractiveSectionSchema.Type;

export const PostSectionSchema = Schema.Union([
	ProseSectionSchema,
	InteractiveSectionSchema,
]);

export type PostSection = typeof PostSectionSchema.Type;

export const BlogPostSummarySchema = Schema.Struct({
	attribution: Schema.Array(ProvenanceSchema),
	backgroundClass: Schema.NonEmptyString,
	publishedAt: Schema.optional(Schema.NonEmptyString),
	slug: Schema.NonEmptyString,
	summary: Schema.optional(Schema.NonEmptyString),
	title: Schema.NonEmptyString,
});

export type BlogPostSummary = typeof BlogPostSummarySchema.Type;

export const BlogPostSchema = Schema.Struct({
	attribution: Schema.Array(ProvenanceSchema),
	backgroundClass: Schema.NonEmptyString,
	publishedAt: Schema.optional(Schema.NonEmptyString),
	sections: Schema.Array(PostSectionSchema),
	slug: Schema.NonEmptyString,
	summary: Schema.optional(Schema.NonEmptyString),
	title: Schema.NonEmptyString,
});

export type BlogPost = typeof BlogPostSchema.Type;

export const provenanceLabel = (kind: ProvenanceKind): string => {
	if (kind === "human-authored") {
		return "Human authored";
	}

	if (kind === "ai-assisted") {
		return "AI assisted";
	}

	return "AI generated";
};

export const summarizePost = (post: BlogPost): BlogPostSummary => ({
	attribution: post.attribution,
	backgroundClass: post.backgroundClass,
	publishedAt: post.publishedAt,
	slug: post.slug,
	summary: post.summary,
	title: post.title,
});

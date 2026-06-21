import { Schema } from "effect";

export const ProvenanceSchema = Schema.Literals(["AI", "Human"]);

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

export const EssaySectionSchema = Schema.Union([
	ProseSectionSchema,
	InteractiveSectionSchema,
]);

export type EssaySection = typeof EssaySectionSchema.Type;

export const EssaySummarySchema = Schema.Struct({
	attribution: Schema.Array(ProvenanceSchema),
	backgroundClass: Schema.NonEmptyString,
	publishedAt: Schema.optional(Schema.NonEmptyString),
	slug: Schema.NonEmptyString,
	summary: Schema.optional(Schema.NonEmptyString),
	title: Schema.NonEmptyString,
});

export type EssaySummary = typeof EssaySummarySchema.Type;

export const EssaySchema = Schema.Struct({
	attribution: Schema.Array(ProvenanceSchema),
	backgroundClass: Schema.NonEmptyString,
	publishedAt: Schema.optional(Schema.NonEmptyString),
	sections: Schema.Array(EssaySectionSchema),
	slug: Schema.NonEmptyString,
	summary: Schema.optional(Schema.NonEmptyString),
	title: Schema.NonEmptyString,
});

export type Essay = typeof EssaySchema.Type;

export const summarizeEssay = (essay: Essay): EssaySummary => ({
	attribution: essay.attribution,
	backgroundClass: essay.backgroundClass,
	publishedAt: essay.publishedAt,
	slug: essay.slug,
	summary: essay.summary,
	title: essay.title,
});

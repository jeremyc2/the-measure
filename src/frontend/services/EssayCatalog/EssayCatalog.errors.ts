import { Schema } from "effect";

export class EssayNotFound extends Schema.TaggedErrorClass<EssayNotFound>()(
	"EssayNotFound",
	{
		slug: Schema.NonEmptyString,
	},
) {
	override get message(): string {
		return `No essay is published at /essays/${this.slug}.`;
	}
}

export class EssayCatalogError extends Schema.TaggedErrorClass<EssayCatalogError>()(
	"EssayCatalogError",
	{
		reason: EssayNotFound,
	},
) {
	override get message(): string {
		return this.reason.message;
	}
}

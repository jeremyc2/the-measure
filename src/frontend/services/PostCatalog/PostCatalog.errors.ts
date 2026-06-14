import { Schema } from "effect";

export class PostNotFound extends Schema.TaggedErrorClass<PostNotFound>()(
	"PostNotFound",
	{
		slug: Schema.NonEmptyString,
	},
) {
	override get message(): string {
		return `No post is published at /posts/${this.slug}.`;
	}
}

export class PostCatalogError extends Schema.TaggedErrorClass<PostCatalogError>()(
	"PostCatalogError",
	{
		reason: PostNotFound,
	},
) {
	override get message(): string {
		return this.reason.message;
	}
}

import { Schema } from "effect";
import { Navigation, Url } from "foldkit";
import { m as createMessage } from "foldkit/message";
import {
	BlogPostSchema,
	BlogPostSummarySchema,
} from "../../shared/the-measure";

export const ClickedToggleColorScheme = createMessage(
	"ClickedToggleColorScheme",
);
export const ChangedUrl = createMessage("ChangedUrl", {
	url: Url.Url,
});
export const RequestedUrl = createMessage("RequestedUrl", {
	request: Navigation.UrlRequest,
});
export const SucceededNavigation = createMessage("SucceededNavigation");
export const FailedNavigation = createMessage("FailedNavigation", {
	message: Schema.String,
});
export const SucceededPostCatalogLoad = createMessage(
	"SucceededPostCatalogLoad",
	{
		posts: Schema.Array(BlogPostSummarySchema),
	},
);
export const FailedPostCatalogLoad = createMessage("FailedPostCatalogLoad", {
	message: Schema.String,
});
export const SucceededPostLoad = createMessage("SucceededPostLoad", {
	post: BlogPostSchema,
});
export const FailedPostLoad = createMessage("FailedPostLoad", {
	message: Schema.String,
});

export const Message = Schema.Union([
	ClickedToggleColorScheme,
	ChangedUrl,
	RequestedUrl,
	SucceededNavigation,
	FailedNavigation,
	SucceededPostCatalogLoad,
	FailedPostCatalogLoad,
	SucceededPostLoad,
	FailedPostLoad,
]);

export type Message = typeof Message.Type;

import { Schema } from "effect";
import { Navigation, Url } from "foldkit";
import { m as createMessage } from "foldkit/message";
import { EssaySchema, EssaySummarySchema } from "../../shared/the-measure";

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
export const SucceededEssayCatalogLoad = createMessage(
	"SucceededEssayCatalogLoad",
	{
		essays: Schema.Array(EssaySummarySchema),
	},
);
export const FailedEssayCatalogLoad = createMessage("FailedEssayCatalogLoad", {
	message: Schema.String,
});
export const SucceededEssayLoad = createMessage("SucceededEssayLoad", {
	essay: EssaySchema,
});
export const FailedEssayLoad = createMessage("FailedEssayLoad", {
	message: Schema.String,
});

export const Message = Schema.Union([
	ClickedToggleColorScheme,
	ChangedUrl,
	RequestedUrl,
	SucceededNavigation,
	FailedNavigation,
	SucceededEssayCatalogLoad,
	FailedEssayCatalogLoad,
	SucceededEssayLoad,
	FailedEssayLoad,
]);

export type Message = typeof Message.Type;

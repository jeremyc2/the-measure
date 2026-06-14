import { Runtime } from "foldkit";
import { init } from "./app/init";
import { ChangedUrl, Message, RequestedUrl } from "./app/messages";
import { Model } from "./app/model";
import { update } from "./app/update";
import { view } from "./app/view";
import { PostCatalog } from "./services/PostCatalog/PostCatalog";

const program = Runtime.makeApplication({
	Model,
	container: document.getElementById("root"),
	devTools: {
		Message,
		banner: "The Measure reading companion model",
		mode: {
			development: "TimeTravel",
			production: "Inspect",
		},
		show: "Always",
	},
	init,
	resources: PostCatalog.layer,
	routing: {
		onUrlChange: (url) => ChangedUrl({ url }),
		onUrlRequest: (request) => RequestedUrl({ request }),
	},
	update,
	view,
});

Runtime.run(program);

import { httpRouter } from "convex/server";
import { Webhook } from "svix";
import { api } from "./_generated/api";
import { httpAction } from "./_generated/server";

const http = httpRouter();

http.route({
	path: "/clerk-webhook",
	method: "POST",
	handler: httpAction(async (ctx, request) => {
		const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
		if (!webhookSecret) {
			throw new Error(
				"Missing CLERK_WEBHOOK_SECRET environment variable."
			);
		}

		const svix_id = request.headers.get("svix-id");
		const svix_signature = request.headers.get("svix-signature");
		const svix_timestamp = request.headers.get("svix-timestamp");
		if (!svix_id || !svix_signature || !svix_timestamp) {
			return new Response("Unauthorized - No svix headers found.", {
				status: 400,
			});
		}

		const payload = await request.json();
		const body = JSON.stringify(payload);
		const webhook = new Webhook(webhookSecret);
		let event: any;
		try {
			event = webhook.verify(body, {
				"svix-id": svix_id,
				"svix-signature": svix_signature,
				"svix-timestamp": svix_timestamp,
			});
		} catch (error) {
			console.log(error);
			return new Response("Internal Server Error", { status: 400 });
		}

		const eventType = event.type;
		if (eventType === "user.created") {
			const { id, email_addresses, first_name, last_name, image_url } =
				event.data;

			const email = email_addresses[0].email_address;
			const fullname = `${first_name || ""} ${last_name || ""}`.trim();

			try {
				await ctx.runMutation(api.users.createUser, {
					username: email.split("@")[0],
					fullname: fullname,
					email: email,
					image: image_url,
					clerkId: id,
				});
			} catch (error) {
				console.log(error);
				return new Response("Internal Server Error", { status: 400 });
			}
		}

		return new Response("Webhook processed successfully.", { status: 200 });
	}),
});

export default http;

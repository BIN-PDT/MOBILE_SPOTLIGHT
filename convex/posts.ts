import { v } from "convex/values";
import { mutation } from "./_generated/server";

export const generateUploadUrl = mutation(async (ctx) => {
	const identity = await ctx.auth.getUserIdentity();
	if (!identity) throw new Error("Unauthorized - Require logged in.");
	return await ctx.storage.generateUploadUrl();
});

export const createPost = mutation({
	args: {
		storageId: v.id("_storage"),
		caption: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) throw new Error("Unauthorized - Require logged in.");

		const currentUser = await ctx.db
			.query("users")
			.withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
			.first();
		if (!currentUser) throw new Error("User not found.");

		const imageUrl = await ctx.storage.getUrl(args.storageId);
		if (!imageUrl) throw new Error("Image not found.");

		const postId = await ctx.db.insert("posts", {
			...args,
			userId: currentUser._id,
			imageUrl: imageUrl,
			likes: 0,
			comments: 0,
		});

		await ctx.db.patch(currentUser._id, {
			posts: currentUser.posts + 1,
		});

		return postId;
	},
});

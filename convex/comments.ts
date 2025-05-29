import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthenticatedUser } from "./users";

export const getComments = query({
	args: { postId: v.id("posts") },
	handler: async (ctx, args) => {
		const comments = await ctx.db
			.query("comments")
			.withIndex("by_post", (q) => q.eq("postId", args.postId))
			.collect();

		if (comments.length === 0) return [];
		const commentsWithInfo = await Promise.all(
			comments.map(async (comment) => {
				const commentUser = await ctx.db.get(comment.userId);

				return {
					...comment,
					user: {
						fullname: commentUser?.fullname,
						image: commentUser?.image,
					},
				};
			})
		);
		return commentsWithInfo;
	},
});

export const createComment = mutation({
	args: {
		content: v.string(),
		postId: v.id("posts"),
	},
	handler: async (ctx, args) => {
		const currentUser = await getAuthenticatedUser(ctx);

		const existingPost = await ctx.db.get(args.postId);
		if (!existingPost) throw new Error("Post not found.");

		const commentId = await ctx.db.insert("comments", {
			userId: currentUser._id,
			postId: args.postId,
			content: args.content,
		});

		await ctx.db.patch(args.postId, {
			comments: existingPost.comments + 1,
		});

		if (existingPost.userId !== currentUser._id) {
			await ctx.db.insert("notifications", {
				receiverId: existingPost.userId,
				senderId: currentUser._id,
				type: "comment",
				postId: existingPost._id,
				commentId: commentId,
			});
		}
	},
});

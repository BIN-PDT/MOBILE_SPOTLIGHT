import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthenticatedUser } from "./users";

export const toggleBookmark = mutation({
	args: { postId: v.id("posts") },
	handler: async (ctx, args) => {
		const currentUser = await getAuthenticatedUser(ctx);

		const existingPost = await ctx.db.get(args.postId);
		if (!existingPost) throw new Error("Post not found.");

		const existingBookmarkObj = await ctx.db
			.query("bookmarks")
			.withIndex("by_user_and_post", (q) =>
				q.eq("userId", currentUser._id).eq("postId", args.postId)
			)
			.first();
		if (existingBookmarkObj) {
			await ctx.db.delete(existingBookmarkObj._id);
			return false;
		} else {
			await ctx.db.insert("bookmarks", {
				userId: currentUser._id,
				postId: args.postId,
			});
			return true;
		}
	},
});

export const getBookmarks = query({
	handler: async (ctx) => {
		const currentUser = await getAuthenticatedUser(ctx);

		const bookmarks = await ctx.db
			.query("bookmarks")
			.withIndex("by_user", (q) => q.eq("userId", currentUser._id))
			.order("desc")
			.collect();

		if (bookmarks.length === 0) return [];
		const bookmarksWithInfo = await Promise.all(
			bookmarks.map(async (bookmark) => {
				const markedPost = ctx.db.get(bookmark.postId);

				return markedPost;
			})
		);
		return bookmarksWithInfo;
	},
});

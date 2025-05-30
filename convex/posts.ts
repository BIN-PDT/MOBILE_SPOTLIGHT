import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthenticatedUser } from "./users";

export const generateUploadUrl = mutation(async (ctx) => {
	await getAuthenticatedUser(ctx);
	return await ctx.storage.generateUploadUrl();
});

export const listPost = query({
	handler: async (ctx) => {
		const currentUser = await getAuthenticatedUser(ctx);

		const posts = await ctx.db.query("posts").order("desc").collect();

		if (posts.length === 0) return [];
		const postsWithInfo = await Promise.all(
			posts.map(async (post) => {
				const postAuthor = (await ctx.db.get(post.userId))!;
				const likeObj = await ctx.db
					.query("likes")
					.withIndex("by_user_and_post", (q) =>
						q.eq("userId", currentUser._id).eq("postId", post._id)
					)
					.first();
				const bookmarkObj = await ctx.db
					.query("bookmarks")
					.withIndex("by_user_and_post", (q) =>
						q.eq("userId", currentUser._id).eq("postId", post._id)
					)
					.first();

				return {
					...post,
					author: {
						_id: postAuthor?._id,
						username: postAuthor?.username,
						image: postAuthor?.image,
					},
					isLiked: Boolean(likeObj),
					isBookmarked: Boolean(bookmarkObj),
				};
			})
		);
		return postsWithInfo;
	},
});

export const createPost = mutation({
	args: {
		storageId: v.id("_storage"),
		caption: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const currentUser = await getAuthenticatedUser(ctx);

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

export const deletePost = mutation({
	args: {
		postId: v.id("posts"),
	},
	handler: async (ctx, args) => {
		const currentUser = await getAuthenticatedUser(ctx);

		const existingPost = await ctx.db.get(args.postId);
		if (!existingPost) throw new Error("Post not found.");
		if (existingPost.userId !== currentUser._id)
			throw new Error("You aren't authorized to delete this post.");
		// DELETE ASSOCIATED LIKE.
		const likeObjs = await ctx.db
			.query("likes")
			.withIndex("by_post", (q) => q.eq("postId", args.postId))
			.collect();
		for (const likeObj of likeObjs) {
			await ctx.db.delete(likeObj._id);
		}
		// DELETE ASSOCIATED COMMENT.
		const commentObjs = await ctx.db
			.query("comments")
			.withIndex("by_post", (q) => q.eq("postId", args.postId))
			.collect();
		for (const commentObj of commentObjs) {
			await ctx.db.delete(commentObj._id);
		}
		// DELETE ASSOCIATED BOOKMARK.
		const bookmarkObjs = await ctx.db
			.query("bookmarks")
			.withIndex("by_post", (q) => q.eq("postId", args.postId))
			.collect();
		for (const bookmarkObj of bookmarkObjs) {
			await ctx.db.delete(bookmarkObj._id);
		}
		// DELETE ASSOCIATED NOTIFICATIONS.
		const notificationObjs = await ctx.db
			.query("notifications")
			.withIndex("by_post", (q) => q.eq("postId", args.postId))
			.collect();
		for (const notificationObj of notificationObjs) {
			await ctx.db.delete(notificationObj._id);
		}
		// DELETE MEDIA FILE.
		await ctx.storage.delete(existingPost.storageId);
		// DELETE POST.
		await ctx.db.delete(args.postId);
		// UPDATE USER INFORMATION.
		await ctx.db.patch(currentUser._id, {
			posts: Math.max(0, currentUser.posts - 1),
		});
	},
});

export const toggleLike = mutation({
	args: { postId: v.id("posts") },
	handler: async (ctx, args) => {
		const currentUser = await getAuthenticatedUser(ctx);

		const existingPost = await ctx.db.get(args.postId);
		if (!existingPost) throw new Error("Post not found.");

		const existingLikeObj = await ctx.db
			.query("likes")
			.withIndex("by_user_and_post", (q) =>
				q.eq("userId", currentUser._id).eq("postId", args.postId)
			)
			.first();
		if (existingLikeObj) {
			await ctx.db.delete(existingLikeObj._id);
			await ctx.db.patch(args.postId, { likes: existingPost.likes - 1 });
			return false;
		} else
			await ctx.db.insert("likes", {
				userId: currentUser._id,
				postId: args.postId,
			});
		await ctx.db.patch(args.postId, { likes: existingPost.likes + 1 });

		if (currentUser._id !== existingPost.userId) {
			await ctx.db.insert("notifications", {
				receiverId: existingPost.userId,
				senderId: currentUser._id,
				type: "like",
				postId: args.postId,
			});
		}

		return true;
	},
});

export const getPostsByUser = query({
	args: {
		userId: v.optional(v.id("users")),
	},
	handler: async (ctx, args) => {
		const user = args.userId
			? await ctx.db.get(args.userId)
			: await getAuthenticatedUser(ctx);
		if (!user) throw new Error("User not found.");

		const posts = await ctx.db
			.query("posts")
			.withIndex("by_user", (q) => q.eq("userId", user._id))
			.collect();

		return posts;
	},
});

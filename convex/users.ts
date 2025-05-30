import { v } from "convex/values";
import { Id } from "./_generated/dataModel";
import { mutation, MutationCtx, query, QueryCtx } from "./_generated/server";

export async function getAuthenticatedUser(ctx: QueryCtx | MutationCtx) {
	const identity = await ctx.auth.getUserIdentity();
	if (!identity) throw new Error("Unauthorized - Require logged in.");

	const currentUser = await ctx.db
		.query("users")
		.withIndex("by_clerk_id", (q) => q.eq("clerkId", identity.subject))
		.first();
	if (!currentUser) throw new Error("User not found.");

	return currentUser;
}

export const listUser = query({
	handler: async (ctx) => {
		const currentUser = await getAuthenticatedUser(ctx);

		const users = await ctx.db
			.query("users")
			.filter((q) => q.neq(q.field("_id"), currentUser._id))
			.collect();

		if (users.length === 0) return [];
		const usersWithInfo = await Promise.all(
			users.map((user) => ({ ...user, hasStory: user.posts > 0 }))
		);
		return usersWithInfo;
	},
});

export const createUser = mutation({
	args: {
		username: v.string(),
		fullname: v.string(),
		email: v.string(),
		bio: v.optional(v.string()),
		image: v.string(),
		clerkId: v.string(),
	},
	handler: async (ctx, args) => {
		const existingUser = await ctx.db
			.query("users")
			.withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
			.first();
		if (existingUser) return;

		await ctx.db.insert("users", {
			...args,
			followers: 0,
			following: 0,
			posts: 0,
		});
	},
});

export const getUserById = query({
	args: { id: v.id("users") },
	handler: async (ctx, args) => {
		const user = await ctx.db.get(args.id);
		if (!user) throw new Error("User not found.");

		return user;
	},
});

export const getUserByClerkId = query({
	args: { clerkId: v.string() },
	handler: async (ctx, args) => {
		const user = await ctx.db
			.query("users")
			.withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
			.unique();

		return user;
	},
});

export const updateUser = mutation({
	args: {
		fullname: v.string(),
		bio: v.optional(v.string()),
	},
	handler: async (ctx, args) => {
		const currentUser = await getAuthenticatedUser(ctx);

		await ctx.db.patch(currentUser._id, {
			fullname: args.fullname,
			bio: args.bio,
		});
	},
});

export const isFollowing = query({
	args: { followingId: v.id("users") },
	handler: async (ctx, args) => {
		const currentUser = await getAuthenticatedUser(ctx);

		const followObj = await ctx.db
			.query("follows")
			.withIndex("by_both", (q) =>
				q
					.eq("followerId", currentUser._id)
					.eq("followingId", args.followingId)
			)
			.first();

		return Boolean(followObj);
	},
});

export const toggleFollow = mutation({
	args: { followingId: v.id("users") },
	handler: async (ctx, args) => {
		const currentUser = await getAuthenticatedUser(ctx);

		const existingFollow = await ctx.db
			.query("follows")
			.withIndex("by_both", (q) =>
				q
					.eq("followerId", currentUser._id)
					.eq("followingId", args.followingId)
			)
			.first();

		if (existingFollow) {
			await ctx.db.delete(existingFollow._id);
			await updateFollowCounts(
				ctx,
				currentUser._id,
				args.followingId,
				false
			);
		} else {
			await ctx.db.insert("follows", {
				followerId: currentUser._id,
				followingId: args.followingId,
			});
			await updateFollowCounts(
				ctx,
				currentUser._id,
				args.followingId,
				true
			);

			await ctx.db.insert("notifications", {
				receiverId: args.followingId,
				senderId: currentUser._id,
				type: "follow",
			});
		}
	},
});

async function updateFollowCounts(
	ctx: MutationCtx,
	followerId: Id<"users">,
	followingId: Id<"users">,
	isFollow: boolean
) {
	const follower = await ctx.db.get(followerId);
	const following = await ctx.db.get(followingId);

	if (follower && following) {
		await ctx.db.patch(followerId, {
			following: follower.following + (isFollow ? 1 : -1),
		});
		await ctx.db.patch(followingId, {
			followers: following.followers + (isFollow ? 1 : -1),
		});
	}
}

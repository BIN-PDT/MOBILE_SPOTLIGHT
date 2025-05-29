import { COLORS } from "@/constants/theme";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { styles } from "@/styles/feed.style";
import { useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";
import { formatDistanceToNow } from "date-fns";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import CommentModal from "./CommentModal";

type PostProps = {
	post: {
		_id: Id<"posts">;
		imageUrl: string;
		caption?: string;
		likes: number;
		comments: number;
		_creationTime: number;
		author: {
			_id: string;
			username: string;
			image: string;
		};
		isLiked: boolean;
		isBookmarked: boolean;
	};
};

export default function Post({ post }: PostProps) {
	const { user } = useUser();
	const [isLiked, setIsLiked] = useState(post.isLiked);
	const [isBookmarked, setIsBookmarked] = useState(false);
	const [likeCount, setLikeCount] = useState(post.likes);
	const [commentCount, setCommentCount] = useState(post.comments);
	const [showCommentModel, setShowCommentModel] = useState(false);

	const currentUser = useQuery(api.users.getUserByClerkId, {
		clerkId: user?.id || "",
	});
	const toggleLike = useMutation(api.posts.toggleLike);
	const toggleBookmark = useMutation(api.bookmarks.toggleBookmark);
	const deletePost = useMutation(api.posts.deletePost);

	const handleLike = async () => {
		try {
			const newIsLiked = await toggleLike({ postId: post._id });

			setIsLiked(newIsLiked);
			setLikeCount((prev) => (newIsLiked ? prev + 1 : prev - 1));
		} catch (error) {
			console.log(error);
		}
	};

	const handleBookmark = async () => {
		try {
			const newIsBookmarked = await toggleBookmark({ postId: post._id });

			setIsBookmarked(newIsBookmarked);
		} catch (error) {
			console.log(error);
		}
	};

	const handleDeletePost = async () => {
		try {
			await deletePost({ postId: post._id });
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<View style={styles.post}>
			{/* HEADER */}
			<View style={styles.postHeader}>
				<Link href={"/"}>
					<TouchableOpacity style={styles.postHeaderLeft}>
						<Image
							source={post.author.image}
							style={styles.postAvatar}
							contentFit="cover"
							transition={200}
							cachePolicy="memory-disk"
						/>
						<Text style={styles.postUsername}>
							{post.author.username}
						</Text>
					</TouchableOpacity>
				</Link>
				{/* ACTION */}
				{post.author._id === currentUser?._id ? (
					<TouchableOpacity onPress={handleDeletePost}>
						<Ionicons
							name="trash-outline"
							size={20}
							color={COLORS.primary}
						/>
					</TouchableOpacity>
				) : (
					<TouchableOpacity>
						<Ionicons
							name="ellipsis-horizontal"
							size={20}
							color={COLORS.white}
						/>
					</TouchableOpacity>
				)}
			</View>
			{/* IMAGE */}
			<Image
				source={post.imageUrl}
				style={styles.postImage}
				contentFit="cover"
				transition={200}
				cachePolicy="memory-disk"
			/>
			{/* ACTION */}
			<View style={styles.postActions}>
				<View style={styles.postActionsLeft}>
					<TouchableOpacity onPress={handleLike}>
						<Ionicons
							name={isLiked ? "heart" : "heart-outline"}
							size={24}
							color={isLiked ? COLORS.primary : COLORS.white}
						/>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => setShowCommentModel(true)}>
						<Ionicons
							name="chatbubble-outline"
							size={24}
							color={COLORS.white}
						/>
					</TouchableOpacity>
				</View>
				<TouchableOpacity onPress={handleBookmark}>
					<Ionicons
						name={isBookmarked ? "bookmark" : "bookmark-outline"}
						size={24}
						color={COLORS.white}
					/>
				</TouchableOpacity>
			</View>
			{/* INFO */}
			<View style={styles.postInfo}>
				<Text style={styles.likesText}>
					{likeCount > 0
						? `${likeCount} likes`
						: "Be the first to like"}
				</Text>
				{post.caption && (
					<View style={styles.captionContainer}>
						<Text style={styles.captionUsername}>
							{post.author.username}
						</Text>
						<Text style={styles.captionText}>{post.caption}</Text>
					</View>
				)}

				{commentCount > 0 && (
					<TouchableOpacity onPress={() => setShowCommentModel(true)}>
						<Text style={styles.commentsText}>
							View all {commentCount} comments
						</Text>
					</TouchableOpacity>
				)}

				<Text style={styles.timeAgo}>
					{formatDistanceToNow(post._creationTime, {
						addSuffix: true,
					})}
				</Text>
			</View>

			<CommentModal
				postId={post._id}
				visible={showCommentModel}
				onClose={() => setShowCommentModel(false)}
				onSubmit={() => setCommentCount((prev) => prev + 1)}
			/>
		</View>
	);
}

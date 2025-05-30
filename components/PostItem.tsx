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

type PostItemProps = {
	item: {
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

export default function PostItem({ item }: PostItemProps) {
	const { user } = useUser();
	const [isLiked, setIsLiked] = useState(item.isLiked);
	const [isBookmarked, setIsBookmarked] = useState(item.isBookmarked);
	const [showCommentModel, setShowCommentModel] = useState(false);

	const currentUser = useQuery(
		api.users.getUserByClerkId,
		user ? { clerkId: user.id } : "skip"
	);
	const toggleLike = useMutation(api.posts.toggleLike);
	const toggleBookmark = useMutation(api.bookmarks.toggleBookmark);
	const deletePost = useMutation(api.posts.deletePost);

	const handleLike = async () => {
		try {
			const newIsLiked = await toggleLike({ postId: item._id });

			setIsLiked(newIsLiked);
		} catch (error) {
			console.log(error);
		}
	};

	const handleBookmark = async () => {
		try {
			const newIsBookmarked = await toggleBookmark({ postId: item._id });

			setIsBookmarked(newIsBookmarked);
		} catch (error) {
			console.log(error);
		}
	};

	const handleDeletePost = async () => {
		try {
			await deletePost({ postId: item._id });
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<View style={styles.post}>
			{/* HEADER */}
			<View style={styles.postHeader}>
				{/* AUTHOR */}
				<Link
					href={
						item.author._id === currentUser?._id
							? "/(tabs)/profile"
							: `/user/${item.author._id}`
					}
					asChild
				>
					<TouchableOpacity style={styles.postHeaderLeft}>
						<Image
							source={item.author.image}
							style={styles.postAvatar}
							contentFit="cover"
							transition={200}
							cachePolicy="memory-disk"
						/>
						<Text style={styles.postUsername}>
							{item.author.username}
						</Text>
					</TouchableOpacity>
				</Link>
				{/* ACTION */}
				{item.author._id === currentUser?._id && (
					<TouchableOpacity onPress={handleDeletePost}>
						<Ionicons
							name="trash-outline"
							size={20}
							color={COLORS.primary}
						/>
					</TouchableOpacity>
				)}
			</View>
			{/* IMAGE & CAPTION */}
			<View>
				<Image
					source={item.imageUrl}
					style={styles.postImage}
					contentFit="cover"
					transition={200}
					cachePolicy="memory-disk"
				/>

				{item.caption && (
					<View style={styles.captionContainer}>
						<Text style={styles.captionText} numberOfLines={3}>
							{item.caption}
						</Text>
					</View>
				)}
			</View>
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
				<View style={styles.postStats}>
					<Text style={styles.statText}>{item.likes} likes</Text>
					<Text style={styles.statText}>
						{item.comments} comments
					</Text>
				</View>

				<Text style={styles.timeAgo}>
					{formatDistanceToNow(item._creationTime, {
						addSuffix: true,
					})}
				</Text>
			</View>

			<CommentModal
				postId={item._id}
				visible={showCommentModel}
				onClose={() => setShowCommentModel(false)}
			/>
		</View>
	);
}

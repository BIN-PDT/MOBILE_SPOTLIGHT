import { COLORS } from "@/constants/theme";
import { Id } from "@/convex/_generated/dataModel";
import { styles } from "@/styles/notification.style";
import { Ionicons } from "@expo/vector-icons";
import { formatDistanceToNow } from "date-fns";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

type NotificationItemProps = {
	item: {
		_id: Id<"notifications">;
		_creationTime: number;
		postId?: Id<"posts"> | undefined;
		commentId?: Id<"comments"> | undefined;
		type: "like" | "comment" | "follow";
		receiverId: Id<"users">;
		senderId: Id<"users">;
		sender: {
			_id: Id<"users">;
			username: string;
			image: string;
		};
		post: {
			_id: Id<"posts">;
			_creationTime: number;
			caption?: string | undefined;
			comments: number;
			userId: Id<"users">;
			imageUrl: string;
			storageId: Id<"_storage">;
			likes: number;
		} | null;
		comment: {
			content?: string;
		};
	};
};

export default function NotificationItem({ item }: NotificationItemProps) {
	return (
		<View style={styles.notificationItem}>
			<View style={styles.notificationContent}>
				{/* SENDER AVATAR */}
				<Link href={`/user/${item.senderId}`} asChild>
					<TouchableOpacity style={styles.avatarContainer}>
						<Image
							source={item.sender.image}
							style={styles.avatar}
							contentFit="cover"
							transition={200}
						/>
						<View style={styles.iconBadge}>
							{item.type === "like" ? (
								<Ionicons
									name="heart"
									size={14}
									color={COLORS.primary}
								/>
							) : item.type === "follow" ? (
								<Ionicons
									name="person-add"
									size={14}
									color="#8B5CF6"
								/>
							) : (
								<Ionicons
									name="chatbubble"
									size={14}
									color="#3B82F6"
								/>
							)}
						</View>
					</TouchableOpacity>
				</Link>
				{/* NOTIFICATION INFO */}
				<View style={styles.notificationInfo}>
					<Link href={`/user/${item.senderId}`} asChild>
						<TouchableOpacity>
							<Text style={styles.username}>
								{item.sender.username}
							</Text>
						</TouchableOpacity>
					</Link>

					<Text style={styles.action}>
						{item.type == "follow"
							? "Started following you!"
							: item.type === "like"
								? "Liked your post!"
								: "Commented your post!"}
					</Text>

					<Text style={styles.timeAgo}>
						{formatDistanceToNow(item._creationTime, {
							addSuffix: true,
						})}
					</Text>
				</View>
			</View>
			{/* POST IMAGE */}
			{item.post && (
				<Image
					source={item.post.imageUrl}
					style={styles.postImage}
					contentFit="cover"
					transition={200}
				/>
			)}
		</View>
	);
}

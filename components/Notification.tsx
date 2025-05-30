import { COLORS } from "@/constants/theme";
import { Id } from "@/convex/_generated/dataModel";
import { styles } from "@/styles/notification.style";
import { Ionicons } from "@expo/vector-icons";
import { formatDistanceToNow } from "date-fns";
import { Image } from "expo-image";
import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

type NotificationProps = {
	notification: {
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

export default function Notification({ notification }: NotificationProps) {
	return (
		<View style={styles.notificationItem}>
			<View style={styles.notificationContent}>
				{/* SENDER AVATAR */}
				<Link href={`/notifications`} asChild>
					<TouchableOpacity style={styles.avatarContainer}>
						<Image
							source={notification.sender.image}
							style={styles.avatar}
							contentFit="cover"
							transition={200}
						/>
						<View style={styles.iconBadge}>
							{notification.type === "like" ? (
								<Ionicons
									name="heart"
									size={14}
									color={COLORS.primary}
								/>
							) : notification.type === "follow" ? (
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
					<Link href={`/notifications`} asChild>
						<TouchableOpacity>
							<Text style={styles.username}>
								{notification.sender.username}
							</Text>
						</TouchableOpacity>
					</Link>

					<Text style={styles.action}>
						{notification.type == "follow"
							? "started following you"
							: notification.type === "like"
								? "liked your post"
								: `commented: "${notification.comment.content}"`}
					</Text>

					<Text style={styles.timeAgo}>
						{formatDistanceToNow(notification._creationTime, {
							addSuffix: true,
						})}
					</Text>
				</View>
			</View>
			{/* POST IMAGE */}
			{notification.post && (
				<Image
					source={notification.post.imageUrl}
					style={styles.postImage}
					contentFit="cover"
					transition={200}
				/>
			)}
		</View>
	);
}

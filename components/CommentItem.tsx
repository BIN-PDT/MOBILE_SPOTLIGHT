import { Id } from "@/convex/_generated/dataModel";
import { styles } from "@/styles/feed.style";
import { formatDistanceToNow } from "date-fns";
import { Image, Text, View } from "react-native";

type CommentItemProps = {
	item: {
		_id: Id<"comments">;
		_creationTime: number;
		postId: Id<"posts">;
		userId: Id<"users">;
		content: string;
		user: {
			fullname: string | undefined;
			image: string | undefined;
		};
	};
};

export default function CommentItem({ item }: CommentItemProps) {
	return (
		<View style={styles.commentContainer}>
			<Image
				source={{ uri: item.user.image }}
				style={styles.commentAvatar}
			/>
			<View style={styles.commentContent}>
				<Text style={styles.commentUsername}>{item.user.fullname}</Text>
				<Text style={styles.commentText}>{item.content}</Text>
				<Text style={styles.commentTime}>
					{formatDistanceToNow(item._creationTime, {
						addSuffix: true,
					})}
				</Text>
			</View>
		</View>
	);
}

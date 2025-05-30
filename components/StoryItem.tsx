import { Id } from "@/convex/_generated/dataModel";
import { styles } from "@/styles/feed.style";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

type StoryItemProps = {
	item: {
		hasStory: boolean;
		_id: Id<"users">;
		_creationTime: number;
		bio?: string | undefined;
		image: string;
		posts: number;
		username: string;
		fullname: string;
		email: string;
		followers: number;
		following: number;
		clerkId: string;
	};
};

export default function StoryItem({ item }: StoryItemProps) {
	const router = useRouter();

	return (
		<TouchableOpacity
			style={styles.storyWrapper}
			onPress={() => router.replace(`/user/${item._id}`)}
		>
			<View style={[styles.storyRing, !item.hasStory && styles.noStory]}>
				<Image
					source={{ uri: item.image }}
					style={styles.storyAvatar}
				/>
			</View>
			<Text
				style={styles.storyUsername}
				numberOfLines={1}
				ellipsizeMode="tail"
			>
				{item.username}
			</Text>
		</TouchableOpacity>
	);
}

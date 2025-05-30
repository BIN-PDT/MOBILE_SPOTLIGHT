import { Id } from "@/convex/_generated/dataModel";
import { styles } from "@/styles/feed.style";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

type Story = {
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

export default function Story({ story }: { story: Story }) {
	const router = useRouter();

	return (
		<TouchableOpacity
			style={styles.storyWrapper}
			onPress={() => router.replace(`/user/${story._id}`)}
		>
			<View style={[styles.storyRing, !story.hasStory && styles.noStory]}>
				<Image
					source={{ uri: story.image }}
					style={styles.storyAvatar}
				/>
			</View>
			<Text style={styles.storyUsername}>{story.username}</Text>
		</TouchableOpacity>
	);
}

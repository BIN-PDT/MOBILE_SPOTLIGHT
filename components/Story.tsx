import { api } from "@/convex/_generated/api";
import { styles } from "@/styles/feed.style";
import { useQuery } from "convex/react";
import { ScrollView } from "react-native";
import StoryItem from "./StoryItem";

export default function Story() {
	const stories = useQuery(api.users.listUser);

	if (stories === undefined) return null;
	return (
		stories.length > 0 && (
			<ScrollView
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				style={styles.storiesContainer}
			>
				{stories.map((story) => (
					<StoryItem key={story._id} item={story} />
				))}
			</ScrollView>
		)
	);
}

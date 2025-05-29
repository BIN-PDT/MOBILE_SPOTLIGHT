import Loader from "@/components/Loader";
import Post from "@/components/Post";
import Story from "@/components/Story";
import { COLORS } from "@/constants/theme";
import { api } from "@/convex/_generated/api";
import { styles } from "@/styles/feed.style";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
	const { signOut } = useAuth();
	const posts = useQuery(api.posts.listPost);

	const STORIES = [
		{
			id: "1",
			username: "You",
			avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
			hasStory: false,
		},
	];

	if (posts === undefined) return <Loader />;
	if (posts.length === 0) return <NoPostsFound />;
	return (
		<View style={styles.container}>
			{/* HEADER */}
			<View style={styles.header}>
				<Text style={styles.headerTitle}>spotlight</Text>
				<TouchableOpacity onPress={() => signOut()}>
					<Ionicons
						name="log-out-outline"
						size={24}
						color={COLORS.white}
					/>
				</TouchableOpacity>
			</View>

			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: 60 }}
			>
				{/* STORY SECTION */}
				<ScrollView
					showsHorizontalScrollIndicator={false}
					style={styles.storiesContainer}
				>
					{STORIES.map((story) => (
						<Story key={story.id} story={story} />
					))}
				</ScrollView>
				{/* POST SECTION */}
				{posts.map((post) => (
					<Post key={post._id} post={post} />
				))}
			</ScrollView>
		</View>
	);
}

const NoPostsFound = () => (
	<View
		style={{
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
			backgroundColor: COLORS.background,
		}}
	>
		<Text style={{ fontSize: 20, color: COLORS.primary }}>No post yet</Text>
	</View>
);

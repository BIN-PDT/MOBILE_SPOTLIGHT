import Loader from "@/components/Loader";
import Post from "@/components/Post";
import Story from "@/components/Story";
import { COLORS } from "@/constants/theme";
import { api } from "@/convex/_generated/api";
import { styles } from "@/styles/feed.style";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { useState } from "react";
import {
	FlatList,
	RefreshControl,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

export default function Index() {
	const { signOut } = useAuth();
	const [isRefreshing, setIsRefreshing] = useState(false);
	const posts = useQuery(api.posts.listPost);

	const handleRefresh = () => {
		setIsRefreshing(true);
		setTimeout(() => setIsRefreshing(false), 2000);
	};

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
			{/* CONTENT */}
			<FlatList
				data={posts}
				renderItem={({ item }) => <Post post={item} />}
				keyExtractor={(item) => item._id}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: 60 }}
				ListHeaderComponent={<StorySection />}
				refreshControl={
					<RefreshControl
						refreshing={isRefreshing}
						onRefresh={handleRefresh}
						tintColor={COLORS.primary}
					/>
				}
			/>
		</View>
	);
}

const StorySection = () => {
	const stories = useQuery(api.users.listUser);

	if (stories === undefined) return <Loader />;
	return (
		stories.length > 0 && (
			<ScrollView
				horizontal={true}
				showsHorizontalScrollIndicator={false}
				style={styles.storiesContainer}
			>
				{stories.map((story) => (
					<Story key={story._id} story={story} />
				))}
			</ScrollView>
		)
	);
};

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

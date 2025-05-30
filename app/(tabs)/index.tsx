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
	if (posts.length === 0) return <NoPostFound />;
	return (
		<View style={styles.container}>
			{/* HEADER */}
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Spotlight</Text>
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
				ListHeaderComponent={<Story />}
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

const NoPostFound = () => {
	return (
		<View
			style={{
				backgroundColor: COLORS.background,
				height: "100%",
				justifyContent: "center",
				alignItems: "center",
				gap: 8,
			}}
		>
			<Ionicons name="image-outline" size={32} color={COLORS.grey} />
			<Text
				style={{
					fontFamily: "BarlowCondensed",
					fontSize: 14,
					fontStyle: "italic",
					color: COLORS.grey,
				}}
			>
				No posts yet
			</Text>
		</View>
	);
};

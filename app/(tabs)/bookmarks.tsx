import Loader from "@/components/Loader";
import { COLORS } from "@/constants/theme";
import { api } from "@/convex/_generated/api";
import { styles } from "@/styles/feed.style";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { Image } from "expo-image";
import { ScrollView, Text, View } from "react-native";

export default function Bookmarks() {
	const bookmarkedPosts = useQuery(api.bookmarks.getBookmarks);

	if (bookmarkedPosts === undefined) return <Loader />;
	if (bookmarkedPosts.length === 0) return <NoBookmarkFound />;
	return (
		<View style={styles.container}>
			{/* HEADER */}
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Bookmarks</Text>
			</View>
			{/* CONTENT */}
			<ScrollView
				contentContainerStyle={{
					padding: 8,
					flexDirection: "row",
					flexWrap: "wrap",
					justifyContent: "center",
					gap: 8,
				}}
			>
				{bookmarkedPosts.map((post) => {
					if (!post) return null;
					return (
						<View key={post._id} style={{ width: "30%" }}>
							<Image
								source={post.imageUrl}
								style={{
									width: "100%",
									aspectRatio: 1,
									borderRadius: 4,
								}}
								contentFit="cover"
								transition={200}
								cachePolicy="memory-disk"
							/>
						</View>
					);
				})}
			</ScrollView>
		</View>
	);
}

const NoBookmarkFound = () => {
	return (
		<View
			style={{
				backgroundColor: COLORS.background,
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				gap: 16,
			}}
		>
			<Ionicons name="bookmarks" size={32} color={COLORS.grey} />
			<Text
				style={{
					fontFamily: "BarlowCondensed",
					fontSize: 14,
					fontStyle: "italic",
					color: COLORS.grey,
				}}
			>
				No bookmarked posts yet
			</Text>
		</View>
	);
};

import Loader from "@/components/Loader";
import { COLORS } from "@/constants/theme";
import { api } from "@/convex/_generated/api";
import { styles } from "@/styles/feed.style";
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
				}}
			>
				{bookmarkedPosts.map((post) => {
					if (!post) return null;
					return (
						<View
							key={post._id}
							style={{ width: "33.33%", padding: 1 }}
						>
							<Image
								source={post.imageUrl}
								style={{ width: "100%", aspectRatio: 1 }}
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
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				backgroundColor: COLORS.background,
			}}
		>
			<Text style={{ fontSize: 22, color: COLORS.primary }}>
				No bookmarked posts yet
			</Text>
		</View>
	);
};

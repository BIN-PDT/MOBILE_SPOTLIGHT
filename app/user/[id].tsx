import Loader from "@/components/Loader";
import { COLORS } from "@/constants/theme";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { styles } from "@/styles/profile.style";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
	FlatList,
	Pressable,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

export default function UserProfileScreen() {
	const { id } = useLocalSearchParams();
	const router = useRouter();

	const profile = useQuery(api.users.getUserById, { id: id as Id<"users"> });
	const isFollowing = useQuery(api.users.isFollowing, {
		followingId: id as Id<"users">,
	});
	const posts = useQuery(api.posts.getPostsByUser, {
		userId: id as Id<"users">,
	});
	const toggleFollow = useMutation(api.users.toggleFollow);

	const handleBack = () => {
		if (router.canGoBack()) router.back();
		else router.replace("/(tabs)");
	};

	if (
		profile === undefined ||
		isFollowing === undefined ||
		posts === undefined
	)
		return <Loader />;
	return (
		<View style={styles.container}>
			{/* HEADER */}
			<View style={styles.header}>
				<TouchableOpacity onPress={handleBack}>
					<Ionicons
						name="arrow-back"
						size={24}
						color={COLORS.primary}
					/>
				</TouchableOpacity>
				<Text style={styles.headerProfile}>{profile.username}</Text>
			</View>
			{/* CONTENT */}
			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={styles.profileInfo}>
					{/* AVATAR & STATS */}
					<View style={styles.avatarAndStats}>
						<View style={styles.avatarContainer}>
							<Image
								source={profile.image}
								style={styles.avatar}
								contentFit="cover"
								transition={200}
							/>
							<Text style={styles.name}>{profile.fullname}</Text>
						</View>

						<View style={styles.statsContainer}>
							<View style={styles.statItem}>
								<Text style={styles.statNumber}>
									{profile.posts}
								</Text>
								<Text style={styles.statLabel}>Posts</Text>
							</View>
							<View style={styles.statItem}>
								<Text style={styles.statNumber}>
									{profile.followers}
								</Text>
								<Text style={styles.statLabel}>Followers</Text>
							</View>
							<View style={styles.statItem}>
								<Text style={styles.statNumber}>
									{profile.following}
								</Text>
								<Text style={styles.statLabel}>Following</Text>
							</View>
						</View>
					</View>
					{/* ACTION */}
					<Pressable
						style={[
							styles.followButton,
							isFollowing && styles.followingButton,
						]}
						onPress={() =>
							toggleFollow({ followingId: id as Id<"users"> })
						}
					>
						<Text style={styles.followButtonText}>
							{isFollowing ? "Following" : "Follow"}
						</Text>
					</Pressable>
				</View>
				{/* POST */}
				<View style={styles.postsGrid}>
					{posts.length === 0 ? (
						<View style={styles.noPostsContainer}>
							<Ionicons
								name="images-outline"
								size={32}
								color={COLORS.grey}
							/>
							<Text style={styles.noPostsText}>No posts yet</Text>
						</View>
					) : (
						<FlatList
							data={posts}
							renderItem={({ item }) => (
								<TouchableOpacity style={styles.gridItem}>
									<Image
										source={item.imageUrl}
										style={styles.gridImage}
										contentFit="cover"
										transition={200}
									/>
								</TouchableOpacity>
							)}
							keyExtractor={(item) => item._id}
							numColumns={3}
							scrollEnabled={false}
						/>
					)}
				</View>
			</ScrollView>
		</View>
	);
}

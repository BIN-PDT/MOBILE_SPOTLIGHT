import Loader from "@/components/Loader";
import { COLORS } from "@/constants/theme";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { styles } from "@/styles/profile.style";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";
import { Image } from "expo-image";
import { useState } from "react";
import {
	FlatList,
	Keyboard,
	KeyboardAvoidingView,
	Modal,
	Platform,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";

export default function Profile() {
	const { userId, signOut } = useAuth();
	const currentUser = useQuery(
		api.users.getUserByClerkId,
		userId ? { clerkId: userId } : "skip"
	);

	const [showProfileModal, setShowProfileModal] = useState(false);
	const [editedProfile, setEditedProfile] = useState({
		fullname: currentUser?.fullname || "",
		bio: currentUser?.bio || "",
	});
	const updateProfile = useMutation(api.users.updateUser);

	const [selectedPost, setSelectedPost] = useState<Doc<"posts"> | null>(null);
	const posts = useQuery(api.posts.getPostsByUser, {});

	const handleSaveProfile = async () => {
		await updateProfile(editedProfile);
		setShowProfileModal(false);
	};

	if (!currentUser || posts === undefined) return <Loader />;
	return (
		<View style={styles.container}>
			{/* HEADER */}
			<View style={styles.header}>
				<View style={styles.headerLeft}>
					<Text style={styles.username}>{currentUser.username}</Text>
				</View>
				<View style={styles.headerRight}>
					<TouchableOpacity
						style={styles.headerIcon}
						onPress={() => signOut()}
					>
						<Ionicons
							name="log-out-outline"
							size={24}
							color={COLORS.white}
						/>
					</TouchableOpacity>
				</View>
			</View>

			<ScrollView showsVerticalScrollIndicator={false}>
				<View style={styles.profileInfo}>
					{/* AVATAR & STATS */}
					<View style={styles.avatarAndStats}>
						<View style={styles.avatarContainer}>
							<Image
								source={currentUser.image}
								style={styles.avatar}
								contentFit="cover"
								transition={200}
							/>
						</View>

						<View style={styles.statsContainer}>
							<View style={styles.statItem}>
								<Text style={styles.statNumber}>
									{currentUser.posts}
								</Text>
								<Text style={styles.statLabel}>Posts</Text>
							</View>
							<View style={styles.statItem}>
								<Text style={styles.statNumber}>
									{currentUser.followers}
								</Text>
								<Text style={styles.statLabel}>Followers</Text>
							</View>
							<View style={styles.statItem}>
								<Text style={styles.statNumber}>
									{currentUser.following}
								</Text>
								<Text style={styles.statLabel}>Following</Text>
							</View>
						</View>
					</View>
					{/* INFO */}
					<Text style={styles.name}>{currentUser.fullname}</Text>
					{currentUser.bio && (
						<Text style={styles.bio}>{currentUser.bio}</Text>
					)}
					{/* ACTION */}
					<View style={styles.actionButtons}>
						<TouchableOpacity
							style={styles.editButton}
							onPress={() => setShowProfileModal(true)}
						>
							<Text style={styles.editButtonText}>
								Edit Profile
							</Text>
						</TouchableOpacity>
						<TouchableOpacity style={styles.shareButton}>
							<Ionicons
								name="share-outline"
								size={20}
								color={COLORS.white}
							/>
						</TouchableOpacity>
					</View>
				</View>
				{/* POST */}
				{posts.length === 0 && <NoPostFound />}
				<FlatList
					data={posts}
					numColumns={3}
					scrollEnabled={false}
					renderItem={({ item }) => (
						<TouchableOpacity
							style={styles.gridItem}
							onPress={() => setSelectedPost(item)}
						>
							<Image
								source={item.imageUrl}
								style={styles.gridImage}
								contentFit="cover"
								transition={200}
							/>
						</TouchableOpacity>
					)}
				/>
			</ScrollView>
			{/* EDIT PROFILE MODAL */}
			<Modal
				visible={showProfileModal}
				animationType="slide"
				transparent={true}
				onRequestClose={() => setShowProfileModal(false)}
			>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<KeyboardAvoidingView
						behavior={Platform.OS === "ios" ? "padding" : "height"}
						style={styles.modalContainer}
					>
						<View style={styles.modalContent}>
							{/* HEADER */}
							<View style={styles.modalHeader}>
								<Text style={styles.modalTitle}>
									Edit Profile
								</Text>
								<TouchableOpacity
									onPress={() => setShowProfileModal(false)}
								>
									<Ionicons
										name="close"
										size={24}
										color={COLORS.white}
									/>
								</TouchableOpacity>
							</View>
							{/* CONTENT */}
							<View style={styles.inputContainer}>
								<Text style={styles.inputLabel}>Name</Text>
								<TextInput
									style={styles.input}
									value={editedProfile.fullname}
									onChangeText={(text) =>
										setEditedProfile((prev) => ({
											...prev,
											fullname: text,
										}))
									}
									placeholderTextColor={COLORS.grey}
								/>

								<Text style={styles.inputLabel}>Bio</Text>
								<TextInput
									style={[styles.input, styles.bioInput]}
									value={editedProfile.bio}
									onChangeText={(text) =>
										setEditedProfile((prev) => ({
											...prev,
											bio: text,
										}))
									}
									multiline
									numberOfLines={4}
									placeholderTextColor={COLORS.grey}
								/>
							</View>
							{/* ACTION */}
							<TouchableOpacity
								style={styles.saveButton}
								onPress={handleSaveProfile}
							>
								<Text style={styles.saveButtonText}>
									Save Changes
								</Text>
							</TouchableOpacity>
						</View>
					</KeyboardAvoidingView>
				</TouchableWithoutFeedback>
			</Modal>
			{/* SELECTED IMAGE MODAL */}
			<Modal
				visible={selectedPost !== null}
				animationType="fade"
				transparent={true}
				onRequestClose={() => setSelectedPost(null)}
			>
				<View style={styles.modalBackdrop}>
					{selectedPost && (
						<View style={styles.postDetailContainer}>
							<View style={styles.postDetailHeader}>
								<TouchableOpacity
									onPress={() => setSelectedPost(null)}
								>
									<Ionicons
										name="close"
										size={24}
										color={COLORS.white}
									/>
								</TouchableOpacity>
							</View>

							<Image
								source={selectedPost.imageUrl}
								style={styles.postDetailImage}
								cachePolicy="memory-disk"
							/>
						</View>
					)}
				</View>
			</Modal>
		</View>
	);
}

const NoPostFound = () => {
	return (
		<View
			style={{
				height: "100%",
				backgroundColor: COLORS.background,
				justifyContent: "center",
				alignItems: "center",
			}}
		>
			<Ionicons name="images-outline" size={48} color={COLORS.primary} />
			<Text style={{ fontSize: 20, color: COLORS.white }}>
				No posts yet
			</Text>
		</View>
	);
};

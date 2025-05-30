import { COLORS } from "@/constants/theme";
import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.background,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderBottomWidth: 0.5,
		borderBottomColor: COLORS.surface,
	},
	headerLeft: {
		flexDirection: "row",
		alignItems: "center",
	},
	headerTitle: {
		fontFamily: "Lobster",
		fontSize: 24,
		color: COLORS.primary,
		letterSpacing: 1,
	},
	headerProfile: {
		flex: 1,
		fontFamily: "Lobster",
		fontSize: 16,
		color: COLORS.primary,
		letterSpacing: 1,
		textAlign: "center",
	},
	username: {
		fontSize: 20,
		fontWeight: "700",
		color: COLORS.white,
	},
	headerRight: {
		flexDirection: "row",
		gap: 16,
	},
	headerIcon: {
		padding: 4,
	},
	profileInfo: {
		padding: 16,
	},
	avatarAndStats: {
		marginBottom: 16,
		flexDirection: "row",
		alignItems: "center",
	},
	avatarContainer: {
		marginRight: 32,
		alignItems: "center",
	},
	avatar: {
		width: 86,
		height: 86,
		borderRadius: 43,
		borderWidth: 2,
		borderColor: COLORS.surface,
	},
	statsContainer: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-around",
	},
	statItem: {
		alignItems: "center",
	},
	statNumber: {
		fontFamily: "NewAmsterdam",
		fontSize: 16,
		marginBottom: 4,
		color: COLORS.white,
	},
	statLabel: {
		fontFamily: "NewAmsterdam",
		fontSize: 12,
		color: COLORS.grey,
		letterSpacing: 0.75,
	},
	name: {
		marginTop: 8,
		fontFamily: "BarlowCondensed",
		fontSize: 12,
		textAlign: "center",
		color: COLORS.white,
	},
	actionButtons: {
		marginTop: 8,
		flexDirection: "row",
	},
	editButton: {
		padding: 12,
		backgroundColor: COLORS.surface,
		flex: 1,
		alignItems: "center",
		borderRadius: 8,
	},
	editButtonText: {
		fontFamily: "NewAmsterdam",
		fontSize: 14,
		color: COLORS.white,
		letterSpacing: 0.75,
	},
	gridItem: {
		flex: 1 / 3,
		aspectRatio: 1,
		padding: 1,
	},
	gridImage: {
		flex: 1,
	},
	modalContainer: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		justifyContent: "flex-end",
	},
	modalContent: {
		backgroundColor: COLORS.background,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		padding: 20,
		minHeight: 400,
	},
	modalHeader: {
		marginBottom: 20,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	modalTitle: {
		fontFamily: "Lobster",
		fontSize: 18,
		color: COLORS.white,
		letterSpacing: 1,
	},
	inputContainer: {
		marginBottom: 20,
	},
	inputLabel: {
		marginBottom: 8,
		fontFamily: "NewAmsterdam",
		fontSize: 14,
		color: COLORS.grey,
		letterSpacing: 0.75,
	},
	input: {
		padding: 12,
		marginBottom: 8,
		backgroundColor: COLORS.surface,
		fontFamily: "BarlowCondensed",
		fontSize: 14,
		color: COLORS.white,
		borderRadius: 8,
	},
	bioInput: {
		height: 100,
		textAlignVertical: "top",
	},
	saveButton: {
		padding: 12,
		marginTop: 20,
		backgroundColor: COLORS.primary,
		borderRadius: 8,
	},
	saveButtonText: {
		fontFamily: "NewAmsterdam",
		fontSize: 16,
		color: COLORS.background,
		letterSpacing: 0.75,
		textAlign: "center",
	},
	modalBackdrop: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.9)",
		justifyContent: "center",
	},
	postDetailContainer: {
		maxHeight: height * 0.9,
		backgroundColor: COLORS.background,
	},
	postDetailImage: {
		width: width,
		height: width,
	},
	followButton: {
		paddingHorizontal: 24,
		paddingVertical: 12,
		marginTop: 16,
		backgroundColor: COLORS.primary,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: COLORS.primary,
	},
	followingButton: {
		backgroundColor: COLORS.surface,
	},
	followButtonText: {
		fontFamily: "NewAmsterdam",
		fontSize: 14,
		color: COLORS.white,
		letterSpacing: 0.75,
		textAlign: "center",
	},
	noPostsContainer: {
		paddingVertical: 48,
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		gap: 12,
	},
	noPostsText: {
		fontFamily: "BarlowCondensed",
		fontSize: 14,
		fontStyle: "italic",
		color: COLORS.grey,
	},
	centered: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	postsGrid: {
		flex: 1,
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "space-between",
	},
});

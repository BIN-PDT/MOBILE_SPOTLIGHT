import { COLORS } from "@/constants/theme";
import { Dimensions, Platform, StyleSheet } from "react-native";

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
		borderBottomWidth: 1,
		borderBottomColor: COLORS.surface,
	},
	headerTitle: {
		fontFamily: "Lobster",
		fontSize: 24,
		color: COLORS.primary,
		letterSpacing: 1,
	},
	storiesContainer: {
		padding: 12,
		borderBottomWidth: 1,
		borderBottomColor: COLORS.surface,
	},
	storyWrapper: {
		alignItems: "center",
		marginHorizontal: 8,
		width: 65,
	},
	storyRing: {
		padding: 2,
		marginBottom: 4,
		width: 58,
		height: 58,
		backgroundColor: COLORS.background,
		borderRadius: 34,
		borderWidth: 2,
		borderColor: COLORS.primary,
	},
	noStory: {
		borderColor: COLORS.grey,
	},
	storyAvatar: {
		width: 50,
		height: 50,
		borderRadius: 30,
		borderWidth: 2,
		borderColor: COLORS.background,
	},
	storyUsername: {
		fontFamily: "BarlowCondensed",
		fontSize: 11,
		color: COLORS.white,
		textAlign: "center",
	},
	post: {
		marginBottom: 16,
	},
	postHeader: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		padding: 12,
	},
	postHeaderLeft: {
		flexDirection: "row",
		alignItems: "center",
	},
	postAvatar: {
		width: 32,
		height: 32,
		borderRadius: 16,
		marginRight: 8,
	},
	postUsername: {
		fontFamily: "BarlowCondensed",
		fontSize: 14,
		color: COLORS.white,
	},
	postImage: {
		width: width,
		height: width,
	},
	postActions: {
		padding: 12,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	postActionsLeft: {
		flexDirection: "row",
		alignItems: "center",
		gap: 16,
	},
	postInfo: {
		paddingHorizontal: 12,
	},
	postStats: {
		flexDirection: "row",
		gap: 12,
	},
	statText: {
		marginBottom: 4,
		fontFamily: "BarlowCondensed",
		fontSize: 12,
		fontWeight: "600",
		color: COLORS.white,
	},
	captionContainer: {
		marginTop: 12,
		flexDirection: "row",
		flexWrap: "wrap",
	},
	captionText: {
		marginHorizontal: "auto",
		maxWidth: 300,
		flex: 1,
		fontFamily: "Lobster",
		fontSize: 20,
		color: COLORS.white,
		textAlign: "center",
	},
	timeAgo: {
		fontFamily: "BarlowCondensed",
		fontSize: 12,
		color: COLORS.grey,
	},
	modalContainer: {
		backgroundColor: COLORS.background,
		marginBottom: Platform.OS === "ios" ? 44 : 0,
		flex: 1,
		marginTop: Platform.OS === "ios" ? 44 : 0,
	},
	modalHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 16,
		height: 56,
		borderBottomWidth: 0.5,
		borderBottomColor: COLORS.surface,
	},
	modalTitle: {
		flex: 1,
		fontFamily: "Lobster",
		fontSize: 16,
		color: COLORS.white,
		textAlign: "center",
	},
	commentsList: {
		flex: 1,
	},
	commentContainer: {
		flexDirection: "row",
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderBottomWidth: 0.5,
		borderBottomColor: COLORS.surface,
	},
	commentAvatar: {
		width: 32,
		height: 32,
		borderRadius: 16,
		marginRight: 12,
	},
	commentContent: {
		flex: 1,
	},
	commentUsername: {
		marginBottom: 4,
		fontFamily: "BarlowCondensed",
		fontSize: 12,
		color: COLORS.white,
	},
	commentText: {
		fontFamily: "BarlowCondensed",
		fontSize: 12,
		color: COLORS.white,
		lineHeight: 20,
	},
	commentTime: {
		marginTop: 4,
		fontFamily: "BarlowCondensed",
		fontSize: 11,
		color: COLORS.grey,
	},
	commentInput: {
		padding: 16,
		backgroundColor: COLORS.background,
		flexDirection: "row",
		alignItems: "center",
		borderTopWidth: 0.5,
		borderTopColor: COLORS.surface,
	},
	input: {
		marginRight: 12,
		paddingVertical: 8,
		paddingHorizontal: 16,
		backgroundColor: COLORS.surface,
		flex: 1,
		fontFamily: "BarlowCondensed",
		fontSize: 14,
		color: COLORS.white,
		borderRadius: 10,
	},
	postButton: {
		paddingHorizontal: 6,
		fontFamily: "NewAmsterdam",
		fontSize: 14,
		color: COLORS.primary,
		letterSpacing: 0.75,
	},
	postButtonDisabled: {
		opacity: 0.5,
	},
});

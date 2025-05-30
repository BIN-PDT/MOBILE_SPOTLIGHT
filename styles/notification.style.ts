import { COLORS } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.background,
	},
	header: {
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderBottomWidth: 0.5,
		borderBottomColor: COLORS.surface,
	},
	headerTitle: {
		fontFamily: "Lobster",
		fontSize: 24,
		color: COLORS.primary,
		letterSpacing: 1,
	},
	listContainer: {
		padding: 16,
	},
	notificationItem: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 20,
	},
	notificationContent: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		marginRight: 12,
	},
	avatarContainer: {
		position: "relative",
		marginRight: 12,
	},
	avatar: {
		width: 44,
		height: 44,
		borderRadius: 22,
		borderWidth: 2,
		borderColor: COLORS.surface,
	},
	iconBadge: {
		position: "absolute",
		bottom: -4,
		right: -4,
		backgroundColor: COLORS.background,
		borderRadius: 12,
		width: 24,
		height: 24,
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 2,
		borderColor: COLORS.surface,
	},
	notificationInfo: {
		flex: 1,
	},
	username: {
		marginBottom: 2,
		fontFamily: "BarlowCondensed",
		fontSize: 14,
		color: COLORS.white,
	},
	action: {
		marginBottom: 2,
		fontFamily: "NewAmsterdam",
		fontSize: 11,
		color: COLORS.grey,
		letterSpacing: 0.75,
	},
	timeAgo: {
		fontFamily: "BarlowCondensed",
		fontSize: 12,
		color: COLORS.grey,
	},
	postImage: {
		width: 44,
		height: 44,
		borderRadius: 6,
	},
});

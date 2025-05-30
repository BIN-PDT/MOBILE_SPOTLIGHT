import { COLORS } from "@/constants/theme";
import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: COLORS.background,
	},
	contentContainer: {
		flex: 1,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderBottomWidth: 0.5,
		borderBottomColor: COLORS.surface,
	},
	headerTitle: {
		flex: 1,
		fontFamily: "Lobster",
		fontSize: 18,
		fontWeight: "600",
		color: COLORS.white,
		letterSpacing: 1,
		textAlign: "center",
	},
	contentDisabled: {
		opacity: 0.7,
	},
	shareButton: {
		justifyContent: "center",
		alignItems: "center",
	},
	shareButtonDisabled: {
		opacity: 0.5,
	},
	shareText: {
		fontFamily: "NewAmsterdam",
		fontSize: 18,
		color: COLORS.primary,
		letterSpacing: 0.75,
	},
	shareTextDisabled: {
		color: COLORS.grey,
	},
	emptyImageContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		gap: 12,
	},
	emptyImageText: {
		fontFamily: "BarlowCondensed",
		fontSize: 14,
		fontStyle: "italic",
		color: COLORS.grey,
	},
	content: {
		flex: 1,
	},
	scrollContent: {
		flexGrow: 1,
	},
	imageSection: {
		width: width,
		height: width,
		backgroundColor: COLORS.surface,
		justifyContent: "center",
		alignItems: "center",
	},
	previewImage: {
		width: "100%",
		height: "100%",
	},
	changeImageButton: {
		backgroundColor: "rgba(0, 0, 0, 0.75)",
		position: "absolute",
		padding: 8,
		right: 16,
		bottom: 16,
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
		borderRadius: 8,
	},
	changeImageText: {
		fontFamily: "NewAmsterdam",
		fontSize: 14,
		color: COLORS.white,
		letterSpacing: 0.75,
	},
	inputSection: {
		padding: 16,
		flex: 1,
	},
	captionContainer: {
		flexDirection: "row",
		alignItems: "flex-start",
	},
	userAvatar: {
		width: 36,
		height: 36,
		borderRadius: 18,
		marginRight: 12,
	},
	captionInput: {
		paddingTop: 8,
		minHeight: 40,
		flex: 1,
		fontFamily: "BarlowCondensed",
		fontSize: 16,
		color: COLORS.white,
	},
});

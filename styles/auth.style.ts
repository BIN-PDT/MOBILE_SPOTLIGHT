import { COLORS } from "@/constants/theme";
import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
	container: {
		backgroundColor: COLORS.background,
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	brandSection: {
		alignItems: "center",
	},
	logoContainer: {
		backgroundColor: "rgba(74, 222, 128, 0.15)",
		marginBottom: 8,
		width: 60,
		height: 60,
		borderRadius: 18,
		justifyContent: "center",
		alignItems: "center",
	},
	appName: {
		fontSize: 42,
		fontFamily: "Lobster",
		color: COLORS.primary,
		letterSpacing: 2,
	},
	illustrationSection: {
		justifyContent: "center",
		marginVertical: 12,
		paddingHorizontal: 40,
		alignItems: "center",
	},
	illustration: {
		width: width * 0.65,
		height: width * 0.65,
		maxHeight: 280,
	},
	signInSection: {
		width: "100%",
		paddingHorizontal: 30,
		alignItems: "center",
	},
	googleButton: {
		backgroundColor: COLORS.white,
		marginBottom: 20,
		paddingHorizontal: 24,
		paddingVertical: 14,
		width: "100%",
		maxWidth: 300,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 14,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.15,
		shadowRadius: 12,
		elevation: 5,
	},
	googleIconContainer: {
		marginRight: 12,
		width: 24,
		height: 24,
		justifyContent: "center",
		alignItems: "center",
	},
	googleButtonText: {
		fontFamily: "NewAmsterdam",
		fontSize: 16,
		fontWeight: "600",
		color: COLORS.surface,
		letterSpacing: 0.75,
	},
	termsText: {
		maxWidth: 280,
		fontFamily: "BarlowCondensed",
		fontSize: 11,
		color: COLORS.grey,
		fontStyle: "italic",
		textAlign: "center",
	},
});

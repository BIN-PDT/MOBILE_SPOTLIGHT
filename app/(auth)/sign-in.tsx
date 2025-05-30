import { COLORS } from "@/constants/theme";
import { styles } from "@/styles/auth.style";
import { useSSO } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

export default function SignIn() {
	const router = useRouter();
	const { startSSOFlow } = useSSO();

	const handleGoogleSignIn = async () => {
		try {
			const { createdSessionId, setActive } = await startSSOFlow({
				strategy: "oauth_google",
			});

			if (setActive && createdSessionId) {
				setActive({ session: createdSessionId });
				router.replace("/(tabs)");
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<View style={styles.container}>
			{/* BRAND SECTION */}
			<View style={styles.brandSection}>
				<View style={styles.logoContainer}>
					<Ionicons name="leaf" size={32} color={COLORS.primary} />
				</View>
				<Text style={styles.appName}>Spotlight</Text>
			</View>
			{/* ILLUSTRATION SECTION */}
			<View style={styles.illustrationSection}>
				<Image
					source={require("@/assets/images/illustration.png")}
					style={styles.illustration}
					resizeMode="cover"
				/>
			</View>
			{/* SIGNIN SECTION */}
			<View style={styles.signInSection}>
				<TouchableOpacity
					style={styles.googleButton}
					onPress={handleGoogleSignIn}
					activeOpacity={0.9}
				>
					<View style={styles.googleIconContainer}>
						<Ionicons
							name="logo-google"
							size={20}
							color={COLORS.primary}
						/>
					</View>
					<Text style={styles.googleButtonText}>
						Continue with Google
					</Text>
				</TouchableOpacity>
				<Text style={styles.termsText}>
					By continuing, you agree with our Terms & Privacy Policy
				</Text>
			</View>
		</View>
	);
}

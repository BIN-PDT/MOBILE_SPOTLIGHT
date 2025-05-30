import InitialLayout from "@/components/InitialLayout";
import ClerkAndConvexProvider from "@/providers/ClerkAndConvexProvider";
import { useFonts } from "expo-font";
import * as NavigationBar from "expo-navigation-bar";
import { SplashScreen } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { Platform } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [fontsLoaded] = useFonts({
		"JetBrainsMono-Medium": require("../assets/fonts/JetBrainsMono-Medium.ttf"),
		Lobster: require("../assets/fonts/Lobster-Regular.ttf"),
		BarlowCondensed: require("../assets/fonts/BarlowCondensed-Regular.ttf"),
		NewAmsterdam: require("../assets/fonts/NewAmsterdam-Regular.ttf"),
	});
	// UPDATE NATIVE NAVIGATION BAR ON ANDROID.
	useEffect(() => {
		if (Platform.OS === "android") {
			NavigationBar.setBackgroundColorAsync("black");
			NavigationBar.setButtonStyleAsync("light");
		}
	}, []);

	useEffect(() => {
		async function setUp() {
			if (fontsLoaded) await SplashScreen.hideAsync();
		}

		setUp();
	}, [fontsLoaded]);

	return (
		<ClerkAndConvexProvider>
			<SafeAreaProvider>
				<SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
					<InitialLayout />
				</SafeAreaView>
			</SafeAreaProvider>
			{/* UPDATE NATIVE STATUS BAR */}
			<StatusBar style="light" />
		</ClerkAndConvexProvider>
	);
}

import { COLORS } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
	return (
		<Tabs
			screenOptions={{
				tabBarShowLabel: false,
				headerShown: false,
				tabBarActiveTintColor: COLORS.primary,
				tabBarInactiveTintColor: COLORS.grey,
				tabBarStyle: {
					position: "absolute",
					paddingTop: 8,
					paddingBottom: 8,
					height: 40,
					backgroundColor: "black",
					borderTopWidth: 0,
					elevation: 0,
				},
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					tabBarIcon: ({ color }) => (
						<Ionicons name="paper-plane" size={24} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="bookmarks"
				options={{
					tabBarIcon: ({ color }) => (
						<Ionicons name="bookmark" size={24} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="create"
				options={{
					tabBarIcon: ({ size }) => (
						<Ionicons
							name="add-circle"
							size={24}
							color={COLORS.primary}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="notifications"
				options={{
					tabBarIcon: ({ color }) => (
						<Ionicons
							name="notifications"
							size={24}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					tabBarIcon: ({ color }) => (
						<Ionicons
							name="person-circle"
							size={24}
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	);
}

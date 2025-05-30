import Loader from "@/components/Loader";
import NotificationItem from "@/components/NotificationItem";
import { COLORS } from "@/constants/theme";
import { api } from "@/convex/_generated/api";
import { styles } from "@/styles/notification.style";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "convex/react";
import { FlatList, Text, View } from "react-native";

export default function Notifications() {
	const notifications = useQuery(api.notifications.getNotifications);

	if (notifications === undefined) return <Loader />;
	if (notifications.length === 0) return <NoNotificationFound />;
	return (
		<View style={styles.container}>
			{/* HEADER */}
			<View style={styles.header}>
				<Text style={styles.headerTitle}>Notifications</Text>
			</View>
			{/* CONTENT */}
			<FlatList
				data={notifications}
				renderItem={({ item }) => <NotificationItem item={item} />}
				keyExtractor={(item) => item._id}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.listContainer}
			/>
		</View>
	);
}

const NoNotificationFound = () => {
	return (
		<View
			style={{
				backgroundColor: COLORS.background,
				flex: 1,
				justifyContent: "center",
				alignItems: "center",
				gap: 16,
			}}
		>
			<Ionicons name="notifications" size={32} color={COLORS.grey} />
			<Text
				style={{
					fontFamily: "BarlowCondensed",
					fontSize: 14,
					fontStyle: "italic",
					color: COLORS.grey,
				}}
			>
				No notifications yet
			</Text>
		</View>
	);
};

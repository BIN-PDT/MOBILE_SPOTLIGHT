import { COLORS } from "@/constants/theme";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { styles } from "@/styles/feed.style";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";
import { useState } from "react";
import {
	FlatList,
	KeyboardAvoidingView,
	Modal,
	Platform,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import CommentItem from "./CommentItem";
import Loader from "./Loader";

type CommentModalProps = {
	postId: Id<"posts">;
	visible: boolean;
	onClose: () => void;
};

export default function CommentModal({
	postId,
	visible,
	onClose,
}: CommentModalProps) {
	const [newComment, setNewComment] = useState("");
	const comments = useQuery(api.comments.getComments, { postId });
	const createComment = useMutation(api.comments.createComment);

	const handleSubmit = async () => {
		if (!newComment.trim()) return;

		try {
			await createComment({
				content: newComment,
				postId: postId,
			});

			setNewComment("");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Modal
			visible={visible}
			animationType="slide"
			transparent={true}
			onRequestClose={() => onClose()}
		>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={styles.modalContainer}
			>
				{/* HEADER */}
				<View style={styles.modalHeader}>
					<TouchableOpacity onPress={onClose}>
						<Ionicons name="close" size={24} color={COLORS.white} />
					</TouchableOpacity>
					<Text style={styles.modalTitle}>Comments</Text>
				</View>
				{/* CONTENT */}
				{comments === undefined ? (
					<Loader />
				) : (
					<FlatList
						data={comments}
						renderItem={({ item }) => <CommentItem item={item} />}
						keyExtractor={(item) => item._id}
						contentContainerStyle={styles.commentsList}
					/>
				)}

				<View style={styles.commentInput}>
					<TextInput
						style={styles.input}
						placeholder="Add a comment..."
						placeholderTextColor={COLORS.grey}
						value={newComment}
						onChangeText={setNewComment}
						multiline
					/>

					<TouchableOpacity
						onPress={handleSubmit}
						disabled={!newComment.trim()}
					>
						<Text
							style={[
								styles.postButton,
								!newComment.trim() && styles.postButtonDisabled,
							]}
						>
							Post
						</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		</Modal>
	);
}

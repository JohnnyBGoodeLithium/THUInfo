import {
	GestureResponderEvent,
	Keyboard,
	Platform,
	Text,
	TextInput,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import React, {useState} from "react";
import zh from "../../assets/translations/zh";
import {getStr} from "../../utils/i18n";
import {SettingsNav} from "./settingsStack";
import Snackbar from "react-native-snackbar";
import {useColorScheme} from "react-native";
import {helper} from "../../redux/store";
import AV from "leancloud-storage/core";
import VersionNumber from "react-native-version-number";

const submitFeedback = async (content: string) => {
	if (!helper.mocked()) {
		const statistics = new (AV.Object.extend("Feedback"))();
		statistics.set("version", Number(VersionNumber.buildVersion));
		statistics.set("os", Platform.OS);
		statistics.set("api", String(Platform.Version));
		statistics.set("content", content);
		return statistics.save();
	}
};

const BottomButton = ({
	text,
	onPress,
	disabled,
}: {
	text: keyof typeof zh;
	onPress: (event: GestureResponderEvent) => void;
	disabled: boolean;
}) => {
	const dark = useColorScheme() === "dark";
	return (
		<TouchableOpacity
			style={{
				backgroundColor: dark
					? disabled
						? "#FFF4"
						: "#ccc"
					: disabled
					? "#0000"
					: "#0002",
				flex: 1,
				margin: 4,
				borderRadius: 4,
			}}
			disabled={disabled}
			onPress={(e) => !disabled && onPress(e)}>
			<Text style={{textAlign: "center", padding: 10}}>{getStr(text)}</Text>
		</TouchableOpacity>
	);
};

export const FeedbackScreen = ({navigation}: {navigation: SettingsNav}) => {
	const [text, setText] = useState("");
	const [contact, setContact] = useState("");
	const dark = useColorScheme() === "dark";
	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={{flex: 1, paddingHorizontal: 20, paddingTop: 20}}>
				<TextInput
					value={text}
					onChangeText={setText}
					style={{
						flex: 1,
						textAlignVertical: "top",
						fontSize: 15,
						margin: 8,
						padding: 10,
						backgroundColor: dark ? "#000" : "#FFF",
						color: dark ? "#FFF" : "#000",
						borderColor: "#CCC",
						borderWidth: 1,
						borderRadius: 5,
					}}
					placeholder={getStr("feedbackHint")}
					multiline={true}
				/>
				<TextInput
					value={contact}
					onChangeText={setContact}
					style={{
						flex: 0,
						textAlignVertical: "top",
						fontSize: 15,
						margin: 8,
						padding: 10,
						backgroundColor: dark ? "#000" : "#FFF",
						color: dark ? "#FFF" : "#000",
						borderColor: "#CCC",
						borderWidth: 1,
						borderRadius: 5,
					}}
					placeholder={getStr("contact")}
				/>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-around",
						padding: 5,
					}}>
					<BottomButton
						text="popi"
						onPress={() => navigation.navigate("Popi")}
						disabled={false}
					/>
					<BottomButton
						text="submit"
						onPress={() => {
							submitFeedback(text + "\nContact: " + contact)
								.then(() =>
									Snackbar.show({
										text: getStr("feedbackSuccess"),
										duration: Snackbar.LENGTH_SHORT,
									}),
								)
								.catch(() =>
									Snackbar.show({
										text: getStr("networkRetry"),
										duration: Snackbar.LENGTH_SHORT,
									}),
								);
						}}
						disabled={text.length === 0}
					/>
				</View>
			</View>
		</TouchableWithoutFeedback>
	);
};

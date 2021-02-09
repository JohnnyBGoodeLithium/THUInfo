import {
	View,
	Text,
	Dimensions,
	TouchableOpacity,
	Button,
	Alert,
} from "react-native";
import React, {useState} from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {Choice} from "src/redux/reducers/schedule";
import {SCHEDULE_DEL_OR_HIDE, SCHEDULE_UPDATE_ALIAS} from "src/redux/constants";
import {store} from "src/redux/store";
import {ScheduleType} from "thu-info-lib/src/models/schedule/schedule";
import {TextInput} from "react-native-gesture-handler";
import {getStr} from "src/utils/i18n";
import {useColorScheme} from "react-native-appearance";
import themes from "../../assets/themes/themes";

const beginTime = [
	"",
	"08:00",
	"08:50",
	"09:50",
	"10:40",
	"11:30",
	"13:30",
	"14:20",
	"15:20",
	"16:10",
	"17:05",
	"17:55",
	"19:20",
	"20:10",
	"21:00",
];

const endTime = [
	"",
	"08:45",
	"09:35",
	"10:35",
	"11:25",
	"12:15",
	"14:15",
	"15:05",
	"16:05",
	"16:55",
	"17:50",
	"18:40",
	"20:05",
	"20:55",
	"21:45",
];

const nullAlias = (str: string) => {
	if (str === undefined) {
		return true;
	}
	return str.length === 0;
};

export interface ScheduleDetailProps {
	name: string;
	location: string;
	week: number;
	dayOfWeek: number;
	begin: number;
	end: number;
	alias: string;
	type: ScheduleType;
}

export const ScheduleDetailScreen = ({route}: any) => {
	const props = route.params;
	const [delPressed, setDelPressed] = useState<boolean>(false);
	const [inputText, setInputText] = useState<string>("");
	const [newAlias, setAlias] = useState<string>(props.alias);

	const lineLength = Dimensions.get("window").width * 0.9;

	const themeName = useColorScheme();
	const {colors} = themes[themeName];

	const horizontalLine = () => (
		<View
			style={{
				backgroundColor: "lightgray",
				height: 1,
				width: lineLength,
				margin: 5,
			}}
		/>
	);

	const delButton = (choice: Choice) => {
		const verbText: string =
			props.type === ScheduleType.CUSTOM && choice === Choice.ALL
				? getStr("delSchedule")
				: getStr("hideSchedule");
		const buttonText: string =
			choice === Choice.ALL
				? verbText + getStr("allTime")
				: choice === Choice.REPEAT
				? verbText + getStr("repeatly")
				: verbText + getStr("once");
		return (
			<TouchableOpacity
				style={{
					borderRadius: 2,
					backgroundColor: "white",
					alignSelf: "stretch",
					justifyContent: "center",
					alignItems: "center",
					shadowColor: "gray",
					shadowOpacity: 0.8,
					shadowRadius: 2,
					shadowOffset: {height: 2, width: 2},
					margin: 5,
					padding: 12,
				}}
				onPress={() => {
					setDelPressed(true);
					store.dispatch({
						type: SCHEDULE_DEL_OR_HIDE,
						payload: [
							props.name,
							{
								week: props.week,
								dayOfWeek: props.dayOfWeek,
								begin: props.begin,
								end: props.end,
							},
							choice,
						],
					});
				}}
				disabled={delPressed}>
				<Text
					style={{
						fontWeight: "bold",
						fontSize: 18,
						color: delPressed
							? "gray"
							: choice === Choice.ALL
							? "red"
							: "black",
					}}>
					{buttonText}
				</Text>
			</TouchableOpacity>
		);
	};

	return (
		<View
			style={{
				paddingVertical: 30,
				paddingHorizontal: 20,
				alignItems: "center",
			}}>
			<Text
				style={{
					fontSize: 25,
					marginBottom: 20,
					lineHeight: 30,
					alignSelf: "flex-start",
					textDecorationLine: delPressed ? "line-through" : undefined,
					color: delPressed ? "gray" : colors.text,
				}}
				numberOfLines={2}>
				{(nullAlias(newAlias) ? props.name : newAlias).substr(
					props.type === ScheduleType.CUSTOM ? 6 : 0,
				)}
			</Text>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					marginVertical: 10,
					alignSelf: "flex-start",
				}}>
				<View
					style={{alignItems: "center", justifyContent: "center", width: 20}}>
					<FontAwesome name="map-marker" size={20} color="red" />
				</View>
				<View
					style={{
						alignItems: "flex-start",
						justifyContent: "center",
						width: getStr("mark") === "CH" ? undefined : 67,
					}}>
					<Text style={{marginHorizontal: 8, color: "gray"}}>
						{getStr("location")}
					</Text>
				</View>
				<Text
					style={{
						marginHorizontal: 5,
						color: props.location === "" ? "gray" : colors.text,
					}}>
					{props.location === "" ? getStr("locationUnset") : props.location}
				</Text>
			</View>
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					marginVertical: 10,
					alignSelf: "flex-start",
				}}>
				<View
					style={{alignItems: "center", justifyContent: "center", width: 20}}>
					<FontAwesome name="list-alt" size={20} color="blue" />
				</View>
				<View
					style={{
						alignItems: "flex-start",
						justifyContent: "center",
						width: getStr("mark") === "CH" ? undefined : 67,
					}}>
					<Text style={{marginHorizontal: 8, color: "gray"}}>
						{getStr("timeLocation")}
					</Text>
				</View>
				<Text style={{marginLeft: 5, color: colors.text}}>
					{getStr("weekNumPrefix") + props.week + getStr("weekNumSuffix")}
				</Text>
				<Text style={{marginLeft: 5, color: colors.text}}>
					{getStr("dayOfWeek")[props.dayOfWeek]}
				</Text>
				<Text style={{marginLeft: 5, color: colors.text}}>
					{getStr("periodNumPrefix") +
						props.begin +
						(props.begin === props.end ? "" : " ~ " + props.end) +
						getStr("periodNumSuffix")}
				</Text>
				<Text style={{marginLeft: 5, color: "gray"}}>
					{(getStr("mark") === "CH" ? "（" : "(") +
						beginTime[props.begin] +
						" ~ " +
						endTime[props.end] +
						(getStr("mark") === "CH" ? "）" : ")")}
				</Text>
			</View>
			{nullAlias(newAlias) ? null : (
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						marginVertical: 10,
						alignSelf: "flex-start",
					}}>
					<View
						style={{alignItems: "center", justifyContent: "center", width: 20}}>
						<FontAwesome name="file-text-o" size={20} color="green" />
					</View>
					<View
						style={{
							alignItems: "flex-start",
							justifyContent: "center",
							width: getStr("mark") === "CH" ? undefined : 67,
						}}>
						<Text
							style={{marginHorizontal: 8, color: "gray"}}
							numberOfLines={2}>
							{getStr("originalName")}
						</Text>
					</View>
					<Text
						style={{
							marginHorizontal: 5,
							color: props.location === "" ? "gray" : colors.text,
						}}>
						{props.name}
					</Text>
				</View>
			)}
			{horizontalLine()}
			<Text
				style={{
					marginVertical: 10,
					alignSelf: "flex-start",
					fontSize: 18,
					color: colors.text,
				}}>
				{(nullAlias(newAlias) ? getStr("set") : getStr("delOrModify")) +
					getStr("alias")}
			</Text>
			<View
				style={{
					marginVertical: 10,
					alignSelf: "stretch",
					justifyContent: "center",
					flexDirection: "row",
				}}>
				<TextInput
					style={{
						fontSize: 15,
						flex: 5,
						backgroundColor: colors.background,
						color: colors.text,
						textAlign: "left",
						textAlignVertical: "center",
						borderColor: "lightgrey",
						borderWidth: 1,
						borderRadius: 5,
						marginHorizontal: 10,
						padding: 6,
					}}
					value={inputText}
					onChangeText={setInputText}
					keyboardType="default"
				/>
				<Button
					title={getStr("confirm")}
					onPress={() => {
						if (inputText.length === 0) {
							Alert.alert(getStr("illegalAlias"), getStr("aliasCannotBeNull"));
							return;
						}
						const res: string =
							(props.type === ScheduleType.CUSTOM
								? props.name.substr(0, 6)
								: "") + inputText;
						store.dispatch({
							type: SCHEDULE_UPDATE_ALIAS,
							payload: [props.name, res],
						});
						setAlias(res);
						setInputText("");
					}}
				/>
				{nullAlias(newAlias) ? null : (
					<Button
						title={getStr("delAlias")}
						onPress={() => {
							store.dispatch({
								type: SCHEDULE_UPDATE_ALIAS,
								payload: [props.name, undefined],
							});
							setAlias("");
							setInputText("");
						}}
					/>
				)}
			</View>
			{horizontalLine()}
			{delButton(Choice.ONCE)}
			{delButton(Choice.REPEAT)}
			{delButton(Choice.ALL)}
		</View>
	);
};
import {HomeNav} from "./homeStack";
import {
	TextInput,
	TouchableOpacity,
	useColorScheme,
	View,
	Text,
	GestureResponderEvent,
	Platform,
	TouchableHighlight,
	TouchableNativeFeedback,
} from "react-native";
import themes from "../../assets/themes/themes";
import React, {PropsWithChildren, useState} from "react";
import {helper} from "../../redux/store";
import {paginatedRefreshListScreen} from "../../components/settings/paginatedRefreshListScreen";
import {getStr} from "../../utils/i18n";
import Icon from "react-native-vector-icons/FontAwesome";
import {SearchResultItem} from "thu-info-lib/dist/models/home/reserves-lib";

const BookItem = ({
	book,
	onPress,
}: {
	book: SearchResultItem;
	onPress: (event: GestureResponderEvent) => void;
}) => {
	const themeName = useColorScheme();
	const {colors} = themes(themeName);
	const content = (
		<View
			style={{
				padding: 8,
				flexDirection: "row",
				justifyContent: "space-between",
			}}>
			<View
				style={{flexDirection: "column", flex: 3, alignItems: "flex-start"}}>
				<Text style={{fontSize: 13, marginHorizontal: 10, color: "grey"}}>
					{book.author}
				</Text>
				<Text style={{fontSize: 17, marginHorizontal: 10, color: colors.text}}>
					{book.title}
				</Text>
			</View>
			<View style={{flexDirection: "column", flex: 1, alignItems: "flex-end"}}>
				<Text style={{fontSize: 14, marginHorizontal: 6, color: colors.text}}>
					{book.publisher}
				</Text>
			</View>
		</View>
	);
	return Platform.OS === "ios" ? (
		<TouchableHighlight underlayColor="#0002" onPress={onPress}>
			{content}
		</TouchableHighlight>
	) : (
		<TouchableNativeFeedback
			background={TouchableNativeFeedback.Ripple("#0002", false)}
			onPress={onPress}>
			{content}
		</TouchableNativeFeedback>
	);
};

export const ReservesLibWelcomeScreen = (props: {navigation: HomeNav}) => {
	const themeName = useColorScheme();
	const {colors} = themes(themeName);

	const [search, setSearch] = useState("");

	return paginatedRefreshListScreen(
		async (_: PropsWithChildren<{navigation: HomeNav}>, page) =>
			search.length === 0
				? []
				: (await helper.searchReservesLib(search, page)).data,
		(book, _, {navigation}) => (
			<BookItem
				book={book}
				onPress={() => navigation.navigate("ReservesLibPDF", {book})}
			/>
		),
		({bookId}) => bookId,
		undefined,
		(_, refresh) => (
			<View
				style={{
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "space-between",
					paddingVertical: 8,
					paddingHorizontal: 12,
				}}>
				<TextInput
					style={{
						fontSize: 15,
						flex: 1,
						backgroundColor: colors.background,
						color: colors.text,
						textAlign: "left",
						borderColor: "lightgrey",
						borderWidth: 1,
						borderRadius: 5,
						padding: 6,
					}}
					placeholder={getStr("search")}
					value={search}
					onChangeText={setSearch}
				/>
				<TouchableOpacity
					onPress={refresh}
					style={{padding: 6, paddingLeft: 12}}>
					<Icon name="search" size={20} />
				</TouchableOpacity>
			</View>
		),
	)(props);
};
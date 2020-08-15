import React, {useState, useEffect} from "react";
import {getNewsDetail} from "src/network/news";
import Snackbar from "react-native-snackbar";
import {getStr} from "src/utils/i18n";
import {WebView} from "react-native-webview";
import {View, StyleSheet} from "react-native";

export const NewsDetailScreen = ({route}: any) => {
	const [html, setHtml] = useState<string>("");
	const [refreshing, setRefreshing] = useState(true);

	const fetchHtml = () => {
		setRefreshing(true);
		getNewsDetail(route.params.detail.url)
			.then((res) => {
				setHtml(res);
				console.log(res);
				setRefreshing(false);
			})
			.catch(() => {
				Snackbar.show({
					text: getStr("networkRetry"),
					duration: Snackbar.LENGTH_LONG,
				});
				setRefreshing(false);
			});
	};

	useEffect(fetchHtml, []);

	return (
		<View style={styles.container}>
			<WebView source={{html: html}} style={styles.webContainer} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 15,
	},

	webContainer: {
		backgroundColor: "#f2f2f2",
	},
});
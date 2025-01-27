import {Platform, ScrollView, Text, View} from "react-native";
import React from "react";
import {HomeNav} from "./homeStack";
import IconReport from "../../assets/icons/IconReport";
import {HomeIcon} from "../../components/home/icon";
import IconExpenditure from "../../assets/icons/IconExpenditure";
import IconClassroom from "../../assets/icons/IconClassroom";
import IconEvaluation from "../../assets/icons/IconEvaluation";
import IconLibrary from "../../assets/icons/IconLibrary";
import zh from "../../assets/translations/zh";
import {getStr} from "../../utils/i18n";
import themedStyles from "../../utils/themedStyles";
import {useColorScheme} from "react-native";
import IconWasher from "../../assets/icons/IconWasher";
import IconWater from "../../assets/icons/IconWater";
import IconSports from "../../assets/icons/IconSports";
import IconGitLab from "../../assets/icons/IconGitLab";
import IconBook from "../../assets/icons/IconBook";
import IconBankPayment from "../../assets/icons/IconBankPayment";
import IconInvoice from "../../assets/icons/IconInvoice";

const iconSize = 40;

export const HomeSection = ({
	title,
	children,
}: {
	title: keyof typeof zh;
	children: any;
}) => {
	const themeName = useColorScheme();
	const style = styles(themeName);

	return (
		<View
			style={[
				style.sectionContainer,
				{
					borderColor: "#aaa",
					borderWidth: themeName === "dark" ? 1 : 0,
				},
			]}>
			<Text style={style.sectionTitle}>{getStr(title)}</Text>
			<View style={style.sectionContent}>{children}</View>
		</View>
	);
};

export const HomeScreen = ({navigation}: {navigation: HomeNav}) => {
	return (
		<ScrollView style={{padding: 4}}>
			<HomeSection title="study">
				<HomeIcon title="report" onPress={() => navigation.navigate("Report")}>
					<IconReport width={iconSize} height={iconSize} />
				</HomeIcon>
				<HomeIcon
					title="teachingEvaluation"
					onPress={() => navigation.navigate("Evaluation")}>
					<IconEvaluation width={iconSize} height={iconSize} />
				</HomeIcon>
				<HomeIcon
					title="gitLab"
					onPress={() => navigation.navigate("GitLabHome")}>
					<IconGitLab width={iconSize} height={iconSize} />
				</HomeIcon>
			</HomeSection>
			<HomeSection title="resources">
				<HomeIcon
					title="classroomState"
					onPress={() => navigation.navigate("ClassroomList")}>
					<IconClassroom width={iconSize} height={iconSize} />
				</HomeIcon>
				<HomeIcon
					title="library"
					onPress={() => navigation.navigate("Library")}>
					<IconLibrary width={iconSize} height={iconSize} />
				</HomeIcon>
				{Platform.OS === "android" && (
					<HomeIcon
						title="reservesLib"
						onPress={() => navigation.navigate("ReservesLibWelcome")}>
						<IconBook width={iconSize} height={iconSize} />
					</HomeIcon>
				)}
			</HomeSection>
			<HomeSection title="life">
				<HomeIcon
					title="expenditure"
					onPress={() => navigation.navigate("Expenditure")}>
					<IconExpenditure width={iconSize} height={iconSize} />
				</HomeIcon>
				<HomeIcon
					title="sportsBook"
					onPress={() => navigation.navigate("Sports")}>
					<IconSports width={iconSize} height={iconSize} />
				</HomeIcon>
				<HomeIcon
					title="bankPayment"
					onPress={() => navigation.navigate("BankPayment")}>
					<IconBankPayment width={iconSize} height={iconSize} />
				</HomeIcon>
				<HomeIcon
					title="invoice"
					onPress={() => navigation.navigate("Invoice")}>
					<IconInvoice width={iconSize} height={iconSize} />
				</HomeIcon>
			</HomeSection>
			<HomeSection title="thirdParty">
				{Platform.OS === "android" && (
					<HomeIcon title="qzyq" onPress={() => navigation.navigate("Qzyq")}>
						<IconWater width={iconSize} height={iconSize} />
					</HomeIcon>
				)}
				<HomeIcon
					title="washer"
					onPress={() => navigation.navigate("WasherWeb")}>
					<IconWasher width={iconSize} height={iconSize} />
				</HomeIcon>
			</HomeSection>
		</ScrollView>
	);
};

const styles = themedStyles((theme) => ({
	sectionContainer: {
		justifyContent: "center",
		backgroundColor: theme.colors.background,
		alignItems: "center",
		shadowColor: "grey",
		margin: 10,
		padding: 4,
		shadowOffset: {
			width: 2,
			height: 2,
		},
		shadowOpacity: 0.8,
		shadowRadius: 2,
		borderRadius: 5,
		elevation: 2,
	},
	sectionTitle: {
		textAlign: "center",
		fontSize: 15,
		marginTop: 6,
		fontWeight: "bold",
		color: theme.colors.text,
	},
	sectionContent: {
		flexDirection: "row",
		flexWrap: "wrap",
		justifyContent: "center",
	},
}));

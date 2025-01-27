import {
	createStackNavigator,
	StackNavigationProp,
} from "@react-navigation/stack";
import {SettingsScreen} from "./settings";
import {getStr} from "../../utils/i18n";
import React from "react";
import {FeedbackScreen} from "./feedback";
import {PopiScreen} from "./popi";
import {EleRecordScreen} from "./eleRecord";
import {ScheduleSettingsScreen} from "./scheduleSettings";
import {AboutScreen} from "./about";
import {ReportManageHiddenScreen} from "./reportManageHidden";
import {ExperimentalScreen} from "./experimental";
import {PasswordManagementScreen} from "./PasswordManagement";

type SettingsStackParamList = {
	Settings: undefined;
	Feedback: undefined;
	Popi: undefined;
	EleRecord: undefined;
	ScheduleSettings: undefined;
	ReportManageHidden: undefined;
	SecondarySettings: undefined;
	Experimental: undefined;
	PasswordManagement: undefined;
	About: undefined;
};

const Stack = createStackNavigator<SettingsStackParamList>();

export type SettingsNav = StackNavigationProp<SettingsStackParamList>;

export const SettingStackScreen = () => (
	<Stack.Navigator>
		<Stack.Screen
			name="Settings"
			component={SettingsScreen}
			options={{title: getStr("settings")}}
		/>
		<Stack.Screen
			name="Feedback"
			component={FeedbackScreen}
			options={{title: getStr("feedback")}}
		/>
		<Stack.Screen
			name="Popi"
			component={PopiScreen}
			options={{title: getStr("popi")}}
		/>
		<Stack.Screen
			name="EleRecord"
			component={EleRecordScreen}
			options={{title: getStr("eleRecord")}}
		/>
		<Stack.Screen
			name="ScheduleSettings"
			component={ScheduleSettingsScreen}
			options={{title: getStr("scheduleSettings")}}
		/>
		<Stack.Screen
			name="About"
			component={AboutScreen}
			options={{title: getStr("about")}}
		/>
		<Stack.Screen
			name="ReportManageHidden"
			component={ReportManageHiddenScreen}
			options={{title: getStr("manageHidden")}}
		/>
		<Stack.Screen
			name="Experimental"
			component={ExperimentalScreen}
			options={{title: getStr("experimental")}}
		/>
		<Stack.Screen
			name="PasswordManagement"
			component={PasswordManagementScreen}
			options={{title: getStr("passwordManagement")}}
		/>
	</Stack.Navigator>
);

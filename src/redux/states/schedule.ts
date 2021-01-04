import {Schedule} from "../../helper/src/models/schedule/schedule";

export interface PrimarySchedule {
	primary: Lesson[];
	exam: Exam[];
}

export interface Schedules {
	baseSchedule: Schedule[];
	cache: string;
	refreshing: boolean;
	shortenMap: {[key: string]: string};
	customCnt: number;
}

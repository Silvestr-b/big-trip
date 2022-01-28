import {ActivityType} from "./ActivityType";

export class ActivityTypeCatalog {
	private readonly activityTypes: ActivityType[];

	constructor(activityTypes: ActivityType[]) {
		this.activityTypes = activityTypes;
	}

	public getDefaultType() {
		return this.activityTypes[0];
	}

	public getAvailable() {
		return this.activityTypes;
	}
}

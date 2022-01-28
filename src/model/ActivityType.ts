import {ActivityOption} from "./ActivityOption";

export class ActivityType {
	private readonly name: string;
	private readonly icon: string;
	private readonly options: ActivityOption[];

	constructor(name: string, icon: string, options: ActivityOption[]) {
		this.name = name;
		this.icon = icon;
		this.options = options;
	}

	public getName() {
		return this.name;
	}

	public getIcon() {
		return this.icon;
	}

	public getAvailableOptions() {
		return this.options;
	}
}

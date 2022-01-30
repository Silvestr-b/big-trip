import {AdditionalOption} from "./AdditionalOption";

export class ActivityType {
	private readonly name: string;
	private readonly icon: string;
	private readonly options: AdditionalOption[];

	constructor(name: string, icon: string, options: AdditionalOption[]) {
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

	public isOptionAcceptable(option: AdditionalOption) {
		return this.options.includes(option);
	}
}

import {ActivityType} from "./ActivityType";
import {AdditionalOption} from "./AdditionalOption";
import {Location} from "./Location";
import {IllegalOptionException} from "./errors/IllegalOptionException";

export class ActivityUpdateForm {
	constructor(
		private selectedOptions: AdditionalOption[],
		private type: ActivityType,
		private location: Location,
		private startDate: Date,
		private endDate: Date,
		private price: number,
		private favorite: boolean
	) {
	}

	// Queries
	public getType() {
		return this.type;
	}

	public getLocation() {
		return this.location;
	}

	public getStartDate() {
		return this.startDate;
	}

	public getEndDate() {
		return this.endDate;
	}

	public getPrice() {
		return this.price;
	}

	public getSelectedOptions() {
		return this.selectedOptions;
	}

	public isFavorite() {
		return this.favorite;
	}

	// Commands

	public changeType(type: ActivityType) {
		this.clearSelectedOptions();
		this.type = type;
	}

	public changeLocation(location: Location) {
		this.location = location;
	}

	public changeStartDate(date: Date) {
		this.startDate = date;
	}

	public changeEndDate(date: Date) {
		this.endDate = date;
	}

	public changePrice(price: number) {
		this.price = price;
	}

	public toggleOption(option: AdditionalOption) {
		this.assertOptionIsAcceptable(option);
		if (this.hasOption(option)) {
			this.removeOption(option);
		} else {
			this.addOption(option);
		}
	}

	public toggleFavorite() {
		this.favorite = !this.favorite;
	}

	private hasOption(option: AdditionalOption) {
		return this.selectedOptions.includes(option);
	}

	private addOption(option: AdditionalOption) {
		this.selectedOptions.push(option);
	}

	private removeOption(optionToRemove: AdditionalOption) {
		this.selectedOptions = this.selectedOptions.filter(option => option !== optionToRemove)
	}

	private clearSelectedOptions() {
		this.selectedOptions = [];
	}

	private assertOptionIsAcceptable(option: AdditionalOption) {
		if (!this.type.isOptionAcceptable(option)) {
			throw new IllegalOptionException();
		}
	}
}
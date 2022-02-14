import {ActivityType} from "./ActivityType";
import {AdditionalOption} from "./AdditionalOption";
import {Location} from "./Location";
import {IllegalOptionException} from "./errors/IllegalOptionException";

export class ActivityUpdateForm {
	constructor(
		private selectedOptions: Set<AdditionalOption>,
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
		return Array.from(this.selectedOptions);
	}

	public isFavorite() {
		return this.favorite;
	}

	// Commands

	public changeType(type: ActivityType) {
		this.type = type;
		this.selectedOptions.clear();
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
		if (this.selectedOptions.has(option)) {
			this.selectedOptions.delete(option);
		} else {
			this.selectedOptions.add(option);
		}
	}

	public toggleFavorite() {
		this.favorite = !this.favorite;
	}

	private assertOptionIsAcceptable(option: AdditionalOption) {
		if (!this.type.isOptionAcceptable(option)) {
			throw new IllegalOptionException();
		}
	}
}
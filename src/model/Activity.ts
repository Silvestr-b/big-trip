import {Location} from "./Location";
import {LocationCatalog} from "./LocationCatalog";
import {ActivityType} from "./ActivityType";
import {ActivityTypeCatalog} from "./ActivityTypeCatalog";
import {AdditionalOption} from "./AdditionalOption";
import {ActivityUpdateForm} from "./ActivityUpdateForm";

export class Activity {
	private TWO_DAYS_IN_MILLISECONDS = 172800000;
	private selectedOptions: AdditionalOption[];
	private type: ActivityType;
	private location: Location;
	private startDate: Date;
	private endDate: Date;
	private basePrice: number;
	private favorite: boolean;

	constructor(type: ActivityType, location: Location) {
		this.selectedOptions = []
		this.type = type;
		this.location = location;
		this.startDate = new Date()
		this.endDate = new Date(this.startDate.getTime() + this.TWO_DAYS_IN_MILLISECONDS);
		this.basePrice = 5;
		this.favorite = false;
	}

	// Queries

	public getName() {
		return `${this.type.getName()} ${this.location.getName()}`;
	}

	public getType() {
		return this.type;
	}

	public getBasePrice() {
		return this.basePrice;
	}

	public getLocation() {
		return this.location;
	}

	public getLocationName() {
		return this.location.getName();
	}

	public getStartDate() {
		return this.startDate;
	}

	public getEndDate() {
		return this.endDate;
	}

	public getDuration() {
		return this.endDate.getTime() - this.startDate.getTime();
	}

	public getTotalCost() {
		let result = this.basePrice;
		for (const option of this.selectedOptions) {
			result += option.getPrice();
		}
		return result;
	}

	public getSelectedOptions() {
		return this.selectedOptions;
	}

	public isOptionSelected(option: AdditionalOption) {
		return this.selectedOptions.includes(option);
	}

	public isFavorite() {
		return this.favorite;
	}

	// Commands

	public apply(form: ActivityUpdateForm) {
		this.selectedOptions = form.getSelectedOptions();
		this.type = form.getType();
		this.location = form.getLocation();
		this.startDate = form.getStartDate();
		this.endDate = form.getEndDate();
		this.basePrice = form.getPrice();
		this.favorite = form.isFavorite();
	}

	public getUpdateForm() {
		return new ActivityUpdateForm(
			this.selectedOptions,
			this.type,
			this.location,
			this.startDate,
			this.endDate,
			this.basePrice,
			this.favorite
		);
	}
}

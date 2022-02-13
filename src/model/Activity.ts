import dayjs from 'dayjs';
import {Location} from "./Location";
import {LocationCatalog} from "./LocationCatalog";
import {ActivityType} from "./ActivityType";
import {ActivityTypeCatalog} from "./ActivityTypeCatalog";
import {AdditionalOption} from "./AdditionalOption";
import {ActivityUpdateForm} from "./ActivityUpdateForm";

export class Activity {
	private selectedOptions: Set<AdditionalOption>;
	private type: ActivityType;
	private location: Location;
	private startDate: Date;
	private endDate: Date;
	private basePrice: number;
	private favorite: boolean;

	constructor(activityTypeCatalog: ActivityTypeCatalog, locationCatalog: LocationCatalog) {
		this.selectedOptions = new Set();
		this.type = activityTypeCatalog.getDefaultType();
		this.location = locationCatalog.getDefaultLocation();
		this.startDate = dayjs().toDate();
		this.endDate = dayjs().add(2, 'day').toDate();
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

	public getStartDate() {
		return this.startDate;
	}

	public getEndDate() {
		return this.endDate;
	}

	public getDuration() {
		return this.endDate.getTime() - this.startDate.getTime();
	}

	public getTotalPrice() {
		let result = this.basePrice;
		for (const option of this.selectedOptions) {
			result += option.getPrice();
		}
		return result;
	}

	public getSelectedOptions() {
		return Array.from(this.selectedOptions);
	}

	public isOptionSelected(option: AdditionalOption) {
		return this.selectedOptions.has(option);
	}

	public isFavorite() {
		return this.favorite;
	}

	// Commands

	public apply(form: ActivityUpdateForm) {
		this.selectedOptions = new Set(form.getSelectedOptions());
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

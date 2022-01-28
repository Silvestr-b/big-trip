import {Place} from "./Place";
import {ActivityOption} from "./ActivityOption";
import {ActivityType} from "./ActivityType";
import dayjs from 'dayjs';
import {PlaceCatalog} from "./PlaceCatalog";
import {ActivityTypeCatalog} from "./ActivityTypeCatalog";

export class Activity {
	private readonly chosenOptions: Set<ActivityOption>;
	private type: ActivityType;
	private place: Place;
	private startDate: Date;
	private endDate: Date;
	private basePrice: number;
	private favorite: boolean;

	constructor(activityTypeCatalog: ActivityTypeCatalog, placeCatalog: PlaceCatalog) {
		this.chosenOptions = new Set();
		this.type = activityTypeCatalog.getDefaultType();
		this.place = placeCatalog.getDefaultPlace();
		this.startDate = dayjs().toDate();
		this.endDate = dayjs().add(2, 'day').toDate();
		this.basePrice = 5;
		this.favorite = false;
	}

	// Queries

	public getName() {
		return `${this.type.getName()} ${this.place.getName()}`;
	}

	public getType() {
		return this.type;
	}

	public getBasePrice() {
		return this.basePrice;
	}

	public getPlace() {
		return this.place;
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
		for (const option of this.chosenOptions) {
			result += option.getPrice();
		}
		return result;
	}

	public getChosenOptions() {
		return Array.from(this.chosenOptions);
	}

	public isOptionChosen(option: ActivityOption) {
		return this.chosenOptions.has(option);
	}

	public isFavored() {
		return this.favorite;
	}

	// Commands

	public setBasePrice(price: number) {
		this.basePrice = price;
	}

	public setStartDate(date: Date) {
		this.startDate = date;
	}

	public setEndDate(date: Date) {
		this.endDate = date;
	}

	public setPlace(place: Place) {
		this.place = place;
	}

	public toggleFavorite() {
		this.favorite = !this.favorite;
	}

	public toggleOption(option: ActivityOption) {
		if (this.chosenOptions.has(option)) {
			this.chosenOptions.delete(option);
		} else {
			this.chosenOptions.add(option);
		}
	}

	public changeType(type: ActivityType) {
		this.type = type;
		this.chosenOptions.clear();
	}
}

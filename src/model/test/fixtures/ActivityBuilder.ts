import {Activity} from "../../Activity";
import {ActivityType} from "../../ActivityType";
import {Location} from "../../Location";

export class ActivityBuilder {
	private type: ActivityType;
	private location: Location;
	private startDate: Date;
	private endDate: Date;
	private price: number;

	constructor(type: ActivityType, location: Location) {
		this.type = type;
		this.location = location;
		this.startDate = new Date(1);
		this.endDate = new Date(2);
		this.price = 0;
	}

	public setType(type: ActivityType) {
		this.type = type;
		return this;
	}

	public setLocation(location: Location) {
		this.location = location;
		return this;
	}

	public setStartDate(date: Date) {
		this.startDate = date;
		return this;
	}

	public setEndDate(date: Date) {
		this.endDate = date;
		return this;
	}

	public setPrice(price: number) {
		this.price = price;
		return this;
	}

	public build() {
		const activity = new Activity(this.type, this.location);
		const form = activity.getUpdateForm();
		form.changeStartDate(this.startDate);
		form.changeEndDate(this.endDate);
		form.changePrice(this.price);
		activity.apply(form);
		return activity;
	}
}
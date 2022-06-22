import {Activity} from "../../main/Activity";
import {ActivityType} from "../../main/ActivityType";
import {Location} from "../../main/Location";

export class ActivityBuilder {
	private type: ActivityType;
	private location: Location;
	private startTime: number;
	private price: number;
	private duration: number;

	constructor(type: ActivityType, location: Location) {
		this.type = type;
		this.location = location;
		this.startTime = 1;
		this.duration = 1;
		this.price = 25;
	}

	public withType(type: ActivityType) {
		this.type = type;
		return this;
	}

	public withLocation(location: Location) {
		this.location = location;
		return this;
	}

	public withStartDate(date: Date) {
		this.startTime = date.getTime();
		return this;
	}

	public withDuration(duration: number) {
		this.duration = duration;
		return this;
	}

	public withPrice(price: number) {
		this.price = price;
		return this;
	}

	public build() {
		const activity = new Activity(this.type, this.location);
		const form = activity.getUpdateForm();
		form.changeStartDate(new Date(this.startTime));
		form.changeEndDate(new Date(this.startTime + this.duration));
		form.changePrice(this.price);
		activity.apply(form);
		return activity;
	}
}
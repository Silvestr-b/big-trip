import {Activity} from "./Activity";
import {ActivityType} from "./ActivityType";
import {UnknownActivityException} from "./errors/UnknownActivityException";
import {EmptyItineraryException} from "./errors/EmptyItineraryException";
import {ActivityAlreadyAddedException} from "./errors/ActivityAlreadyAddedException";

export class Itinerary {
	private activities: Activity[];

	constructor() {
		this.activities = [];
	}

	// Queries

	public getStartDate() {
		return this.getFirstActivity().getStartDate();
	}

	public getEndDate() {
		return this.getLastActivity().getEndDate();
	}

	public getFirstLocationName() {
		return this.getFirstActivity().getLocationName();
	}

	public getLastLocationName() {
		return this.getLastActivity().getLocationName();
	}

	public getTotalCost() {
		return this.activities
			.reduce((prevValue, currActivity) => prevValue + currActivity.getTotalPrice(), 0);
	}

	public getTotalCostFor(activityType: ActivityType) {
		return this.activities
			.filter(activity => activity.getType() === activityType)
			.reduce((prevValue, currActivity) => prevValue + currActivity.getTotalPrice(), 0);
	}

	public getTotalNumberOf(activityType: ActivityType) {
		let count = 0;
		for (const activity of this.activities) {
			if (activity.getType() === activityType) {
				count++;
			}
		}
		return count;
	}

	public getTotalDurationOf(activityType: ActivityType) {
		let count = 0;
		for (const activity of this.activities) {
			if (activity.getType() === activityType) {
				count += activity.getDuration();
			}
		}
		return count;
	}

	public getFutureActivities() {
		const now = new Date();
		const result = [];
		for (const activity of this.activities) {
			if (activity.getStartDate() > now) {
				result.push(activity);
			}
		}
		return result;
	}

	public getPastActivities() {

	}

	public getAllActivities() {
		return this.activities;
	}

	public isEmpty() {
		return this.activities.length === 0;
	}

	// Commands

	public sortByStartDate() {

	}

	public sortByName() {

	}

	public sortByDuration() {

	}

	public sortByPrice() {

	}

	public addActivity(activity: Activity) {
		this.assertNotAddedYet(activity);
		this.activities.push(activity);
	}

	public removeActivity(activityToRemove: Activity) {
		this.assertExists(activityToRemove);
		this.activities = this.activities.filter(activity => activity !== activityToRemove);
	}


	private hasActivity(activity: Activity) {
		return this.activities.includes(activity);
	}

	private getFirstActivity() {
		this.assertNotEmpty();
		return this.activities.reduce((prev, curr) => prev.getStartDate() < curr.getStartDate() ? prev : curr);
	}

	private getLastActivity() {
		this.assertNotEmpty();
		return this.activities.reduce((prev, curr) => prev.getEndDate() > curr.getEndDate() ? prev : curr);
	}

	private assertNotEmpty() {
		if (this.isEmpty()) {
			throw new EmptyItineraryException();
		}
	}

	private assertExists(activity: Activity) {
		if (!this.hasActivity(activity)) {
			throw new UnknownActivityException();
		}
	}

	private assertNotAddedYet(activity: Activity) {
		if (this.hasActivity(activity)) {
			throw new ActivityAlreadyAddedException();
		}
	}
}

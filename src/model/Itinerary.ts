import {Activity} from "./Activity";
import {ActivityType} from "./ActivityType";
import {UnknownActivityError} from "./errors/UnknownActivityError";
import {EmptyItineraryError} from "./errors/EmptyItineraryError";
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
		return this.getFirstActivity().getLocation().getName();
	}

	public getLastLocationName() {
		return this.getLastActivity().getLocation().getName();
	}

	public getTotalCost() {

	}

	public getTotalCostFor(activityType: ActivityType) {

	}

	public getTotalNumberOf(activityType: ActivityType) {

	}

	public getTotalDurationOf(activityType: ActivityType) {

	}

	public getPastActivities() {

	}

	public getFutureActivities() {

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
		if (this.hasActivity(activity)) {
			throw new ActivityAlreadyAddedException();
		}
		this.activities.push(activity);
	}

	public removeActivity(activityToRemove: Activity) {
		if (!this.hasActivity(activityToRemove)) {
			throw new UnknownActivityError();
		}
		this.activities = this.activities.filter(activity => activity !== activityToRemove);
	}


	private hasActivity(activity: Activity) {
		return this.activities.includes(activity);
	}

	private getFirstActivity() {
		if (this.isEmpty()) {
			throw new EmptyItineraryError();
		}
		let firstActivity = this.activities[0];
		for (const activity of this.activities) {
			if (activity.getStartDate() < firstActivity.getStartDate()) {
				firstActivity = activity;
			}
		}
		return firstActivity;
	}

	private getLastActivity() {
		if (this.isEmpty()) {
			throw new EmptyItineraryError();
		}
		let lastActivity = this.activities[0];
		for (const activity of this.activities) {
			if (activity.getEndDate() > lastActivity.getEndDate()) {
				lastActivity = activity;
			}
		}
		return lastActivity;
	}
}

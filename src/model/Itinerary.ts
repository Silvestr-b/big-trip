import {Activity} from "./Activity";
import {ActivityType} from "./ActivityType";
import {UnknownActivityError} from "./errors/UnknownActivityError";
import {EmptyItineraryError} from "./errors/EmptyItineraryError";

export class Itinerary {
	private readonly activities: Set<Activity>;

	constructor() {
		this.activities = new Set();
	}

	// Queries

	public getStartDate() {

	}

	public getEndDate() {

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
		return Array.from(this.activities);
	}

	public isEmpty() {
		return this.activities.size === 0;
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
		this.activities.add(activity);
	}

	public removeActivity(activity: Activity) {
		if (!this.hasActivity(activity)) {
			throw new UnknownActivityError();
		}
		this.activities.delete(activity);
	}


	private hasActivity(activity: Activity) {
		return this.activities.has(activity);
	}

	private getFirstActivity() {
		if (this.isEmpty()) {
			throw new EmptyItineraryError();
		}
		const activities = Array.from(this.activities);
		let firstActivity = activities[0];
		for (const activity of activities) {
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
		const activities = Array.from(this.activities);
		let lastActivity = activities[0];
		for (const activity of activities) {
			if (activity.getEndDate() < lastActivity.getEndDate()) {
				lastActivity = activity;
			}
		}
		return lastActivity;
	}
}

import {Activity} from "../../Activity";
import {ActivityType} from "../../ActivityType";
import {Itinerary} from "../../Itinerary";

export class ItineraryDriver {
	private itinerary: Itinerary

	constructor(itinerary: Itinerary) {
		this.itinerary = itinerary;
	}

	public addActivity(activity: Activity) {
		this.itinerary.addActivity(activity);
	}

	public removeActivity(activity: Activity) {
		this.itinerary.removeActivity(activity);
	}


	public verifyIsEmpty() {
		expect(this.itinerary.isEmpty()).toBe(true);
	}

	public verifyContains(activity: Activity) {
		expect(this.itinerary.getAllActivities()).toContain(activity);
	}

	public verifyDoesNotContain(activity: Activity) {
		expect(this.itinerary.getAllActivities()).not.toContain(activity);
	}

	public verifyActivitiesNumber(number: number) {
		expect(this.itinerary.getAllActivities().length).toBe(number);
	}

	public verifyAddActivityThrows(activity: Activity, exceptionClass: new () => Error) {
		expect(() => this.addActivity(activity)).toThrow(exceptionClass);
	}

	public verifyRemoveActivityThrows(activity: Activity, exceptionClass: new () => Error) {
		expect(() => this.itinerary.removeActivity(activity)).toThrow(exceptionClass);
	}

	public verifyGetFirstLocationThrows(exceptionClass: new () => Error) {
		expect(() => this.itinerary.getFirstLocationName()).toThrow(exceptionClass);
	}

	public verifyGetLastLocationThrows(exceptionClass: new () => Error) {
		expect(() => this.itinerary.getLastLocationName()).toThrow(exceptionClass);
	}

	public verifyFirstLocationNameIsActivityLocationName(activity: Activity) {
		expect(this.itinerary.getFirstLocationName()).toBe(activity.getLocationName());
	}

	public verifyLastLocationNameIsActivityLocationName(activity: Activity) {
		expect(this.itinerary.getLastLocationName()).toBe(activity.getLocationName());
	}

	public verifyGetStartDateThrows(exceptionClass: new () => Error) {
		expect(() => this.itinerary.getStartDate()).toThrow(exceptionClass);
	}

	public verifyGetEndDateThrows(exceptionClass: new () => Error) {
		expect(() => this.itinerary.getEndDate()).toThrow(exceptionClass);
	}

	public verifyStartDateIsActivityStartDate(activity: Activity) {
		expect(this.itinerary.getStartDate().getTime()).toBe(activity.getStartDate().getTime());
	}

	public verifyEndDateIsActivityEndDate(activity: Activity) {
		expect(this.itinerary.getEndDate().getTime()).toBe(activity.getEndDate().getTime());
	}

	public verifyTotalCost(cost: number) {
		expect(this.itinerary.getTotalCost()).toBe(cost);
	}

	public verifyTotalCostOf(activityType: ActivityType, cost: number) {
		expect(this.itinerary.getTotalCostFor(activityType)).toBe(cost);
	}

	public verifyTotalNumberOf(type: ActivityType, number: number) {
		expect(this.itinerary.getTotalNumberOf(type)).toBe(number);
	}

	public verifyTotalDurationOf(type: ActivityType, duration: number) {
		expect(this.itinerary.getTotalDurationOf(type)).toBe(duration);
	}

	public verifyFutureActivitiesNumber(number: number) {
		expect(this.itinerary.getFutureActivities().length).toBe(number);
	}

	public verifyFutureActivitiesContain(activity: Activity) {
		expect(this.itinerary.getFutureActivities()).toContain(activity);
	}

	public verifyPastActivitiesNumber(number: number) {
		expect(this.itinerary.getPastActivities().length).toBe(number);
	}

	public verifyPastActivitiesContain(activity: Activity) {
		expect(this.itinerary.getPastActivities()).toContain(activity);
	}
}
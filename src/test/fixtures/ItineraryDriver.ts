import {Activity} from "../../main/Activity";
import {ActivityType} from "../../main/ActivityType";
import {Itinerary} from "../../main/Itinerary";

export class ItineraryDriver extends Itinerary {
	public verifyIsEmpty() {
		expect(this.isEmpty()).toBe(true);
	}

	public verifyContains(activity: Activity) {
		expect(this.getAllActivities()).toContain(activity);
	}

	public verifyDoesNotContain(activity: Activity) {
		expect(this.getAllActivities()).not.toContain(activity);
	}

	public verifyActivitiesNumber(number: number) {
		expect(this.getAllActivities().length).toBe(number);
	}

	public verifyAddActivityThrows(activity: Activity, exceptionClass: new () => Error) {
		expect(() => this.addActivity(activity)).toThrow(exceptionClass);
	}

	public verifyRemoveActivityThrows(activity: Activity, exceptionClass: new () => Error) {
		expect(() => this.removeActivity(activity)).toThrow(exceptionClass);
	}

	public verifyGetFirstLocationThrows(exceptionClass: new () => Error) {
		expect(() => this.getFirstLocationName()).toThrow(exceptionClass);
	}

	public verifyGetLastLocationThrows(exceptionClass: new () => Error) {
		expect(() => this.getLastLocationName()).toThrow(exceptionClass);
	}

	public verifyFirstLocationNameIsActivityLocationName(activity: Activity) {
		expect(this.getFirstLocationName()).toBe(activity.getLocationName());
	}

	public verifyLastLocationNameIsActivityLocationName(activity: Activity) {
		expect(this.getLastLocationName()).toBe(activity.getLocationName());
	}

	public verifyGetStartDateThrows(exceptionClass: new () => Error) {
		expect(() => this.getStartDate()).toThrow(exceptionClass);
	}

	public verifyGetEndDateThrows(exceptionClass: new () => Error) {
		expect(() => this.getEndDate()).toThrow(exceptionClass);
	}

	public verifyStartDateIsActivityStartDate(activity: Activity) {
		expect(this.getStartDate().getTime()).toBe(activity.getStartDate().getTime());
	}

	public verifyEndDateIsActivityEndDate(activity: Activity) {
		expect(this.getEndDate().getTime()).toBe(activity.getEndDate().getTime());
	}

	public verifyTotalCost(cost: number) {
		expect(this.getTotalCost()).toBe(cost);
	}

	public verifyTotalCostOf(activityType: ActivityType, cost: number) {
		expect(this.getTotalCostFor(activityType)).toBe(cost);
	}

	public verifyTotalNumberOf(type: ActivityType, number: number) {
		expect(this.getTotalNumberOf(type)).toBe(number);
	}

	public verifyTotalDurationOf(type: ActivityType, duration: number) {
		expect(this.getTotalDurationOf(type)).toBe(duration);
	}

	public verifyFutureActivitiesNumber(number: number) {
		expect(this.getFutureActivities().length).toBe(number);
	}

	public verifyFutureActivitiesContain(activity: Activity) {
		expect(this.getFutureActivities()).toContain(activity);
	}

	public verifyPastActivitiesNumber(number: number) {
		expect(this.getPastActivities().length).toBe(number);
	}

	public verifyPastActivitiesContain(activity: Activity) {
		expect(this.getPastActivities()).toContain(activity);
	}

	public verifyAllActivitiesOrder(activitiesInOrder: Activity[]) {
		this.verifyActivitiesOrder(this.getAllActivities(), activitiesInOrder);
	}

	public verifyFutureActivitiesOrder(activitiesInOrder: Activity[]) {
		this.verifyActivitiesOrder(this.getFutureActivities(), activitiesInOrder);
	}

	public verifyPastActivitiesOrder(activitiesInOrder: Activity[]) {
		this.verifyActivitiesOrder(this.getPastActivities(), activitiesInOrder);
	}

	private verifyActivitiesOrder(actualActivities: Activity[], activitiesInOrder: Activity[]) {
		expect(actualActivities).toEqual(activitiesInOrder.filter(activity => actualActivities.includes(activity)));
	}
}
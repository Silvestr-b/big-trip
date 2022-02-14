import {Itinerary} from "../Itinerary";
import {Activity} from "../Activity";
import {UnknownActivityError} from "../errors/UnknownActivityError";
import {EmptyItineraryError} from "../errors/EmptyItineraryError";
import {OptionMother} from "./fixtures/OptionMother";
import {TypeMother} from "./fixtures/TypeMother";
import {LocationMother} from "./fixtures/LocationMother";

describe("Itinerary", () => {
	const upgrade = OptionMother.createUpgrade();
	const radio = OptionMother.createRadio();
	const meal = OptionMother.createMeal();
	const taxi = TypeMother.createTaxi([upgrade, radio]);
	const bus =  TypeMother.createBus([meal]);
	const types = TypeMother.createCatalog([taxi, bus]);
	const chamonix = LocationMother.createChamonix();
	const geneva = LocationMother.createGeneva();
	const places = LocationMother.createCatalog([chamonix, geneva]);
	let itinerary: Itinerary;

	beforeEach(() => {
		itinerary = new Itinerary();
	})

	describe("Adding/Removing", () => {
		it("Should be empty by default", () => {
			expect(itinerary.isEmpty()).toBe(true);
		});

		it("Should add an activity", () => {
			const activity = new Activity(types, places);
			itinerary.addActivity(activity);

			expect(itinerary.getAllActivities()).toContain(activity);
		});

		it("Should not add an activity if it's already added", () => {
			const activity = new Activity(types, places);
			itinerary.addActivity(activity);
			itinerary.addActivity(activity);

			expect(itinerary.getAllActivities()).toEqual([activity]);
		});

		it("Should remove an activity", () => {
			const activity = new Activity(types, places);
			itinerary.addActivity(activity);
			itinerary.removeActivity(activity);

			expect(itinerary.getAllActivities()).not.toContain(activity);
		});

		it("Should throw on an attempt to remove an activity not added", () => {
			const activity = new Activity(types, places);
			const run = () => itinerary.removeActivity(activity);

			expect(run).toThrow(UnknownActivityError);
		});
	});

	describe("Locations", () => {
		it("Should throw on an attempt to get the name of the first and last location when empty", () => {
			const getFirst = () => itinerary.getFirstLocationName();
			const getLast = () => itinerary.getLastLocationName();

			expect(getFirst).toThrow(EmptyItineraryError);
			expect(getLast).toThrow(EmptyItineraryError);
		});

		it("Should return the same location name as the first and the last when only one activity added", () => {
			const activity = new Activity(types, places);
			const expectedLocationName = activity.getLocation().getName();
			itinerary.addActivity(activity);

			expect(itinerary.getFirstLocationName()).toBe(expectedLocationName);
			expect(itinerary.getLastLocationName()).toBe(expectedLocationName);
		});

		it("Should return location names in chronological order", () => {
			const firstActivity = new Activity(types, places);
			const form1 = firstActivity.getUpdateForm();
			form1.changeLocation(chamonix);
			firstActivity.apply(form1);

			const lastActivity = new Activity(types, places);
			const form2 = lastActivity.getUpdateForm();
			form2.changeLocation(geneva);
			lastActivity.apply(form2);

			itinerary.addActivity(firstActivity);
			itinerary.addActivity(lastActivity);

			expect(itinerary.getFirstLocationName()).toBe(chamonix.getName());
			expect(itinerary.getLastLocationName()).toBe(geneva.getName());
		});
	});

	describe("Dates", () => {
		it("Should throw on an attempt to get the start or end date when the itinerary is empty", () => {
			const getStart = () => itinerary.getStartDate();
			const getEnd = () => itinerary.getEndDate();

			expect(getStart).toThrow(EmptyItineraryError);
			expect(getEnd).toThrow(EmptyItineraryError);
		});

		it("Should have the same start date as the activity has, when just one activity added", () => {
			const activity = new Activity(types, places);
			itinerary.addActivity(activity);

			expect(itinerary.getStartDate().getTime()).toBe(activity.getStartDate().getTime());
		});

		it("Should have the same end date as the activity has, when just one activity added", () => {
			const activity = new Activity(types, places);
			itinerary.addActivity(activity);

			expect(itinerary.getEndDate().getTime()).toBe(activity.getEndDate().getTime());
		});

		it("Should have the same start date as the first activity in chronological order", () => {
			const activity1 = new Activity(types, places);
			const activity2 = new Activity(types, places);
			itinerary.addActivity(activity1);
			itinerary.addActivity(activity2);

			expect(itinerary.getStartDate().getTime()).toBe(activity1.getStartDate().getTime());
		});

		it("Should have the same end date as the last activity in chronological order", () => {
			const activity1 = new Activity(types, places);
			const activity2 = new Activity(types, places);
			itinerary.addActivity(activity1);
			itinerary.addActivity(activity2);

			expect(itinerary.getEndDate().getTime()).toBe(activity2.getEndDate().getTime());
		});
	});

	describe("Stats", () => {

	});

	describe("Sorting", () => {

	});

	describe("Filters", () => {

	});
});

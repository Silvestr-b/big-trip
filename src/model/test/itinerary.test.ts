import {Itinerary} from "../Itinerary";
import {Activity} from "../Activity";
import {UnknownActivityException} from "../errors/UnknownActivityException";
import {EmptyItineraryException} from "../errors/EmptyItineraryException";
import {OptionMother} from "./fixtures/OptionMother";
import {TypeMother} from "./fixtures/TypeMother";
import {LocationMother} from "./fixtures/LocationMother";
import {ActivityAlreadyAddedException} from "../errors/ActivityAlreadyAddedException";

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
			const run = () => {
				const activity = new Activity(types, places);
				itinerary.addActivity(activity);
				itinerary.addActivity(activity);
			}

			expect(run).toThrow(ActivityAlreadyAddedException);
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

			expect(run).toThrow(UnknownActivityException);
		});
	});

	describe("Locations", () => {
		it("Should throw on an attempt to get the name of the first and last location when empty", () => {
			const getFirst = () => itinerary.getFirstLocationName();
			const getLast = () => itinerary.getLastLocationName();

			expect(getFirst).toThrow(EmptyItineraryException);
			expect(getLast).toThrow(EmptyItineraryException);
		});

		it("Should return the same location name as the first and the last when only one activity added", () => {
			const activity = new Activity(types, places);
			const expectedLocationName = activity.getLocationName();
			itinerary.addActivity(activity);

			expect(itinerary.getFirstLocationName()).toBe(expectedLocationName);
			expect(itinerary.getLastLocationName()).toBe(expectedLocationName);
		});

		it("Should return location names in chronological order", () => {
			const firstActivity = new Activity(types, places);
			const form1 = firstActivity.getUpdateForm();
			form1.changeStartDate(new Date(1));
			form1.changeEndDate(new Date(2));
			form1.changeLocation(chamonix);
			firstActivity.apply(form1);

			const lastActivity = new Activity(types, places);
			const form2 = lastActivity.getUpdateForm();
			form2.changeLocation(geneva);
			form2.changeStartDate(new Date(3));
			form2.changeEndDate(new Date(4));
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

			expect(getStart).toThrow(EmptyItineraryException);
			expect(getEnd).toThrow(EmptyItineraryException);
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

	describe("Statistics", () => {
		it("Should return 0 total cost when empty", () => {
			expect(itinerary.getTotalCost()).toBe(0);
		});

		it("Should return the total cost of a single activity if only one added", () => {
			const activity = new Activity(types, places);
			const form = activity.getUpdateForm();
			form.changePrice(100);
			activity.apply(form);

			itinerary.addActivity(activity);

			expect(itinerary.getTotalCost()).toBe(100);
		});

		it("Should return the total cost of all activities added", () => {
			const activity1 = new Activity(types, places);
			const form1 = activity1.getUpdateForm();
			form1.changePrice(100);
			activity1.apply(form1);

			const activity2 = new Activity(types, places);
			const form2 = activity2.getUpdateForm();
			form2.changePrice(200);
			activity2.apply(form2);

			itinerary.addActivity(activity1);
			itinerary.addActivity(activity2);

			expect(itinerary.getTotalCost()).toBe(300);
		});

		it("Should return the total cost of the remaining activities only", () => {
			const activity1 = new Activity(types, places);
			const form1 = activity1.getUpdateForm();
			form1.changePrice(100);
			activity1.apply(form1);

			const activity2 = new Activity(types, places);
			const form2 = activity2.getUpdateForm();
			form2.changePrice(200);
			activity2.apply(form2);

			itinerary.addActivity(activity1);
			itinerary.addActivity(activity2);
			itinerary.removeActivity(activity1);

			expect(itinerary.getTotalCost()).toBe(200);
		});

		it("Should return 0 cost if there is no activity of the specified type", () => {
			const activity1 = new Activity(types, places);
			const form1 = activity1.getUpdateForm();
			form1.changeType(taxi);
			activity1.apply(form1);

			const activity2 = new Activity(types, places);
			const form2 = activity2.getUpdateForm();
			form2.changeType(taxi);
			activity2.apply(form2);

			itinerary.addActivity(activity1);
			itinerary.addActivity(activity2);

			expect(itinerary.getTotalCostFor(bus)).toBe(0);
		});

		it("Should return the total cost for all the activities of the specified type", () => {
			const activity1 = new Activity(types, places);
			const form1 = activity1.getUpdateForm();
			form1.changeType(taxi);
			form1.changePrice(100);
			activity1.apply(form1);

			const activity2 = new Activity(types, places);
			const form2 = activity2.getUpdateForm();
			form2.changeType(bus);
			form2.changePrice(200);
			activity2.apply(form2);

			itinerary.addActivity(activity1);
			itinerary.addActivity(activity2);

			expect(itinerary.getTotalCostFor(taxi)).toBe(100);
			expect(itinerary.getTotalCostFor(bus)).toBe(200);
		});

		it("Should return 0 number of activities of specified type when empty", () => {
			expect(itinerary.getTotalNumberOf(bus)).toBe(0);
		});

		it("Should return 0 number of activities of specified type when no activities of such type added", () => {
			const activity = new Activity(types, places);
			const form = activity.getUpdateForm();
			form.changeType(taxi);
			activity.apply(form);

			itinerary.addActivity(activity);

			expect(itinerary.getTotalNumberOf(bus)).toBe(0);
		});

		it("Should return total number of activities of specified type when added", () => {
			const activity = new Activity(types, places);
			const form = activity.getUpdateForm();
			form.changeType(taxi);
			activity.apply(form);

			itinerary.addActivity(activity);

			expect(itinerary.getTotalNumberOf(taxi)).toBe(1);
		});
	});

	describe("Sorting", () => {

	});

	describe("Filters", () => {

	});
});

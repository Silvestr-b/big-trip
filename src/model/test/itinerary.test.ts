import {AdditionalOption} from "../AdditionalOption";
import {ActivityType} from "../ActivityType";
import {ActivityTypeCatalog} from "../ActivityTypeCatalog";
import {Location} from "../Location";
import {LocationCatalog} from "../LocationCatalog";
import {Itinerary} from "../Itinerary";
import {Activity} from "../Activity";
import {UnknownActivityError} from "../errors/UnknownActivityError";
import {EmptyItineraryError} from "../errors/EmptyItineraryError";

describe("Itinerary", () => {
	const upgradeOption = new AdditionalOption("Upgrade", "Upgrade to business class", 190);
	const radioOption = new AdditionalOption("RadioStation", "Choose the radio station", 30);
	const mealOption = new AdditionalOption("OrderMeal", "Order Meal", 100);
	const taxiType = new ActivityType("Taxi", "./", [upgradeOption, radioOption]);
	const busType = new ActivityType("Bus", "./", [mealOption]);
	const activityTypeCatalog = new ActivityTypeCatalog([taxiType, busType]);
	const chamonixPlace = new Location("Chamonix", "Chamonix, in a middle of Europe, middle-eastern paradise, famous for its crowded street markets with the best street food in Asia.", []);
	const genevaPlace = new Location("Geneva", "Geneva, with crowded streets, with a beautiful old town, middle-eastern paradise, with an embankment of a mighty river as a centre of attraction, a perfect place to stay with a family.", []);
	const placeCatalog = new LocationCatalog([chamonixPlace, genevaPlace]);
	let itinerary: Itinerary;

	beforeEach(() => {
		itinerary = new Itinerary();
	})

	describe("Adding/Removing", () => {
		it("Should be empty by default", () => {
			expect(itinerary.isEmpty()).toBe(true);
		});

		it("Should add an activity", () => {
			const activity = new Activity(activityTypeCatalog, placeCatalog);
			itinerary.addActivity(activity);
			expect(itinerary.getAllActivities()).toContain(activity);
		});

		it("Should not add an activity if it's already added", () => {
			const activity = new Activity(activityTypeCatalog, placeCatalog);
			itinerary.addActivity(activity);
			itinerary.addActivity(activity);
			expect(itinerary.getAllActivities()).toEqual([activity]);
		});

		it("Should remove an activity", () => {
			const activity = new Activity(activityTypeCatalog, placeCatalog);
			itinerary.addActivity(activity);
			itinerary.removeActivity(activity);
			expect(itinerary.getAllActivities()).not.toContain(activity);
		});

		it("Should throw on an attempt to remove an activity not added", () => {
			const activity = new Activity(activityTypeCatalog, placeCatalog);
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
			const activity = new Activity(activityTypeCatalog, placeCatalog);
			const expectedLocationName = activity.getLocation().getName();
			itinerary.addActivity(activity);
			expect(itinerary.getFirstLocationName()).toBe(expectedLocationName);
			expect(itinerary.getLastLocationName()).toBe(expectedLocationName);
		});

		it("Should return location names in chronological order", () => {
			const firstActivity = new Activity(activityTypeCatalog, placeCatalog);
			const lastActivity = new Activity(activityTypeCatalog, placeCatalog);
			const firstLocationName = firstActivity.getLocation().getName();
			const lastLocationName = lastActivity.getLocation().getName();
			itinerary.addActivity(firstActivity);
			itinerary.addActivity(lastActivity);
			expect(itinerary.getFirstLocationName()).toBe(firstLocationName);
			expect(itinerary.getLastLocationName()).toBe(lastLocationName);
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
			const activity = new Activity(activityTypeCatalog, placeCatalog);
			itinerary.addActivity(activity);
			expect(itinerary.getStartDate().getTime()).toBe(activity.getStartDate().getTime());
		});

		it("Should have the same end date as the activity has, when just one activity added", () => {
			const activity = new Activity(activityTypeCatalog, placeCatalog);
			itinerary.addActivity(activity);
			expect(itinerary.getEndDate().getTime()).toBe(activity.getEndDate().getTime());
		});

		it("Should have the same start date as the first activity in chronological order", () => {
			const activity1 = new Activity(activityTypeCatalog, placeCatalog);
			const activity2 = new Activity(activityTypeCatalog, placeCatalog);
			itinerary.addActivity(activity1);
			itinerary.addActivity(activity2);
			expect(itinerary.getStartDate().getTime()).toBe(activity1.getStartDate().getTime());
		});

		it("Should have the same end date as the last activity in chronological order", () => {
			const activity1 = new Activity(activityTypeCatalog, placeCatalog);
			const activity2 = new Activity(activityTypeCatalog, placeCatalog);
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
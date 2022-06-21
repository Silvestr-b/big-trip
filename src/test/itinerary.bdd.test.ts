import {ItineraryDriver} from "./fixtures/ItineraryDriver";
import {ItineraryWorld} from "./fixtures/ItineraryWorld";

describe("Itinerary", () => {
	let driver: ItineraryDriver;
	let world: ItineraryWorld;

	beforeEach(() => {
		world = new ItineraryWorld();
		driver = new ItineraryDriver(world.itinerary);
	})

	describe("Adding/Removing", () => {
		it("Should be empty by default", () => {
			driver.verifyIsEmpty();
		});

		it("Should add an activity", () => {
			driver.addActivity(world.activities.SFTaxi);
			driver.verifyContains(world.activities.SFTaxi);
			driver.verifyActivitiesNumber(1);
		});

		it("Should add multiple activities", () => {
			driver.addActivity(world.activities.SFTaxi);
			driver.addActivity(world.activities.SFHotel);
			driver.verifyContains(world.activities.SFTaxi);
			driver.verifyContains(world.activities.SFHotel);
			driver.verifyActivitiesNumber(2);
		});

		it("Should not add an activity if it's already added", () => {
			driver.addActivity(world.activities.SFTaxi);
			driver.verifyAddActivityThrows(world.activities.SFTaxi, world.exceptions.ActivityAlreadyAddedException);
		});

		it("Should remove an activity", () => {
			driver.addActivity(world.activities.SFTaxi);
			driver.removeActivity(world.activities.SFTaxi);
			driver.verifyDoesNotContain(world.activities.SFTaxi);
		});

		it("Should throw on an attempt to remove an activity not added", () => {
			driver.verifyRemoveActivityThrows(world.activities.SFTaxi, world.exceptions.UnknownActivityException);
		});
	});

	describe("Locations", () => {
		it("Should throw on an attempt to get the name of the first location when empty", () => {
			driver.verifyGetFirstLocationThrows(world.exceptions.EmptyItineraryException);
		});

		it("Should throw on an attempt to get the name of the last location when empty", () => {
			driver.verifyGetLastLocationThrows(world.exceptions.EmptyItineraryException);
		});

		it("Should return the same location name as the first and the last when only one activity added", () => {
			driver.addActivity(world.activities.SFTaxi);
			driver.verifyFirstLocationNameIsActivityLocationName(world.activities.SFTaxi);
			driver.verifyLastLocationNameIsActivityLocationName(world.activities.SFTaxi);
		});

		it("Should return location names in chronological order", () => {
			driver.addActivity(world.activities.NYHotel);
			driver.addActivity(world.activities.SFHotel);
			driver.verifyFirstLocationNameIsActivityLocationName(world.activities.SFHotel);
			driver.verifyLastLocationNameIsActivityLocationName(world.activities.NYHotel);
		});
	});

	describe("Dates", () => {
		it("Should throw on an attempt to get the start or end date when the itinerary is empty", () => {
			driver.verifyGetStartDateThrows(world.exceptions.EmptyItineraryException);
			driver.verifyGetEndDateThrows(world.exceptions.EmptyItineraryException);
		});

		it("Should have the same start date as the activity has, when just one activity added", () => {
			driver.addActivity(world.activities.SFTaxi);
			driver.verifyStartDateIsActivityStartDate(world.activities.SFTaxi);
		});

		it("Should have the same end date as the activity has, when just one activity added", () => {
			driver.addActivity(world.activities.SFTaxi);
			driver.verifyEndDateIsActivityEndDate(world.activities.SFTaxi);
		});

		it("Should have the same start date as the first activity in chronological order", () => {
			driver.addActivity(world.activities.SFHotel);
			driver.addActivity(world.activities.SFTaxi);
			driver.verifyStartDateIsActivityStartDate(world.activities.SFTaxi);
		});

		it("Should have the same end date as the last activity in chronological order", () => {
			driver.addActivity(world.activities.SFHotel);
			driver.addActivity(world.activities.SFTaxi);
			driver.verifyEndDateIsActivityEndDate(world.activities.SFHotel);
		});
	});

	describe("Statistics", () => {
		it("Should return 0 total cost when empty", () => {
			driver.verifyTotalCost(0);
		});

		it("Should return the total cost of a single activity if only one added", () => {
			driver.addActivity(world.activities.SFTaxi);
			driver.verifyTotalCost(world.activities.SFTaxi.getTotalCost());
		});

		it("Should return the total cost of all activities added", () => {
			driver.addActivity(world.activities.SFTaxi);
			driver.addActivity(world.activities.SFHotel);
			driver.verifyTotalCost(world.activities.SFTaxi.getTotalCost() + world.activities.SFHotel.getTotalCost());
		});

		it("Should return the total cost of the remaining activities only", () => {
			driver.addActivity(world.activities.SFTaxi);
			driver.addActivity(world.activities.SFHotel);
			driver.removeActivity(world.activities.SFTaxi);
			driver.verifyTotalCost(world.activities.SFHotel.getTotalCost());
		});

		it("Should return 0 cost if there is no activity of the specified type", () => {
			driver.addActivity(world.activities.SFTaxi);
			driver.addActivity(world.activities.NYTaxi);
			driver.verifyTotalCostOf(world.types.hotel, 0);
		});

		it("Should return the total cost for all the activities of the specified type", () => {
			driver.addActivity(world.activities.SFTaxi);
			driver.addActivity(world.activities.SFHotel);
			driver.addActivity(world.activities.NYTaxi);
			driver.addActivity(world.activities.NYHotel);
			driver.verifyTotalCostOf(world.types.taxi, world.activities.SFTaxi.getTotalCost() + world.activities.NYTaxi.getTotalCost());
			driver.verifyTotalCostOf(world.types.hotel, world.activities.SFHotel.getTotalCost() + world.activities.NYHotel.getTotalCost());
		});

		it("Should return 0 as the number of activities of the specified type when empty", () => {
			driver.addActivity(world.activities.SFTaxi);
			driver.addActivity(world.activities.SFHotel);
			driver.addActivity(world.activities.NYTaxi);
			driver.verifyTotalNumberOf(world.types.taxi, 2);
			driver.verifyTotalNumberOf(world.types.hotel, 1);
		});

		it("Should return 0 as the number of activities of the specified type when no activities of such type added", () => {
			driver.addActivity(world.activities.SFTaxi);
			driver.verifyTotalNumberOf(world.types.hotel, 0);
		});

		it("Should return the total number of activities of the specified type when added", () => {
			driver.addActivity(world.activities.SFTaxi);
			driver.verifyTotalNumberOf(world.types.taxi, 1);
		});

		it("Should return 0 as the duration of activities of the specified type when empty", () => {
			driver.verifyTotalDurationOf(world.types.taxi, 0);
		});

		it("Should return 0 as the duration of activities of the specified type when no activities of such type added", () => {
			driver.addActivity(world.activities.SFTaxi);
			driver.verifyTotalDurationOf(world.types.hotel, 0);
		});

		it("Should return total the duration of activities of the specified type when added", () => {
			driver.addActivity(world.activities.SFTaxi);
			driver.addActivity(world.activities.SFHotel);
			driver.addActivity(world.activities.NYTaxi);
			driver.verifyTotalDurationOf(world.types.taxi, world.activities.SFTaxi.getDuration() + world.activities.NYTaxi.getDuration());
			driver.verifyTotalDurationOf(world.types.hotel, world.activities.SFHotel.getDuration());
		});
	});

	describe("Filters", () => {
		it("Should return an empty array when there are no future activities", () => {
			driver.addActivity(world.activities.SFTaxi);
			driver.verifyFutureActivitiesNumber(0);
		});

		it("Should return a list of future activities when there are future activities", () => {
			driver.addActivity(world.activities.SFTaxi);
			driver.addActivity(world.activities.SFHotel);
			driver.addActivity(world.activities.NYTaxi);
			driver.addActivity(world.activities.NYHotel);
			driver.verifyFutureActivitiesNumber(2);
			driver.verifyFutureActivitiesContain(world.activities.NYTaxi);
			driver.verifyFutureActivitiesContain(world.activities.NYHotel);
		});

		it("Should return an empty array when there are no past activities", () => {
			driver.addActivity(world.activities.NYTaxi);
			driver.verifyPastActivitiesNumber(0);
		});

		it("Should return a list of past activities when there are past activities", () => {
			driver.addActivity(world.activities.SFTaxi);
			driver.addActivity(world.activities.SFHotel);
			driver.addActivity(world.activities.NYTaxi);
			driver.addActivity(world.activities.NYHotel);
			driver.verifyPastActivitiesNumber(2);
			driver.verifyPastActivitiesContain(world.activities.SFTaxi);
			driver.verifyPastActivitiesContain(world.activities.SFHotel);
		});
	});

	describe("Sorting", () => {
		it("Should sort activities by start date", () => {
			driver.addActivity(world.activities.NYHotel);
			driver.addActivity(world.activities.NYTaxi);
			driver.addActivity(world.activities.SFTaxi);
			driver.addActivity(world.activities.SFHotel);
			driver.sortByStartDate();
			driver.verifyAllActivitiesOrder(world.activityOrders.byStartDate);
			driver.verifyFutureActivitiesOrder(world.activityOrders.byStartDate);
			driver.verifyPastActivitiesOrder(world.activityOrders.byStartDate);
		});

		it("Should sort activities by name", () => {
			driver.addActivity(world.activities.SFTaxi);
			driver.addActivity(world.activities.SFHotel);
			driver.addActivity(world.activities.NYTaxi);
			driver.addActivity(world.activities.NYHotel);
			driver.sortByName();
			driver.verifyAllActivitiesOrder(world.activityOrders.byName);
			driver.verifyPastActivitiesOrder(world.activityOrders.byName);
			driver.verifyPastActivitiesOrder(world.activityOrders.byName);
		});

		it("Should sort activities by duration", () => {
			driver.addActivity(world.activities.SFTaxi);
			driver.addActivity(world.activities.SFHotel);
			driver.addActivity(world.activities.NYTaxi);
			driver.addActivity(world.activities.NYHotel);
			driver.sortByDuration();
			driver.verifyAllActivitiesOrder(world.activityOrders.byDuration);
			driver.verifyPastActivitiesOrder(world.activityOrders.byDuration);
			driver.verifyFutureActivitiesOrder(world.activityOrders.byDuration);
		});

		it("Should sort activities by Price", () => {
			driver.addActivity(world.activities.SFHotel);
			driver.addActivity(world.activities.SFTaxi);
			driver.addActivity(world.activities.NYHotel);
			driver.addActivity(world.activities.NYTaxi);
			driver.sortByPrice();
			driver.verifyAllActivitiesOrder(world.activityOrders.byPrice);
			driver.verifyPastActivitiesOrder(world.activityOrders.byPrice);
			driver.verifyFutureActivitiesOrder(world.activityOrders.byPrice);
		});
	});
});

import {ItineraryDriver} from "./fixtures/ItineraryDriver";
import {ItineraryContext} from "./fixtures/ItineraryContext";

describe("Itinerary", () => {
	let sut: ItineraryDriver;
	let ctx: ItineraryContext;

	beforeEach(() => {
		ctx = new ItineraryContext();
		sut = new ItineraryDriver();
	})

	describe("Adding/Removing", () => {
		it("Should be empty by default", () => {
			sut.verifyIsEmpty();
		});

		it("Should add an activity", () => {
			sut.addActivity(ctx.activities.SFTaxi);

			sut.verifyContains(ctx.activities.SFTaxi);
			sut.verifyActivitiesNumber(1);
		});

		it("Should add multiple activities", () => {
			sut.addActivity(ctx.activities.SFTaxi);
			sut.addActivity(ctx.activities.SFHotel);

			sut.verifyContains(ctx.activities.SFTaxi);
			sut.verifyContains(ctx.activities.SFHotel);
			sut.verifyActivitiesNumber(2);
		});

		it("Should not add an activity if it's already added", () => {
			sut.addActivity(ctx.activities.SFTaxi);

			sut.verifyAddActivityThrows(ctx.activities.SFTaxi, ctx.exceptions.ActivityAlreadyAddedException);
		});

		it("Should remove an activity", () => {
			sut.addActivity(ctx.activities.SFTaxi);
			sut.removeActivity(ctx.activities.SFTaxi);

			sut.verifyDoesNotContain(ctx.activities.SFTaxi);
		});

		it("Should throw on an attempt to remove an activity not added", () => {
			sut.verifyRemoveActivityThrows(ctx.activities.SFTaxi, ctx.exceptions.UnknownActivityException);
		});
	});

	describe("Locations", () => {
		it("Should throw on an attempt to get the name of the first location when empty", () => {
			sut.verifyGetFirstLocationThrows(ctx.exceptions.EmptyItineraryException);
		});

		it("Should throw on an attempt to get the name of the last location when empty", () => {
			sut.verifyGetLastLocationThrows(ctx.exceptions.EmptyItineraryException);
		});

		it("Should return the same location name as the first and the last when only one activity added", () => {
			sut.addActivity(ctx.activities.SFTaxi);

			sut.verifyFirstLocationNameIsActivityLocationName(ctx.activities.SFTaxi);
			sut.verifyLastLocationNameIsActivityLocationName(ctx.activities.SFTaxi);
		});

		it("Should return location names in chronological order", () => {
			sut.addActivity(ctx.activities.NYHotel);
			sut.addActivity(ctx.activities.SFHotel);

			sut.verifyFirstLocationNameIsActivityLocationName(ctx.activities.SFHotel);
			sut.verifyLastLocationNameIsActivityLocationName(ctx.activities.NYHotel);
		});
	});

	describe("Dates", () => {
		it("Should throw on an attempt to get the start or end date when the itinerary is empty", () => {
			sut.verifyGetStartDateThrows(ctx.exceptions.EmptyItineraryException);
			sut.verifyGetEndDateThrows(ctx.exceptions.EmptyItineraryException);
		});

		it("Should have the same start date as the activity has, when just one activity added", () => {
			sut.addActivity(ctx.activities.SFTaxi);

			sut.verifyStartDateIsActivityStartDate(ctx.activities.SFTaxi);
		});

		it("Should have the same end date as the activity has, when just one activity added", () => {
			sut.addActivity(ctx.activities.SFTaxi);

			sut.verifyEndDateIsActivityEndDate(ctx.activities.SFTaxi);
		});

		it("Should have the same start date as the first activity in chronological order", () => {
			sut.addActivity(ctx.activities.SFHotel);
			sut.addActivity(ctx.activities.SFTaxi);

			sut.verifyStartDateIsActivityStartDate(ctx.activities.SFTaxi);
		});

		it("Should have the same end date as the last activity in chronological order", () => {
			sut.addActivity(ctx.activities.SFHotel);
			sut.addActivity(ctx.activities.SFTaxi);

			sut.verifyEndDateIsActivityEndDate(ctx.activities.SFHotel);
		});
	});

	describe("Statistics", () => {
		it("Should return 0 total cost when empty", () => {
			sut.verifyTotalCost(0);
		});

		it("Should return the total cost of a single activity if only one added", () => {
			sut.addActivity(ctx.activities.SFTaxi);

			sut.verifyTotalCost(ctx.activities.SFTaxi.getTotalCost());
		});

		it("Should return the total cost of all activities added", () => {
			sut.addActivity(ctx.activities.SFTaxi);
			sut.addActivity(ctx.activities.SFHotel);

			sut.verifyTotalCost(ctx.activities.SFTaxi.getTotalCost() + ctx.activities.SFHotel.getTotalCost());
		});

		it("Should return the total cost of the remaining activities only", () => {
			sut.addActivity(ctx.activities.SFTaxi);
			sut.addActivity(ctx.activities.SFHotel);

			sut.removeActivity(ctx.activities.SFTaxi);

			sut.verifyTotalCost(ctx.activities.SFHotel.getTotalCost());
		});

		it("Should return 0 cost if there is no activity of the specified type", () => {
			sut.addActivity(ctx.activities.SFTaxi);
			sut.addActivity(ctx.activities.NYTaxi);

			sut.verifyTotalCostOf(ctx.types.hotel, 0);
		});

		it("Should return the total cost for all the activities of the specified type", () => {
			sut.addActivity(ctx.activities.SFTaxi);
			sut.addActivity(ctx.activities.SFHotel);
			sut.addActivity(ctx.activities.NYTaxi);
			sut.addActivity(ctx.activities.NYHotel);

			sut.verifyTotalCostOf(ctx.types.taxi, ctx.activities.SFTaxi.getTotalCost() + ctx.activities.NYTaxi.getTotalCost());
			sut.verifyTotalCostOf(ctx.types.hotel, ctx.activities.SFHotel.getTotalCost() + ctx.activities.NYHotel.getTotalCost());
		});

		it("Should return 0 as the number of activities of the specified type when empty", () => {
			sut.addActivity(ctx.activities.SFTaxi);
			sut.addActivity(ctx.activities.SFHotel);
			sut.addActivity(ctx.activities.NYTaxi);

			sut.verifyTotalNumberOf(ctx.types.taxi, 2);
			sut.verifyTotalNumberOf(ctx.types.hotel, 1);
		});

		it("Should return 0 as the number of activities of the specified type when no activities of such type added", () => {
			sut.addActivity(ctx.activities.SFTaxi);

			sut.verifyTotalNumberOf(ctx.types.hotel, 0);
		});

		it("Should return the total number of activities of the specified type when added", () => {
			sut.addActivity(ctx.activities.SFTaxi);

			sut.verifyTotalNumberOf(ctx.types.taxi, 1);
		});

		it("Should return 0 as the duration of activities of the specified type when empty", () => {
			sut.verifyTotalDurationOf(ctx.types.taxi, 0);
		});

		it("Should return 0 as the duration of activities of the specified type when no activities of such type added", () => {
			sut.addActivity(ctx.activities.SFTaxi);

			sut.verifyTotalDurationOf(ctx.types.hotel, 0);
		});

		it("Should return total the duration of activities of the specified type when added", () => {
			sut.addActivity(ctx.activities.SFTaxi);
			sut.addActivity(ctx.activities.SFHotel);
			sut.addActivity(ctx.activities.NYTaxi);

			sut.verifyTotalDurationOf(ctx.types.taxi, ctx.activities.SFTaxi.getDuration() + ctx.activities.NYTaxi.getDuration());
			sut.verifyTotalDurationOf(ctx.types.hotel, ctx.activities.SFHotel.getDuration());
		});
	});

	describe("Filters", () => {
		it("Should return an empty array when there are no future activities", () => {
			sut.addActivity(ctx.activities.SFTaxi);

			sut.verifyFutureActivitiesNumber(0);
		});

		it("Should return a list of future activities when there are future activities", () => {
			sut.addActivity(ctx.activities.SFTaxi);
			sut.addActivity(ctx.activities.SFHotel);
			sut.addActivity(ctx.activities.NYTaxi);
			sut.addActivity(ctx.activities.NYHotel);

			sut.verifyFutureActivitiesNumber(2);
			sut.verifyFutureActivitiesContain(ctx.activities.NYTaxi);
			sut.verifyFutureActivitiesContain(ctx.activities.NYHotel);
		});

		it("Should return an empty array when there are no past activities", () => {
			sut.addActivity(ctx.activities.NYTaxi);

			sut.verifyPastActivitiesNumber(0);
		});

		it("Should return a list of past activities when there are past activities", () => {
			sut.addActivity(ctx.activities.SFTaxi);
			sut.addActivity(ctx.activities.SFHotel);
			sut.addActivity(ctx.activities.NYTaxi);
			sut.addActivity(ctx.activities.NYHotel);

			sut.verifyPastActivitiesNumber(2);
			sut.verifyPastActivitiesContain(ctx.activities.SFTaxi);
			sut.verifyPastActivitiesContain(ctx.activities.SFHotel);
		});
	});

	describe("Sorting", () => {
		it("Should sort activities by start date", () => {
			sut.addActivity(ctx.activities.NYHotel);
			sut.addActivity(ctx.activities.NYTaxi);
			sut.addActivity(ctx.activities.SFTaxi);
			sut.addActivity(ctx.activities.SFHotel);

			sut.sortByStartDate();

			sut.verifyAllActivitiesOrder(ctx.activityOrders.byStartDate);
			sut.verifyFutureActivitiesOrder(ctx.activityOrders.byStartDate);
			sut.verifyPastActivitiesOrder(ctx.activityOrders.byStartDate);
		});

		it("Should sort activities by name", () => {
			sut.addActivity(ctx.activities.SFTaxi);
			sut.addActivity(ctx.activities.SFHotel);
			sut.addActivity(ctx.activities.NYTaxi);
			sut.addActivity(ctx.activities.NYHotel);

			sut.sortByName();

			sut.verifyAllActivitiesOrder(ctx.activityOrders.byName);
			sut.verifyPastActivitiesOrder(ctx.activityOrders.byName);
			sut.verifyPastActivitiesOrder(ctx.activityOrders.byName);
		});

		it("Should sort activities by duration", () => {
			sut.addActivity(ctx.activities.SFTaxi);
			sut.addActivity(ctx.activities.SFHotel);
			sut.addActivity(ctx.activities.NYTaxi);
			sut.addActivity(ctx.activities.NYHotel);

			sut.sortByDuration();

			sut.verifyAllActivitiesOrder(ctx.activityOrders.byDuration);
			sut.verifyPastActivitiesOrder(ctx.activityOrders.byDuration);
			sut.verifyFutureActivitiesOrder(ctx.activityOrders.byDuration);
		});

		it("Should sort activities by Price", () => {
			sut.addActivity(ctx.activities.SFHotel);
			sut.addActivity(ctx.activities.SFTaxi);
			sut.addActivity(ctx.activities.NYHotel);
			sut.addActivity(ctx.activities.NYTaxi);

			sut.sortByPrice();

			sut.verifyAllActivitiesOrder(ctx.activityOrders.byPrice);
			sut.verifyPastActivitiesOrder(ctx.activityOrders.byPrice);
			sut.verifyFutureActivitiesOrder(ctx.activityOrders.byPrice);
		});
	});
});

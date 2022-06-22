import {Itinerary} from "../main/Itinerary";
import {UnknownActivityException} from "../main/errors/UnknownActivityException";
import {EmptyItineraryException} from "../main/errors/EmptyItineraryException";
import {ActivityAlreadyAddedException} from "../main/errors/ActivityAlreadyAddedException";
import {ItineraryContext} from "./fixtures/ItineraryContext";

describe("Itinerary", () => {
	let world: ItineraryContext;
	let itinerary: Itinerary;

	beforeEach(() => {
		world = new ItineraryContext();
		itinerary = new Itinerary();
	})

	describe("Adding/Removing", () => {
		it("Should be empty by default", () => {
			expect(itinerary.isEmpty()).toBeTruthy();
		});

		it("Should add an activity", () => {
			itinerary.addActivity(world.activities.SFTaxi);
			expect(itinerary.getAllActivities()).toContain(world.activities.SFTaxi);
		});

		it("Should not add an activity if it's already added", () => {
			expect(() => {
				itinerary.addActivity(world.activities.SFTaxi);
				itinerary.addActivity(world.activities.SFTaxi);
			}).toThrow(ActivityAlreadyAddedException);
		});

		it("Should remove an activity", () => {
			itinerary.addActivity(world.activities.SFTaxi);
			itinerary.removeActivity(world.activities.SFTaxi);
			expect(itinerary.getAllActivities()).not.toContain(world.activities.SFTaxi);
		});

		it("Should throw on an attempt to remove an activity not added", () => {
			expect(() => {
				itinerary.removeActivity(world.activities.SFTaxi)
			}).toThrow(UnknownActivityException);
		});
	});

	describe("Locations", () => {
		it("Should throw on an attempt to get the name of the first and last location when empty", () => {
			expect(() => itinerary.getFirstLocationName()).toThrow(EmptyItineraryException);
			expect(() => itinerary.getLastLocationName()).toThrow(EmptyItineraryException);
		});

		it("Should return the same location name as the first and the last when only one activity added", () => {
			itinerary.addActivity(world.activities.SFTaxi);
			expect(itinerary.getFirstLocationName()).toBe(world.activities.SFTaxi.getLocationName());
			expect(itinerary.getLastLocationName()).toBe(world.activities.SFTaxi.getLocationName());
		});

		it("Should return location names in chronological order", () => {
			itinerary.addActivity(world.activities.SFHotel);
			itinerary.addActivity(world.activities.SFTaxi);
			expect(itinerary.getFirstLocationName()).toBe(world.activities.SFTaxi.getLocationName());
			expect(itinerary.getLastLocationName()).toBe(world.activities.SFHotel.getLocationName());
		});
	});

	describe("Dates", () => {
		it("Should throw on an attempt to get the start or end date when the itinerary is empty", () => {
			expect(() => itinerary.getStartDate()).toThrow(EmptyItineraryException);
			expect(() => itinerary.getEndDate()).toThrow(EmptyItineraryException);
		});

		it("Should have the same start date as the activity has, when just one activity added", () => {
			itinerary.addActivity(world.activities.SFTaxi);
			expect(itinerary.getStartDate().getTime()).toBe(world.activities.SFTaxi.getStartDate().getTime());
		});

		it("Should have the same end date as the activity has, when just one activity added", () => {
			itinerary.addActivity(world.activities.SFTaxi);
			expect(itinerary.getEndDate().getTime()).toBe(world.activities.SFTaxi.getEndDate().getTime());
		});

		it("Should have the same start date as the first activity in chronological order", () => {
			itinerary.addActivity(world.activities.SFHotel);
			itinerary.addActivity(world.activities.SFTaxi);
			expect(itinerary.getStartDate().getTime()).toBe(world.activities.SFTaxi.getStartDate().getTime());
		});

		it("Should have the same end date as the last activity in chronological order", () => {
			itinerary.addActivity(world.activities.SFHotel);
			itinerary.addActivity(world.activities.SFTaxi);
			expect(itinerary.getEndDate().getTime()).toBe(world.activities.SFHotel.getEndDate().getTime());
		});
	});

	describe("Statistics", () => {
		it("Should return 0 total cost when empty", () => {
			expect(itinerary.getTotalCost()).toBe(0);
		});

		it("Should return the total cost of a single activity if only one added", () => {
			itinerary.addActivity(world.activities.SFTaxi);
			expect(itinerary.getTotalCost()).toBe(world.activities.SFTaxi.getTotalCost());
		});

		it("Should return the total cost of all activities added", () => {
			itinerary.addActivity(world.activities.SFTaxi);
			itinerary.addActivity(world.activities.SFHotel);
			expect(itinerary.getTotalCost()).toBe(world.activities.SFTaxi.getTotalCost() + world.activities.SFHotel.getTotalCost());
		});

		it("Should return the total cost of the remaining activities only", () => {
			itinerary.addActivity(world.activities.SFTaxi);
			itinerary.addActivity(world.activities.SFHotel);
			itinerary.removeActivity(world.activities.SFTaxi);
			expect(itinerary.getTotalCost()).toBe(world.activities.SFHotel.getTotalCost());
		});

		it("Should return 0 cost if there is no activity of the specified type", () => {
			itinerary.addActivity(world.activities.SFTaxi);
			itinerary.addActivity(world.activities.NYTaxi);
			expect(itinerary.getTotalCostFor(world.types.hotel)).toBe(0);
		});

		it("Should return the total cost for all the activities of the specified type", () => {
			itinerary.addActivity(world.activities.SFTaxi);
			itinerary.addActivity(world.activities.SFHotel);
			expect(itinerary.getTotalCostFor(world.types.taxi)).toBe(world.activities.SFTaxi.getTotalCost());
			expect(itinerary.getTotalCostFor(world.types.hotel)).toBe(world.activities.SFHotel.getTotalCost());
		});

		it("Should return 0 as the number of activities of the specified type when empty", () => {
			expect(itinerary.getTotalNumberOf(world.types.taxi)).toBe(0);
		});

		it("Should return 0 as the number of activities of the specified type when no activities of such type added", () => {
			itinerary.addActivity(world.activities.SFTaxi);
			expect(itinerary.getTotalNumberOf(world.types.hotel)).toBe(0);
		});

		it("Should return the total number of activities of the specified type when added", () => {
			itinerary.addActivity(world.activities.SFTaxi);
			expect(itinerary.getTotalNumberOf(world.types.taxi)).toBe(1);
		});

		it("Should return 0 as the duration of activities of the specified type when empty", () => {
			expect(itinerary.getTotalDurationOf(world.types.taxi)).toBe(0);
		});

		it("Should return 0 as the duration of activities of the specified type when no activities of such type added", () => {
			itinerary.addActivity(world.activities.SFTaxi);
			expect(itinerary.getTotalDurationOf(world.types.hotel)).toBe(0);
		});

		it("Should return total the duration of activities of the specified type when added", () => {
			itinerary.addActivity(world.activities.SFTaxi);
			itinerary.addActivity(world.activities.SFHotel);
			itinerary.addActivity(world.activities.NYTaxi);
			expect(itinerary.getTotalDurationOf(world.types.taxi)).toBe(world.activities.SFTaxi.getDuration() + world.activities.NYTaxi.getDuration());
		});
	});

	describe("Filters", () => {
		it("Should return an empty array when there are no future activities", () => {
			expect(itinerary.getFutureActivities()).toEqual([]);
		});

		it("Should return a list of future activities when there are future activities", () => {
			itinerary.addActivity(world.activities.SFTaxi);
			itinerary.addActivity(world.activities.NYTaxi);
			expect(itinerary.getFutureActivities()).toEqual([world.activities.NYTaxi]);
		});

		it("Should return an empty array when there are no past activities", () => {
			expect(itinerary.getPastActivities()).toEqual([]);
		});

		it("Should return a list of past activities when there are past activities", () => {
			itinerary.addActivity(world.activities.SFTaxi);
			itinerary.addActivity(world.activities.NYTaxi);
			expect(itinerary.getPastActivities()).toEqual([world.activities.SFTaxi]);
		});
	});

	describe("Sorting", () => {

	});
});

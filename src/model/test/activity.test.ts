import {LocationCatalog} from "../LocationCatalog";
import {ActivityTypeCatalog} from "../ActivityTypeCatalog";
import {Activity} from "../Activity";
import {ActivityType} from "../ActivityType";
import {ActivityOption} from "../ActivityOption";
import {Location} from "../Location";

describe("Activity", () => {
	const upgradeOption = new ActivityOption("Upgrade", "Upgrade to business class", 190);
	const radioOption = new ActivityOption("RadioStation", "Choose the radio station", 30);
	const mealOption = new ActivityOption("OrderMeal", "Order Meal", 100);
	const taxiType = new ActivityType("Taxi", "./", [upgradeOption, radioOption]);
	const busType = new ActivityType("Bus", "./", [mealOption]);
	const activityTypeCatalog = new ActivityTypeCatalog([taxiType, busType]);
	const chamonixPlace = new Location("Chamonix", "Chamonix, in a middle of Europe, middle-eastern paradise, famous for its crowded street markets with the best street food in Asia.", []);
	const genevaPlace = new Location("Geneva", "Geneva, with crowded streets, with a beautiful old town, middle-eastern paradise, with an embankment of a mighty river as a centre of attraction, a perfect place to stay with a family.", []);
	const placeCatalog = new LocationCatalog([chamonixPlace, genevaPlace]);
	let activity: Activity;

	beforeEach(() => {
		activity = new Activity(activityTypeCatalog, placeCatalog);
	});

	describe("Name", () => {
		it("Should have the same default name as provided by the catalog", () => {
			const defaultTypeName = activityTypeCatalog.getDefaultType().getName();
			const defaultPlaceName = placeCatalog.getDefaultLocation().getName();
			expect(activity.getName()).toBe(`${defaultTypeName} ${defaultPlaceName}`);
		});

		it("Should change its name when type is changed", () => {
			const defaultPlaceName = placeCatalog.getDefaultLocation().getName();
			activity.changeType(busType);
			expect(activity.getName()).toBe(`${busType.getName()} ${defaultPlaceName}`);
		});

		it("Should change its name when place is changed", () => {
			const defaultTypeName = activityTypeCatalog.getDefaultType().getName();
			activity.setLocation(genevaPlace);
			expect(activity.getName()).toBe(`${defaultTypeName} ${genevaPlace.getName()}`);
		});
	});

	describe("Total Price", () => {
		it("Should change its total price when the base price changed", () => {
			activity.setBasePrice(100);
			expect(activity.getTotalPrice()).toBe(100);
		});

		it("Should change its total price when an option chosen", () => {
			activity.setBasePrice(100);
			activity.toggleOption(upgradeOption);
			expect(activity.getTotalPrice()).toBe(290);
		});

		it("Should change its total price when an option discarded", () => {
			activity.setBasePrice(100);
			activity.toggleOption(upgradeOption);
			activity.toggleOption(upgradeOption);
			expect(activity.getTotalPrice()).toBe(100);
		});
	});

	describe("Favorite", () => {
		it("Should not be favorite by default", () => {
			expect(activity.isFavorite()).toBe(false);
		});

		it("Should be favorite if toggle", () => {
			activity.toggleFavorite();
			expect(activity.isFavorite()).toBe(true);
		});

		it("Should be not favorite if toggle back", () => {
			activity.toggleFavorite();
			activity.toggleFavorite();
			expect(activity.isFavorite()).toBe(false);
		});
	});

	describe("Chosen Options", () => {
		it("Should not have chosen options by default", () => {
			expect(activity.getChosenOptions()).toEqual([]);
		});

		it("Should add options when chosen", () => {
			activity.toggleOption(upgradeOption);
			activity.toggleOption(radioOption);
			expect(activity.isOptionChosen(upgradeOption)).toBe(true);
			expect(activity.isOptionChosen(radioOption)).toBe(true);
		});

		it("Should remove options when discarded", () => {
			activity.toggleOption(upgradeOption);
			activity.toggleOption(upgradeOption);
			expect(activity.isOptionChosen(upgradeOption)).toBe(false);
		});

		it("Should add only allowed options", () => {
			activity.changeType(taxiType);
			activity.toggleOption(mealOption);
			expect(activity.isOptionChosen(mealOption)).toBe(false);
		});

		it("Should discard all options when the type is changed", () => {
			activity.toggleOption(upgradeOption);
			activity.toggleOption(radioOption);
			activity.changeType(busType);
			expect(activity.isOptionChosen(upgradeOption)).toBe(false);
			expect(activity.isOptionChosen(radioOption)).toBe(false);
		});
	});

	describe("Duration", () => {
		it("Should calculate the duration", () => {
			const date1 = new Date();
			const date2 = new Date();
			activity.setStartDate(date1);
			activity.setEndDate(date2);
			expect(activity.getDuration()).toBe(date2.getTime() - date2.getTime());
		});
	});
});
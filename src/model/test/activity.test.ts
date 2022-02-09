import {LocationCatalog} from "../LocationCatalog";
import {ActivityTypeCatalog} from "../ActivityTypeCatalog";
import {Activity} from "../Activity";
import {ActivityType} from "../ActivityType";
import {AdditionalOption} from "../AdditionalOption";
import {Location} from "../Location";

describe("Activity", () => {
	const upgradeOption = new AdditionalOption("Upgrade", "Upgrade to business class", 190);
	const radioOption = new AdditionalOption("RadioStation", "Choose the radio station", 30);
	const mealOption = new AdditionalOption("OrderMeal", "Order Meal", 100);
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
			const form = activity.getUpdateForm();
			form.changeType(busType)
			activity.update(form);

			expect(activity.getName()).toBe(`${busType.getName()} ${defaultPlaceName}`);
		});

		it("Should change its name when place is changed", () => {
			const defaultTypeName = activityTypeCatalog.getDefaultType().getName();
			const form = activity.getUpdateForm();
			form.changeLocation(genevaPlace);
			activity.update(form);

			expect(activity.getName()).toBe(`${defaultTypeName} ${genevaPlace.getName()}`);
		});
	});

	describe("Total Price", () => {
		it("Should change its total price when the base price changed", () => {
			const form = activity.getUpdateForm();
			form.changePrice(100);
			activity.update(form);

			expect(activity.getTotalPrice()).toBe(100);
		});

		it("Should change its total price when an option is selected", () => {
			const form = activity.getUpdateForm();
			form.changePrice(100);
			form.toggleOption(upgradeOption);
			activity.update(form);

			expect(activity.getTotalPrice()).toBe(290);
		});

		it("Should change its total price when an option discarded", () => {
			const form1 = activity.getUpdateForm();
			form1.changePrice(100);
			form1.toggleOption(upgradeOption);
			activity.update(form1);

			const form2 = activity.getUpdateForm();
			form2.toggleOption(upgradeOption);
			activity.update(form2);

			expect(activity.getTotalPrice()).toBe(100);
		});
	});

	describe("Favorite", () => {
		it("Should not be favorite by default", () => {
			expect(activity.isFavorite()).toBe(false);
		});

		it("Should be favorite if toggle", () => {
			const form = activity.getUpdateForm();
			form.toggleFavorite();
			activity.update(form);

			expect(activity.isFavorite()).toBe(true);
		});

		it("Should not be favorite if toggle back", () => {
			const form1 = activity.getUpdateForm();
			form1.toggleFavorite();
			activity.update(form1);

			const form2 = activity.getUpdateForm();
			form2.toggleFavorite();
			activity.update(form2);

			expect(activity.isFavorite()).toBe(false);
		});
	});

	describe("Selected Options", () => {
		it("Should not have selected options by default", () => {
			expect(activity.getSelectedOptions()).toEqual([]);
		});

		it("Should add options when selected", () => {
			const form = activity.getUpdateForm();
			form.toggleOption(upgradeOption);
			form.toggleOption(radioOption);
			activity.update(form);

			expect(activity.isOptionSelected(upgradeOption)).toBe(true);
			expect(activity.isOptionSelected(radioOption)).toBe(true);
		});

		it("Should remove options when deselected", () => {
			const form1 = activity.getUpdateForm();
			form1.toggleOption(upgradeOption);
			activity.update(form1);

			const form2 = activity.getUpdateForm();
			form2.toggleOption(upgradeOption);
			activity.update(form2);

			expect(activity.isOptionSelected(upgradeOption)).toBe(false);
		});

		// TODO: Add exceptions
		it("Should add only allowed options", () => {
			const form = activity.getUpdateForm();
			form.changeType(taxiType);
			form.toggleOption(mealOption);
			activity.update(form);

			expect(activity.isOptionSelected(mealOption)).toBe(false);
		});

		it("Should deselect all options when the type is changed", () => {
			const form1 = activity.getUpdateForm();
			form1.toggleOption(upgradeOption);
			form1.toggleOption(radioOption);
			activity.update(form1);

			const form2 = activity.getUpdateForm();
			form2.changeType(busType);
			activity.update(form2);

			expect(activity.isOptionSelected(upgradeOption)).toBe(false);
			expect(activity.isOptionSelected(radioOption)).toBe(false);
		});
	});

	describe("Duration", () => {
		it("Should calculate the duration", () => {
			const date1 = new Date();
			const date2 = new Date();

			const form = activity.getUpdateForm();
			form.changeStartDate(date1);
			form.changeEndDate(date2);
			activity.update(form);

			expect(activity.getDuration()).toBe(date2.getTime() - date2.getTime());
		});
	});
});
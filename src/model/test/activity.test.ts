import {Activity} from "../Activity";
import {OptionMother} from "./fixtures/OptionMother";
import {TypeMother} from "./fixtures/TypeMother";
import {LocationMother} from "./fixtures/LocationMother";

describe("Activity", () => {
	const upgrade = OptionMother.createUpgrade();
	const radio = OptionMother.createRadio();
	const meal = OptionMother.createMeal();
	const taxi = TypeMother.createTaxi([upgrade, radio]);
	const bus = TypeMother.createBus([meal]);
	const types = TypeMother.createCatalog([taxi, bus]);
	const chamonix = LocationMother.createChamonix();
	const geneva = LocationMother.createGeneva();
	const locations = LocationMother.createCatalog([chamonix, geneva]);
	let activity: Activity;

	beforeEach(() => {
		activity = new Activity(types, locations);
	});

	describe("Name", () => {
		it("Should have the same default name as provided by the catalog", () => {
			const typeName = types.getDefaultType().getName();
			const locationName = locations.getDefaultLocation().getName();

			expect(activity.getName()).toBe(`${typeName} ${locationName}`);
		});

		it("Should change its name when type is changed", () => {
			const locationName = activity.getLocation().getName();
			const form = activity.getUpdateForm();
			form.changeType(bus)
			activity.apply(form);

			expect(activity.getName()).toBe(`${bus.getName()} ${locationName}`);
		});

		it("Should change its name when location is changed", () => {
			const typeName = activity.getType().getName();
			const form = activity.getUpdateForm();
			form.changeLocation(geneva);
			activity.apply(form);

			expect(activity.getName()).toBe(`${typeName} ${geneva.getName()}`);
		});
	});

	describe("Price", () => {
		it("Should change its total price when the base price is changed", () => {
			const form = activity.getUpdateForm();
			form.changePrice(100);
			activity.apply(form);

			expect(activity.getBasePrice()).toBe(100);
			expect(activity.getTotalPrice()).toBe(100);
		});

		it("Should change its total price when an option is selected", () => {
			const form = activity.getUpdateForm();
			form.changePrice(100);
			form.toggleOption(upgrade);
			activity.apply(form);

			expect(activity.getBasePrice()).toBe(100);
			expect(activity.getTotalPrice()).toBe(290);
		});

		it("Should change its total price when an option is deselected", () => {
			const form1 = activity.getUpdateForm();
			form1.changePrice(100);
			form1.toggleOption(upgrade);
			activity.apply(form1);

			const form2 = activity.getUpdateForm();
			form2.toggleOption(upgrade);
			activity.apply(form2);

			expect(activity.getBasePrice()).toBe(100);
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
			activity.apply(form);

			expect(activity.isFavorite()).toBe(true);
		});

		it("Should not be favorite if toggle back", () => {
			const form1 = activity.getUpdateForm();
			form1.toggleFavorite();
			activity.apply(form1);

			const form2 = activity.getUpdateForm();
			form2.toggleFavorite();
			activity.apply(form2);

			expect(activity.isFavorite()).toBe(false);
		});
	});

	describe("Selected Options", () => {
		it("Should not have selected options by default", () => {
			expect(activity.getSelectedOptions()).toEqual([]);
		});

		it("Should add options when selected", () => {
			const form = activity.getUpdateForm();
			form.toggleOption(upgrade);
			form.toggleOption(radio);
			activity.apply(form);

			expect(activity.isOptionSelected(upgrade)).toBe(true);
			expect(activity.isOptionSelected(radio)).toBe(true);
		});

		it("Should remove options when deselected", () => {
			const form1 = activity.getUpdateForm();
			form1.toggleOption(upgrade);
			activity.apply(form1);

			const form2 = activity.getUpdateForm();
			form2.toggleOption(upgrade);
			activity.apply(form2);

			expect(activity.isOptionSelected(upgrade)).toBe(false);
		});

		// TODO: Add exceptions
		it("Should add only allowed options", () => {
			const form = activity.getUpdateForm();
			form.changeType(taxi);
			form.toggleOption(meal);
			activity.apply(form);

			expect(activity.isOptionSelected(meal)).toBe(false);
		});

		it("Should deselect all options when the type is changed", () => {
			const form1 = activity.getUpdateForm();
			form1.toggleOption(upgrade);
			form1.toggleOption(radio);
			activity.apply(form1);

			const form2 = activity.getUpdateForm();
			form2.changeType(bus);
			activity.apply(form2);

			expect(activity.isOptionSelected(upgrade)).toBe(false);
			expect(activity.isOptionSelected(radio)).toBe(false);
		});
	});

	describe("Duration", () => {
		it("Should calculate the duration", () => {
			const form = activity.getUpdateForm();
			form.changeStartDate(new Date(1));
			form.changeEndDate(new Date(2));
			activity.apply(form);

			expect(activity.getDuration()).toBe(1);
		});
	});
});
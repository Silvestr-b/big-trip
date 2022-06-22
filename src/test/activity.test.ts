import {Activity} from "../main/Activity";
import {IllegalOptionException} from "../main/errors/IllegalOptionException";
import {ActivityContext} from "./fixtures/ActivityContext";

describe("Activity", () => {
	let activity: Activity;
	let world: ActivityContext;

	beforeEach(() => {
		world = new ActivityContext();
		activity = new Activity(world.activityTypeCatalog.getDefaultType(), world.locationCatalog.getDefaultLocation());
	});

	describe("Name", () => {
		it("Should have the same default name as provided by the catalog", () => {
			const typeName = world.activityTypeCatalog.getDefaultType().getName();
			const locationName = world.locationCatalog.getDefaultLocation().getName();

			expect(activity.getName()).toBe(`${typeName} ${locationName}`);
		});

		it("Should change its name when type is changed", () => {
			const locationName = activity.getLocation().getName();
			const form = activity.getUpdateForm();
			form.changeType(world.types.hotel)
			activity.apply(form);

			expect(activity.getName()).toBe(`${world.types.hotel.getName()} ${locationName}`);
		});

		it("Should change its name when location is changed", () => {
			const typeName = activity.getType().getName();
			const form = activity.getUpdateForm();
			form.changeLocation(world.locations.newYork);
			activity.apply(form);

			expect(activity.getName()).toBe(`${typeName} ${world.locations.newYork.getName()}`);
		});
	});

	describe("Price", () => {
		it("Should change its total price when the base price is changed", () => {
			const form = activity.getUpdateForm();
			form.changePrice(100);
			activity.apply(form);

			expect(activity.getBasePrice()).toBe(100);
			expect(activity.getTotalCost()).toBe(100);
		});

		it("Should change its total price when an option is selected", () => {
			const form = activity.getUpdateForm();
			form.changePrice(100);
			form.toggleOption(world.options.businessClass);
			activity.apply(form);

			expect(activity.getBasePrice()).toBe(100);
			expect(activity.getTotalCost()).toBe(290);
		});

		it("Should change its total price when an option is deselected", () => {
			const form1 = activity.getUpdateForm();
			form1.changePrice(100);
			form1.toggleOption(world.options.businessClass);
			activity.apply(form1);

			const form2 = activity.getUpdateForm();
			form2.toggleOption(world.options.businessClass);
			activity.apply(form2);

			expect(activity.getBasePrice()).toBe(100);
			expect(activity.getTotalCost()).toBe(100);
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
			form.toggleOption(world.options.businessClass);
			form.toggleOption(world.options.customRadio);
			activity.apply(form);

			expect(activity.isOptionSelected(world.options.businessClass)).toBe(true);
			expect(activity.isOptionSelected(world.options.customRadio)).toBe(true);
		});

		it("Should remove options when deselected", () => {
			const form1 = activity.getUpdateForm();
			form1.toggleOption(world.options.businessClass);
			activity.apply(form1);

			const form2 = activity.getUpdateForm();
			form2.toggleOption(world.options.businessClass);
			activity.apply(form2);

			expect(activity.isOptionSelected(world.options.businessClass)).toBe(false);
		});

		it("Should add only allowed options", () => {
			const run = () => {
				const form = activity.getUpdateForm();
				form.changeType(world.types.taxi);
				form.toggleOption(world.options.fireplace);
			}

			expect(run).toThrow(IllegalOptionException);
		});

		it("Should deselect all options when the type is changed", () => {
			const form1 = activity.getUpdateForm();
			form1.toggleOption(world.options.businessClass);
			form1.toggleOption(world.options.customRadio);
			activity.apply(form1);

			const form2 = activity.getUpdateForm();
			form2.changeType(world.types.hotel);
			activity.apply(form2);

			expect(activity.isOptionSelected(world.options.businessClass)).toBe(false);
			expect(activity.isOptionSelected(world.options.customRadio)).toBe(false);
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
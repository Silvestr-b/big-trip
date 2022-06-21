import {ActivityDriver} from "./fixtures/ActivityDriver";
import {ActivityWorld} from "./fixtures/ActivityWorld";

describe("Activity", () => {
	let world: ActivityWorld;
	let driver: ActivityDriver;

	beforeEach(() => {
		world = new ActivityWorld();
		driver = new ActivityDriver(world.activity);
	});

	describe("Name", () => {
		it("Should have the same default name as provided by the catalog", () => {
			driver.verifyName(`${world.activityTypeCatalog.getDefaultType().getName()} ${world.locationCatalog.getDefaultLocation().getName()}`);
		});

		it("Should change its name when type is changed", () => {
			driver.changeLocation(world.locations.newYork);
			driver.changeType(world.types.taxi);
			driver.changeType(world.types.hotel);
			driver.verifyName(`${world.types.hotel.getName()} ${world.locations.newYork.getName()}`);
		});

		it("Should change its name when location is changed", () => {
			driver.changeType(world.types.hotel);
			driver.changeLocation(world.locations.sanFrancisco);
			driver.changeLocation(world.locations.newYork);
			driver.verifyName(`${world.types.hotel.getName()} ${world.locations.newYork.getName()}`);
		});
	});

	describe("Price", () => {
		it("Should change its total price when the base price is changed", () => {
			driver.changePrice(100);
			driver.verifyBasePrice(100);
			driver.verifyTotalCost(100);
		});

		it("Should change its total price when an option is selected", () => {
			driver.changePrice(0);
			driver.toggleOption(world.options.businessClass);
			driver.verifyBasePrice(0);
			driver.verifyTotalCost(world.options.businessClass.getPrice());
		});

		it("Should change its total price when an option is deselected", () => {
			driver.changePrice(100);
			driver.toggleOption(world.options.businessClass);
			driver.toggleOption(world.options.businessClass);
			driver.verifyBasePrice(100);
			driver.verifyTotalCost(100);
		});
	});

	describe("Favorite", () => {
		it("Should not be favorite by default", () => {
			driver.verifyIsNotFavorite();
		});

		it("Should be favorite if toggle", () => {
			driver.toggleFavorite();
			driver.verifyIsFavorite();
		});

		it("Should not be favorite if toggle back", () => {
			driver.toggleFavorite();
			driver.toggleFavorite();
			driver.verifyIsNotFavorite();
		});
	});

	describe("Options", () => {
		it("Should not have selected options by default", () => {
			driver.verifyNoOptionSelected();
		});

		it("Should add options when selected", () => {
			driver.toggleOption(world.options.businessClass);
			driver.toggleOption(world.options.customRadio);
			driver.verifyOptionSelected(world.options.businessClass);
			driver.verifyOptionSelected(world.options.customRadio);
		});

		it("Should remove options when deselected", () => {
			driver.toggleOption(world.options.businessClass);
			driver.toggleOption(world.options.businessClass);
			driver.verifyOptionNotSelected(world.options.businessClass);
		});

		it("Should add only allowed options", () => {
			driver.changeType(world.types.taxi);
			driver.verifyToggleOptionThrows(world.options.fireplace);
		});

		it("Should deselect all options when the type is changed", () => {
			driver.toggleOption(world.options.businessClass);
			driver.toggleOption(world.options.customRadio);
			driver.changeType(world.types.hotel);
			driver.verifyNoOptionSelected();
		});
	});

	describe("Duration", () => {
		it("Should calculate the duration", () => {
			driver.changeStartDate(new Date(2));
			driver.changeEndDate(new Date(5));
			driver.verifyDuration(3);
		});
	});
});
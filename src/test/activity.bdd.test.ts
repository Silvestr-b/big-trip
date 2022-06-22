import {ActivityDriver} from "./fixtures/ActivityDriver";
import {ActivityContext} from "./fixtures/ActivityContext";

describe("Activity", () => {
	let ctx: ActivityContext;
	let sut: ActivityDriver;

	beforeEach(() => {
		ctx = new ActivityContext();
		sut = new ActivityDriver(ctx.defaultType, ctx.defaultLocation);
	});

	describe("Name", () => {
		it("Should have a default name", () => {
			sut.verifyName(`${ctx.defaultType.getName()} ${ctx.defaultLocation.getName()}`);
		});

		it("Should change its name when type is changed", () => {
			sut.changeLocation(ctx.locations.newYork);
			sut.changeType(ctx.types.taxi);
			sut.changeType(ctx.types.hotel);

			sut.verifyName(`${ctx.types.hotel.getName()} ${ctx.locations.newYork.getName()}`);
		});

		it("Should change its name when location is changed", () => {
			sut.changeType(ctx.types.hotel);
			sut.changeLocation(ctx.locations.sanFrancisco);
			sut.changeLocation(ctx.locations.newYork);

			sut.verifyName(`${ctx.types.hotel.getName()} ${ctx.locations.newYork.getName()}`);
		});
	});

	describe("Price", () => {
		it("Should change its total price when the base price is changed", () => {
			sut.changeBasePrice(100);

			sut.verifyBasePrice(100);
			sut.verifyTotalCost(100);
		});

		it("Should change its total price when an option is selected", () => {
			sut.changeBasePrice(0);
			sut.toggleOption(ctx.options.businessClass);

			sut.verifyBasePrice(0);
			sut.verifyTotalCost(ctx.options.businessClass.getPrice());
		});

		it("Should change its total price when an option is deselected", () => {
			sut.changeBasePrice(100);
			sut.toggleOption(ctx.options.businessClass);
			sut.toggleOption(ctx.options.businessClass);

			sut.verifyBasePrice(100);
			sut.verifyTotalCost(100);
		});
	});

	describe("Favorite", () => {
		it("Should not be favorite by default", () => {
			sut.verifyIsNotFavorite();
		});

		it("Should be favorite if toggle", () => {
			sut.toggleFavorite();

			sut.verifyIsFavorite();
		});

		it("Should not be favorite if toggle back", () => {
			sut.toggleFavorite();
			sut.toggleFavorite();

			sut.verifyIsNotFavorite();
		});
	});

	describe("Options", () => {
		it("Should not have selected options by default", () => {
			sut.verifyNoOptionSelected();
		});

		it("Should add options when selected", () => {
			sut.toggleOption(ctx.options.businessClass);
			sut.toggleOption(ctx.options.customRadio);

			sut.verifyOptionSelected(ctx.options.businessClass);
			sut.verifyOptionSelected(ctx.options.customRadio);
		});

		it("Should remove options when deselected", () => {
			sut.toggleOption(ctx.options.businessClass);
			sut.toggleOption(ctx.options.businessClass);

			sut.verifyOptionNotSelected(ctx.options.businessClass);
		});

		it("Should add only allowed options", () => {
			sut.changeType(ctx.types.taxi);

			sut.verifyToggleOptionThrows(ctx.options.fireplace);
		});

		it("Should deselect all options when the type is changed", () => {
			sut.toggleOption(ctx.options.businessClass);
			sut.toggleOption(ctx.options.customRadio);
			sut.changeType(ctx.types.hotel);

			sut.verifyNoOptionSelected();
		});
	});

	describe("Duration", () => {
		it("Should calculate the duration", () => {
			sut.changeStartDate(new Date(2));
			sut.changeEndDate(new Date(5));

			sut.verifyDuration(3);
		});
	});
});
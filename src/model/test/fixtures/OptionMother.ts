import {AdditionalOption} from "../../AdditionalOption";

export class OptionMother {
	public static createUpgrade() {
		return new AdditionalOption("Upgrade", "Upgrade to business class", 190);
	}

	public static createRadio() {
		return new AdditionalOption("RadioStation", "Choose the radio station", 30);
	}

	public static createMeal() {
		return new AdditionalOption("OrderMeal", "Order Meal", 100);
	}
}

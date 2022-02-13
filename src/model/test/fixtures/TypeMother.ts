import {ActivityType} from "../../ActivityType";
import {AdditionalOption} from "../../AdditionalOption";
import {ActivityTypeCatalog} from "../../ActivityTypeCatalog";

export class TypeMother {
	public static createTaxi(options: AdditionalOption[]) {
		return new ActivityType("Taxi", "./", options);
	}

	public static createBus(options: AdditionalOption[]) {
		return new ActivityType("Bus", "./", options);
	}

	public static createCatalog(types: ActivityType[]){
		return new ActivityTypeCatalog(types);
	}
}
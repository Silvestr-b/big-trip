import {AdditionalOption} from "../../main/AdditionalOption";
import {ActivityType} from "../../main/ActivityType";
import {ActivityTypeCatalog} from "../../main/ActivityTypeCatalog";
import {Location} from "../../main/Location";
import {LocationCatalog} from "../../main/LocationCatalog";

export class World {
	public options = {
		businessClass: new AdditionalOption("BusinessClass", "Upgrade to business class", 190),
		customRadio: new AdditionalOption("CustomRadio", "Choose the radio station", 30),
		fireplace: new AdditionalOption("Fireplace", "Fireplace in the room", 100)
	};

	public types = {
		taxi: new ActivityType("Taxi", "./", [this.options.businessClass, this.options.customRadio]),
		hotel: new ActivityType("Hotel", "./", [this.options.fireplace])
	};

	public activityTypeCatalog = new ActivityTypeCatalog([this.types.taxi, this.types.hotel]);

	public locations = {
		sanFrancisco: new Location("San Francisco", "San Francisco is the most beautiful city in the US", []),
		newYork: new Location("New York", "New York is the biggest city in the US", [])
	};

	public locationCatalog = new LocationCatalog([this.locations.sanFrancisco, this.locations.newYork]);
}
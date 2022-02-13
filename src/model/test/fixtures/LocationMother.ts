import {Location} from "../../Location";
import {LocationCatalog} from "../../LocationCatalog";

export class LocationMother {
	public static createChamonix() {
		return new Location("Chamonix", "Chamonix, in a middle of Europe, middle-eastern paradise, famous for its crowded street markets with the best street food in Asia.", []);
	}

	public static createGeneva() {
		return new Location("Geneva", "Geneva, with crowded streets, with a beautiful old town, middle-eastern paradise, with an embankment of a mighty river as a centre of attraction, a perfect place to stay with a family.", []);
	}

	public static createCatalog(locations: Location[]) {
		return new LocationCatalog(locations);
	}
}
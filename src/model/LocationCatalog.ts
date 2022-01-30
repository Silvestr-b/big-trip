import {Location} from "./Location";

export class LocationCatalog {
	private readonly locations: Location[];

	public constructor(locations: Location[]) {
		this.locations = locations;
	}

	public getDefaultLocation() {
		return this.locations[0];
	}

	public getAvailableLocations() {
		return this.locations;
	}
}

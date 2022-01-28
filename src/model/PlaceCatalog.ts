import {Place} from "./Place";

export class PlaceCatalog {
	private readonly places: Place[];

	public constructor(places: Place[]) {
		this.places = places;
	}

	public getDefaultPlace() {
		return this.places[0];
	}

	public getAvailablePlaces() {
		return this.places;
	}
}

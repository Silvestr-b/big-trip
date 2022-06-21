import {World} from "./World";
import {Itinerary} from "../../main/Itinerary";
import {ActivityBuilder} from "./ActivityBuilder";
import {ActivityAlreadyAddedException} from "../../main/errors/ActivityAlreadyAddedException";
import {UnknownActivityException} from "../../main/errors/UnknownActivityException";
import {EmptyItineraryException} from "../../main/errors/EmptyItineraryException";

export class ItineraryWorld extends World {
	public exceptions = {
		ActivityAlreadyAddedException,
		UnknownActivityException,
		EmptyItineraryException
	};
	public activities = {
		SFTaxi: this.getActivityBuilder()
			.setLocation(this.locations.sanFrancisco)
			.setType(this.types.taxi)
			.setPrice(100)
			.setStartDate(new Date(1))
			.setEndDate(new Date(2))
			.build(),

		SFHotel: this.getActivityBuilder()
			.setLocation(this.locations.sanFrancisco)
			.setType(this.types.hotel)
			.setPrice(200)
			.setStartDate(new Date(3))
			.setEndDate(new Date(4))
			.build(),

		NYTaxi: this.getActivityBuilder()
			.setLocation(this.locations.newYork)
			.setType(this.types.taxi)
			.setPrice(300)
			.setStartDate(new Date(new Date().getTime() + 1000))
			.setEndDate(new Date(new Date().getTime() + 1001))
			.build(),

		NYHotel: this.getActivityBuilder()
			.setLocation(this.locations.newYork)
			.setType(this.types.hotel)
			.setPrice(400)
			.setStartDate(new Date(new Date().getTime() + 1002))
			.setEndDate(new Date(new Date().getTime() + 1003))
			.build()
	}

	public itinerary = new Itinerary();

	public getActivityBuilder() {
		return new ActivityBuilder(
			this.activityTypeCatalog.getDefaultType(),
			this.locationCatalog.getDefaultLocation()
		);
	}
}
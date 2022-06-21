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
			.setEndDate(new Date(10))
			.build(),

		SFHotel: this.getActivityBuilder()
			.setLocation(this.locations.sanFrancisco)
			.setType(this.types.hotel)
			.setPrice(200)
			.setStartDate(new Date(11))
			.setEndDate(new Date(16))
			.build(),

		NYTaxi: this.getActivityBuilder()
			.setLocation(this.locations.newYork)
			.setType(this.types.taxi)
			.setPrice(300)
			.setStartDate(new Date(new Date().getTime() + 1000))
			.setEndDate(new Date(new Date().getTime() + 1002))
			.build(),

		NYHotel: this.getActivityBuilder()
			.setLocation(this.locations.newYork)
			.setType(this.types.hotel)
			.setPrice(400)
			.setStartDate(new Date(new Date().getTime() + 1003))
			.setEndDate(new Date(new Date().getTime() + 1004))
			.build()
	}
	public activityOrders = {
		byStartDate: [
			this.activities.SFTaxi,
			this.activities.SFHotel,
			this.activities.NYTaxi,
			this.activities.NYHotel
		],
		byName: [
			this.activities.NYHotel,
			this.activities.SFHotel,
			this.activities.NYTaxi,
			this.activities.SFTaxi
		],
		byDuration: [
			this.activities.NYHotel,
			this.activities.NYTaxi,
			this.activities.SFHotel,
			this.activities.SFTaxi
		],
		byPrice: [
			this.activities.SFTaxi,
			this.activities.SFHotel,
			this.activities.NYTaxi,
			this.activities.NYHotel
		]
	}

	public itinerary = new Itinerary();

	public getActivityBuilder() {
		return new ActivityBuilder(
			this.activityTypeCatalog.getDefaultType(),
			this.locationCatalog.getDefaultLocation()
		);
	}
}
import {CommonContext} from "./CommonContext";
import {ActivityBuilder} from "./ActivityBuilder";
import {ActivityAlreadyAddedException} from "../../main/errors/ActivityAlreadyAddedException";
import {UnknownActivityException} from "../../main/errors/UnknownActivityException";
import {EmptyItineraryException} from "../../main/errors/EmptyItineraryException";

export class ItineraryContext extends CommonContext {
	public exceptions = {
		ActivityAlreadyAddedException,
		UnknownActivityException,
		EmptyItineraryException
	};

	public dates = {
		twoDaysAgo: new Date(Date.now() - 2 * 86e+7),
		oneDayAgo: new Date(Date.now() - 86e+7),
		oneDayLater: new Date(Date.now() + 86e+7),
		twoDaysLater: new Date(Date.now() + 2 * 86e+7)
	};

	public activities = {
		SFTaxi: this.getActivityBuilder()
			.withLocation(this.locations.sanFrancisco)
			.withType(this.types.taxi)
			.withPrice(100)
			.withStartDate(this.dates.twoDaysAgo)
			.withDuration(4)
			.build(),

		SFHotel: this.getActivityBuilder()
			.withLocation(this.locations.sanFrancisco)
			.withType(this.types.hotel)
			.withPrice(200)
			.withStartDate(this.dates.oneDayAgo)
			.withDuration(3)
			.build(),

		NYTaxi: this.getActivityBuilder()
			.withLocation(this.locations.newYork)
			.withType(this.types.taxi)
			.withPrice(300)
			.withStartDate(this.dates.oneDayLater)
			.withDuration(2)
			.build(),

		NYHotel: this.getActivityBuilder()
			.withLocation(this.locations.newYork)
			.withType(this.types.hotel)
			.withPrice(400)
			.withStartDate(this.dates.twoDaysLater)
			.withDuration(1)
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

	public getActivityBuilder() {
		return new ActivityBuilder(
			this.activityTypeCatalog.getDefaultType(),
			this.locationCatalog.getDefaultLocation()
		);
	}
}
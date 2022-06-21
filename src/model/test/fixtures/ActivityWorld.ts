import {World} from "./World";
import {Activity} from "../../Activity";

export class ActivityWorld extends World {
	public activity = new Activity(
		this.activityTypeCatalog.getDefaultType(),
		this.locationCatalog.getDefaultLocation()
	)
}
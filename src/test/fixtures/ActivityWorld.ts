import {World} from "./World";
import {Activity} from "../../main/Activity";

export class ActivityWorld extends World {
	public activity = new Activity(
		this.activityTypeCatalog.getDefaultType(),
		this.locationCatalog.getDefaultLocation()
	)
}
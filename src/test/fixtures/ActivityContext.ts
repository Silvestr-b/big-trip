import {CommonContext} from "./CommonContext";

export class ActivityContext extends CommonContext {
	public defaultType = this.activityTypeCatalog.getDefaultType();
	public defaultLocation = this.locationCatalog.getDefaultLocation();
}
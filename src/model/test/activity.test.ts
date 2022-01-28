import {PlaceCatalog} from "../PlaceCatalog";
import {ActivityTypeCatalog} from "../ActivityTypeCatalog";
import {Activity} from "../Activity";
import {ActivityType} from "../ActivityType";
import {ActivityOption} from "../ActivityOption";
import {Place} from "../Place";

describe("Activity", () => {
  const activityTypeCatalog = new ActivityTypeCatalog([
    new ActivityType("Taxi", "./", [
      new ActivityOption("Upgrade", "Upgrade to business class", 190),
      new ActivityOption("RadioStation", "Choose the radio station", 30),
      new ActivityOption("SlowDown", "Drive slowly", 110)
    ]),
    new ActivityType("Bus", "./", [])
  ]);
  const placeCatalog = new PlaceCatalog([
    new Place("Chamonix", "Chamonix, in a middle of Europe, middle-eastern paradise, famous for its crowded street markets with the best street food in Asia.", []),
    new Place("Geneva", "Geneva, with crowded streets, with a beautiful old town, middle-eastern paradise, with an embankment of a mighty river as a centre of attraction, a perfect place to stay with a family.", [])
  ]);

  it("Initial state", () => {
    const activity = new Activity(activityTypeCatalog, placeCatalog);

    expect(activity.getBasePrice()).toBe(5);
  })
});
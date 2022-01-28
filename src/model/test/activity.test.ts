import {PlaceCatalog} from "../PlaceCatalog";
import {ActivityTypeCatalog} from "../ActivityTypeCatalog";
import {Activity} from "../Activity";
import {ActivityType} from "../ActivityType";
import {ActivityOption} from "../ActivityOption";
import {Place} from "../Place";

describe("Activity", () => {
  const upgradeOption = new ActivityOption("Upgrade", "Upgrade to business class", 190);
  const radioOption = new ActivityOption("RadioStation", "Choose the radio station", 30);
  const taxiType = new ActivityType("Taxi", "./", [upgradeOption, radioOption]);
  const busType = new ActivityType("Bus", "./", []);
  const activityTypeCatalog = new ActivityTypeCatalog([taxiType, busType]);
  const chamonixPlace = new Place("Chamonix", "Chamonix, in a middle of Europe, middle-eastern paradise, famous for its crowded street markets with the best street food in Asia.", []);
  const genevaPlace = new Place("Geneva", "Geneva, with crowded streets, with a beautiful old town, middle-eastern paradise, with an embankment of a mighty river as a centre of attraction, a perfect place to stay with a family.", []);
  const placeCatalog = new PlaceCatalog([chamonixPlace, genevaPlace]);
  let activity;

  beforeEach(() => {
    activity = new Activity(activityTypeCatalog, placeCatalog);
  })

  it("Should change its total price when the base price changed", () => {
    activity.setBasePrice(100);
    expect(activity.getTotalPrice()).toBe(100);
  });

  it("Should change its total price when an option chosen", () => {
    activity.toggleOption(upgradeOption);
    expect(activity.getTotalPrice()).toBe(195);
  });
});
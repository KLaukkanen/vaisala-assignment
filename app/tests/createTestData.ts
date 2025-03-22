import { CityData } from "../types/CityData";
import { TempData } from "../models/CityWeather";

const createTestData = async (cities: CityData[]) => {
  await Promise.all(
    cities.map(({ city, lat, lon, temp, humidity }) =>
      TempData.create({
        city,
        temp,
        humidity,
        location: {
          type: "Point",
          coordinates: [lon, lat],
        },
      })
    )
  );
};

export default createTestData;

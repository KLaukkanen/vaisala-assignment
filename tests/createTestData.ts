import { CityData } from "../app/types/CityData";
import { TempData } from "../db-init/Models";

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

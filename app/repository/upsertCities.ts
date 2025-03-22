import { TempData } from "../models/CityWeather";
import { CityData } from "../types/CityData";

const upsertCities = async (cities: CityData[]) => {
  const queries = cities.map(async ({ city, lat, lon, temp, humidity }) => {
    const [, created] = await TempData.findOrCreate({
      where: { city },
      defaults: {
        city,
        temp,
        humidity,
        location: { type: "Point", coordinates: [lon, lat] },
      },
    });

    if (created) return { rowsCreated: 1 };
    await TempData.update(
      {
        values: {
          temp,
          humidity,
          location: { type: "Point", coordinates: [lon, lat] },
        },
      },
      {
        where: {
          city,
        },
      }
    );
    return { rowsUpdated: 1 };
  });

  const responses = await Promise.all(queries);

  return responses.reduce(
    (responseObject, singleResult) => {
      return {
        rowsCreated:
          responseObject.rowsCreated + (singleResult.rowsCreated ?? 0),
        rowsUpdated:
          responseObject.rowsUpdated + (singleResult.rowsUpdated ?? 0),
      };
    },
    { rowsCreated: 0, rowsUpdated: 0 }
  );
};

export default upsertCities;

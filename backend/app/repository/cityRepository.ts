import { CityData } from "../types/CityData";
import sequelize, { TempData } from "../../db-init/Models";

const repository = {
  upsertCities: async (cities: CityData[]) => {
    const queries = cities.map(async ({ city, lat, lon, temp, humidity }) => {
      const created = await TempData.findOrCreate({
        where: { city },
        defaults: {
          city,
          temp,
          humidity,
          location: { type: "Point", coordinates: [lon, lat] },
        },
      });

      if (created[1]) return { rowsCreated: 1 };
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
  },
  getNearestCity: async ({
    longitude,
    latitude,
  }: {
    longitude: number;
    latitude: number;
  }): Promise<CityData | null> => {
    const result = await TempData.findOne({
      attributes: {
        include: [
          [
            sequelize.literal(
              // Use literal to gain access to psql <-> operator which is the most efficient way to find nearest neighbor
              `"location" <-> 'SRID=4326;POINT(${longitude} ${latitude})'`
            ),
            "diff",
          ],
        ],
      },
      order: ["diff"],
    });

    return result?.dataValues
      ? {
          city: result.dataValues.city,
          lon: result.dataValues.location.coordinates[0],
          lat: result.dataValues.location.coordinates[1],
          temp: result.dataValues.temp,
          humidity: result.dataValues.humidity,
        }
      : null;
  },
};

export type CityRepository = typeof repository;
export default repository;

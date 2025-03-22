import sequelize, { TempData } from "../models/CityWeather";
import { CityData } from "../types/CityData";

const findNearestCity = async ({
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
};

export default findNearestCity;

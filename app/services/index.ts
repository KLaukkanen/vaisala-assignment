import { CityRepository } from "../repository/cityRepository";
import { convert, TemperatureUnit } from "../util/temperatureConversions";
import validateAndAddCities from "./validateAndAddCities";

export default function services(repository: CityRepository) {
  return {
    validateAndAddCities: validateAndAddCities(repository),
    getNearestCity: async (
      coordinates: {
        latitude: number;
        longitude: number;
      },
      tempUnit: TemperatureUnit
    ) => {
      const response = await repository.getNearestCity(coordinates);

      return response !== null && tempUnit !== "K"
        ? {
            ...response,
            temp: convert({ amount: response?.temp, unit: "K" }, tempUnit)
              .amount,
          }
        : response;
    },
  };
}

export type Service = ReturnType<typeof services>;

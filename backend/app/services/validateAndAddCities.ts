import { CityRepository } from "../repository/cityRepository";
import { CityData } from "../types/CityData";
import { convert, TemperatureUnit } from "../util/temperatureConversions";

export default function validateAndAddCities(repository: CityRepository) {
  return async function (
    data: CityData[],
    tempUnit: TemperatureUnit
  ): Promise<{ rowsCreated: number; rowsUpdated: number }> {
    return repository.upsertCities(
      tempUnit !== "K"
        ? data.map((row) => ({
            ...row,
            temp: convert({ amount: row.temp, unit: tempUnit }, "K").amount, // Store temperatures in Kelvin
          }))
        : data
    );
  };
}

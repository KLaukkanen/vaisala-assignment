import upsertCities from "../repository/upsertCities";
import { CityData } from "../types/CityData";
import { convert, TemperatureUnit } from "../util/temperatureConversions";

const validateAndAddCities = async (
  data: CityData[],
  tempUnit: TemperatureUnit
): Promise<{ rowsCreated: number; rowsUpdated: number }> => {
  return upsertCities(
    tempUnit !== "K"
      ? data.map((row) => ({
          ...row,
          temp: convert({ amount: row.temp, unit: tempUnit }, "K").amount, // Store temperatures in Kelvin
        }))
      : data
  );
};
export default validateAndAddCities;

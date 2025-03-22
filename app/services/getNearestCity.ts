import { convert, TemperatureUnit } from "../util/temperatureConversions";
import findNearestCity from "../repository/findNearestCity";

const getNearestCity = async (
  coordinates: {
    latitude: number;
    longitude: number;
  },
  tempUnit: TemperatureUnit
) => {
  const response = await findNearestCity(coordinates);

  return response !== null && tempUnit !== "K"
    ? {
        ...response,
        // Temperatures are stored in Kelvin and converted on GET
        temp: convert({ amount: response?.temp, unit: "K" }, tempUnit).amount,
      }
    : response;
};
export default getNearestCity;

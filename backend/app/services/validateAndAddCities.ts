import { validateCityData } from "../types/CityData";

export default function validateAndAddCities(repository) {
  return async function (data: object): Promise<string[] | number | null> {
    if (!Array.isArray(data)) return null;
    const cities = data.map((entry) => validateCityData(entry)).filter(Boolean);
    if (cities.length === 0) return null;
    return repository.upsertCities(cities);
  };
}

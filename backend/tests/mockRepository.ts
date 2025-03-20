import { CityRepository } from "../app/repository/cityRepository";
import { CityData } from "../app/types/CityData";

const mockRepository: CityRepository = {
  upsertCities: (
    cities: CityData[]
  ): Promise<{ rowsCreated: number; rowsUpdated: number }> => {
    return Promise.resolve({
      rowsCreated: cities.length,
      rowsUpdated: 0,
    });
  },
  getNearestCity: (location: {
    longitude: number;
    latitude: number;
  }): Promise<CityData> => {
    if (location.latitude === 40 && location.longitude === 60) {
      return Promise.resolve({
        city: "Kajaani",
        lat: 40,
        lon: 65,
        temp: 20,
        humidity: 100,
      });
    } else
      return Promise.resolve({
        city: "Joensuu",
        lat: 30,
        lon: 30,
        temp: 30,
        humidity: 48,
      });
  },
};

export default mockRepository;

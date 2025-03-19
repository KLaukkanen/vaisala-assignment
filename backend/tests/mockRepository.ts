import { CityData } from "../app/types/CityData";

const mockRepository = {
  upsertCities: (cities: CityData[]): Promise<number> => {
    return Promise.resolve(cities.length);
  },
  getNearestCity: (location: {
    longitude: number;
    latitude: number;
  }): CityData => {
    if (location.latitude === 40 && location.longitude === 60) {
      return {
        city: "Kajaani",
        lat: 40,
        lon: 65,
        temp: 20,
        humidity: 100,
      };
    } else
      return {
        city: "Joensuu",
        lat: 30,
        lon: 30,
        temp: 30,
        humidity: 48,
      };
  },
  close: () => {},
};

export default mockRepository;

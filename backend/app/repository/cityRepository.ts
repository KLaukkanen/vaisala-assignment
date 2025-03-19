import pg from "pg";
import { CityData } from "../types/CityData";
const DB_CONNECTION_STRING =
  "postgresql://postgres:admin@localhost:5432/vaisala";
const client = new pg.Client(DB_CONNECTION_STRING);

export default async function createRepository() {
  await client.connect();
  return {
    upsertCities: async (cities: CityData[]) => {
      const valueStatements = cities.map(
        (_, index) =>
          `($${4 * index + 1},$${4 * index + 2},$${4 * index + 3},$${4 * index + 4})`
      );
      const values = cities
        .map((city) => ({
          city: city.city,
          location: `SRID=4326;POINT(${city.lon} ${city.lat})`,
          temp: city.temp,
          humidity: city.humidity,
        }))
        .map((city) => Object.values(city))
        .flat();

      const result = await client.query(
        `INSERT INTO temp_data (city, location, temp, humidity)
                VALUES ${valueStatements.reduce((all, one) => {
                  if (all.length) {
                    return all + ", " + one;
                  }
                  return one;
                }, "")}
                ON CONFLICT (city)
                DO UPDATE SET location = EXCLUDED.location, 
                temp = EXCLUDED.temp, 
                humidity = EXCLUDED.humidity
                `,
        values
      );

      return result.rowCount;
    },
    getNearestCity: async ({
      longitude,
      latitude,
    }: {
      longitude: number;
      latitude: number;
    }): Promise<CityData> => {
      const q = `SELECT city, location, temp, humidity, $1 <--> location as dist FROM temp_data
        ORDER BY dist
        limit 1
            `;
      console.log(q);
      const result = await client.query(
        `SELECT city, location, temp, humidity, $1 <-> location as dist FROM temp_data
        ORDER BY dist
        limit 1
            `,
        [`SRID=4326;POINT(${longitude} ${latitude})`]
      );
      return result.rows[0];
    },

    close: () => client.end(),
  };
}

export type CityData = {
  city: string;
  lat: number;
  lon: number;
  humidity: number;
  temp: number;
};

export function validateCityData(
  data: Record<string, string>
): CityData | null {
  const { city, lat, lon, humidity, temp } = data;
  const convertedData = {
    city,
    lat: Number(lat),
    lon: Number(lon),
    humidity: Number(humidity),
    temp: Number(temp),
  };
  if (
    !convertedData.city ||
    Number.isNaN(convertedData.lat) ||
    Number.isNaN(convertedData.lon) ||
    Number.isNaN(convertedData.humidity) ||
    Number.isNaN(convertedData.temp)
  ) {
    return null;
  }
  return convertedData;
}

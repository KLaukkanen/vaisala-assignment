export const validCities = [
  {
    city: "Joensuu",
    lat: "20",
    lon: "30",
    temp: "30",
    humidity: "50",
  },
  {
    city: "Lappeenranta",
    lat: "40",
    lon: "40",
    temp: "40",
    humidity: "50",
  },
];

export const validAndInvalidCities = [
  {
    city: "Joensuu",
    lat: "20",
    lon: "30",
    temp: "30",
    humidity: 50,
  },
  {
    city: "Lappeenranta",
    lat: "40",
    lon: "40",
    temp: "40",
    humidity: "50",
  },
  {
    city: "Sienijoki",
    lat: "30",
    lon: "30",
    temp: "null",
    humidity: "30",
  },
];

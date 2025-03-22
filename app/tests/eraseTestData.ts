import { TempData } from "../models/CityWeather";

const eraseTestData = async () => {
  await TempData.truncate();
};

export default eraseTestData;

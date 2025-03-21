import { TempData } from "../db-init/Models";

const eraseTestData = async () => {
  await TempData.truncate();
};

export default eraseTestData;

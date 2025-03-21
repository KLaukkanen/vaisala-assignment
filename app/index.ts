import createApp from "./app";
import sequelize from "../db-init/Models";

const app = createApp();
sequelize.sync().then(() => {
  app.listen(3000);
});

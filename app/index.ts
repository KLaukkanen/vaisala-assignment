import createApp from "./app";
import sequelize from "./models/CityWeather";

const app = createApp();
sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log("Server listening at port 3000.");
    console.log(
      "API specification available at http://localhost:3000/api-docs"
    );
  });
});

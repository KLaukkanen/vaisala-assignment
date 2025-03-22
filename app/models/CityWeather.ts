import { DataTypes, Sequelize } from "sequelize";

const url = `postgresql://postgres:admin@${process.env.DB_HOST}:${process.env.DB_PORT}/vaisala`;
const sequelize = new Sequelize(url, { logging: false });

export const TempData = sequelize.define(
  "city_weather",
  {
    city: { type: DataTypes.STRING, primaryKey: true },
    location: DataTypes.GEOGRAPHY,
    temp: DataTypes.DOUBLE,
    humidity: DataTypes.DOUBLE,
  },
  {
    indexes: [
      { name: "city_weather_location_i", using: "GIST", fields: ["location"] },
    ],
    timestamps: false,
  }
);

export default sequelize;

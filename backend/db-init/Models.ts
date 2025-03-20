import { DataTypes, Sequelize } from "sequelize";

const url = `postgresql://postgres:admin@localhost:${process.env.DB_PORT}/vaisala`;

const sequelize = new Sequelize(url, { logging: false });

export const TempData = sequelize.define(
  "temp_data",
  {
    city: { type: DataTypes.STRING, primaryKey: true },
    location: DataTypes.GEOGRAPHY,
    temp: DataTypes.DOUBLE,
    humidity: DataTypes.DOUBLE,
  },
  {
    indexes: [
      { name: "temp_data_location_i", using: "GIST", fields: ["location"] },
    ],
    timestamps: false,
  }
);

export default sequelize;

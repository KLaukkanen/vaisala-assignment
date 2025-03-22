import request from "supertest";
import createApp from "../../app";

import eraseTestData from "../../tests/eraseTestData";
import createTestData from "../../tests/createTestData";
import { DBEntries } from "../../tests/fixtures/prefilledDBEntries";
import sequelize from "../../models/CityWeather";
import {
  validAndInvalidCities,
  validCities,
} from "../../tests/fixtures/apiInput";

const app = createApp();

const PORT = 3000;
let server: ReturnType<typeof app.listen>;

describe("API tests", () => {
  beforeAll(async () => {
    server = app.listen(PORT);
    await sequelize.sync();
  });

  it("returns nearest city", async () => {
    await createTestData(DBEntries);
    const response = await request(app).get("/city?lon=60&lat=20").expect(200);
    expect(response.body.city).toEqual("Helsinki");
  });

  it("Returns 404 if database is empty", async () => {
    await request(app).get("/city?lon=60&lat=20").expect(404);
  });

  it("Adds valid cities", async () => {
    const response = await request(app)
      .post("/city")
      .set("Content-Type", "Application/JSON")
      .send(validCities)
      .expect(201);
    expect(response.body.rowsCreated).toEqual(2);
  });

  it("Returns correct counts if database already has the entries", async () => {
    await createTestData(DBEntries);
    const response = await request(app)
      .post("/city")
      .set("Content-Type", "Application/JSON")
      .send(validCities)
      .expect(200);
    expect(response.body.rowsCreated).toEqual(0);
    expect(response.body.rowsUpdated).toEqual(2);
  });

  it("Returns error when posting invalid parameters", async () => {
    await request(app)
      .post("/city")
      .set("Content-Type", "Application/JSON")
      .send(validAndInvalidCities)
      .expect(400);
  });

  afterEach(async () => {
    await eraseTestData();
  });

  afterAll(() => {
    server?.close();
    sequelize.close();
  });
});

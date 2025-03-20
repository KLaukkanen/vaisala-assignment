import request from "supertest";
import createApp from "../../app";

import eraseTestData from "../../../tests/eraseTestData";
import createTestData from "../../../tests/createTestData";
import { DBEntries } from "../../../tests/fixtures/prefilledDBEntries";
import sequelize from "../../../db-init/Models";
import { validCities } from "../../../tests/fixtures/apiInput";

// There are complete end-to-end tests that require a live database

const app = createApp();

const PORT = 3000;
let server: ReturnType<typeof app.listen>;

describe("API tests", () => {
  beforeAll(async () => {
    server = app.listen(PORT);
  });

  it("returns nearest city", async () => {
    await createTestData(DBEntries);
    const response = await request(app).get("/city?lon=60&lat=20").expect(200);
    expect(response.body.city).toEqual("Murvelswille");
  });

  it("Adds valid cities", async () => {
    const response = await request(app)
      .post("/city")
      .set("ContentType", "Application/JSON")
      .send(validCities)
      .expect(201);
    expect(response.body.rowsCreated).toEqual(2);
  });

  it("Returns correct counts if database already has the entries", async () => {
    await createTestData(DBEntries);
    const response = await request(app)
      .post("/city")
      .set("ContentType", "Application/JSON")
      .send(validCities)
      .expect(200);
    expect(response.body.rowsCreated).toEqual(0);
    expect(response.body.rowsUpdated).toEqual(2);
  });

  afterEach(async () => {
    await eraseTestData();
  });

  afterAll(() => {
    server?.close();
    sequelize.close();
  });
});

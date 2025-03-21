import {
  validAndInvalidCities,
  validCities,
} from "../../../tests/fixtures/apiInput";
import mockRepository from "../../../tests/mockRepository";
import createApp from "../../app";
import request from "supertest";
const app = createApp(mockRepository);
const PORT = 3001;
let server: ReturnType<typeof app.listen>;

// This file demonstrates REST unit tests, with mock repository replacing the database

describe("Mocked API tests", () => {
  beforeAll(async () => {
    server = app.listen(PORT);
  });
  it("return number of valid rows", async () => {
    const response = await request(app)
      .post("/city")
      .set("Content-Type", "Application/JSON")
      .send(validCities)
      .expect(201);
    expect(response.body.rowsCreated).toEqual(2);
  });
  it("Fails with invalid rows", async () => {
    await request(app)
      .post("/city")
      .set("Content-Type", "Application/JSON")
      .send(validAndInvalidCities)
      .expect(400);
  });
  it("Fails with invalid body", async () => {
    await request(app)
      .post("/city")
      .set("Content-Type", "Application/JSON")
      .send({ invalidObject: true })
      .expect(400);
  });
  it("Fails with invalid parameters", async () => {
    await request(app).get("/city?lon=20&lat=300").expect(400);
  });
  afterAll(() => {
    server?.close();
  });
});

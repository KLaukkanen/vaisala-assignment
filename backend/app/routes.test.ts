import request from "supertest";
import startApp from "./app";
import mockRepository from "../tests/mockRepository";

let application;

const validCities = [
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
];

const validAndInvalidCities = [
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

describe("API tests", () => {
  beforeAll(async () => {
    application = await startApp();
  });
  it("returns nearest city", async () => {
    const response = await request(application.app)
      .get("/city?lon=60&lat=20")
      .expect(200);
    expect(response.body.city).toEqual("Murvelswille");
  });
  afterAll(() => {
    application.shutdown();
  });
});

describe("Mocked API tests", () => {
  beforeAll(async () => {
    application = await startApp(mockRepository);
  });
  it("return number of valid rows", async () => {
    const response = await request(application.app)
      .post("/city")
      .set("Content-Type", "Application/JSON")
      .send(validCities)
      .expect(200);
    expect(response.text).toEqual("Rows added: 2");
  });
  it("Filters out invalid rows", async () => {
    const response = await request(application.app)
      .post("/city")
      .set("Content-Type", "Application/JSON")
      .send(validAndInvalidCities)
      .expect(200);
    expect(response.text).toEqual("Rows added: 2");
  });
  afterAll(() => {
    application.shutdown();
  });
});

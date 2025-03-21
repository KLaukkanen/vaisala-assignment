import { convert } from "../temperatureConversions";
describe("Temperature conversion unit tests", () => {
  it("Converts C to K properly", () => {
    expect(convert({ amount: 0, unit: "C" }, "K")).toEqual({
      amount: 273.15,
      unit: "K",
    });
  });

  it("Converts K to F properly", () => {
    expect(convert({ amount: 255.37, unit: "K" }, "F")).toEqual({
      amount: 0,
      unit: "F",
    });
  });

  it("Converts F to C properly", () => {
    expect(convert({ amount: 50, unit: "F" }, "C")).toEqual({
      amount: 10,
      unit: "C",
    });
  });

  it("Converts F to K properly", () => {
    expect(convert({ amount: 50, unit: "F" }, "K")).toEqual({
      amount: 283.15,
      unit: "K",
    });
  });
});

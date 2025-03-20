export type TemperatureUnit = "C" | "K" | "F";
type Temperature = {
  amount: number;
  unit: TemperatureUnit;
};

const multipliers = {
  K: 1,
  C: 1,
  F: 9 / 5,
};

const offsets = {
  K: 0,
  C: -273.15,
  F: -255.37,
};

export const convert = (
  temperature: Temperature,
  targetUnit: TemperatureUnit
) => {
  const multiplier = multipliers[targetUnit] / multipliers[temperature.unit];
  const offset = offsets[targetUnit] - offsets[temperature.unit];
  const amount =
    multiplier >= 1
      ? multiplier * (temperature.amount + offset)
      : multiplier * temperature.amount + offset;
  return {
    amount: Math.round(amount * 100) / 100, // Round to two decimals
    unit: targetUnit,
  };
};

//Y = aX + b
//X = Y/a - b/a

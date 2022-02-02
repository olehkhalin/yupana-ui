import BigNumber from "bignumber.js";

export const convertUnits = (
  n: number | string | BigNumber,
  unit: number | BigNumber = 18
) => {
  const val = new BigNumber(n).div(new BigNumber(10).pow(unit));

  if (new BigNumber(unit).gte(0)) {
    return val.decimalPlaces(+unit, BigNumber.ROUND_DOWN);
  }

  return val;
};

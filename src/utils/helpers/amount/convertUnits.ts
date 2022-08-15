import BigNumber from "bignumber.js";

export const convertUnits = (
  n: number | string | BigNumber,
  unit: number | BigNumber = 18,
  fixedDecimals = false
) => {
  const val = new BigNumber(n).div(new BigNumber(10).pow(unit));

  if (new BigNumber(unit).gte(0) && fixedDecimals) {
    return val.decimalPlaces(+unit, BigNumber.ROUND_DOWN);
  }

  return val;
};

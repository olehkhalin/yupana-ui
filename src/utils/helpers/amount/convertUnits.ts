import BigNumber from "bignumber.js";

export const convertUnits = (
  n: number | string | BigNumber,
  unit: number | BigNumber = 18,
  fixedDecimals = false,
  zeroFixedDecimals = false
) => {
  const val = new BigNumber(n).div(new BigNumber(10).pow(unit));

  if (new BigNumber(unit).gte(0) && fixedDecimals) {
    return val.decimalPlaces(
      +(zeroFixedDecimals ? 0 : unit),
      BigNumber.ROUND_DOWN
    );
  }

  return val;
};

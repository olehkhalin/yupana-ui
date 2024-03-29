import BigNumber from "bignumber.js";

export const getPrettyPercent = (value: BigNumber | number) => {
  const valueBigNumber = new BigNumber(value);
  if (valueBigNumber.gt(0) && valueBigNumber.lt(0.01)) {
    return "~0%";
  }
  const valueFixed = valueBigNumber.decimalPlaces(2);
  if (new BigNumber(valueFixed).eq(0)) {
    return "0%";
  }
  return `${
    valueBigNumber.gt(100)
      ? valueBigNumber.decimalPlaces(2, BigNumber.ROUND_UP)
      : valueBigNumber.decimalPlaces(2, BigNumber.ROUND_DOWN)
  }%`;
};

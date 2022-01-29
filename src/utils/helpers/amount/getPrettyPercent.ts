import BigNumber from "bignumber.js";

export const getPrettyPercent = (value: BigNumber | number) => {
  const valueBigNumber = new BigNumber(value);
  if (valueBigNumber.gt(0) && valueBigNumber.lt(0.01)) {
    return "~0%";
  }
  const valueFixed = valueBigNumber.toFixed(2);
  if (new BigNumber(valueFixed).eq(0)) {
    return "0%";
  }
  return `${valueFixed}%`;
};

import BigNumber from "bignumber.js";

type AmountValidationParameters = {
  max: BigNumber;
  customMaxMessage?: string;
  maxBalance?: string;
};

export const assetAmountValidationFactory = (
  params: AmountValidationParameters
) => {
  const { max, customMaxMessage, maxBalance } = params;

  return (value?: BigNumber) => {
    if (value === undefined) {
      return "This field is required";
    }
    if (value.lte(0)) {
      return "This field is required";
    }
    if (value.gt(max)) {
      return customMaxMessage ?? "Insufficient Balance";
    }
    if (maxBalance && value.gt(maxBalance)) {
      return "Insufficient Balance";
    }
    return true;
  };
};

import BigNumber from "bignumber.js";

type AmountValidationParameters = {
  max: BigNumber;
};

export const assetAmountValidationFactory = (
  params: AmountValidationParameters
) => {
  const { max } = params;

  return (value?: BigNumber) => {
    if (value === undefined) {
      return "This field is required";
    }
    if (value.lte(0)) {
      return "This field is required";
    }
    if (value.gt(max)) {
      return "Insufficient Balance";
    }
    return true;
  };
};

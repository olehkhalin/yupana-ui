import BigNumber from 'bignumber.js';

type AmountValidationParameters = {
  max: number | BigNumber
  isLiquidationRiskIncluded?: boolean
};

export const assetAmountValidationFactory = (params: AmountValidationParameters) => {
  const { max, isLiquidationRiskIncluded } = params;

  return (value?: BigNumber) => {
    if (value === undefined) {
      return 'This field is required';
    }
    if (value.gt(max)) {
      return 'Insufficient Balance';
    }
    if (isLiquidationRiskIncluded && new BigNumber(max).div(value).gte(0.8)) {
      return 'Beware of the Liquidation Risk';
    }
    return true;
  };
};

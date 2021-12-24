import BigNumber from 'bignumber.js';

export const getPrettyAmount = ({
  value,
  currency,
  // dec,
}: {
  value: number | BigNumber,
  currency?: string,
  dec?: number,
}) => {
  let finalValue;

  // TODO: Research this logic
  // const bigNumberValue = new BigNumber(value);
  // if (bigNumberValue.gt(0) && bigNumberValue.lt(new BigNumber(1).div(1 ** (dec ?? 0)))) {
  //   return '~0';
  // }

  if (value.toString().length > 6) {
    finalValue = new Intl.NumberFormat(
      'en',
      {
        maximumFractionDigits: 2,
        notation: 'compact',
      },
    ).format(+value);
  } else {
    finalValue = new Intl.NumberFormat(
      'en',
    ).format(+value);
  }

  if (currency) {
    if (currency === '$' || currency === 'ꜩ') {
      return `${currency} ${finalValue}`;
    }
    return `${finalValue} ${currency}`;
  }

  return finalValue;
};

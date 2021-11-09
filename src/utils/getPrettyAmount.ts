export const getPrettyAmount = ({
  value,
  currency,
  dec,
}: {
  value: number,
  currency?: string,
  dec?: number,
}) => {
  let finalValue;

  if (value.toString().length > 6) {
    finalValue = new Intl.NumberFormat(
      'en',
      {
        maximumFractionDigits: dec ?? 0,
        notation: 'compact',
      },
    ).format(value);
  }

  finalValue = new Intl.NumberFormat(
    'en',
  ).format(value);

  if (currency) {
    if (currency === '$') {
      return `${currency} ${finalValue}`;
    }
    return `${finalValue} ${currency}`;
  }

  return finalValue;
};

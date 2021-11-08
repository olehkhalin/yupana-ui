export const getPrettyPrice = (value: number, dec?: number) => {
  if (value.toString().length > 6) {
    return new Intl.NumberFormat(
      'en',
      {
        maximumFractionDigits: dec ?? 0,
        notation: 'compact',
      },
    ).format(value);
  }

  return new Intl.NumberFormat(
    'en',
  ).format(value);
};

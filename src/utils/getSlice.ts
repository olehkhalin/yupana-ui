export const getSlice = (
  str: string,
  amount?: number,
) => (str.length > (amount ?? 6) + 3 ? `${str.substr(0, amount ?? 6)}...` : str);

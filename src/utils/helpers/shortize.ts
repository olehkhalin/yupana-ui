export const shortize = (str: string, amount?: number): string =>
  str && `${str.slice(0, amount ?? 7)}...${str.slice(-4)}`;

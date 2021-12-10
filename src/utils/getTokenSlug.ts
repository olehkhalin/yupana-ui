import { TokenId } from 'types/token';

export const getTokenSlug = ({ address, id }: TokenId) => {
  if (!address) {
    return 'tez';
  }
  if (id === undefined || id === null) {
    return address;
  }
  return `${address}_${id}`;
};

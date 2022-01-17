import { TEZOS_PRICE_API } from 'constants/default';

export const fetchTezosPrice = async () => {
  try {
    const response = await fetch(TEZOS_PRICE_API);
    return await response.json();
  } catch (e) {
    console.log('Fetch tezos price error:', e);
  }

  return undefined;
};

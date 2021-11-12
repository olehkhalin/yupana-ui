import { QUIPU_THUMBNAIL_URI, XTZ_THUMBNAIL_URI } from 'components/ui/TokenLogo/content';

export const RECEIVE_COLLATERAL_DATA = [
  {
    asset: {
      id: '1',
      name: 'Tezos',
      address: 'KT1K9gCRgaLRFKTErYt1wVxA3Frb9FjasjTV',
      symbol: 'XTZ',
      thumbnailUri: XTZ_THUMBNAIL_URI,
    },
    priceOfReceiveAsset: 4.89,
    amountOfSupplied: 300.74,
    amountOfSuppliedUsd: 1500,
    maxBonus: 153.37,
    maxBonusUsd: 750,
  },
  {
    asset: {
      id: '1',
      name: 'QuipuSwap Governance Token',
      address: 'KT1K9gCRgaLRFKTErYt1wVxA3Frb9FjasAaQ',
      symbol: 'QUIPU',
      thumbnailUri: QUIPU_THUMBNAIL_URI,
    },
    priceOfReceiveAsset: 4.89,
    amountOfSupplied: 300.74,
    amountOfSuppliedUsd: 1500,
    maxBonus: 153.37,
    maxBonusUsd: 750,
    maxBonusPercent: 7,
  },
];

import { QUIPU_THUMBNAIL_URI, XTZ_THUMBNAIL_URI } from 'components/ui/TokenLogo/content';

export const REPAY_BORROW_DATA = [
  {
    borrowedAsset: {
      id: '1',
      name: 'Tezos',
      address: 'KT1K9gCRgaLRFKTErYt1wVxA3Frb9FjasjTV',
      symbol: 'XTZ',
      thumbnailUri: XTZ_THUMBNAIL_URI,
    },
    priceOfBorrowedAsset: 4.89,
    amountOfDebt: 300.74,
    amountOfDebtUsd: 1500,
    maxLiquidate: 153.37,
    maxLiquidateUsd: 750,
  },
  {
    borrowedAsset: {
      id: '1',
      name: 'QuipuSwap Governance Token',
      address: 'KT1K9gCRgaLRFKTErYt1wVxA3Frb9FjasjTV',
      symbol: 'QUIPU',
      thumbnailUri: QUIPU_THUMBNAIL_URI,
    },
    priceOfBorrowedAsset: 4.89,
    amountOfDebt: 300.74,
    amountOfDebtUsd: 1500,
    maxLiquidate: 153.37,
    maxLiquidateUsd: 750,
  },
];

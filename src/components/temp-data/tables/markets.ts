import { QUIPU_THUMBNAIL_URI, SMAK_THUMBNAIL_URI, XTZ_THUMBNAIL_URI } from 'components/ui/TokenLogo/content';

export const ALL_MARKETS_DATA = [
  {
    yToken: 0,
    asset: {
      address: 'tez',
      name: 'Tezos',
      symbol: 'XTZ',
      thumbnailUri: XTZ_THUMBNAIL_URI,
    },
    totalSupply: 2839,
    supplyApy: 1.29,
    numberOfSupplier: 321,
    totalBorrow: 292939,
    borrowApy: 7.28,
    numberOfBorrowers: 591,
  },
  {
    yToken: 1,
    asset: {
      address: 'KT1K9gCRgaLRFKTErYt1wVxA3Frb9FjasjJi',
      name: 'QuipuSwap Governance Token',
      symbol: 'QUIPU',
      thumbnailUri: QUIPU_THUMBNAIL_URI,
    },
    totalSupply: 28392939,
    supplyApy: 1.29,
    numberOfSupplier: 321,
    totalBorrow: 292939,
    borrowApy: 7.28,
    numberOfBorrowers: 591,
  },
  {
    yToken: 2,
    asset: {
      id: '1',
      address: 'KT1K9gCRgaLRFKTErYt1wVxA3Frb9FjasjTV',
      name: 'SmartLink',
      symbol: 'SMAK',
      thumbnailUri: SMAK_THUMBNAIL_URI,
    },
    totalSupply: 283929,
    supplyApy: 1.29,
    numberOfSupplier: 321,
    totalBorrow: 292939,
    borrowApy: 7.28,
    numberOfBorrowers: 591,
  },
];

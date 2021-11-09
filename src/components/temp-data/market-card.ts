import { SMAK_THUMBNAIL_URI, XTZ_THUMBNAIL_URI } from 'components/ui/TokenLogo/content';

export const MARKET_CARDS = {
  totalSupply: 18123,
  totalBorrow: 28673,
  supplyVolume24h: 54713,
  borrowVolume24h: 1729,
  numberOfSuppliers: 354,
  numberOfBorrowers: 117,
  assets: [
    {
      address: 'Tez',
      name: 'Tezos',
      symbol: 'XTZ',
      thumbnailUri: XTZ_THUMBNAIL_URI,
      supplyVolume24h: 25.21,
      borrowVolume24h: 18.87,
    },
    {
      address: 'KT1TwzD6zV3WeJ39ukuqxcfK2fJCnhvrdN1X',
      name: 'SmartLink',
      symbol: 'SMAK',
      thumbnailUri: SMAK_THUMBNAIL_URI,
      supplyVolume24h: 76.98,
      borrowVolume24h: 64.01,
    },
    {
      id: '0',
      address: 'KT193D4vozYnhGJQVtw7CoxxqphqUEEwK6Vb',
      name: 'Quipuswap Governance Token',
      symbol: 'QUIPU',
      thumbnailUri: SMAK_THUMBNAIL_URI,
      supplyVolume24h: 51.03,
      borrowVolume24h: 97.98,
    },
  ],
};

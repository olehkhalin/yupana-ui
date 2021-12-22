import { SMAK_THUMBNAIL_URI, XTZ_THUMBNAIL_URI } from 'components/ui/TokenLogo/content';

export const YOUR_SUPPLY_ASSETS_DATA = [
  {
    asset: {
      id: '1',
      address: 'tez',
      name: 'Tezos',
      symbol: 'XTZ',
      thumbnailUri: XTZ_THUMBNAIL_URI,
    },
    supplyApy: 9.70,
    wallet: 75,
    isCollateral: false,
    yToken: 0,
  },
  {
    asset: {
      id: '1',
      address: 'KT1K9gCRgaLRFKTErYt1wVxA3Frb9FjasjTV',
      name: 'SmartLink',
      symbol: 'SMAK',
      thumbnailUri: SMAK_THUMBNAIL_URI,
    },
    supplyApy: 9.70,
    wallet: 75,
    isCollateral: false,
    yToken: 1,
  },
];

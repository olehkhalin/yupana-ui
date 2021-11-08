import { KUSD_THUMBNAIL_URI, XTZ_THUMBNAIL_URI } from 'components/ui/TokenLogo/content';

export const SUPPLY_ASSETS_DATA = [
  {
    asset: {
      address: 'tez',
      name: 'Tezos',
      symbol: 'XTZ',
    },
    supplyApy: '9.70%',
    collateralFactor: '75%',
    wallet: '13.248,70',
  },
  {
    asset: {
      id: '2',
      address: 'KT1K9gCRgaLRFKTErYt1wVxA3Frb9FjasjTV',
      thumbnailUri: KUSD_THUMBNAIL_URI,
    },
    supplyApy: '9.70%',
    collateralFactor: '75%',
    wallet: '13.248,70',
  },
  {
    asset: {
      address: 'tez',
      thumbnailUri: XTZ_THUMBNAIL_URI,
    },
    supplyApy: '9.70%',
    collateralFactor: '75%',
    wallet: '13.248,70',
  },
  {
    asset: {
      id: '4',
      address: 'KT1K9gCRgaLRFKTErYt1wVxA3Frb9FjasjTV',
      name: 'Kolibri Long Name',
      thumbnailUri: KUSD_THUMBNAIL_URI,
    },
    supplyApy: '9.70%',
    collateralFactor: '75%',
    wallet: '13.248,70',
  },
];

import { KUSD_THUMBNAIL_URI, XTZ_THUMBNAIL_URI } from 'components/ui/TokenLogo/content';

export const SUPPLY_ASSETS_DATA = [
  {
    asset: {
      id: '1',
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
      symbol: 'Symbol',
      thumbnailUri: KUSD_THUMBNAIL_URI,
    },
    supplyApy: '9.70%',
    collateralFactor: '75%',
    wallet: '13.248,70',
  },
  {
    asset: {
      id: '3',
      thumbnailUri: XTZ_THUMBNAIL_URI,
    },
    supplyApy: '9.70%',
    collateralFactor: '75%',
    wallet: '13.248,70',
  },
  {
    asset: {
      id: '4',
      name: 'Kolibri Long Name',
      symbol: 'KUSD',
      thumbnailUri: KUSD_THUMBNAIL_URI,
    },
    supplyApy: '9.70%',
    collateralFactor: '75%',
    wallet: '13.248,70',
  },
];

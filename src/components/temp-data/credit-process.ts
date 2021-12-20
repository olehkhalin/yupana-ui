import { XTZ_THUMBNAIL_URI } from 'components/ui/TokenLogo/content';

export const CREDIT_PROCESS_DATA = {
  asset: {
    id: '1',
    address: 'tez',
    name: 'Tezos',
    symbol: 'XTZ',
    decimals: 6,
    thumbnailUri: XTZ_THUMBNAIL_URI,
  },
  tokenBalance: 16.666666, // token amount
  supplyBalance: 100, // $
  yourBorrowLimit: 60, // $
  borrowLimitUsed: 50, // %
  collateralFactor: 60, // %
  borrowByCurrentToken: 17.12, // $
  pricePerTokenInDollars: 6, // $
  tezosPrice: 3.3,
};

export const ANIMATION_TIME = 0.25;

// TODO: Delete later
export const XTZ_CURRENT_PRICE = 6;

export type NetworkType = 'mainnet' | 'edo2net' | 'florencenet' | 'granadanet' | 'sandbox' | 'hangzhounet';
export const APP_NAME = 'Yupana Finance';

export const BASE_URL = process.env.REACT_APP_BASE_URL;
export const LAST_USED_ACCOUNT_KEY = 'lastUsedAccount';
export const LAST_USED_CONNECTION_KEY = 'lastUsedConnection';
export const NETWORK = process.env.REACT_APP_NETWORK as NetworkType;
export const NETWORK_RPC = process.env.REACT_APP_NETWORK_RPC!;
export const TZKT_BASE_URL = process.env.REACT_APP_TZKT_BASE_URL;
export const CONTRACT_ADDRESS = 'KT1LTqpmGJ11EebMVWAzJ7DWd9msgExvHM94';
export const PROXY_CONTRACT_ADDRESS = 'KT1WvRRn1SZc26aLZHZvYmj6ogELyVbCYDqG';

export const DECIMALS_VALUE = 6;

export const LAMBDA_CONTRACT_ADDRESS = 'KT19ewhnhaCcCuoF1Ly2pxXAFRiF3UtgaY9U';
export const LV_ACCOUNT_PKH = 'tz1fVQangAfb9J1hRRMP2bSB6LvASD6KpY8A';
export const LV_ACCOUNT_PUBLIC_KEY = 'edpkvWbk81uh1DEvdWKR4g1bjyTGhdu1mDvznPUFE2zDwNsLXrEb9K';

export const STANDARD_PRECISION = 18;
export const COLLATERAL_PRECISION = 42;

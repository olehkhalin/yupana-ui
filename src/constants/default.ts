export const ANIMATION_TIME = 0.25;

// TODO: Delete later
export const XTZ_CURRENT_PRICE = 6;
export const LOADING_TIME = 2000;

export type NetworkType = 'mainnet' | 'edo2net' | 'florencenet' | 'granadanet' | 'sandbox' | 'hangzhounet';

export const APP_NAME = 'Yupana Finance';

export const BASE_URL = process.env.REACT_APP_BASE_URL;

export const LAST_USED_ACCOUNT_KEY = 'lastUsedAccount';
export const LAST_USED_CONNECTION_KEY = 'lastUsedConnection';

export const NETWORK = process.env.REACT_APP_NETWORK as NetworkType;
export const NETWORK_RPC = process.env.REACT_APP_NETWORK_RPC!;

export const TZKT_BASE_URL = process.env.REACT_APP_TZKT_BASE_URL;

// DAPP Variables
export type NetworkType =
  | "mainnet"
  | "edo2net"
  | "florencenet"
  | "granadanet"
  | "sandbox"
  | "hangzhounet";
export const APP_NAME = process.env.REACT_APP_NAME!;
export const BASE_URL = process.env.REACT_APP_BASE_URL;
export const LAST_USED_ACCOUNT_KEY = "lastUsedAccount";
export const LAST_USED_CONNECTION_KEY = "lastUsedConnection";
export const NETWORK = process.env.REACT_APP_NETWORK as NetworkType;
export const NETWORK_RPC = process.env.REACT_APP_NETWORK_RPC!;

// Lambda
export const LAMBDA_CONTRACT_ADDRESS =
  process.env.REACT_APP_LAMBDA_CONTRACT_ADDRESS!;
export const LV_ACCOUNT_PKH = process.env.REACT_APP_LV_ACCOUNT_PKH!;
export const LV_ACCOUNT_PUBLIC_KEY =
  process.env.REACT_APP_LV_ACCOUNT_PUBLIC_KEY!;

// General
export const EXPLORER_URL = process.env.REACT_APP_EXPLRER_URL;
export const TEZOS_PRICE_API_URL = process.env.REACT_APP_TEZOS_PRICE_API_URL!;

// Contract fallbacks
export const YUPANA_CONTRACT_FALLBACK =
  process.env.REACT_APP_YUPANA_CONTRACT_FALLBACK!;
export const ORACLE_PRICES_CONTRACT_FALLBACK =
  process.env.REACT_APP_ORACLE_PRICES_CONTRACT_FALLBACK!;

// Precisions
export const STANDARD_PRECISION = 18;
export const COLLATERAL_PRECISION = 42;

// Animation
export const ANIMATION_TIME = 0.25;

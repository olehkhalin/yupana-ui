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

export const EXPLORER_URL = process.env.REACT_APP_EXPLRER_URL;

// Contract fallbacks
export const YUPANA_CONTRACT_FALLBACK =
  process.env.REACT_APP_YUPANA_CONTRACT_FALLBACK!;
export const ORACLE_PRICES_CONTRACT_FALLBACK =
  process.env.REACT_APP_ORACLE_PRICES_CONTRACT_FALLBACK!;

// Precisions
export const STANDARD_PRECISION = 18;

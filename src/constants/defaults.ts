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

// General
export const EXPLORER_URL = process.env.REACT_APP_EXPLRER_URL;
export const TEZOS_PRICE_API_URL = process.env.REACT_APP_TEZOS_PRICE_API_URL!;
export const LIQUIDATION_POSITIONS_ITEMS_PER_PAGE = process.env
  .REACT_APP_LIQUIDATION_POSITIONS_ITEMS_PER_PAGE
  ? +process.env.REACT_APP_LIQUIDATION_POSITIONS_ITEMS_PER_PAGE
  : 10;
export const TEMPLE_WALLET_LINK =
  process.env.REACT_APP_TEMPLE_WALLET_LINK ?? "https://templewallet.com/";
export const YUPANA_LANDING_LINK = "https://yupanafinance.gatsbyjs.io/";

// Contract fallbacks
export const YUPANA_CONTRACT_FALLBACK =
  process.env.REACT_APP_YUPANA_CONTRACT_FALLBACK!;
export const ORACLE_PRICES_CONTRACT_FALLBACK =
  process.env.REACT_APP_ORACLE_PRICES_CONTRACT_FALLBACK!;

// Precisions
export const STANDARD_PRECISION = 18;
export const COLLATERAL_PRECISION = 42;
export const ORACLE_PRICE_PRECISION = 24;

// Logo url
export const CLOUDFLARE_IPFS = "https://cloudflare-ipfs.com/ipfs";
export const IPFS_IO = "https://ipfs.io/ipfs/";
export const PROXY_IMG =
  process.env.REACT_APP_PROXY_IMG ??
  "https://img.templewallet.com/insecure/fill/50/50/ce/0/plain";

// Transaction history
export const TRANSACTIONS_LS_KEY =
  process.env.REACT_APP_TRANSACTIONS_LS_KEY ?? "TRANSACTIONS";
export const TZKT = process.env.REACT_APP_TZKT;
export const TZKT_API = process.env.REACT_APP_TZKT_API;
export const TRANSACTION_LIFETIME = (process.env
  .REACT_APP_TRANSACTION_LIFETIME ?? 4 * 60 * 60 * 1000) as number;

// Animation
export const ANIMATION_TIME = 0.25;

// Analytics
export const ANALYTICS_WRITE_KEY = "7AYU9tIhkeyCPjgAtzynZgbrs2XHOrLs";

/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  jsonb: any;
  numeric: any;
  timestamptz: any;
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Boolean']>;
  _gt?: InputMaybe<Scalars['Boolean']>;
  _gte?: InputMaybe<Scalars['Boolean']>;
  _in?: InputMaybe<Array<Scalars['Boolean']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Boolean']>;
  _lte?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Scalars['Boolean']>;
  _nin?: InputMaybe<Array<Scalars['Boolean']>>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']>;
  _gt?: InputMaybe<Scalars['Int']>;
  _gte?: InputMaybe<Scalars['Int']>;
  _in?: InputMaybe<Array<Scalars['Int']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Int']>;
  _lte?: InputMaybe<Scalars['Int']>;
  _neq?: InputMaybe<Scalars['Int']>;
  _nin?: InputMaybe<Array<Scalars['Int']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>;
};

/** columns and relationships of "asset" */
export type Asset = {
  __typename?: 'asset';
  /** An array relationship */
  assetBorrowTx: Array<Borrow_Tx>;
  /** An aggregate relationship */
  assetBorrowTx_aggregate: Borrow_Tx_Aggregate;
  /** An array relationship */
  assetRepayTx: Array<Repay_Tx>;
  /** An aggregate relationship */
  assetRepayTx_aggregate: Repay_Tx_Aggregate;
  /** An array relationship */
  assetSupplyTx: Array<Supply_Tx>;
  /** An aggregate relationship */
  assetSupplyTx_aggregate: Supply_Tx_Aggregate;
  /** An array relationship */
  assetUserFunds: Array<Funds>;
  /** An aggregate relationship */
  assetUserFunds_aggregate: Funds_Aggregate;
  /** An array relationship */
  assetWithdrawTx: Array<Withdraw_Tx>;
  /** An aggregate relationship */
  assetWithdrawTx_aggregate: Withdraw_Tx_Aggregate;
  /** An array relationship */
  collateralAsset: Array<Liquidate_Tx>;
  /** An aggregate relationship */
  collateralAsset_aggregate: Liquidate_Tx_Aggregate;
  collateralFactor: Scalars['numeric'];
  contractAddress: Scalars['String'];
  /** An object relationship */
  interestModel: Interest_Model;
  interestModelId: Scalars['String'];
  isFa2: Scalars['Boolean'];
  lastPrice: Scalars['numeric'];
  /** An array relationship */
  liquidatedAsset: Array<Liquidate_Tx>;
  /** An aggregate relationship */
  liquidatedAsset_aggregate: Liquidate_Tx_Aggregate;
  /** An array relationship */
  rates: Array<Rates>;
  /** An aggregate relationship */
  rates_aggregate: Rates_Aggregate;
  reserveFactor: Scalars['numeric'];
  reserves: Scalars['numeric'];
  tokenId: Scalars['Int'];
  /** An array relationship */
  tokens: Array<Token>;
  /** An aggregate relationship */
  tokens_aggregate: Token_Aggregate;
  totalBorrowed: Scalars['numeric'];
  totalLiquid: Scalars['numeric'];
  totalSupply: Scalars['numeric'];
  ytoken: Scalars['Int'];
};

/** columns and relationships of "asset" */
export type AssetAssetBorrowTxArgs = {
  distinct_on?: InputMaybe<Array<Borrow_Tx_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Borrow_Tx_Order_By>>;
  where?: InputMaybe<Borrow_Tx_Bool_Exp>;
};

/** columns and relationships of "asset" */
export type AssetAssetBorrowTx_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Borrow_Tx_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Borrow_Tx_Order_By>>;
  where?: InputMaybe<Borrow_Tx_Bool_Exp>;
};

/** columns and relationships of "asset" */
export type AssetAssetRepayTxArgs = {
  distinct_on?: InputMaybe<Array<Repay_Tx_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Repay_Tx_Order_By>>;
  where?: InputMaybe<Repay_Tx_Bool_Exp>;
};

/** columns and relationships of "asset" */
export type AssetAssetRepayTx_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Repay_Tx_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Repay_Tx_Order_By>>;
  where?: InputMaybe<Repay_Tx_Bool_Exp>;
};

/** columns and relationships of "asset" */
export type AssetAssetSupplyTxArgs = {
  distinct_on?: InputMaybe<Array<Supply_Tx_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Supply_Tx_Order_By>>;
  where?: InputMaybe<Supply_Tx_Bool_Exp>;
};

/** columns and relationships of "asset" */
export type AssetAssetSupplyTx_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Supply_Tx_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Supply_Tx_Order_By>>;
  where?: InputMaybe<Supply_Tx_Bool_Exp>;
};

/** columns and relationships of "asset" */
export type AssetAssetUserFundsArgs = {
  distinct_on?: InputMaybe<Array<Funds_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Funds_Order_By>>;
  where?: InputMaybe<Funds_Bool_Exp>;
};

/** columns and relationships of "asset" */
export type AssetAssetUserFunds_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Funds_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Funds_Order_By>>;
  where?: InputMaybe<Funds_Bool_Exp>;
};

/** columns and relationships of "asset" */
export type AssetAssetWithdrawTxArgs = {
  distinct_on?: InputMaybe<Array<Withdraw_Tx_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Withdraw_Tx_Order_By>>;
  where?: InputMaybe<Withdraw_Tx_Bool_Exp>;
};

/** columns and relationships of "asset" */
export type AssetAssetWithdrawTx_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Withdraw_Tx_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Withdraw_Tx_Order_By>>;
  where?: InputMaybe<Withdraw_Tx_Bool_Exp>;
};

/** columns and relationships of "asset" */
export type AssetCollateralAssetArgs = {
  distinct_on?: InputMaybe<Array<Liquidate_Tx_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Liquidate_Tx_Order_By>>;
  where?: InputMaybe<Liquidate_Tx_Bool_Exp>;
};

/** columns and relationships of "asset" */
export type AssetCollateralAsset_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Liquidate_Tx_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Liquidate_Tx_Order_By>>;
  where?: InputMaybe<Liquidate_Tx_Bool_Exp>;
};

/** columns and relationships of "asset" */
export type AssetLiquidatedAssetArgs = {
  distinct_on?: InputMaybe<Array<Liquidate_Tx_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Liquidate_Tx_Order_By>>;
  where?: InputMaybe<Liquidate_Tx_Bool_Exp>;
};

/** columns and relationships of "asset" */
export type AssetLiquidatedAsset_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Liquidate_Tx_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Liquidate_Tx_Order_By>>;
  where?: InputMaybe<Liquidate_Tx_Bool_Exp>;
};

/** columns and relationships of "asset" */
export type AssetRatesArgs = {
  distinct_on?: InputMaybe<Array<Rates_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Rates_Order_By>>;
  where?: InputMaybe<Rates_Bool_Exp>;
};

/** columns and relationships of "asset" */
export type AssetRates_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Rates_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Rates_Order_By>>;
  where?: InputMaybe<Rates_Bool_Exp>;
};

/** columns and relationships of "asset" */
export type AssetTokensArgs = {
  distinct_on?: InputMaybe<Array<Token_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Token_Order_By>>;
  where?: InputMaybe<Token_Bool_Exp>;
};

/** columns and relationships of "asset" */
export type AssetTokens_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Token_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Token_Order_By>>;
  where?: InputMaybe<Token_Bool_Exp>;
};

/** aggregated selection of "asset" */
export type Asset_Aggregate = {
  __typename?: 'asset_aggregate';
  aggregate?: Maybe<Asset_Aggregate_Fields>;
  nodes: Array<Asset>;
};

/** aggregate fields of "asset" */
export type Asset_Aggregate_Fields = {
  __typename?: 'asset_aggregate_fields';
  avg?: Maybe<Asset_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Asset_Max_Fields>;
  min?: Maybe<Asset_Min_Fields>;
  stddev?: Maybe<Asset_Stddev_Fields>;
  stddev_pop?: Maybe<Asset_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Asset_Stddev_Samp_Fields>;
  sum?: Maybe<Asset_Sum_Fields>;
  var_pop?: Maybe<Asset_Var_Pop_Fields>;
  var_samp?: Maybe<Asset_Var_Samp_Fields>;
  variance?: Maybe<Asset_Variance_Fields>;
};

/** aggregate fields of "asset" */
export type Asset_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Asset_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "asset" */
export type Asset_Aggregate_Order_By = {
  avg?: InputMaybe<Asset_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Asset_Max_Order_By>;
  min?: InputMaybe<Asset_Min_Order_By>;
  stddev?: InputMaybe<Asset_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Asset_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Asset_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Asset_Sum_Order_By>;
  var_pop?: InputMaybe<Asset_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Asset_Var_Samp_Order_By>;
  variance?: InputMaybe<Asset_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Asset_Avg_Fields = {
  __typename?: 'asset_avg_fields';
  collateralFactor?: Maybe<Scalars['Float']>;
  lastPrice?: Maybe<Scalars['Float']>;
  reserveFactor?: Maybe<Scalars['Float']>;
  reserves?: Maybe<Scalars['Float']>;
  tokenId?: Maybe<Scalars['Float']>;
  totalBorrowed?: Maybe<Scalars['Float']>;
  totalLiquid?: Maybe<Scalars['Float']>;
  totalSupply?: Maybe<Scalars['Float']>;
  ytoken?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "asset" */
export type Asset_Avg_Order_By = {
  collateralFactor?: InputMaybe<Order_By>;
  lastPrice?: InputMaybe<Order_By>;
  reserveFactor?: InputMaybe<Order_By>;
  reserves?: InputMaybe<Order_By>;
  tokenId?: InputMaybe<Order_By>;
  totalBorrowed?: InputMaybe<Order_By>;
  totalLiquid?: InputMaybe<Order_By>;
  totalSupply?: InputMaybe<Order_By>;
  ytoken?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "asset". All fields are combined with a logical 'AND'. */
export type Asset_Bool_Exp = {
  _and?: InputMaybe<Array<Asset_Bool_Exp>>;
  _not?: InputMaybe<Asset_Bool_Exp>;
  _or?: InputMaybe<Array<Asset_Bool_Exp>>;
  assetBorrowTx?: InputMaybe<Borrow_Tx_Bool_Exp>;
  assetRepayTx?: InputMaybe<Repay_Tx_Bool_Exp>;
  assetSupplyTx?: InputMaybe<Supply_Tx_Bool_Exp>;
  assetUserFunds?: InputMaybe<Funds_Bool_Exp>;
  assetWithdrawTx?: InputMaybe<Withdraw_Tx_Bool_Exp>;
  collateralAsset?: InputMaybe<Liquidate_Tx_Bool_Exp>;
  collateralFactor?: InputMaybe<Numeric_Comparison_Exp>;
  contractAddress?: InputMaybe<String_Comparison_Exp>;
  interestModel?: InputMaybe<Interest_Model_Bool_Exp>;
  interestModelId?: InputMaybe<String_Comparison_Exp>;
  isFa2?: InputMaybe<Boolean_Comparison_Exp>;
  lastPrice?: InputMaybe<Numeric_Comparison_Exp>;
  liquidatedAsset?: InputMaybe<Liquidate_Tx_Bool_Exp>;
  rates?: InputMaybe<Rates_Bool_Exp>;
  reserveFactor?: InputMaybe<Numeric_Comparison_Exp>;
  reserves?: InputMaybe<Numeric_Comparison_Exp>;
  tokenId?: InputMaybe<Int_Comparison_Exp>;
  tokens?: InputMaybe<Token_Bool_Exp>;
  totalBorrowed?: InputMaybe<Numeric_Comparison_Exp>;
  totalLiquid?: InputMaybe<Numeric_Comparison_Exp>;
  totalSupply?: InputMaybe<Numeric_Comparison_Exp>;
  ytoken?: InputMaybe<Int_Comparison_Exp>;
};

/** aggregate max on columns */
export type Asset_Max_Fields = {
  __typename?: 'asset_max_fields';
  collateralFactor?: Maybe<Scalars['numeric']>;
  contractAddress?: Maybe<Scalars['String']>;
  interestModelId?: Maybe<Scalars['String']>;
  lastPrice?: Maybe<Scalars['numeric']>;
  reserveFactor?: Maybe<Scalars['numeric']>;
  reserves?: Maybe<Scalars['numeric']>;
  tokenId?: Maybe<Scalars['Int']>;
  totalBorrowed?: Maybe<Scalars['numeric']>;
  totalLiquid?: Maybe<Scalars['numeric']>;
  totalSupply?: Maybe<Scalars['numeric']>;
  ytoken?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "asset" */
export type Asset_Max_Order_By = {
  collateralFactor?: InputMaybe<Order_By>;
  contractAddress?: InputMaybe<Order_By>;
  interestModelId?: InputMaybe<Order_By>;
  lastPrice?: InputMaybe<Order_By>;
  reserveFactor?: InputMaybe<Order_By>;
  reserves?: InputMaybe<Order_By>;
  tokenId?: InputMaybe<Order_By>;
  totalBorrowed?: InputMaybe<Order_By>;
  totalLiquid?: InputMaybe<Order_By>;
  totalSupply?: InputMaybe<Order_By>;
  ytoken?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Asset_Min_Fields = {
  __typename?: 'asset_min_fields';
  collateralFactor?: Maybe<Scalars['numeric']>;
  contractAddress?: Maybe<Scalars['String']>;
  interestModelId?: Maybe<Scalars['String']>;
  lastPrice?: Maybe<Scalars['numeric']>;
  reserveFactor?: Maybe<Scalars['numeric']>;
  reserves?: Maybe<Scalars['numeric']>;
  tokenId?: Maybe<Scalars['Int']>;
  totalBorrowed?: Maybe<Scalars['numeric']>;
  totalLiquid?: Maybe<Scalars['numeric']>;
  totalSupply?: Maybe<Scalars['numeric']>;
  ytoken?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "asset" */
export type Asset_Min_Order_By = {
  collateralFactor?: InputMaybe<Order_By>;
  contractAddress?: InputMaybe<Order_By>;
  interestModelId?: InputMaybe<Order_By>;
  lastPrice?: InputMaybe<Order_By>;
  reserveFactor?: InputMaybe<Order_By>;
  reserves?: InputMaybe<Order_By>;
  tokenId?: InputMaybe<Order_By>;
  totalBorrowed?: InputMaybe<Order_By>;
  totalLiquid?: InputMaybe<Order_By>;
  totalSupply?: InputMaybe<Order_By>;
  ytoken?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "asset". */
export type Asset_Order_By = {
  assetBorrowTx_aggregate?: InputMaybe<Borrow_Tx_Aggregate_Order_By>;
  assetRepayTx_aggregate?: InputMaybe<Repay_Tx_Aggregate_Order_By>;
  assetSupplyTx_aggregate?: InputMaybe<Supply_Tx_Aggregate_Order_By>;
  assetUserFunds_aggregate?: InputMaybe<Funds_Aggregate_Order_By>;
  assetWithdrawTx_aggregate?: InputMaybe<Withdraw_Tx_Aggregate_Order_By>;
  collateralAsset_aggregate?: InputMaybe<Liquidate_Tx_Aggregate_Order_By>;
  collateralFactor?: InputMaybe<Order_By>;
  contractAddress?: InputMaybe<Order_By>;
  interestModel?: InputMaybe<Interest_Model_Order_By>;
  interestModelId?: InputMaybe<Order_By>;
  isFa2?: InputMaybe<Order_By>;
  lastPrice?: InputMaybe<Order_By>;
  liquidatedAsset_aggregate?: InputMaybe<Liquidate_Tx_Aggregate_Order_By>;
  rates_aggregate?: InputMaybe<Rates_Aggregate_Order_By>;
  reserveFactor?: InputMaybe<Order_By>;
  reserves?: InputMaybe<Order_By>;
  tokenId?: InputMaybe<Order_By>;
  tokens_aggregate?: InputMaybe<Token_Aggregate_Order_By>;
  totalBorrowed?: InputMaybe<Order_By>;
  totalLiquid?: InputMaybe<Order_By>;
  totalSupply?: InputMaybe<Order_By>;
  ytoken?: InputMaybe<Order_By>;
};

/** select columns of table "asset" */
export enum Asset_Select_Column {
  /** column name */
  CollateralFactor = 'collateralFactor',
  /** column name */
  ContractAddress = 'contractAddress',
  /** column name */
  InterestModelId = 'interestModelId',
  /** column name */
  IsFa2 = 'isFa2',
  /** column name */
  LastPrice = 'lastPrice',
  /** column name */
  ReserveFactor = 'reserveFactor',
  /** column name */
  Reserves = 'reserves',
  /** column name */
  TokenId = 'tokenId',
  /** column name */
  TotalBorrowed = 'totalBorrowed',
  /** column name */
  TotalLiquid = 'totalLiquid',
  /** column name */
  TotalSupply = 'totalSupply',
  /** column name */
  Ytoken = 'ytoken',
}

/** aggregate stddev on columns */
export type Asset_Stddev_Fields = {
  __typename?: 'asset_stddev_fields';
  collateralFactor?: Maybe<Scalars['Float']>;
  lastPrice?: Maybe<Scalars['Float']>;
  reserveFactor?: Maybe<Scalars['Float']>;
  reserves?: Maybe<Scalars['Float']>;
  tokenId?: Maybe<Scalars['Float']>;
  totalBorrowed?: Maybe<Scalars['Float']>;
  totalLiquid?: Maybe<Scalars['Float']>;
  totalSupply?: Maybe<Scalars['Float']>;
  ytoken?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "asset" */
export type Asset_Stddev_Order_By = {
  collateralFactor?: InputMaybe<Order_By>;
  lastPrice?: InputMaybe<Order_By>;
  reserveFactor?: InputMaybe<Order_By>;
  reserves?: InputMaybe<Order_By>;
  tokenId?: InputMaybe<Order_By>;
  totalBorrowed?: InputMaybe<Order_By>;
  totalLiquid?: InputMaybe<Order_By>;
  totalSupply?: InputMaybe<Order_By>;
  ytoken?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Asset_Stddev_Pop_Fields = {
  __typename?: 'asset_stddev_pop_fields';
  collateralFactor?: Maybe<Scalars['Float']>;
  lastPrice?: Maybe<Scalars['Float']>;
  reserveFactor?: Maybe<Scalars['Float']>;
  reserves?: Maybe<Scalars['Float']>;
  tokenId?: Maybe<Scalars['Float']>;
  totalBorrowed?: Maybe<Scalars['Float']>;
  totalLiquid?: Maybe<Scalars['Float']>;
  totalSupply?: Maybe<Scalars['Float']>;
  ytoken?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "asset" */
export type Asset_Stddev_Pop_Order_By = {
  collateralFactor?: InputMaybe<Order_By>;
  lastPrice?: InputMaybe<Order_By>;
  reserveFactor?: InputMaybe<Order_By>;
  reserves?: InputMaybe<Order_By>;
  tokenId?: InputMaybe<Order_By>;
  totalBorrowed?: InputMaybe<Order_By>;
  totalLiquid?: InputMaybe<Order_By>;
  totalSupply?: InputMaybe<Order_By>;
  ytoken?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Asset_Stddev_Samp_Fields = {
  __typename?: 'asset_stddev_samp_fields';
  collateralFactor?: Maybe<Scalars['Float']>;
  lastPrice?: Maybe<Scalars['Float']>;
  reserveFactor?: Maybe<Scalars['Float']>;
  reserves?: Maybe<Scalars['Float']>;
  tokenId?: Maybe<Scalars['Float']>;
  totalBorrowed?: Maybe<Scalars['Float']>;
  totalLiquid?: Maybe<Scalars['Float']>;
  totalSupply?: Maybe<Scalars['Float']>;
  ytoken?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "asset" */
export type Asset_Stddev_Samp_Order_By = {
  collateralFactor?: InputMaybe<Order_By>;
  lastPrice?: InputMaybe<Order_By>;
  reserveFactor?: InputMaybe<Order_By>;
  reserves?: InputMaybe<Order_By>;
  tokenId?: InputMaybe<Order_By>;
  totalBorrowed?: InputMaybe<Order_By>;
  totalLiquid?: InputMaybe<Order_By>;
  totalSupply?: InputMaybe<Order_By>;
  ytoken?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Asset_Sum_Fields = {
  __typename?: 'asset_sum_fields';
  collateralFactor?: Maybe<Scalars['numeric']>;
  lastPrice?: Maybe<Scalars['numeric']>;
  reserveFactor?: Maybe<Scalars['numeric']>;
  reserves?: Maybe<Scalars['numeric']>;
  tokenId?: Maybe<Scalars['Int']>;
  totalBorrowed?: Maybe<Scalars['numeric']>;
  totalLiquid?: Maybe<Scalars['numeric']>;
  totalSupply?: Maybe<Scalars['numeric']>;
  ytoken?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "asset" */
export type Asset_Sum_Order_By = {
  collateralFactor?: InputMaybe<Order_By>;
  lastPrice?: InputMaybe<Order_By>;
  reserveFactor?: InputMaybe<Order_By>;
  reserves?: InputMaybe<Order_By>;
  tokenId?: InputMaybe<Order_By>;
  totalBorrowed?: InputMaybe<Order_By>;
  totalLiquid?: InputMaybe<Order_By>;
  totalSupply?: InputMaybe<Order_By>;
  ytoken?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Asset_Var_Pop_Fields = {
  __typename?: 'asset_var_pop_fields';
  collateralFactor?: Maybe<Scalars['Float']>;
  lastPrice?: Maybe<Scalars['Float']>;
  reserveFactor?: Maybe<Scalars['Float']>;
  reserves?: Maybe<Scalars['Float']>;
  tokenId?: Maybe<Scalars['Float']>;
  totalBorrowed?: Maybe<Scalars['Float']>;
  totalLiquid?: Maybe<Scalars['Float']>;
  totalSupply?: Maybe<Scalars['Float']>;
  ytoken?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "asset" */
export type Asset_Var_Pop_Order_By = {
  collateralFactor?: InputMaybe<Order_By>;
  lastPrice?: InputMaybe<Order_By>;
  reserveFactor?: InputMaybe<Order_By>;
  reserves?: InputMaybe<Order_By>;
  tokenId?: InputMaybe<Order_By>;
  totalBorrowed?: InputMaybe<Order_By>;
  totalLiquid?: InputMaybe<Order_By>;
  totalSupply?: InputMaybe<Order_By>;
  ytoken?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Asset_Var_Samp_Fields = {
  __typename?: 'asset_var_samp_fields';
  collateralFactor?: Maybe<Scalars['Float']>;
  lastPrice?: Maybe<Scalars['Float']>;
  reserveFactor?: Maybe<Scalars['Float']>;
  reserves?: Maybe<Scalars['Float']>;
  tokenId?: Maybe<Scalars['Float']>;
  totalBorrowed?: Maybe<Scalars['Float']>;
  totalLiquid?: Maybe<Scalars['Float']>;
  totalSupply?: Maybe<Scalars['Float']>;
  ytoken?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "asset" */
export type Asset_Var_Samp_Order_By = {
  collateralFactor?: InputMaybe<Order_By>;
  lastPrice?: InputMaybe<Order_By>;
  reserveFactor?: InputMaybe<Order_By>;
  reserves?: InputMaybe<Order_By>;
  tokenId?: InputMaybe<Order_By>;
  totalBorrowed?: InputMaybe<Order_By>;
  totalLiquid?: InputMaybe<Order_By>;
  totalSupply?: InputMaybe<Order_By>;
  ytoken?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Asset_Variance_Fields = {
  __typename?: 'asset_variance_fields';
  collateralFactor?: Maybe<Scalars['Float']>;
  lastPrice?: Maybe<Scalars['Float']>;
  reserveFactor?: Maybe<Scalars['Float']>;
  reserves?: Maybe<Scalars['Float']>;
  tokenId?: Maybe<Scalars['Float']>;
  totalBorrowed?: Maybe<Scalars['Float']>;
  totalLiquid?: Maybe<Scalars['Float']>;
  totalSupply?: Maybe<Scalars['Float']>;
  ytoken?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "asset" */
export type Asset_Variance_Order_By = {
  collateralFactor?: InputMaybe<Order_By>;
  lastPrice?: InputMaybe<Order_By>;
  reserveFactor?: InputMaybe<Order_By>;
  reserves?: InputMaybe<Order_By>;
  tokenId?: InputMaybe<Order_By>;
  totalBorrowed?: InputMaybe<Order_By>;
  totalLiquid?: InputMaybe<Order_By>;
  totalSupply?: InputMaybe<Order_By>;
  ytoken?: InputMaybe<Order_By>;
};

/** columns and relationships of "borrow_tx" */
export type Borrow_Tx = {
  __typename?: 'borrow_tx';
  amount: Scalars['numeric'];
  /** An object relationship */
  asset: Asset;
  assetId: Scalars['Int'];
  id: Scalars['Int'];
  timestamp?: Maybe<Scalars['timestamptz']>;
  /** An object relationship */
  user: User;
  userId: Scalars['String'];
};

/** aggregated selection of "borrow_tx" */
export type Borrow_Tx_Aggregate = {
  __typename?: 'borrow_tx_aggregate';
  aggregate?: Maybe<Borrow_Tx_Aggregate_Fields>;
  nodes: Array<Borrow_Tx>;
};

/** aggregate fields of "borrow_tx" */
export type Borrow_Tx_Aggregate_Fields = {
  __typename?: 'borrow_tx_aggregate_fields';
  avg?: Maybe<Borrow_Tx_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Borrow_Tx_Max_Fields>;
  min?: Maybe<Borrow_Tx_Min_Fields>;
  stddev?: Maybe<Borrow_Tx_Stddev_Fields>;
  stddev_pop?: Maybe<Borrow_Tx_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Borrow_Tx_Stddev_Samp_Fields>;
  sum?: Maybe<Borrow_Tx_Sum_Fields>;
  var_pop?: Maybe<Borrow_Tx_Var_Pop_Fields>;
  var_samp?: Maybe<Borrow_Tx_Var_Samp_Fields>;
  variance?: Maybe<Borrow_Tx_Variance_Fields>;
};

/** aggregate fields of "borrow_tx" */
export type Borrow_Tx_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Borrow_Tx_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "borrow_tx" */
export type Borrow_Tx_Aggregate_Order_By = {
  avg?: InputMaybe<Borrow_Tx_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Borrow_Tx_Max_Order_By>;
  min?: InputMaybe<Borrow_Tx_Min_Order_By>;
  stddev?: InputMaybe<Borrow_Tx_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Borrow_Tx_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Borrow_Tx_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Borrow_Tx_Sum_Order_By>;
  var_pop?: InputMaybe<Borrow_Tx_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Borrow_Tx_Var_Samp_Order_By>;
  variance?: InputMaybe<Borrow_Tx_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Borrow_Tx_Avg_Fields = {
  __typename?: 'borrow_tx_avg_fields';
  amount?: Maybe<Scalars['Float']>;
  assetId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "borrow_tx" */
export type Borrow_Tx_Avg_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "borrow_tx". All fields are combined with a logical 'AND'. */
export type Borrow_Tx_Bool_Exp = {
  _and?: InputMaybe<Array<Borrow_Tx_Bool_Exp>>;
  _not?: InputMaybe<Borrow_Tx_Bool_Exp>;
  _or?: InputMaybe<Array<Borrow_Tx_Bool_Exp>>;
  amount?: InputMaybe<Numeric_Comparison_Exp>;
  asset?: InputMaybe<Asset_Bool_Exp>;
  assetId?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  timestamp?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<User_Bool_Exp>;
  userId?: InputMaybe<String_Comparison_Exp>;
};

/** aggregate max on columns */
export type Borrow_Tx_Max_Fields = {
  __typename?: 'borrow_tx_max_fields';
  amount?: Maybe<Scalars['numeric']>;
  assetId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  timestamp?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "borrow_tx" */
export type Borrow_Tx_Max_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Borrow_Tx_Min_Fields = {
  __typename?: 'borrow_tx_min_fields';
  amount?: Maybe<Scalars['numeric']>;
  assetId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  timestamp?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "borrow_tx" */
export type Borrow_Tx_Min_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "borrow_tx". */
export type Borrow_Tx_Order_By = {
  amount?: InputMaybe<Order_By>;
  asset?: InputMaybe<Asset_Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  user?: InputMaybe<User_Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** select columns of table "borrow_tx" */
export enum Borrow_Tx_Select_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  AssetId = 'assetId',
  /** column name */
  Id = 'id',
  /** column name */
  Timestamp = 'timestamp',
  /** column name */
  UserId = 'userId',
}

/** aggregate stddev on columns */
export type Borrow_Tx_Stddev_Fields = {
  __typename?: 'borrow_tx_stddev_fields';
  amount?: Maybe<Scalars['Float']>;
  assetId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "borrow_tx" */
export type Borrow_Tx_Stddev_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Borrow_Tx_Stddev_Pop_Fields = {
  __typename?: 'borrow_tx_stddev_pop_fields';
  amount?: Maybe<Scalars['Float']>;
  assetId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "borrow_tx" */
export type Borrow_Tx_Stddev_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Borrow_Tx_Stddev_Samp_Fields = {
  __typename?: 'borrow_tx_stddev_samp_fields';
  amount?: Maybe<Scalars['Float']>;
  assetId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "borrow_tx" */
export type Borrow_Tx_Stddev_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Borrow_Tx_Sum_Fields = {
  __typename?: 'borrow_tx_sum_fields';
  amount?: Maybe<Scalars['numeric']>;
  assetId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "borrow_tx" */
export type Borrow_Tx_Sum_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Borrow_Tx_Var_Pop_Fields = {
  __typename?: 'borrow_tx_var_pop_fields';
  amount?: Maybe<Scalars['Float']>;
  assetId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "borrow_tx" */
export type Borrow_Tx_Var_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Borrow_Tx_Var_Samp_Fields = {
  __typename?: 'borrow_tx_var_samp_fields';
  amount?: Maybe<Scalars['Float']>;
  assetId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "borrow_tx" */
export type Borrow_Tx_Var_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Borrow_Tx_Variance_Fields = {
  __typename?: 'borrow_tx_variance_fields';
  amount?: Maybe<Scalars['Float']>;
  assetId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "borrow_tx" */
export type Borrow_Tx_Variance_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** columns and relationships of "daily_stats" */
export type Daily_Stats = {
  __typename?: 'daily_stats';
  borrowVolume: Scalars['numeric'];
  id: Scalars['Int'];
  supplyVolume: Scalars['numeric'];
};

/** aggregated selection of "daily_stats" */
export type Daily_Stats_Aggregate = {
  __typename?: 'daily_stats_aggregate';
  aggregate?: Maybe<Daily_Stats_Aggregate_Fields>;
  nodes: Array<Daily_Stats>;
};

/** aggregate fields of "daily_stats" */
export type Daily_Stats_Aggregate_Fields = {
  __typename?: 'daily_stats_aggregate_fields';
  avg?: Maybe<Daily_Stats_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Daily_Stats_Max_Fields>;
  min?: Maybe<Daily_Stats_Min_Fields>;
  stddev?: Maybe<Daily_Stats_Stddev_Fields>;
  stddev_pop?: Maybe<Daily_Stats_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Daily_Stats_Stddev_Samp_Fields>;
  sum?: Maybe<Daily_Stats_Sum_Fields>;
  var_pop?: Maybe<Daily_Stats_Var_Pop_Fields>;
  var_samp?: Maybe<Daily_Stats_Var_Samp_Fields>;
  variance?: Maybe<Daily_Stats_Variance_Fields>;
};

/** aggregate fields of "daily_stats" */
export type Daily_Stats_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Daily_Stats_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Daily_Stats_Avg_Fields = {
  __typename?: 'daily_stats_avg_fields';
  borrowVolume?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  supplyVolume?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "daily_stats". All fields are combined with a logical 'AND'. */
export type Daily_Stats_Bool_Exp = {
  _and?: InputMaybe<Array<Daily_Stats_Bool_Exp>>;
  _not?: InputMaybe<Daily_Stats_Bool_Exp>;
  _or?: InputMaybe<Array<Daily_Stats_Bool_Exp>>;
  borrowVolume?: InputMaybe<Numeric_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  supplyVolume?: InputMaybe<Numeric_Comparison_Exp>;
};

/** aggregate max on columns */
export type Daily_Stats_Max_Fields = {
  __typename?: 'daily_stats_max_fields';
  borrowVolume?: Maybe<Scalars['numeric']>;
  id?: Maybe<Scalars['Int']>;
  supplyVolume?: Maybe<Scalars['numeric']>;
};

/** aggregate min on columns */
export type Daily_Stats_Min_Fields = {
  __typename?: 'daily_stats_min_fields';
  borrowVolume?: Maybe<Scalars['numeric']>;
  id?: Maybe<Scalars['Int']>;
  supplyVolume?: Maybe<Scalars['numeric']>;
};

/** Ordering options when selecting data from "daily_stats". */
export type Daily_Stats_Order_By = {
  borrowVolume?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  supplyVolume?: InputMaybe<Order_By>;
};

/** select columns of table "daily_stats" */
export enum Daily_Stats_Select_Column {
  /** column name */
  BorrowVolume = 'borrowVolume',
  /** column name */
  Id = 'id',
  /** column name */
  SupplyVolume = 'supplyVolume',
}

/** aggregate stddev on columns */
export type Daily_Stats_Stddev_Fields = {
  __typename?: 'daily_stats_stddev_fields';
  borrowVolume?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  supplyVolume?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Daily_Stats_Stddev_Pop_Fields = {
  __typename?: 'daily_stats_stddev_pop_fields';
  borrowVolume?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  supplyVolume?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Daily_Stats_Stddev_Samp_Fields = {
  __typename?: 'daily_stats_stddev_samp_fields';
  borrowVolume?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  supplyVolume?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Daily_Stats_Sum_Fields = {
  __typename?: 'daily_stats_sum_fields';
  borrowVolume?: Maybe<Scalars['numeric']>;
  id?: Maybe<Scalars['Int']>;
  supplyVolume?: Maybe<Scalars['numeric']>;
};

/** aggregate var_pop on columns */
export type Daily_Stats_Var_Pop_Fields = {
  __typename?: 'daily_stats_var_pop_fields';
  borrowVolume?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  supplyVolume?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Daily_Stats_Var_Samp_Fields = {
  __typename?: 'daily_stats_var_samp_fields';
  borrowVolume?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  supplyVolume?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Daily_Stats_Variance_Fields = {
  __typename?: 'daily_stats_variance_fields';
  borrowVolume?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  supplyVolume?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "dipdup_contract" */
export type Dipdup_Contract = {
  __typename?: 'dipdup_contract';
  address: Scalars['String'];
  createdAt: Scalars['timestamptz'];
  name: Scalars['String'];
  typename?: Maybe<Scalars['String']>;
  updatedAt: Scalars['timestamptz'];
};

/** aggregated selection of "dipdup_contract" */
export type Dipdup_Contract_Aggregate = {
  __typename?: 'dipdup_contract_aggregate';
  aggregate?: Maybe<Dipdup_Contract_Aggregate_Fields>;
  nodes: Array<Dipdup_Contract>;
};

/** aggregate fields of "dipdup_contract" */
export type Dipdup_Contract_Aggregate_Fields = {
  __typename?: 'dipdup_contract_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Dipdup_Contract_Max_Fields>;
  min?: Maybe<Dipdup_Contract_Min_Fields>;
};

/** aggregate fields of "dipdup_contract" */
export type Dipdup_Contract_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Dipdup_Contract_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "dipdup_contract". All fields are combined with a logical 'AND'. */
export type Dipdup_Contract_Bool_Exp = {
  _and?: InputMaybe<Array<Dipdup_Contract_Bool_Exp>>;
  _not?: InputMaybe<Dipdup_Contract_Bool_Exp>;
  _or?: InputMaybe<Array<Dipdup_Contract_Bool_Exp>>;
  address?: InputMaybe<String_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  typename?: InputMaybe<String_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** aggregate max on columns */
export type Dipdup_Contract_Max_Fields = {
  __typename?: 'dipdup_contract_max_fields';
  address?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  name?: Maybe<Scalars['String']>;
  typename?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type Dipdup_Contract_Min_Fields = {
  __typename?: 'dipdup_contract_min_fields';
  address?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  name?: Maybe<Scalars['String']>;
  typename?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** Ordering options when selecting data from "dipdup_contract". */
export type Dipdup_Contract_Order_By = {
  address?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  typename?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** select columns of table "dipdup_contract" */
export enum Dipdup_Contract_Select_Column {
  /** column name */
  Address = 'address',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Name = 'name',
  /** column name */
  Typename = 'typename',
  /** column name */
  UpdatedAt = 'updatedAt',
}

/** columns and relationships of "dipdup_head" */
export type Dipdup_Head = {
  __typename?: 'dipdup_head';
  createdAt: Scalars['timestamptz'];
  hash: Scalars['String'];
  level: Scalars['Int'];
  name: Scalars['String'];
  timestamp: Scalars['timestamptz'];
  updatedAt: Scalars['timestamptz'];
};

/** aggregated selection of "dipdup_head" */
export type Dipdup_Head_Aggregate = {
  __typename?: 'dipdup_head_aggregate';
  aggregate?: Maybe<Dipdup_Head_Aggregate_Fields>;
  nodes: Array<Dipdup_Head>;
};

/** aggregate fields of "dipdup_head" */
export type Dipdup_Head_Aggregate_Fields = {
  __typename?: 'dipdup_head_aggregate_fields';
  avg?: Maybe<Dipdup_Head_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Dipdup_Head_Max_Fields>;
  min?: Maybe<Dipdup_Head_Min_Fields>;
  stddev?: Maybe<Dipdup_Head_Stddev_Fields>;
  stddev_pop?: Maybe<Dipdup_Head_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Dipdup_Head_Stddev_Samp_Fields>;
  sum?: Maybe<Dipdup_Head_Sum_Fields>;
  var_pop?: Maybe<Dipdup_Head_Var_Pop_Fields>;
  var_samp?: Maybe<Dipdup_Head_Var_Samp_Fields>;
  variance?: Maybe<Dipdup_Head_Variance_Fields>;
};

/** aggregate fields of "dipdup_head" */
export type Dipdup_Head_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Dipdup_Head_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Dipdup_Head_Avg_Fields = {
  __typename?: 'dipdup_head_avg_fields';
  level?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "dipdup_head". All fields are combined with a logical 'AND'. */
export type Dipdup_Head_Bool_Exp = {
  _and?: InputMaybe<Array<Dipdup_Head_Bool_Exp>>;
  _not?: InputMaybe<Dipdup_Head_Bool_Exp>;
  _or?: InputMaybe<Array<Dipdup_Head_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  hash?: InputMaybe<String_Comparison_Exp>;
  level?: InputMaybe<Int_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  timestamp?: InputMaybe<Timestamptz_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** aggregate max on columns */
export type Dipdup_Head_Max_Fields = {
  __typename?: 'dipdup_head_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  hash?: Maybe<Scalars['String']>;
  level?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['timestamptz']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type Dipdup_Head_Min_Fields = {
  __typename?: 'dipdup_head_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  hash?: Maybe<Scalars['String']>;
  level?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['timestamptz']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** Ordering options when selecting data from "dipdup_head". */
export type Dipdup_Head_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  hash?: InputMaybe<Order_By>;
  level?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** select columns of table "dipdup_head" */
export enum Dipdup_Head_Select_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Hash = 'hash',
  /** column name */
  Level = 'level',
  /** column name */
  Name = 'name',
  /** column name */
  Timestamp = 'timestamp',
  /** column name */
  UpdatedAt = 'updatedAt',
}

/** aggregate stddev on columns */
export type Dipdup_Head_Stddev_Fields = {
  __typename?: 'dipdup_head_stddev_fields';
  level?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Dipdup_Head_Stddev_Pop_Fields = {
  __typename?: 'dipdup_head_stddev_pop_fields';
  level?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Dipdup_Head_Stddev_Samp_Fields = {
  __typename?: 'dipdup_head_stddev_samp_fields';
  level?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Dipdup_Head_Sum_Fields = {
  __typename?: 'dipdup_head_sum_fields';
  level?: Maybe<Scalars['Int']>;
};

/** aggregate var_pop on columns */
export type Dipdup_Head_Var_Pop_Fields = {
  __typename?: 'dipdup_head_var_pop_fields';
  level?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Dipdup_Head_Var_Samp_Fields = {
  __typename?: 'dipdup_head_var_samp_fields';
  level?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Dipdup_Head_Variance_Fields = {
  __typename?: 'dipdup_head_variance_fields';
  level?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "dipdup_index" */
export type Dipdup_Index = {
  __typename?: 'dipdup_index';
  configHash: Scalars['String'];
  createdAt: Scalars['timestamptz'];
  level: Scalars['Int'];
  name: Scalars['String'];
  /** NEW: NEW\nSYNCING: SYNCING\nREALTIME: REALTIME\nROLLBACK: ROLLBACK\nONESHOT: ONESHOT */
  status: Scalars['String'];
  template?: Maybe<Scalars['String']>;
  templateValues?: Maybe<Scalars['jsonb']>;
  /** operation: operation\nbig_map: big_map\nhead: head */
  type: Scalars['String'];
  updatedAt: Scalars['timestamptz'];
};

/** columns and relationships of "dipdup_index" */
export type Dipdup_IndexTemplateValuesArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "dipdup_index" */
export type Dipdup_Index_Aggregate = {
  __typename?: 'dipdup_index_aggregate';
  aggregate?: Maybe<Dipdup_Index_Aggregate_Fields>;
  nodes: Array<Dipdup_Index>;
};

/** aggregate fields of "dipdup_index" */
export type Dipdup_Index_Aggregate_Fields = {
  __typename?: 'dipdup_index_aggregate_fields';
  avg?: Maybe<Dipdup_Index_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Dipdup_Index_Max_Fields>;
  min?: Maybe<Dipdup_Index_Min_Fields>;
  stddev?: Maybe<Dipdup_Index_Stddev_Fields>;
  stddev_pop?: Maybe<Dipdup_Index_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Dipdup_Index_Stddev_Samp_Fields>;
  sum?: Maybe<Dipdup_Index_Sum_Fields>;
  var_pop?: Maybe<Dipdup_Index_Var_Pop_Fields>;
  var_samp?: Maybe<Dipdup_Index_Var_Samp_Fields>;
  variance?: Maybe<Dipdup_Index_Variance_Fields>;
};

/** aggregate fields of "dipdup_index" */
export type Dipdup_Index_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Dipdup_Index_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Dipdup_Index_Avg_Fields = {
  __typename?: 'dipdup_index_avg_fields';
  level?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "dipdup_index". All fields are combined with a logical 'AND'. */
export type Dipdup_Index_Bool_Exp = {
  _and?: InputMaybe<Array<Dipdup_Index_Bool_Exp>>;
  _not?: InputMaybe<Dipdup_Index_Bool_Exp>;
  _or?: InputMaybe<Array<Dipdup_Index_Bool_Exp>>;
  configHash?: InputMaybe<String_Comparison_Exp>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  level?: InputMaybe<Int_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
  template?: InputMaybe<String_Comparison_Exp>;
  templateValues?: InputMaybe<Jsonb_Comparison_Exp>;
  type?: InputMaybe<String_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** aggregate max on columns */
export type Dipdup_Index_Max_Fields = {
  __typename?: 'dipdup_index_max_fields';
  configHash?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  level?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  /** NEW: NEW\nSYNCING: SYNCING\nREALTIME: REALTIME\nROLLBACK: ROLLBACK\nONESHOT: ONESHOT */
  status?: Maybe<Scalars['String']>;
  template?: Maybe<Scalars['String']>;
  /** operation: operation\nbig_map: big_map\nhead: head */
  type?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type Dipdup_Index_Min_Fields = {
  __typename?: 'dipdup_index_min_fields';
  configHash?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  level?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  /** NEW: NEW\nSYNCING: SYNCING\nREALTIME: REALTIME\nROLLBACK: ROLLBACK\nONESHOT: ONESHOT */
  status?: Maybe<Scalars['String']>;
  template?: Maybe<Scalars['String']>;
  /** operation: operation\nbig_map: big_map\nhead: head */
  type?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** Ordering options when selecting data from "dipdup_index". */
export type Dipdup_Index_Order_By = {
  configHash?: InputMaybe<Order_By>;
  createdAt?: InputMaybe<Order_By>;
  level?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  template?: InputMaybe<Order_By>;
  templateValues?: InputMaybe<Order_By>;
  type?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** select columns of table "dipdup_index" */
export enum Dipdup_Index_Select_Column {
  /** column name */
  ConfigHash = 'configHash',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Level = 'level',
  /** column name */
  Name = 'name',
  /** column name */
  Status = 'status',
  /** column name */
  Template = 'template',
  /** column name */
  TemplateValues = 'templateValues',
  /** column name */
  Type = 'type',
  /** column name */
  UpdatedAt = 'updatedAt',
}

/** aggregate stddev on columns */
export type Dipdup_Index_Stddev_Fields = {
  __typename?: 'dipdup_index_stddev_fields';
  level?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Dipdup_Index_Stddev_Pop_Fields = {
  __typename?: 'dipdup_index_stddev_pop_fields';
  level?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Dipdup_Index_Stddev_Samp_Fields = {
  __typename?: 'dipdup_index_stddev_samp_fields';
  level?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Dipdup_Index_Sum_Fields = {
  __typename?: 'dipdup_index_sum_fields';
  level?: Maybe<Scalars['Int']>;
};

/** aggregate var_pop on columns */
export type Dipdup_Index_Var_Pop_Fields = {
  __typename?: 'dipdup_index_var_pop_fields';
  level?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Dipdup_Index_Var_Samp_Fields = {
  __typename?: 'dipdup_index_var_samp_fields';
  level?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Dipdup_Index_Variance_Fields = {
  __typename?: 'dipdup_index_variance_fields';
  level?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "dipdup_schema" */
export type Dipdup_Schema = {
  __typename?: 'dipdup_schema';
  createdAt: Scalars['timestamptz'];
  hash: Scalars['String'];
  name: Scalars['String'];
  /** MANUAL: triggered manually from callback\nMIGRATION: applied migration requires reindexing\nROLLBACK: reorg message received and can't be processed\nCONFIG_HASH_MISMATCH: index config has been modified\nSCHEMA_HASH_MISMATCH: database schema has been modified\nBLOCK_HASH_MISMATCH: block hash mismatch, missed rollback when DipDup was stopped\nMISSING_INDEX_TEMPLATE: index template is missing, can't restore index state */
  reindex?: Maybe<Scalars['String']>;
  updatedAt: Scalars['timestamptz'];
};

/** aggregated selection of "dipdup_schema" */
export type Dipdup_Schema_Aggregate = {
  __typename?: 'dipdup_schema_aggregate';
  aggregate?: Maybe<Dipdup_Schema_Aggregate_Fields>;
  nodes: Array<Dipdup_Schema>;
};

/** aggregate fields of "dipdup_schema" */
export type Dipdup_Schema_Aggregate_Fields = {
  __typename?: 'dipdup_schema_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Dipdup_Schema_Max_Fields>;
  min?: Maybe<Dipdup_Schema_Min_Fields>;
};

/** aggregate fields of "dipdup_schema" */
export type Dipdup_Schema_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Dipdup_Schema_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "dipdup_schema". All fields are combined with a logical 'AND'. */
export type Dipdup_Schema_Bool_Exp = {
  _and?: InputMaybe<Array<Dipdup_Schema_Bool_Exp>>;
  _not?: InputMaybe<Dipdup_Schema_Bool_Exp>;
  _or?: InputMaybe<Array<Dipdup_Schema_Bool_Exp>>;
  createdAt?: InputMaybe<Timestamptz_Comparison_Exp>;
  hash?: InputMaybe<String_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  reindex?: InputMaybe<String_Comparison_Exp>;
  updatedAt?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** aggregate max on columns */
export type Dipdup_Schema_Max_Fields = {
  __typename?: 'dipdup_schema_max_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  hash?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  /** MANUAL: triggered manually from callback\nMIGRATION: applied migration requires reindexing\nROLLBACK: reorg message received and can't be processed\nCONFIG_HASH_MISMATCH: index config has been modified\nSCHEMA_HASH_MISMATCH: database schema has been modified\nBLOCK_HASH_MISMATCH: block hash mismatch, missed rollback when DipDup was stopped\nMISSING_INDEX_TEMPLATE: index template is missing, can't restore index state */
  reindex?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type Dipdup_Schema_Min_Fields = {
  __typename?: 'dipdup_schema_min_fields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  hash?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  /** MANUAL: triggered manually from callback\nMIGRATION: applied migration requires reindexing\nROLLBACK: reorg message received and can't be processed\nCONFIG_HASH_MISMATCH: index config has been modified\nSCHEMA_HASH_MISMATCH: database schema has been modified\nBLOCK_HASH_MISMATCH: block hash mismatch, missed rollback when DipDup was stopped\nMISSING_INDEX_TEMPLATE: index template is missing, can't restore index state */
  reindex?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** Ordering options when selecting data from "dipdup_schema". */
export type Dipdup_Schema_Order_By = {
  createdAt?: InputMaybe<Order_By>;
  hash?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  reindex?: InputMaybe<Order_By>;
  updatedAt?: InputMaybe<Order_By>;
};

/** select columns of table "dipdup_schema" */
export enum Dipdup_Schema_Select_Column {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Hash = 'hash',
  /** column name */
  Name = 'name',
  /** column name */
  Reindex = 'reindex',
  /** column name */
  UpdatedAt = 'updatedAt',
}

/** columns and relationships of "funds" */
export type Funds = {
  __typename?: 'funds';
  /** An object relationship */
  asset: Asset;
  assetId: Scalars['Int'];
  borrow: Scalars['numeric'];
  entered: Scalars['Boolean'];
  id: Scalars['Int'];
  supply: Scalars['numeric'];
  /** An object relationship */
  user: User;
  userId: Scalars['String'];
};

/** aggregated selection of "funds" */
export type Funds_Aggregate = {
  __typename?: 'funds_aggregate';
  aggregate?: Maybe<Funds_Aggregate_Fields>;
  nodes: Array<Funds>;
};

/** aggregate fields of "funds" */
export type Funds_Aggregate_Fields = {
  __typename?: 'funds_aggregate_fields';
  avg?: Maybe<Funds_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Funds_Max_Fields>;
  min?: Maybe<Funds_Min_Fields>;
  stddev?: Maybe<Funds_Stddev_Fields>;
  stddev_pop?: Maybe<Funds_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Funds_Stddev_Samp_Fields>;
  sum?: Maybe<Funds_Sum_Fields>;
  var_pop?: Maybe<Funds_Var_Pop_Fields>;
  var_samp?: Maybe<Funds_Var_Samp_Fields>;
  variance?: Maybe<Funds_Variance_Fields>;
};

/** aggregate fields of "funds" */
export type Funds_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Funds_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "funds" */
export type Funds_Aggregate_Order_By = {
  avg?: InputMaybe<Funds_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Funds_Max_Order_By>;
  min?: InputMaybe<Funds_Min_Order_By>;
  stddev?: InputMaybe<Funds_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Funds_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Funds_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Funds_Sum_Order_By>;
  var_pop?: InputMaybe<Funds_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Funds_Var_Samp_Order_By>;
  variance?: InputMaybe<Funds_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Funds_Avg_Fields = {
  __typename?: 'funds_avg_fields';
  assetId?: Maybe<Scalars['Float']>;
  borrow?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  supply?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "funds" */
export type Funds_Avg_Order_By = {
  assetId?: InputMaybe<Order_By>;
  borrow?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  supply?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "funds". All fields are combined with a logical 'AND'. */
export type Funds_Bool_Exp = {
  _and?: InputMaybe<Array<Funds_Bool_Exp>>;
  _not?: InputMaybe<Funds_Bool_Exp>;
  _or?: InputMaybe<Array<Funds_Bool_Exp>>;
  asset?: InputMaybe<Asset_Bool_Exp>;
  assetId?: InputMaybe<Int_Comparison_Exp>;
  borrow?: InputMaybe<Numeric_Comparison_Exp>;
  entered?: InputMaybe<Boolean_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  supply?: InputMaybe<Numeric_Comparison_Exp>;
  user?: InputMaybe<User_Bool_Exp>;
  userId?: InputMaybe<String_Comparison_Exp>;
};

/** aggregate max on columns */
export type Funds_Max_Fields = {
  __typename?: 'funds_max_fields';
  assetId?: Maybe<Scalars['Int']>;
  borrow?: Maybe<Scalars['numeric']>;
  id?: Maybe<Scalars['Int']>;
  supply?: Maybe<Scalars['numeric']>;
  userId?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "funds" */
export type Funds_Max_Order_By = {
  assetId?: InputMaybe<Order_By>;
  borrow?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  supply?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Funds_Min_Fields = {
  __typename?: 'funds_min_fields';
  assetId?: Maybe<Scalars['Int']>;
  borrow?: Maybe<Scalars['numeric']>;
  id?: Maybe<Scalars['Int']>;
  supply?: Maybe<Scalars['numeric']>;
  userId?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "funds" */
export type Funds_Min_Order_By = {
  assetId?: InputMaybe<Order_By>;
  borrow?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  supply?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "funds". */
export type Funds_Order_By = {
  asset?: InputMaybe<Asset_Order_By>;
  assetId?: InputMaybe<Order_By>;
  borrow?: InputMaybe<Order_By>;
  entered?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  supply?: InputMaybe<Order_By>;
  user?: InputMaybe<User_Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** select columns of table "funds" */
export enum Funds_Select_Column {
  /** column name */
  AssetId = 'assetId',
  /** column name */
  Borrow = 'borrow',
  /** column name */
  Entered = 'entered',
  /** column name */
  Id = 'id',
  /** column name */
  Supply = 'supply',
  /** column name */
  UserId = 'userId',
}

/** aggregate stddev on columns */
export type Funds_Stddev_Fields = {
  __typename?: 'funds_stddev_fields';
  assetId?: Maybe<Scalars['Float']>;
  borrow?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  supply?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "funds" */
export type Funds_Stddev_Order_By = {
  assetId?: InputMaybe<Order_By>;
  borrow?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  supply?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Funds_Stddev_Pop_Fields = {
  __typename?: 'funds_stddev_pop_fields';
  assetId?: Maybe<Scalars['Float']>;
  borrow?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  supply?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "funds" */
export type Funds_Stddev_Pop_Order_By = {
  assetId?: InputMaybe<Order_By>;
  borrow?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  supply?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Funds_Stddev_Samp_Fields = {
  __typename?: 'funds_stddev_samp_fields';
  assetId?: Maybe<Scalars['Float']>;
  borrow?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  supply?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "funds" */
export type Funds_Stddev_Samp_Order_By = {
  assetId?: InputMaybe<Order_By>;
  borrow?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  supply?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Funds_Sum_Fields = {
  __typename?: 'funds_sum_fields';
  assetId?: Maybe<Scalars['Int']>;
  borrow?: Maybe<Scalars['numeric']>;
  id?: Maybe<Scalars['Int']>;
  supply?: Maybe<Scalars['numeric']>;
};

/** order by sum() on columns of table "funds" */
export type Funds_Sum_Order_By = {
  assetId?: InputMaybe<Order_By>;
  borrow?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  supply?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Funds_Var_Pop_Fields = {
  __typename?: 'funds_var_pop_fields';
  assetId?: Maybe<Scalars['Float']>;
  borrow?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  supply?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "funds" */
export type Funds_Var_Pop_Order_By = {
  assetId?: InputMaybe<Order_By>;
  borrow?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  supply?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Funds_Var_Samp_Fields = {
  __typename?: 'funds_var_samp_fields';
  assetId?: Maybe<Scalars['Float']>;
  borrow?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  supply?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "funds" */
export type Funds_Var_Samp_Order_By = {
  assetId?: InputMaybe<Order_By>;
  borrow?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  supply?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Funds_Variance_Fields = {
  __typename?: 'funds_variance_fields';
  assetId?: Maybe<Scalars['Float']>;
  borrow?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  supply?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "funds" */
export type Funds_Variance_Order_By = {
  assetId?: InputMaybe<Order_By>;
  borrow?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  supply?: InputMaybe<Order_By>;
};

/** columns and relationships of "global_factors" */
export type Global_Factors = {
  __typename?: 'global_factors';
  closeFactor: Scalars['numeric'];
  id: Scalars['Int'];
  liquidationIncentive: Scalars['numeric'];
  liquidationThreshold: Scalars['numeric'];
  yupanaContract: Scalars['String'];
};

/** aggregated selection of "global_factors" */
export type Global_Factors_Aggregate = {
  __typename?: 'global_factors_aggregate';
  aggregate?: Maybe<Global_Factors_Aggregate_Fields>;
  nodes: Array<Global_Factors>;
};

/** aggregate fields of "global_factors" */
export type Global_Factors_Aggregate_Fields = {
  __typename?: 'global_factors_aggregate_fields';
  avg?: Maybe<Global_Factors_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Global_Factors_Max_Fields>;
  min?: Maybe<Global_Factors_Min_Fields>;
  stddev?: Maybe<Global_Factors_Stddev_Fields>;
  stddev_pop?: Maybe<Global_Factors_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Global_Factors_Stddev_Samp_Fields>;
  sum?: Maybe<Global_Factors_Sum_Fields>;
  var_pop?: Maybe<Global_Factors_Var_Pop_Fields>;
  var_samp?: Maybe<Global_Factors_Var_Samp_Fields>;
  variance?: Maybe<Global_Factors_Variance_Fields>;
};

/** aggregate fields of "global_factors" */
export type Global_Factors_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Global_Factors_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Global_Factors_Avg_Fields = {
  __typename?: 'global_factors_avg_fields';
  closeFactor?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  liquidationIncentive?: Maybe<Scalars['Float']>;
  liquidationThreshold?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "global_factors". All fields are combined with a logical 'AND'. */
export type Global_Factors_Bool_Exp = {
  _and?: InputMaybe<Array<Global_Factors_Bool_Exp>>;
  _not?: InputMaybe<Global_Factors_Bool_Exp>;
  _or?: InputMaybe<Array<Global_Factors_Bool_Exp>>;
  closeFactor?: InputMaybe<Numeric_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  liquidationIncentive?: InputMaybe<Numeric_Comparison_Exp>;
  liquidationThreshold?: InputMaybe<Numeric_Comparison_Exp>;
  yupanaContract?: InputMaybe<String_Comparison_Exp>;
};

/** aggregate max on columns */
export type Global_Factors_Max_Fields = {
  __typename?: 'global_factors_max_fields';
  closeFactor?: Maybe<Scalars['numeric']>;
  id?: Maybe<Scalars['Int']>;
  liquidationIncentive?: Maybe<Scalars['numeric']>;
  liquidationThreshold?: Maybe<Scalars['numeric']>;
  yupanaContract?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Global_Factors_Min_Fields = {
  __typename?: 'global_factors_min_fields';
  closeFactor?: Maybe<Scalars['numeric']>;
  id?: Maybe<Scalars['Int']>;
  liquidationIncentive?: Maybe<Scalars['numeric']>;
  liquidationThreshold?: Maybe<Scalars['numeric']>;
  yupanaContract?: Maybe<Scalars['String']>;
};

/** Ordering options when selecting data from "global_factors". */
export type Global_Factors_Order_By = {
  closeFactor?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  liquidationIncentive?: InputMaybe<Order_By>;
  liquidationThreshold?: InputMaybe<Order_By>;
  yupanaContract?: InputMaybe<Order_By>;
};

/** select columns of table "global_factors" */
export enum Global_Factors_Select_Column {
  /** column name */
  CloseFactor = 'closeFactor',
  /** column name */
  Id = 'id',
  /** column name */
  LiquidationIncentive = 'liquidationIncentive',
  /** column name */
  LiquidationThreshold = 'liquidationThreshold',
  /** column name */
  YupanaContract = 'yupanaContract',
}

/** aggregate stddev on columns */
export type Global_Factors_Stddev_Fields = {
  __typename?: 'global_factors_stddev_fields';
  closeFactor?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  liquidationIncentive?: Maybe<Scalars['Float']>;
  liquidationThreshold?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Global_Factors_Stddev_Pop_Fields = {
  __typename?: 'global_factors_stddev_pop_fields';
  closeFactor?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  liquidationIncentive?: Maybe<Scalars['Float']>;
  liquidationThreshold?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Global_Factors_Stddev_Samp_Fields = {
  __typename?: 'global_factors_stddev_samp_fields';
  closeFactor?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  liquidationIncentive?: Maybe<Scalars['Float']>;
  liquidationThreshold?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Global_Factors_Sum_Fields = {
  __typename?: 'global_factors_sum_fields';
  closeFactor?: Maybe<Scalars['numeric']>;
  id?: Maybe<Scalars['Int']>;
  liquidationIncentive?: Maybe<Scalars['numeric']>;
  liquidationThreshold?: Maybe<Scalars['numeric']>;
};

/** aggregate var_pop on columns */
export type Global_Factors_Var_Pop_Fields = {
  __typename?: 'global_factors_var_pop_fields';
  closeFactor?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  liquidationIncentive?: Maybe<Scalars['Float']>;
  liquidationThreshold?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Global_Factors_Var_Samp_Fields = {
  __typename?: 'global_factors_var_samp_fields';
  closeFactor?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  liquidationIncentive?: Maybe<Scalars['Float']>;
  liquidationThreshold?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Global_Factors_Variance_Fields = {
  __typename?: 'global_factors_variance_fields';
  closeFactor?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  liquidationIncentive?: Maybe<Scalars['Float']>;
  liquidationThreshold?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "interest_model" */
export type Interest_Model = {
  __typename?: 'interest_model';
  address: Scalars['String'];
  jumpMultiplier: Scalars['numeric'];
  kink: Scalars['numeric'];
  /** An array relationship */
  modelAsset: Array<Asset>;
  /** An aggregate relationship */
  modelAsset_aggregate: Asset_Aggregate;
  multiplier: Scalars['numeric'];
  rate: Scalars['numeric'];
};

/** columns and relationships of "interest_model" */
export type Interest_ModelModelAssetArgs = {
  distinct_on?: InputMaybe<Array<Asset_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Asset_Order_By>>;
  where?: InputMaybe<Asset_Bool_Exp>;
};

/** columns and relationships of "interest_model" */
export type Interest_ModelModelAsset_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Asset_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Asset_Order_By>>;
  where?: InputMaybe<Asset_Bool_Exp>;
};

/** aggregated selection of "interest_model" */
export type Interest_Model_Aggregate = {
  __typename?: 'interest_model_aggregate';
  aggregate?: Maybe<Interest_Model_Aggregate_Fields>;
  nodes: Array<Interest_Model>;
};

/** aggregate fields of "interest_model" */
export type Interest_Model_Aggregate_Fields = {
  __typename?: 'interest_model_aggregate_fields';
  avg?: Maybe<Interest_Model_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Interest_Model_Max_Fields>;
  min?: Maybe<Interest_Model_Min_Fields>;
  stddev?: Maybe<Interest_Model_Stddev_Fields>;
  stddev_pop?: Maybe<Interest_Model_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Interest_Model_Stddev_Samp_Fields>;
  sum?: Maybe<Interest_Model_Sum_Fields>;
  var_pop?: Maybe<Interest_Model_Var_Pop_Fields>;
  var_samp?: Maybe<Interest_Model_Var_Samp_Fields>;
  variance?: Maybe<Interest_Model_Variance_Fields>;
};

/** aggregate fields of "interest_model" */
export type Interest_Model_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Interest_Model_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Interest_Model_Avg_Fields = {
  __typename?: 'interest_model_avg_fields';
  jumpMultiplier?: Maybe<Scalars['Float']>;
  kink?: Maybe<Scalars['Float']>;
  multiplier?: Maybe<Scalars['Float']>;
  rate?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "interest_model". All fields are combined with a logical 'AND'. */
export type Interest_Model_Bool_Exp = {
  _and?: InputMaybe<Array<Interest_Model_Bool_Exp>>;
  _not?: InputMaybe<Interest_Model_Bool_Exp>;
  _or?: InputMaybe<Array<Interest_Model_Bool_Exp>>;
  address?: InputMaybe<String_Comparison_Exp>;
  jumpMultiplier?: InputMaybe<Numeric_Comparison_Exp>;
  kink?: InputMaybe<Numeric_Comparison_Exp>;
  modelAsset?: InputMaybe<Asset_Bool_Exp>;
  multiplier?: InputMaybe<Numeric_Comparison_Exp>;
  rate?: InputMaybe<Numeric_Comparison_Exp>;
};

/** aggregate max on columns */
export type Interest_Model_Max_Fields = {
  __typename?: 'interest_model_max_fields';
  address?: Maybe<Scalars['String']>;
  jumpMultiplier?: Maybe<Scalars['numeric']>;
  kink?: Maybe<Scalars['numeric']>;
  multiplier?: Maybe<Scalars['numeric']>;
  rate?: Maybe<Scalars['numeric']>;
};

/** aggregate min on columns */
export type Interest_Model_Min_Fields = {
  __typename?: 'interest_model_min_fields';
  address?: Maybe<Scalars['String']>;
  jumpMultiplier?: Maybe<Scalars['numeric']>;
  kink?: Maybe<Scalars['numeric']>;
  multiplier?: Maybe<Scalars['numeric']>;
  rate?: Maybe<Scalars['numeric']>;
};

/** Ordering options when selecting data from "interest_model". */
export type Interest_Model_Order_By = {
  address?: InputMaybe<Order_By>;
  jumpMultiplier?: InputMaybe<Order_By>;
  kink?: InputMaybe<Order_By>;
  modelAsset_aggregate?: InputMaybe<Asset_Aggregate_Order_By>;
  multiplier?: InputMaybe<Order_By>;
  rate?: InputMaybe<Order_By>;
};

/** select columns of table "interest_model" */
export enum Interest_Model_Select_Column {
  /** column name */
  Address = 'address',
  /** column name */
  JumpMultiplier = 'jumpMultiplier',
  /** column name */
  Kink = 'kink',
  /** column name */
  Multiplier = 'multiplier',
  /** column name */
  Rate = 'rate',
}

/** aggregate stddev on columns */
export type Interest_Model_Stddev_Fields = {
  __typename?: 'interest_model_stddev_fields';
  jumpMultiplier?: Maybe<Scalars['Float']>;
  kink?: Maybe<Scalars['Float']>;
  multiplier?: Maybe<Scalars['Float']>;
  rate?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Interest_Model_Stddev_Pop_Fields = {
  __typename?: 'interest_model_stddev_pop_fields';
  jumpMultiplier?: Maybe<Scalars['Float']>;
  kink?: Maybe<Scalars['Float']>;
  multiplier?: Maybe<Scalars['Float']>;
  rate?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Interest_Model_Stddev_Samp_Fields = {
  __typename?: 'interest_model_stddev_samp_fields';
  jumpMultiplier?: Maybe<Scalars['Float']>;
  kink?: Maybe<Scalars['Float']>;
  multiplier?: Maybe<Scalars['Float']>;
  rate?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Interest_Model_Sum_Fields = {
  __typename?: 'interest_model_sum_fields';
  jumpMultiplier?: Maybe<Scalars['numeric']>;
  kink?: Maybe<Scalars['numeric']>;
  multiplier?: Maybe<Scalars['numeric']>;
  rate?: Maybe<Scalars['numeric']>;
};

/** aggregate var_pop on columns */
export type Interest_Model_Var_Pop_Fields = {
  __typename?: 'interest_model_var_pop_fields';
  jumpMultiplier?: Maybe<Scalars['Float']>;
  kink?: Maybe<Scalars['Float']>;
  multiplier?: Maybe<Scalars['Float']>;
  rate?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Interest_Model_Var_Samp_Fields = {
  __typename?: 'interest_model_var_samp_fields';
  jumpMultiplier?: Maybe<Scalars['Float']>;
  kink?: Maybe<Scalars['Float']>;
  multiplier?: Maybe<Scalars['Float']>;
  rate?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Interest_Model_Variance_Fields = {
  __typename?: 'interest_model_variance_fields';
  jumpMultiplier?: Maybe<Scalars['Float']>;
  kink?: Maybe<Scalars['Float']>;
  multiplier?: Maybe<Scalars['Float']>;
  rate?: Maybe<Scalars['Float']>;
};

/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export type Jsonb_Comparison_Exp = {
  /** is the column contained in the given json value */
  _contained_in?: InputMaybe<Scalars['jsonb']>;
  /** does the column contain the given json value at the top level */
  _contains?: InputMaybe<Scalars['jsonb']>;
  _eq?: InputMaybe<Scalars['jsonb']>;
  _gt?: InputMaybe<Scalars['jsonb']>;
  _gte?: InputMaybe<Scalars['jsonb']>;
  /** does the string exist as a top-level key in the column */
  _has_key?: InputMaybe<Scalars['String']>;
  /** do all of these strings exist as top-level keys in the column */
  _has_keys_all?: InputMaybe<Array<Scalars['String']>>;
  /** do any of these strings exist as top-level keys in the column */
  _has_keys_any?: InputMaybe<Array<Scalars['String']>>;
  _in?: InputMaybe<Array<Scalars['jsonb']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['jsonb']>;
  _lte?: InputMaybe<Scalars['jsonb']>;
  _neq?: InputMaybe<Scalars['jsonb']>;
  _nin?: InputMaybe<Array<Scalars['jsonb']>>;
};

/** columns and relationships of "liquidate_tx" */
export type Liquidate_Tx = {
  __typename?: 'liquidate_tx';
  amount: Scalars['numeric'];
  /** An object relationship */
  borrower: User;
  borrowerId: Scalars['String'];
  /** An object relationship */
  collateralAsset: Asset;
  collateralAssetId: Scalars['Int'];
  id: Scalars['Int'];
  /** An object relationship */
  liquidatedAsset: Asset;
  liquidatedAssetId: Scalars['Int'];
  /** An object relationship */
  liquidator: User;
  liquidatorId: Scalars['String'];
  timestamp?: Maybe<Scalars['timestamptz']>;
};

/** aggregated selection of "liquidate_tx" */
export type Liquidate_Tx_Aggregate = {
  __typename?: 'liquidate_tx_aggregate';
  aggregate?: Maybe<Liquidate_Tx_Aggregate_Fields>;
  nodes: Array<Liquidate_Tx>;
};

/** aggregate fields of "liquidate_tx" */
export type Liquidate_Tx_Aggregate_Fields = {
  __typename?: 'liquidate_tx_aggregate_fields';
  avg?: Maybe<Liquidate_Tx_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Liquidate_Tx_Max_Fields>;
  min?: Maybe<Liquidate_Tx_Min_Fields>;
  stddev?: Maybe<Liquidate_Tx_Stddev_Fields>;
  stddev_pop?: Maybe<Liquidate_Tx_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Liquidate_Tx_Stddev_Samp_Fields>;
  sum?: Maybe<Liquidate_Tx_Sum_Fields>;
  var_pop?: Maybe<Liquidate_Tx_Var_Pop_Fields>;
  var_samp?: Maybe<Liquidate_Tx_Var_Samp_Fields>;
  variance?: Maybe<Liquidate_Tx_Variance_Fields>;
};

/** aggregate fields of "liquidate_tx" */
export type Liquidate_Tx_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Liquidate_Tx_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "liquidate_tx" */
export type Liquidate_Tx_Aggregate_Order_By = {
  avg?: InputMaybe<Liquidate_Tx_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Liquidate_Tx_Max_Order_By>;
  min?: InputMaybe<Liquidate_Tx_Min_Order_By>;
  stddev?: InputMaybe<Liquidate_Tx_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Liquidate_Tx_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Liquidate_Tx_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Liquidate_Tx_Sum_Order_By>;
  var_pop?: InputMaybe<Liquidate_Tx_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Liquidate_Tx_Var_Samp_Order_By>;
  variance?: InputMaybe<Liquidate_Tx_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Liquidate_Tx_Avg_Fields = {
  __typename?: 'liquidate_tx_avg_fields';
  amount?: Maybe<Scalars['Float']>;
  collateralAssetId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  liquidatedAssetId?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "liquidate_tx" */
export type Liquidate_Tx_Avg_Order_By = {
  amount?: InputMaybe<Order_By>;
  collateralAssetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  liquidatedAssetId?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "liquidate_tx". All fields are combined with a logical 'AND'. */
export type Liquidate_Tx_Bool_Exp = {
  _and?: InputMaybe<Array<Liquidate_Tx_Bool_Exp>>;
  _not?: InputMaybe<Liquidate_Tx_Bool_Exp>;
  _or?: InputMaybe<Array<Liquidate_Tx_Bool_Exp>>;
  amount?: InputMaybe<Numeric_Comparison_Exp>;
  borrower?: InputMaybe<User_Bool_Exp>;
  borrowerId?: InputMaybe<String_Comparison_Exp>;
  collateralAsset?: InputMaybe<Asset_Bool_Exp>;
  collateralAssetId?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  liquidatedAsset?: InputMaybe<Asset_Bool_Exp>;
  liquidatedAssetId?: InputMaybe<Int_Comparison_Exp>;
  liquidator?: InputMaybe<User_Bool_Exp>;
  liquidatorId?: InputMaybe<String_Comparison_Exp>;
  timestamp?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** aggregate max on columns */
export type Liquidate_Tx_Max_Fields = {
  __typename?: 'liquidate_tx_max_fields';
  amount?: Maybe<Scalars['numeric']>;
  borrowerId?: Maybe<Scalars['String']>;
  collateralAssetId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  liquidatedAssetId?: Maybe<Scalars['Int']>;
  liquidatorId?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "liquidate_tx" */
export type Liquidate_Tx_Max_Order_By = {
  amount?: InputMaybe<Order_By>;
  borrowerId?: InputMaybe<Order_By>;
  collateralAssetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  liquidatedAssetId?: InputMaybe<Order_By>;
  liquidatorId?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Liquidate_Tx_Min_Fields = {
  __typename?: 'liquidate_tx_min_fields';
  amount?: Maybe<Scalars['numeric']>;
  borrowerId?: Maybe<Scalars['String']>;
  collateralAssetId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  liquidatedAssetId?: Maybe<Scalars['Int']>;
  liquidatorId?: Maybe<Scalars['String']>;
  timestamp?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "liquidate_tx" */
export type Liquidate_Tx_Min_Order_By = {
  amount?: InputMaybe<Order_By>;
  borrowerId?: InputMaybe<Order_By>;
  collateralAssetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  liquidatedAssetId?: InputMaybe<Order_By>;
  liquidatorId?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "liquidate_tx". */
export type Liquidate_Tx_Order_By = {
  amount?: InputMaybe<Order_By>;
  borrower?: InputMaybe<User_Order_By>;
  borrowerId?: InputMaybe<Order_By>;
  collateralAsset?: InputMaybe<Asset_Order_By>;
  collateralAssetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  liquidatedAsset?: InputMaybe<Asset_Order_By>;
  liquidatedAssetId?: InputMaybe<Order_By>;
  liquidator?: InputMaybe<User_Order_By>;
  liquidatorId?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
};

/** select columns of table "liquidate_tx" */
export enum Liquidate_Tx_Select_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  BorrowerId = 'borrowerId',
  /** column name */
  CollateralAssetId = 'collateralAssetId',
  /** column name */
  Id = 'id',
  /** column name */
  LiquidatedAssetId = 'liquidatedAssetId',
  /** column name */
  LiquidatorId = 'liquidatorId',
  /** column name */
  Timestamp = 'timestamp',
}

/** aggregate stddev on columns */
export type Liquidate_Tx_Stddev_Fields = {
  __typename?: 'liquidate_tx_stddev_fields';
  amount?: Maybe<Scalars['Float']>;
  collateralAssetId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  liquidatedAssetId?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "liquidate_tx" */
export type Liquidate_Tx_Stddev_Order_By = {
  amount?: InputMaybe<Order_By>;
  collateralAssetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  liquidatedAssetId?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Liquidate_Tx_Stddev_Pop_Fields = {
  __typename?: 'liquidate_tx_stddev_pop_fields';
  amount?: Maybe<Scalars['Float']>;
  collateralAssetId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  liquidatedAssetId?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "liquidate_tx" */
export type Liquidate_Tx_Stddev_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  collateralAssetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  liquidatedAssetId?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Liquidate_Tx_Stddev_Samp_Fields = {
  __typename?: 'liquidate_tx_stddev_samp_fields';
  amount?: Maybe<Scalars['Float']>;
  collateralAssetId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  liquidatedAssetId?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "liquidate_tx" */
export type Liquidate_Tx_Stddev_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  collateralAssetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  liquidatedAssetId?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Liquidate_Tx_Sum_Fields = {
  __typename?: 'liquidate_tx_sum_fields';
  amount?: Maybe<Scalars['numeric']>;
  collateralAssetId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  liquidatedAssetId?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "liquidate_tx" */
export type Liquidate_Tx_Sum_Order_By = {
  amount?: InputMaybe<Order_By>;
  collateralAssetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  liquidatedAssetId?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Liquidate_Tx_Var_Pop_Fields = {
  __typename?: 'liquidate_tx_var_pop_fields';
  amount?: Maybe<Scalars['Float']>;
  collateralAssetId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  liquidatedAssetId?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "liquidate_tx" */
export type Liquidate_Tx_Var_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  collateralAssetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  liquidatedAssetId?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Liquidate_Tx_Var_Samp_Fields = {
  __typename?: 'liquidate_tx_var_samp_fields';
  amount?: Maybe<Scalars['Float']>;
  collateralAssetId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  liquidatedAssetId?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "liquidate_tx" */
export type Liquidate_Tx_Var_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  collateralAssetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  liquidatedAssetId?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Liquidate_Tx_Variance_Fields = {
  __typename?: 'liquidate_tx_variance_fields';
  amount?: Maybe<Scalars['Float']>;
  collateralAssetId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  liquidatedAssetId?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "liquidate_tx" */
export type Liquidate_Tx_Variance_Order_By = {
  amount?: InputMaybe<Order_By>;
  collateralAssetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  liquidatedAssetId?: InputMaybe<Order_By>;
};

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['numeric']>;
  _gt?: InputMaybe<Scalars['numeric']>;
  _gte?: InputMaybe<Scalars['numeric']>;
  _in?: InputMaybe<Array<Scalars['numeric']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['numeric']>;
  _lte?: InputMaybe<Scalars['numeric']>;
  _neq?: InputMaybe<Scalars['numeric']>;
  _nin?: InputMaybe<Array<Scalars['numeric']>>;
};

/** columns and relationships of "oracle_price" */
export type Oracle_Price = {
  __typename?: 'oracle_price';
  name: Scalars['String'];
  price: Scalars['numeric'];
  ytoken: Scalars['Int'];
};

/** aggregated selection of "oracle_price" */
export type Oracle_Price_Aggregate = {
  __typename?: 'oracle_price_aggregate';
  aggregate?: Maybe<Oracle_Price_Aggregate_Fields>;
  nodes: Array<Oracle_Price>;
};

/** aggregate fields of "oracle_price" */
export type Oracle_Price_Aggregate_Fields = {
  __typename?: 'oracle_price_aggregate_fields';
  avg?: Maybe<Oracle_Price_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Oracle_Price_Max_Fields>;
  min?: Maybe<Oracle_Price_Min_Fields>;
  stddev?: Maybe<Oracle_Price_Stddev_Fields>;
  stddev_pop?: Maybe<Oracle_Price_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Oracle_Price_Stddev_Samp_Fields>;
  sum?: Maybe<Oracle_Price_Sum_Fields>;
  var_pop?: Maybe<Oracle_Price_Var_Pop_Fields>;
  var_samp?: Maybe<Oracle_Price_Var_Samp_Fields>;
  variance?: Maybe<Oracle_Price_Variance_Fields>;
};

/** aggregate fields of "oracle_price" */
export type Oracle_Price_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Oracle_Price_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Oracle_Price_Avg_Fields = {
  __typename?: 'oracle_price_avg_fields';
  price?: Maybe<Scalars['Float']>;
  ytoken?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "oracle_price". All fields are combined with a logical 'AND'. */
export type Oracle_Price_Bool_Exp = {
  _and?: InputMaybe<Array<Oracle_Price_Bool_Exp>>;
  _not?: InputMaybe<Oracle_Price_Bool_Exp>;
  _or?: InputMaybe<Array<Oracle_Price_Bool_Exp>>;
  name?: InputMaybe<String_Comparison_Exp>;
  price?: InputMaybe<Numeric_Comparison_Exp>;
  ytoken?: InputMaybe<Int_Comparison_Exp>;
};

/** aggregate max on columns */
export type Oracle_Price_Max_Fields = {
  __typename?: 'oracle_price_max_fields';
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['numeric']>;
  ytoken?: Maybe<Scalars['Int']>;
};

/** aggregate min on columns */
export type Oracle_Price_Min_Fields = {
  __typename?: 'oracle_price_min_fields';
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['numeric']>;
  ytoken?: Maybe<Scalars['Int']>;
};

/** Ordering options when selecting data from "oracle_price". */
export type Oracle_Price_Order_By = {
  name?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  ytoken?: InputMaybe<Order_By>;
};

/** select columns of table "oracle_price" */
export enum Oracle_Price_Select_Column {
  /** column name */
  Name = 'name',
  /** column name */
  Price = 'price',
  /** column name */
  Ytoken = 'ytoken',
}

/** aggregate stddev on columns */
export type Oracle_Price_Stddev_Fields = {
  __typename?: 'oracle_price_stddev_fields';
  price?: Maybe<Scalars['Float']>;
  ytoken?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Oracle_Price_Stddev_Pop_Fields = {
  __typename?: 'oracle_price_stddev_pop_fields';
  price?: Maybe<Scalars['Float']>;
  ytoken?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Oracle_Price_Stddev_Samp_Fields = {
  __typename?: 'oracle_price_stddev_samp_fields';
  price?: Maybe<Scalars['Float']>;
  ytoken?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Oracle_Price_Sum_Fields = {
  __typename?: 'oracle_price_sum_fields';
  price?: Maybe<Scalars['numeric']>;
  ytoken?: Maybe<Scalars['Int']>;
};

/** aggregate var_pop on columns */
export type Oracle_Price_Var_Pop_Fields = {
  __typename?: 'oracle_price_var_pop_fields';
  price?: Maybe<Scalars['Float']>;
  ytoken?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Oracle_Price_Var_Samp_Fields = {
  __typename?: 'oracle_price_var_samp_fields';
  price?: Maybe<Scalars['Float']>;
  ytoken?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Oracle_Price_Variance_Fields = {
  __typename?: 'oracle_price_variance_fields';
  price?: Maybe<Scalars['Float']>;
  ytoken?: Maybe<Scalars['Float']>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last',
}

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "asset" */
  asset: Array<Asset>;
  /** fetch aggregated fields from the table: "asset" */
  assetAggregate: Asset_Aggregate;
  /** fetch data from the table: "asset" using primary key columns */
  assetByPk?: Maybe<Asset>;
  /** fetch data from the table: "borrow_tx" */
  borrowTx: Array<Borrow_Tx>;
  /** fetch aggregated fields from the table: "borrow_tx" */
  borrowTxAggregate: Borrow_Tx_Aggregate;
  /** fetch data from the table: "borrow_tx" using primary key columns */
  borrowTxByPk?: Maybe<Borrow_Tx>;
  /** fetch data from the table: "daily_stats" */
  dailyStats: Array<Daily_Stats>;
  /** fetch aggregated fields from the table: "daily_stats" */
  dailyStatsAggregate: Daily_Stats_Aggregate;
  /** fetch data from the table: "daily_stats" using primary key columns */
  dailyStatsByPk?: Maybe<Daily_Stats>;
  /** fetch data from the table: "dipdup_contract" */
  dipdupContract: Array<Dipdup_Contract>;
  /** fetch aggregated fields from the table: "dipdup_contract" */
  dipdupContractAggregate: Dipdup_Contract_Aggregate;
  /** fetch data from the table: "dipdup_contract" using primary key columns */
  dipdupContractByPk?: Maybe<Dipdup_Contract>;
  /** fetch data from the table: "dipdup_head" */
  dipdupHead: Array<Dipdup_Head>;
  /** fetch aggregated fields from the table: "dipdup_head" */
  dipdupHeadAggregate: Dipdup_Head_Aggregate;
  /** fetch data from the table: "dipdup_head" using primary key columns */
  dipdupHeadByPk?: Maybe<Dipdup_Head>;
  /** fetch data from the table: "dipdup_index" */
  dipdupIndex: Array<Dipdup_Index>;
  /** fetch aggregated fields from the table: "dipdup_index" */
  dipdupIndexAggregate: Dipdup_Index_Aggregate;
  /** fetch data from the table: "dipdup_index" using primary key columns */
  dipdupIndexByPk?: Maybe<Dipdup_Index>;
  /** fetch data from the table: "dipdup_schema" */
  dipdupSchema: Array<Dipdup_Schema>;
  /** fetch aggregated fields from the table: "dipdup_schema" */
  dipdupSchemaAggregate: Dipdup_Schema_Aggregate;
  /** fetch data from the table: "dipdup_schema" using primary key columns */
  dipdupSchemaByPk?: Maybe<Dipdup_Schema>;
  /** fetch data from the table: "funds" */
  funds: Array<Funds>;
  /** fetch aggregated fields from the table: "funds" */
  fundsAggregate: Funds_Aggregate;
  /** fetch data from the table: "funds" using primary key columns */
  fundsByPk?: Maybe<Funds>;
  /** fetch data from the table: "global_factors" */
  globalFactors: Array<Global_Factors>;
  /** fetch aggregated fields from the table: "global_factors" */
  globalFactorsAggregate: Global_Factors_Aggregate;
  /** fetch data from the table: "global_factors" using primary key columns */
  globalFactorsByPk?: Maybe<Global_Factors>;
  /** fetch data from the table: "interest_model" */
  interestModel: Array<Interest_Model>;
  /** fetch aggregated fields from the table: "interest_model" */
  interestModelAggregate: Interest_Model_Aggregate;
  /** fetch data from the table: "interest_model" using primary key columns */
  interestModelByPk?: Maybe<Interest_Model>;
  /** fetch data from the table: "liquidate_tx" */
  liquidateTx: Array<Liquidate_Tx>;
  /** fetch aggregated fields from the table: "liquidate_tx" */
  liquidateTxAggregate: Liquidate_Tx_Aggregate;
  /** fetch data from the table: "liquidate_tx" using primary key columns */
  liquidateTxByPk?: Maybe<Liquidate_Tx>;
  /** fetch data from the table: "oracle_price" */
  oraclePrice: Array<Oracle_Price>;
  /** fetch aggregated fields from the table: "oracle_price" */
  oraclePriceAggregate: Oracle_Price_Aggregate;
  /** fetch data from the table: "oracle_price" using primary key columns */
  oraclePriceByPk?: Maybe<Oracle_Price>;
  /** An array relationship */
  rates: Array<Rates>;
  /** An aggregate relationship */
  rates_aggregate: Rates_Aggregate;
  /** fetch data from the table: "rates" using primary key columns */
  rates_by_pk?: Maybe<Rates>;
  /** fetch data from the table: "repay_tx" */
  repayTx: Array<Repay_Tx>;
  /** fetch aggregated fields from the table: "repay_tx" */
  repayTxAggregate: Repay_Tx_Aggregate;
  /** fetch data from the table: "repay_tx" using primary key columns */
  repayTxByPk?: Maybe<Repay_Tx>;
  /** fetch data from the table: "supply_tx" */
  supplyTx: Array<Supply_Tx>;
  /** fetch aggregated fields from the table: "supply_tx" */
  supplyTxAggregate: Supply_Tx_Aggregate;
  /** fetch data from the table: "supply_tx" using primary key columns */
  supplyTxByPk?: Maybe<Supply_Tx>;
  /** fetch data from the table: "token" */
  token: Array<Token>;
  /** fetch aggregated fields from the table: "token" */
  tokenAggregate: Token_Aggregate;
  /** fetch data from the table: "token" using primary key columns */
  tokenByPk?: Maybe<Token>;
  /** fetch data from the table: "user" */
  user: Array<User>;
  /** fetch aggregated fields from the table: "user" */
  userAggregate: User_Aggregate;
  /** fetch data from the table: "user" using primary key columns */
  userByPk?: Maybe<User>;
  /** fetch data from the table: "withdraw_tx" */
  withdrawTx: Array<Withdraw_Tx>;
  /** fetch aggregated fields from the table: "withdraw_tx" */
  withdrawTxAggregate: Withdraw_Tx_Aggregate;
  /** fetch data from the table: "withdraw_tx" using primary key columns */
  withdrawTxByPk?: Maybe<Withdraw_Tx>;
};

export type Query_RootAssetArgs = {
  distinct_on?: InputMaybe<Array<Asset_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Asset_Order_By>>;
  where?: InputMaybe<Asset_Bool_Exp>;
};

export type Query_RootAssetAggregateArgs = {
  distinct_on?: InputMaybe<Array<Asset_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Asset_Order_By>>;
  where?: InputMaybe<Asset_Bool_Exp>;
};

export type Query_RootAssetByPkArgs = {
  ytoken: Scalars['Int'];
};

export type Query_RootBorrowTxArgs = {
  distinct_on?: InputMaybe<Array<Borrow_Tx_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Borrow_Tx_Order_By>>;
  where?: InputMaybe<Borrow_Tx_Bool_Exp>;
};

export type Query_RootBorrowTxAggregateArgs = {
  distinct_on?: InputMaybe<Array<Borrow_Tx_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Borrow_Tx_Order_By>>;
  where?: InputMaybe<Borrow_Tx_Bool_Exp>;
};

export type Query_RootBorrowTxByPkArgs = {
  id: Scalars['Int'];
};

export type Query_RootDailyStatsArgs = {
  distinct_on?: InputMaybe<Array<Daily_Stats_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Daily_Stats_Order_By>>;
  where?: InputMaybe<Daily_Stats_Bool_Exp>;
};

export type Query_RootDailyStatsAggregateArgs = {
  distinct_on?: InputMaybe<Array<Daily_Stats_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Daily_Stats_Order_By>>;
  where?: InputMaybe<Daily_Stats_Bool_Exp>;
};

export type Query_RootDailyStatsByPkArgs = {
  id: Scalars['Int'];
};

export type Query_RootDipdupContractArgs = {
  distinct_on?: InputMaybe<Array<Dipdup_Contract_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Dipdup_Contract_Order_By>>;
  where?: InputMaybe<Dipdup_Contract_Bool_Exp>;
};

export type Query_RootDipdupContractAggregateArgs = {
  distinct_on?: InputMaybe<Array<Dipdup_Contract_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Dipdup_Contract_Order_By>>;
  where?: InputMaybe<Dipdup_Contract_Bool_Exp>;
};

export type Query_RootDipdupContractByPkArgs = {
  name: Scalars['String'];
};

export type Query_RootDipdupHeadArgs = {
  distinct_on?: InputMaybe<Array<Dipdup_Head_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Dipdup_Head_Order_By>>;
  where?: InputMaybe<Dipdup_Head_Bool_Exp>;
};

export type Query_RootDipdupHeadAggregateArgs = {
  distinct_on?: InputMaybe<Array<Dipdup_Head_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Dipdup_Head_Order_By>>;
  where?: InputMaybe<Dipdup_Head_Bool_Exp>;
};

export type Query_RootDipdupHeadByPkArgs = {
  name: Scalars['String'];
};

export type Query_RootDipdupIndexArgs = {
  distinct_on?: InputMaybe<Array<Dipdup_Index_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Dipdup_Index_Order_By>>;
  where?: InputMaybe<Dipdup_Index_Bool_Exp>;
};

export type Query_RootDipdupIndexAggregateArgs = {
  distinct_on?: InputMaybe<Array<Dipdup_Index_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Dipdup_Index_Order_By>>;
  where?: InputMaybe<Dipdup_Index_Bool_Exp>;
};

export type Query_RootDipdupIndexByPkArgs = {
  name: Scalars['String'];
};

export type Query_RootDipdupSchemaArgs = {
  distinct_on?: InputMaybe<Array<Dipdup_Schema_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Dipdup_Schema_Order_By>>;
  where?: InputMaybe<Dipdup_Schema_Bool_Exp>;
};

export type Query_RootDipdupSchemaAggregateArgs = {
  distinct_on?: InputMaybe<Array<Dipdup_Schema_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Dipdup_Schema_Order_By>>;
  where?: InputMaybe<Dipdup_Schema_Bool_Exp>;
};

export type Query_RootDipdupSchemaByPkArgs = {
  name: Scalars['String'];
};

export type Query_RootFundsArgs = {
  distinct_on?: InputMaybe<Array<Funds_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Funds_Order_By>>;
  where?: InputMaybe<Funds_Bool_Exp>;
};

export type Query_RootFundsAggregateArgs = {
  distinct_on?: InputMaybe<Array<Funds_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Funds_Order_By>>;
  where?: InputMaybe<Funds_Bool_Exp>;
};

export type Query_RootFundsByPkArgs = {
  id: Scalars['Int'];
};

export type Query_RootGlobalFactorsArgs = {
  distinct_on?: InputMaybe<Array<Global_Factors_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Global_Factors_Order_By>>;
  where?: InputMaybe<Global_Factors_Bool_Exp>;
};

export type Query_RootGlobalFactorsAggregateArgs = {
  distinct_on?: InputMaybe<Array<Global_Factors_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Global_Factors_Order_By>>;
  where?: InputMaybe<Global_Factors_Bool_Exp>;
};

export type Query_RootGlobalFactorsByPkArgs = {
  id: Scalars['Int'];
};

export type Query_RootInterestModelArgs = {
  distinct_on?: InputMaybe<Array<Interest_Model_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Interest_Model_Order_By>>;
  where?: InputMaybe<Interest_Model_Bool_Exp>;
};

export type Query_RootInterestModelAggregateArgs = {
  distinct_on?: InputMaybe<Array<Interest_Model_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Interest_Model_Order_By>>;
  where?: InputMaybe<Interest_Model_Bool_Exp>;
};

export type Query_RootInterestModelByPkArgs = {
  address: Scalars['String'];
};

export type Query_RootLiquidateTxArgs = {
  distinct_on?: InputMaybe<Array<Liquidate_Tx_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Liquidate_Tx_Order_By>>;
  where?: InputMaybe<Liquidate_Tx_Bool_Exp>;
};

export type Query_RootLiquidateTxAggregateArgs = {
  distinct_on?: InputMaybe<Array<Liquidate_Tx_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Liquidate_Tx_Order_By>>;
  where?: InputMaybe<Liquidate_Tx_Bool_Exp>;
};

export type Query_RootLiquidateTxByPkArgs = {
  id: Scalars['Int'];
};

export type Query_RootOraclePriceArgs = {
  distinct_on?: InputMaybe<Array<Oracle_Price_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Oracle_Price_Order_By>>;
  where?: InputMaybe<Oracle_Price_Bool_Exp>;
};

export type Query_RootOraclePriceAggregateArgs = {
  distinct_on?: InputMaybe<Array<Oracle_Price_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Oracle_Price_Order_By>>;
  where?: InputMaybe<Oracle_Price_Bool_Exp>;
};

export type Query_RootOraclePriceByPkArgs = {
  ytoken: Scalars['Int'];
};

export type Query_RootRatesArgs = {
  distinct_on?: InputMaybe<Array<Rates_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Rates_Order_By>>;
  where?: InputMaybe<Rates_Bool_Exp>;
};

export type Query_RootRates_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Rates_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Rates_Order_By>>;
  where?: InputMaybe<Rates_Bool_Exp>;
};

export type Query_RootRates_By_PkArgs = {
  id: Scalars['Int'];
};

export type Query_RootRepayTxArgs = {
  distinct_on?: InputMaybe<Array<Repay_Tx_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Repay_Tx_Order_By>>;
  where?: InputMaybe<Repay_Tx_Bool_Exp>;
};

export type Query_RootRepayTxAggregateArgs = {
  distinct_on?: InputMaybe<Array<Repay_Tx_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Repay_Tx_Order_By>>;
  where?: InputMaybe<Repay_Tx_Bool_Exp>;
};

export type Query_RootRepayTxByPkArgs = {
  id: Scalars['Int'];
};

export type Query_RootSupplyTxArgs = {
  distinct_on?: InputMaybe<Array<Supply_Tx_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Supply_Tx_Order_By>>;
  where?: InputMaybe<Supply_Tx_Bool_Exp>;
};

export type Query_RootSupplyTxAggregateArgs = {
  distinct_on?: InputMaybe<Array<Supply_Tx_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Supply_Tx_Order_By>>;
  where?: InputMaybe<Supply_Tx_Bool_Exp>;
};

export type Query_RootSupplyTxByPkArgs = {
  id: Scalars['Int'];
};

export type Query_RootTokenArgs = {
  distinct_on?: InputMaybe<Array<Token_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Token_Order_By>>;
  where?: InputMaybe<Token_Bool_Exp>;
};

export type Query_RootTokenAggregateArgs = {
  distinct_on?: InputMaybe<Array<Token_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Token_Order_By>>;
  where?: InputMaybe<Token_Bool_Exp>;
};

export type Query_RootTokenByPkArgs = {
  id: Scalars['Int'];
};

export type Query_RootUserArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Order_By>>;
  where?: InputMaybe<User_Bool_Exp>;
};

export type Query_RootUserAggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Order_By>>;
  where?: InputMaybe<User_Bool_Exp>;
};

export type Query_RootUserByPkArgs = {
  address: Scalars['String'];
};

export type Query_RootWithdrawTxArgs = {
  distinct_on?: InputMaybe<Array<Withdraw_Tx_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Withdraw_Tx_Order_By>>;
  where?: InputMaybe<Withdraw_Tx_Bool_Exp>;
};

export type Query_RootWithdrawTxAggregateArgs = {
  distinct_on?: InputMaybe<Array<Withdraw_Tx_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Withdraw_Tx_Order_By>>;
  where?: InputMaybe<Withdraw_Tx_Bool_Exp>;
};

export type Query_RootWithdrawTxByPkArgs = {
  id: Scalars['Int'];
};

/** columns and relationships of "rates" */
export type Rates = {
  __typename?: 'rates';
  /** An object relationship */
  asset: Asset;
  asset_id: Scalars['Int'];
  borrow_apy: Scalars['numeric'];
  borrow_rate: Scalars['numeric'];
  exchange_rate: Scalars['numeric'];
  id: Scalars['Int'];
  supply_apy: Scalars['numeric'];
  supply_rate: Scalars['numeric'];
  utilization_rate: Scalars['numeric'];
};

/** aggregated selection of "rates" */
export type Rates_Aggregate = {
  __typename?: 'rates_aggregate';
  aggregate?: Maybe<Rates_Aggregate_Fields>;
  nodes: Array<Rates>;
};

/** aggregate fields of "rates" */
export type Rates_Aggregate_Fields = {
  __typename?: 'rates_aggregate_fields';
  avg?: Maybe<Rates_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Rates_Max_Fields>;
  min?: Maybe<Rates_Min_Fields>;
  stddev?: Maybe<Rates_Stddev_Fields>;
  stddev_pop?: Maybe<Rates_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Rates_Stddev_Samp_Fields>;
  sum?: Maybe<Rates_Sum_Fields>;
  var_pop?: Maybe<Rates_Var_Pop_Fields>;
  var_samp?: Maybe<Rates_Var_Samp_Fields>;
  variance?: Maybe<Rates_Variance_Fields>;
};

/** aggregate fields of "rates" */
export type Rates_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Rates_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "rates" */
export type Rates_Aggregate_Order_By = {
  avg?: InputMaybe<Rates_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Rates_Max_Order_By>;
  min?: InputMaybe<Rates_Min_Order_By>;
  stddev?: InputMaybe<Rates_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Rates_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Rates_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Rates_Sum_Order_By>;
  var_pop?: InputMaybe<Rates_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Rates_Var_Samp_Order_By>;
  variance?: InputMaybe<Rates_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Rates_Avg_Fields = {
  __typename?: 'rates_avg_fields';
  asset_id?: Maybe<Scalars['Float']>;
  borrow_apy?: Maybe<Scalars['Float']>;
  borrow_rate?: Maybe<Scalars['Float']>;
  exchange_rate?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  supply_apy?: Maybe<Scalars['Float']>;
  supply_rate?: Maybe<Scalars['Float']>;
  utilization_rate?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "rates" */
export type Rates_Avg_Order_By = {
  asset_id?: InputMaybe<Order_By>;
  borrow_apy?: InputMaybe<Order_By>;
  borrow_rate?: InputMaybe<Order_By>;
  exchange_rate?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  supply_apy?: InputMaybe<Order_By>;
  supply_rate?: InputMaybe<Order_By>;
  utilization_rate?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "rates". All fields are combined with a logical 'AND'. */
export type Rates_Bool_Exp = {
  _and?: InputMaybe<Array<Rates_Bool_Exp>>;
  _not?: InputMaybe<Rates_Bool_Exp>;
  _or?: InputMaybe<Array<Rates_Bool_Exp>>;
  asset?: InputMaybe<Asset_Bool_Exp>;
  asset_id?: InputMaybe<Int_Comparison_Exp>;
  borrow_apy?: InputMaybe<Numeric_Comparison_Exp>;
  borrow_rate?: InputMaybe<Numeric_Comparison_Exp>;
  exchange_rate?: InputMaybe<Numeric_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  supply_apy?: InputMaybe<Numeric_Comparison_Exp>;
  supply_rate?: InputMaybe<Numeric_Comparison_Exp>;
  utilization_rate?: InputMaybe<Numeric_Comparison_Exp>;
};

/** aggregate max on columns */
export type Rates_Max_Fields = {
  __typename?: 'rates_max_fields';
  asset_id?: Maybe<Scalars['Int']>;
  borrow_apy?: Maybe<Scalars['numeric']>;
  borrow_rate?: Maybe<Scalars['numeric']>;
  exchange_rate?: Maybe<Scalars['numeric']>;
  id?: Maybe<Scalars['Int']>;
  supply_apy?: Maybe<Scalars['numeric']>;
  supply_rate?: Maybe<Scalars['numeric']>;
  utilization_rate?: Maybe<Scalars['numeric']>;
};

/** order by max() on columns of table "rates" */
export type Rates_Max_Order_By = {
  asset_id?: InputMaybe<Order_By>;
  borrow_apy?: InputMaybe<Order_By>;
  borrow_rate?: InputMaybe<Order_By>;
  exchange_rate?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  supply_apy?: InputMaybe<Order_By>;
  supply_rate?: InputMaybe<Order_By>;
  utilization_rate?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Rates_Min_Fields = {
  __typename?: 'rates_min_fields';
  asset_id?: Maybe<Scalars['Int']>;
  borrow_apy?: Maybe<Scalars['numeric']>;
  borrow_rate?: Maybe<Scalars['numeric']>;
  exchange_rate?: Maybe<Scalars['numeric']>;
  id?: Maybe<Scalars['Int']>;
  supply_apy?: Maybe<Scalars['numeric']>;
  supply_rate?: Maybe<Scalars['numeric']>;
  utilization_rate?: Maybe<Scalars['numeric']>;
};

/** order by min() on columns of table "rates" */
export type Rates_Min_Order_By = {
  asset_id?: InputMaybe<Order_By>;
  borrow_apy?: InputMaybe<Order_By>;
  borrow_rate?: InputMaybe<Order_By>;
  exchange_rate?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  supply_apy?: InputMaybe<Order_By>;
  supply_rate?: InputMaybe<Order_By>;
  utilization_rate?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "rates". */
export type Rates_Order_By = {
  asset?: InputMaybe<Asset_Order_By>;
  asset_id?: InputMaybe<Order_By>;
  borrow_apy?: InputMaybe<Order_By>;
  borrow_rate?: InputMaybe<Order_By>;
  exchange_rate?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  supply_apy?: InputMaybe<Order_By>;
  supply_rate?: InputMaybe<Order_By>;
  utilization_rate?: InputMaybe<Order_By>;
};

/** select columns of table "rates" */
export enum Rates_Select_Column {
  /** column name */
  AssetId = 'asset_id',
  /** column name */
  BorrowApy = 'borrow_apy',
  /** column name */
  BorrowRate = 'borrow_rate',
  /** column name */
  ExchangeRate = 'exchange_rate',
  /** column name */
  Id = 'id',
  /** column name */
  SupplyApy = 'supply_apy',
  /** column name */
  SupplyRate = 'supply_rate',
  /** column name */
  UtilizationRate = 'utilization_rate',
}

/** aggregate stddev on columns */
export type Rates_Stddev_Fields = {
  __typename?: 'rates_stddev_fields';
  asset_id?: Maybe<Scalars['Float']>;
  borrow_apy?: Maybe<Scalars['Float']>;
  borrow_rate?: Maybe<Scalars['Float']>;
  exchange_rate?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  supply_apy?: Maybe<Scalars['Float']>;
  supply_rate?: Maybe<Scalars['Float']>;
  utilization_rate?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "rates" */
export type Rates_Stddev_Order_By = {
  asset_id?: InputMaybe<Order_By>;
  borrow_apy?: InputMaybe<Order_By>;
  borrow_rate?: InputMaybe<Order_By>;
  exchange_rate?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  supply_apy?: InputMaybe<Order_By>;
  supply_rate?: InputMaybe<Order_By>;
  utilization_rate?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Rates_Stddev_Pop_Fields = {
  __typename?: 'rates_stddev_pop_fields';
  asset_id?: Maybe<Scalars['Float']>;
  borrow_apy?: Maybe<Scalars['Float']>;
  borrow_rate?: Maybe<Scalars['Float']>;
  exchange_rate?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  supply_apy?: Maybe<Scalars['Float']>;
  supply_rate?: Maybe<Scalars['Float']>;
  utilization_rate?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "rates" */
export type Rates_Stddev_Pop_Order_By = {
  asset_id?: InputMaybe<Order_By>;
  borrow_apy?: InputMaybe<Order_By>;
  borrow_rate?: InputMaybe<Order_By>;
  exchange_rate?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  supply_apy?: InputMaybe<Order_By>;
  supply_rate?: InputMaybe<Order_By>;
  utilization_rate?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Rates_Stddev_Samp_Fields = {
  __typename?: 'rates_stddev_samp_fields';
  asset_id?: Maybe<Scalars['Float']>;
  borrow_apy?: Maybe<Scalars['Float']>;
  borrow_rate?: Maybe<Scalars['Float']>;
  exchange_rate?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  supply_apy?: Maybe<Scalars['Float']>;
  supply_rate?: Maybe<Scalars['Float']>;
  utilization_rate?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "rates" */
export type Rates_Stddev_Samp_Order_By = {
  asset_id?: InputMaybe<Order_By>;
  borrow_apy?: InputMaybe<Order_By>;
  borrow_rate?: InputMaybe<Order_By>;
  exchange_rate?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  supply_apy?: InputMaybe<Order_By>;
  supply_rate?: InputMaybe<Order_By>;
  utilization_rate?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Rates_Sum_Fields = {
  __typename?: 'rates_sum_fields';
  asset_id?: Maybe<Scalars['Int']>;
  borrow_apy?: Maybe<Scalars['numeric']>;
  borrow_rate?: Maybe<Scalars['numeric']>;
  exchange_rate?: Maybe<Scalars['numeric']>;
  id?: Maybe<Scalars['Int']>;
  supply_apy?: Maybe<Scalars['numeric']>;
  supply_rate?: Maybe<Scalars['numeric']>;
  utilization_rate?: Maybe<Scalars['numeric']>;
};

/** order by sum() on columns of table "rates" */
export type Rates_Sum_Order_By = {
  asset_id?: InputMaybe<Order_By>;
  borrow_apy?: InputMaybe<Order_By>;
  borrow_rate?: InputMaybe<Order_By>;
  exchange_rate?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  supply_apy?: InputMaybe<Order_By>;
  supply_rate?: InputMaybe<Order_By>;
  utilization_rate?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Rates_Var_Pop_Fields = {
  __typename?: 'rates_var_pop_fields';
  asset_id?: Maybe<Scalars['Float']>;
  borrow_apy?: Maybe<Scalars['Float']>;
  borrow_rate?: Maybe<Scalars['Float']>;
  exchange_rate?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  supply_apy?: Maybe<Scalars['Float']>;
  supply_rate?: Maybe<Scalars['Float']>;
  utilization_rate?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "rates" */
export type Rates_Var_Pop_Order_By = {
  asset_id?: InputMaybe<Order_By>;
  borrow_apy?: InputMaybe<Order_By>;
  borrow_rate?: InputMaybe<Order_By>;
  exchange_rate?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  supply_apy?: InputMaybe<Order_By>;
  supply_rate?: InputMaybe<Order_By>;
  utilization_rate?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Rates_Var_Samp_Fields = {
  __typename?: 'rates_var_samp_fields';
  asset_id?: Maybe<Scalars['Float']>;
  borrow_apy?: Maybe<Scalars['Float']>;
  borrow_rate?: Maybe<Scalars['Float']>;
  exchange_rate?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  supply_apy?: Maybe<Scalars['Float']>;
  supply_rate?: Maybe<Scalars['Float']>;
  utilization_rate?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "rates" */
export type Rates_Var_Samp_Order_By = {
  asset_id?: InputMaybe<Order_By>;
  borrow_apy?: InputMaybe<Order_By>;
  borrow_rate?: InputMaybe<Order_By>;
  exchange_rate?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  supply_apy?: InputMaybe<Order_By>;
  supply_rate?: InputMaybe<Order_By>;
  utilization_rate?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Rates_Variance_Fields = {
  __typename?: 'rates_variance_fields';
  asset_id?: Maybe<Scalars['Float']>;
  borrow_apy?: Maybe<Scalars['Float']>;
  borrow_rate?: Maybe<Scalars['Float']>;
  exchange_rate?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  supply_apy?: Maybe<Scalars['Float']>;
  supply_rate?: Maybe<Scalars['Float']>;
  utilization_rate?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "rates" */
export type Rates_Variance_Order_By = {
  asset_id?: InputMaybe<Order_By>;
  borrow_apy?: InputMaybe<Order_By>;
  borrow_rate?: InputMaybe<Order_By>;
  exchange_rate?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  supply_apy?: InputMaybe<Order_By>;
  supply_rate?: InputMaybe<Order_By>;
  utilization_rate?: InputMaybe<Order_By>;
};

/** columns and relationships of "repay_tx" */
export type Repay_Tx = {
  __typename?: 'repay_tx';
  amount: Scalars['numeric'];
  /** An object relationship */
  asset: Asset;
  assetId: Scalars['Int'];
  id: Scalars['Int'];
  timestamp?: Maybe<Scalars['timestamptz']>;
  /** An object relationship */
  user: User;
  userId: Scalars['String'];
};

/** aggregated selection of "repay_tx" */
export type Repay_Tx_Aggregate = {
  __typename?: 'repay_tx_aggregate';
  aggregate?: Maybe<Repay_Tx_Aggregate_Fields>;
  nodes: Array<Repay_Tx>;
};

/** aggregate fields of "repay_tx" */
export type Repay_Tx_Aggregate_Fields = {
  __typename?: 'repay_tx_aggregate_fields';
  avg?: Maybe<Repay_Tx_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Repay_Tx_Max_Fields>;
  min?: Maybe<Repay_Tx_Min_Fields>;
  stddev?: Maybe<Repay_Tx_Stddev_Fields>;
  stddev_pop?: Maybe<Repay_Tx_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Repay_Tx_Stddev_Samp_Fields>;
  sum?: Maybe<Repay_Tx_Sum_Fields>;
  var_pop?: Maybe<Repay_Tx_Var_Pop_Fields>;
  var_samp?: Maybe<Repay_Tx_Var_Samp_Fields>;
  variance?: Maybe<Repay_Tx_Variance_Fields>;
};

/** aggregate fields of "repay_tx" */
export type Repay_Tx_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Repay_Tx_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "repay_tx" */
export type Repay_Tx_Aggregate_Order_By = {
  avg?: InputMaybe<Repay_Tx_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Repay_Tx_Max_Order_By>;
  min?: InputMaybe<Repay_Tx_Min_Order_By>;
  stddev?: InputMaybe<Repay_Tx_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Repay_Tx_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Repay_Tx_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Repay_Tx_Sum_Order_By>;
  var_pop?: InputMaybe<Repay_Tx_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Repay_Tx_Var_Samp_Order_By>;
  variance?: InputMaybe<Repay_Tx_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Repay_Tx_Avg_Fields = {
  __typename?: 'repay_tx_avg_fields';
  amount?: Maybe<Scalars['Float']>;
  assetId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "repay_tx" */
export type Repay_Tx_Avg_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "repay_tx". All fields are combined with a logical 'AND'. */
export type Repay_Tx_Bool_Exp = {
  _and?: InputMaybe<Array<Repay_Tx_Bool_Exp>>;
  _not?: InputMaybe<Repay_Tx_Bool_Exp>;
  _or?: InputMaybe<Array<Repay_Tx_Bool_Exp>>;
  amount?: InputMaybe<Numeric_Comparison_Exp>;
  asset?: InputMaybe<Asset_Bool_Exp>;
  assetId?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  timestamp?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<User_Bool_Exp>;
  userId?: InputMaybe<String_Comparison_Exp>;
};

/** aggregate max on columns */
export type Repay_Tx_Max_Fields = {
  __typename?: 'repay_tx_max_fields';
  amount?: Maybe<Scalars['numeric']>;
  assetId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  timestamp?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "repay_tx" */
export type Repay_Tx_Max_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Repay_Tx_Min_Fields = {
  __typename?: 'repay_tx_min_fields';
  amount?: Maybe<Scalars['numeric']>;
  assetId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  timestamp?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "repay_tx" */
export type Repay_Tx_Min_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "repay_tx". */
export type Repay_Tx_Order_By = {
  amount?: InputMaybe<Order_By>;
  asset?: InputMaybe<Asset_Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  user?: InputMaybe<User_Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** select columns of table "repay_tx" */
export enum Repay_Tx_Select_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  AssetId = 'assetId',
  /** column name */
  Id = 'id',
  /** column name */
  Timestamp = 'timestamp',
  /** column name */
  UserId = 'userId',
}

/** aggregate stddev on columns */
export type Repay_Tx_Stddev_Fields = {
  __typename?: 'repay_tx_stddev_fields';
  amount?: Maybe<Scalars['Float']>;
  assetId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "repay_tx" */
export type Repay_Tx_Stddev_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Repay_Tx_Stddev_Pop_Fields = {
  __typename?: 'repay_tx_stddev_pop_fields';
  amount?: Maybe<Scalars['Float']>;
  assetId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "repay_tx" */
export type Repay_Tx_Stddev_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Repay_Tx_Stddev_Samp_Fields = {
  __typename?: 'repay_tx_stddev_samp_fields';
  amount?: Maybe<Scalars['Float']>;
  assetId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "repay_tx" */
export type Repay_Tx_Stddev_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Repay_Tx_Sum_Fields = {
  __typename?: 'repay_tx_sum_fields';
  amount?: Maybe<Scalars['numeric']>;
  assetId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "repay_tx" */
export type Repay_Tx_Sum_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Repay_Tx_Var_Pop_Fields = {
  __typename?: 'repay_tx_var_pop_fields';
  amount?: Maybe<Scalars['Float']>;
  assetId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "repay_tx" */
export type Repay_Tx_Var_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Repay_Tx_Var_Samp_Fields = {
  __typename?: 'repay_tx_var_samp_fields';
  amount?: Maybe<Scalars['Float']>;
  assetId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "repay_tx" */
export type Repay_Tx_Var_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Repay_Tx_Variance_Fields = {
  __typename?: 'repay_tx_variance_fields';
  amount?: Maybe<Scalars['Float']>;
  assetId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "repay_tx" */
export type Repay_Tx_Variance_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "asset" */
  asset: Array<Asset>;
  /** fetch aggregated fields from the table: "asset" */
  assetAggregate: Asset_Aggregate;
  /** fetch data from the table: "asset" using primary key columns */
  assetByPk?: Maybe<Asset>;
  /** fetch data from the table: "borrow_tx" */
  borrowTx: Array<Borrow_Tx>;
  /** fetch aggregated fields from the table: "borrow_tx" */
  borrowTxAggregate: Borrow_Tx_Aggregate;
  /** fetch data from the table: "borrow_tx" using primary key columns */
  borrowTxByPk?: Maybe<Borrow_Tx>;
  /** fetch data from the table: "daily_stats" */
  dailyStats: Array<Daily_Stats>;
  /** fetch aggregated fields from the table: "daily_stats" */
  dailyStatsAggregate: Daily_Stats_Aggregate;
  /** fetch data from the table: "daily_stats" using primary key columns */
  dailyStatsByPk?: Maybe<Daily_Stats>;
  /** fetch data from the table: "dipdup_contract" */
  dipdupContract: Array<Dipdup_Contract>;
  /** fetch aggregated fields from the table: "dipdup_contract" */
  dipdupContractAggregate: Dipdup_Contract_Aggregate;
  /** fetch data from the table: "dipdup_contract" using primary key columns */
  dipdupContractByPk?: Maybe<Dipdup_Contract>;
  /** fetch data from the table: "dipdup_head" */
  dipdupHead: Array<Dipdup_Head>;
  /** fetch aggregated fields from the table: "dipdup_head" */
  dipdupHeadAggregate: Dipdup_Head_Aggregate;
  /** fetch data from the table: "dipdup_head" using primary key columns */
  dipdupHeadByPk?: Maybe<Dipdup_Head>;
  /** fetch data from the table: "dipdup_index" */
  dipdupIndex: Array<Dipdup_Index>;
  /** fetch aggregated fields from the table: "dipdup_index" */
  dipdupIndexAggregate: Dipdup_Index_Aggregate;
  /** fetch data from the table: "dipdup_index" using primary key columns */
  dipdupIndexByPk?: Maybe<Dipdup_Index>;
  /** fetch data from the table: "dipdup_schema" */
  dipdupSchema: Array<Dipdup_Schema>;
  /** fetch aggregated fields from the table: "dipdup_schema" */
  dipdupSchemaAggregate: Dipdup_Schema_Aggregate;
  /** fetch data from the table: "dipdup_schema" using primary key columns */
  dipdupSchemaByPk?: Maybe<Dipdup_Schema>;
  /** fetch data from the table: "funds" */
  funds: Array<Funds>;
  /** fetch aggregated fields from the table: "funds" */
  fundsAggregate: Funds_Aggregate;
  /** fetch data from the table: "funds" using primary key columns */
  fundsByPk?: Maybe<Funds>;
  /** fetch data from the table: "global_factors" */
  globalFactors: Array<Global_Factors>;
  /** fetch aggregated fields from the table: "global_factors" */
  globalFactorsAggregate: Global_Factors_Aggregate;
  /** fetch data from the table: "global_factors" using primary key columns */
  globalFactorsByPk?: Maybe<Global_Factors>;
  /** fetch data from the table: "interest_model" */
  interestModel: Array<Interest_Model>;
  /** fetch aggregated fields from the table: "interest_model" */
  interestModelAggregate: Interest_Model_Aggregate;
  /** fetch data from the table: "interest_model" using primary key columns */
  interestModelByPk?: Maybe<Interest_Model>;
  /** fetch data from the table: "liquidate_tx" */
  liquidateTx: Array<Liquidate_Tx>;
  /** fetch aggregated fields from the table: "liquidate_tx" */
  liquidateTxAggregate: Liquidate_Tx_Aggregate;
  /** fetch data from the table: "liquidate_tx" using primary key columns */
  liquidateTxByPk?: Maybe<Liquidate_Tx>;
  /** fetch data from the table: "oracle_price" */
  oraclePrice: Array<Oracle_Price>;
  /** fetch aggregated fields from the table: "oracle_price" */
  oraclePriceAggregate: Oracle_Price_Aggregate;
  /** fetch data from the table: "oracle_price" using primary key columns */
  oraclePriceByPk?: Maybe<Oracle_Price>;
  /** An array relationship */
  rates: Array<Rates>;
  /** An aggregate relationship */
  rates_aggregate: Rates_Aggregate;
  /** fetch data from the table: "rates" using primary key columns */
  rates_by_pk?: Maybe<Rates>;
  /** fetch data from the table: "repay_tx" */
  repayTx: Array<Repay_Tx>;
  /** fetch aggregated fields from the table: "repay_tx" */
  repayTxAggregate: Repay_Tx_Aggregate;
  /** fetch data from the table: "repay_tx" using primary key columns */
  repayTxByPk?: Maybe<Repay_Tx>;
  /** fetch data from the table: "supply_tx" */
  supplyTx: Array<Supply_Tx>;
  /** fetch aggregated fields from the table: "supply_tx" */
  supplyTxAggregate: Supply_Tx_Aggregate;
  /** fetch data from the table: "supply_tx" using primary key columns */
  supplyTxByPk?: Maybe<Supply_Tx>;
  /** fetch data from the table: "token" */
  token: Array<Token>;
  /** fetch aggregated fields from the table: "token" */
  tokenAggregate: Token_Aggregate;
  /** fetch data from the table: "token" using primary key columns */
  tokenByPk?: Maybe<Token>;
  /** fetch data from the table: "user" */
  user: Array<User>;
  /** fetch aggregated fields from the table: "user" */
  userAggregate: User_Aggregate;
  /** fetch data from the table: "user" using primary key columns */
  userByPk?: Maybe<User>;
  /** fetch data from the table: "withdraw_tx" */
  withdrawTx: Array<Withdraw_Tx>;
  /** fetch aggregated fields from the table: "withdraw_tx" */
  withdrawTxAggregate: Withdraw_Tx_Aggregate;
  /** fetch data from the table: "withdraw_tx" using primary key columns */
  withdrawTxByPk?: Maybe<Withdraw_Tx>;
};

export type Subscription_RootAssetArgs = {
  distinct_on?: InputMaybe<Array<Asset_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Asset_Order_By>>;
  where?: InputMaybe<Asset_Bool_Exp>;
};

export type Subscription_RootAssetAggregateArgs = {
  distinct_on?: InputMaybe<Array<Asset_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Asset_Order_By>>;
  where?: InputMaybe<Asset_Bool_Exp>;
};

export type Subscription_RootAssetByPkArgs = {
  ytoken: Scalars['Int'];
};

export type Subscription_RootBorrowTxArgs = {
  distinct_on?: InputMaybe<Array<Borrow_Tx_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Borrow_Tx_Order_By>>;
  where?: InputMaybe<Borrow_Tx_Bool_Exp>;
};

export type Subscription_RootBorrowTxAggregateArgs = {
  distinct_on?: InputMaybe<Array<Borrow_Tx_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Borrow_Tx_Order_By>>;
  where?: InputMaybe<Borrow_Tx_Bool_Exp>;
};

export type Subscription_RootBorrowTxByPkArgs = {
  id: Scalars['Int'];
};

export type Subscription_RootDailyStatsArgs = {
  distinct_on?: InputMaybe<Array<Daily_Stats_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Daily_Stats_Order_By>>;
  where?: InputMaybe<Daily_Stats_Bool_Exp>;
};

export type Subscription_RootDailyStatsAggregateArgs = {
  distinct_on?: InputMaybe<Array<Daily_Stats_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Daily_Stats_Order_By>>;
  where?: InputMaybe<Daily_Stats_Bool_Exp>;
};

export type Subscription_RootDailyStatsByPkArgs = {
  id: Scalars['Int'];
};

export type Subscription_RootDipdupContractArgs = {
  distinct_on?: InputMaybe<Array<Dipdup_Contract_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Dipdup_Contract_Order_By>>;
  where?: InputMaybe<Dipdup_Contract_Bool_Exp>;
};

export type Subscription_RootDipdupContractAggregateArgs = {
  distinct_on?: InputMaybe<Array<Dipdup_Contract_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Dipdup_Contract_Order_By>>;
  where?: InputMaybe<Dipdup_Contract_Bool_Exp>;
};

export type Subscription_RootDipdupContractByPkArgs = {
  name: Scalars['String'];
};

export type Subscription_RootDipdupHeadArgs = {
  distinct_on?: InputMaybe<Array<Dipdup_Head_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Dipdup_Head_Order_By>>;
  where?: InputMaybe<Dipdup_Head_Bool_Exp>;
};

export type Subscription_RootDipdupHeadAggregateArgs = {
  distinct_on?: InputMaybe<Array<Dipdup_Head_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Dipdup_Head_Order_By>>;
  where?: InputMaybe<Dipdup_Head_Bool_Exp>;
};

export type Subscription_RootDipdupHeadByPkArgs = {
  name: Scalars['String'];
};

export type Subscription_RootDipdupIndexArgs = {
  distinct_on?: InputMaybe<Array<Dipdup_Index_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Dipdup_Index_Order_By>>;
  where?: InputMaybe<Dipdup_Index_Bool_Exp>;
};

export type Subscription_RootDipdupIndexAggregateArgs = {
  distinct_on?: InputMaybe<Array<Dipdup_Index_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Dipdup_Index_Order_By>>;
  where?: InputMaybe<Dipdup_Index_Bool_Exp>;
};

export type Subscription_RootDipdupIndexByPkArgs = {
  name: Scalars['String'];
};

export type Subscription_RootDipdupSchemaArgs = {
  distinct_on?: InputMaybe<Array<Dipdup_Schema_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Dipdup_Schema_Order_By>>;
  where?: InputMaybe<Dipdup_Schema_Bool_Exp>;
};

export type Subscription_RootDipdupSchemaAggregateArgs = {
  distinct_on?: InputMaybe<Array<Dipdup_Schema_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Dipdup_Schema_Order_By>>;
  where?: InputMaybe<Dipdup_Schema_Bool_Exp>;
};

export type Subscription_RootDipdupSchemaByPkArgs = {
  name: Scalars['String'];
};

export type Subscription_RootFundsArgs = {
  distinct_on?: InputMaybe<Array<Funds_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Funds_Order_By>>;
  where?: InputMaybe<Funds_Bool_Exp>;
};

export type Subscription_RootFundsAggregateArgs = {
  distinct_on?: InputMaybe<Array<Funds_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Funds_Order_By>>;
  where?: InputMaybe<Funds_Bool_Exp>;
};

export type Subscription_RootFundsByPkArgs = {
  id: Scalars['Int'];
};

export type Subscription_RootGlobalFactorsArgs = {
  distinct_on?: InputMaybe<Array<Global_Factors_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Global_Factors_Order_By>>;
  where?: InputMaybe<Global_Factors_Bool_Exp>;
};

export type Subscription_RootGlobalFactorsAggregateArgs = {
  distinct_on?: InputMaybe<Array<Global_Factors_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Global_Factors_Order_By>>;
  where?: InputMaybe<Global_Factors_Bool_Exp>;
};

export type Subscription_RootGlobalFactorsByPkArgs = {
  id: Scalars['Int'];
};

export type Subscription_RootInterestModelArgs = {
  distinct_on?: InputMaybe<Array<Interest_Model_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Interest_Model_Order_By>>;
  where?: InputMaybe<Interest_Model_Bool_Exp>;
};

export type Subscription_RootInterestModelAggregateArgs = {
  distinct_on?: InputMaybe<Array<Interest_Model_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Interest_Model_Order_By>>;
  where?: InputMaybe<Interest_Model_Bool_Exp>;
};

export type Subscription_RootInterestModelByPkArgs = {
  address: Scalars['String'];
};

export type Subscription_RootLiquidateTxArgs = {
  distinct_on?: InputMaybe<Array<Liquidate_Tx_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Liquidate_Tx_Order_By>>;
  where?: InputMaybe<Liquidate_Tx_Bool_Exp>;
};

export type Subscription_RootLiquidateTxAggregateArgs = {
  distinct_on?: InputMaybe<Array<Liquidate_Tx_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Liquidate_Tx_Order_By>>;
  where?: InputMaybe<Liquidate_Tx_Bool_Exp>;
};

export type Subscription_RootLiquidateTxByPkArgs = {
  id: Scalars['Int'];
};

export type Subscription_RootOraclePriceArgs = {
  distinct_on?: InputMaybe<Array<Oracle_Price_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Oracle_Price_Order_By>>;
  where?: InputMaybe<Oracle_Price_Bool_Exp>;
};

export type Subscription_RootOraclePriceAggregateArgs = {
  distinct_on?: InputMaybe<Array<Oracle_Price_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Oracle_Price_Order_By>>;
  where?: InputMaybe<Oracle_Price_Bool_Exp>;
};

export type Subscription_RootOraclePriceByPkArgs = {
  ytoken: Scalars['Int'];
};

export type Subscription_RootRatesArgs = {
  distinct_on?: InputMaybe<Array<Rates_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Rates_Order_By>>;
  where?: InputMaybe<Rates_Bool_Exp>;
};

export type Subscription_RootRates_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Rates_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Rates_Order_By>>;
  where?: InputMaybe<Rates_Bool_Exp>;
};

export type Subscription_RootRates_By_PkArgs = {
  id: Scalars['Int'];
};

export type Subscription_RootRepayTxArgs = {
  distinct_on?: InputMaybe<Array<Repay_Tx_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Repay_Tx_Order_By>>;
  where?: InputMaybe<Repay_Tx_Bool_Exp>;
};

export type Subscription_RootRepayTxAggregateArgs = {
  distinct_on?: InputMaybe<Array<Repay_Tx_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Repay_Tx_Order_By>>;
  where?: InputMaybe<Repay_Tx_Bool_Exp>;
};

export type Subscription_RootRepayTxByPkArgs = {
  id: Scalars['Int'];
};

export type Subscription_RootSupplyTxArgs = {
  distinct_on?: InputMaybe<Array<Supply_Tx_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Supply_Tx_Order_By>>;
  where?: InputMaybe<Supply_Tx_Bool_Exp>;
};

export type Subscription_RootSupplyTxAggregateArgs = {
  distinct_on?: InputMaybe<Array<Supply_Tx_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Supply_Tx_Order_By>>;
  where?: InputMaybe<Supply_Tx_Bool_Exp>;
};

export type Subscription_RootSupplyTxByPkArgs = {
  id: Scalars['Int'];
};

export type Subscription_RootTokenArgs = {
  distinct_on?: InputMaybe<Array<Token_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Token_Order_By>>;
  where?: InputMaybe<Token_Bool_Exp>;
};

export type Subscription_RootTokenAggregateArgs = {
  distinct_on?: InputMaybe<Array<Token_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Token_Order_By>>;
  where?: InputMaybe<Token_Bool_Exp>;
};

export type Subscription_RootTokenByPkArgs = {
  id: Scalars['Int'];
};

export type Subscription_RootUserArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Order_By>>;
  where?: InputMaybe<User_Bool_Exp>;
};

export type Subscription_RootUserAggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Order_By>>;
  where?: InputMaybe<User_Bool_Exp>;
};

export type Subscription_RootUserByPkArgs = {
  address: Scalars['String'];
};

export type Subscription_RootWithdrawTxArgs = {
  distinct_on?: InputMaybe<Array<Withdraw_Tx_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Withdraw_Tx_Order_By>>;
  where?: InputMaybe<Withdraw_Tx_Bool_Exp>;
};

export type Subscription_RootWithdrawTxAggregateArgs = {
  distinct_on?: InputMaybe<Array<Withdraw_Tx_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Withdraw_Tx_Order_By>>;
  where?: InputMaybe<Withdraw_Tx_Bool_Exp>;
};

export type Subscription_RootWithdrawTxByPkArgs = {
  id: Scalars['Int'];
};

/** columns and relationships of "supply_tx" */
export type Supply_Tx = {
  __typename?: 'supply_tx';
  amount: Scalars['numeric'];
  /** An object relationship */
  asset: Asset;
  assetId: Scalars['Int'];
  id: Scalars['Int'];
  timestamp?: Maybe<Scalars['timestamptz']>;
  /** An object relationship */
  user: User;
  userId: Scalars['String'];
};

/** aggregated selection of "supply_tx" */
export type Supply_Tx_Aggregate = {
  __typename?: 'supply_tx_aggregate';
  aggregate?: Maybe<Supply_Tx_Aggregate_Fields>;
  nodes: Array<Supply_Tx>;
};

/** aggregate fields of "supply_tx" */
export type Supply_Tx_Aggregate_Fields = {
  __typename?: 'supply_tx_aggregate_fields';
  avg?: Maybe<Supply_Tx_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Supply_Tx_Max_Fields>;
  min?: Maybe<Supply_Tx_Min_Fields>;
  stddev?: Maybe<Supply_Tx_Stddev_Fields>;
  stddev_pop?: Maybe<Supply_Tx_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Supply_Tx_Stddev_Samp_Fields>;
  sum?: Maybe<Supply_Tx_Sum_Fields>;
  var_pop?: Maybe<Supply_Tx_Var_Pop_Fields>;
  var_samp?: Maybe<Supply_Tx_Var_Samp_Fields>;
  variance?: Maybe<Supply_Tx_Variance_Fields>;
};

/** aggregate fields of "supply_tx" */
export type Supply_Tx_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Supply_Tx_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "supply_tx" */
export type Supply_Tx_Aggregate_Order_By = {
  avg?: InputMaybe<Supply_Tx_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Supply_Tx_Max_Order_By>;
  min?: InputMaybe<Supply_Tx_Min_Order_By>;
  stddev?: InputMaybe<Supply_Tx_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Supply_Tx_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Supply_Tx_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Supply_Tx_Sum_Order_By>;
  var_pop?: InputMaybe<Supply_Tx_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Supply_Tx_Var_Samp_Order_By>;
  variance?: InputMaybe<Supply_Tx_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Supply_Tx_Avg_Fields = {
  __typename?: 'supply_tx_avg_fields';
  amount?: Maybe<Scalars['Float']>;
  assetId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "supply_tx" */
export type Supply_Tx_Avg_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "supply_tx". All fields are combined with a logical 'AND'. */
export type Supply_Tx_Bool_Exp = {
  _and?: InputMaybe<Array<Supply_Tx_Bool_Exp>>;
  _not?: InputMaybe<Supply_Tx_Bool_Exp>;
  _or?: InputMaybe<Array<Supply_Tx_Bool_Exp>>;
  amount?: InputMaybe<Numeric_Comparison_Exp>;
  asset?: InputMaybe<Asset_Bool_Exp>;
  assetId?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  timestamp?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<User_Bool_Exp>;
  userId?: InputMaybe<String_Comparison_Exp>;
};

/** aggregate max on columns */
export type Supply_Tx_Max_Fields = {
  __typename?: 'supply_tx_max_fields';
  amount?: Maybe<Scalars['numeric']>;
  assetId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  timestamp?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "supply_tx" */
export type Supply_Tx_Max_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Supply_Tx_Min_Fields = {
  __typename?: 'supply_tx_min_fields';
  amount?: Maybe<Scalars['numeric']>;
  assetId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  timestamp?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "supply_tx" */
export type Supply_Tx_Min_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "supply_tx". */
export type Supply_Tx_Order_By = {
  amount?: InputMaybe<Order_By>;
  asset?: InputMaybe<Asset_Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  user?: InputMaybe<User_Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** select columns of table "supply_tx" */
export enum Supply_Tx_Select_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  AssetId = 'assetId',
  /** column name */
  Id = 'id',
  /** column name */
  Timestamp = 'timestamp',
  /** column name */
  UserId = 'userId',
}

/** aggregate stddev on columns */
export type Supply_Tx_Stddev_Fields = {
  __typename?: 'supply_tx_stddev_fields';
  amount?: Maybe<Scalars['Float']>;
  assetId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "supply_tx" */
export type Supply_Tx_Stddev_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Supply_Tx_Stddev_Pop_Fields = {
  __typename?: 'supply_tx_stddev_pop_fields';
  amount?: Maybe<Scalars['Float']>;
  assetId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "supply_tx" */
export type Supply_Tx_Stddev_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Supply_Tx_Stddev_Samp_Fields = {
  __typename?: 'supply_tx_stddev_samp_fields';
  amount?: Maybe<Scalars['Float']>;
  assetId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "supply_tx" */
export type Supply_Tx_Stddev_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Supply_Tx_Sum_Fields = {
  __typename?: 'supply_tx_sum_fields';
  amount?: Maybe<Scalars['numeric']>;
  assetId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "supply_tx" */
export type Supply_Tx_Sum_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Supply_Tx_Var_Pop_Fields = {
  __typename?: 'supply_tx_var_pop_fields';
  amount?: Maybe<Scalars['Float']>;
  assetId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "supply_tx" */
export type Supply_Tx_Var_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Supply_Tx_Var_Samp_Fields = {
  __typename?: 'supply_tx_var_samp_fields';
  amount?: Maybe<Scalars['Float']>;
  assetId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "supply_tx" */
export type Supply_Tx_Var_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Supply_Tx_Variance_Fields = {
  __typename?: 'supply_tx_variance_fields';
  amount?: Maybe<Scalars['Float']>;
  assetId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "supply_tx" */
export type Supply_Tx_Variance_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamptz']>;
  _gt?: InputMaybe<Scalars['timestamptz']>;
  _gte?: InputMaybe<Scalars['timestamptz']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']>>;
  _is_null?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamptz']>;
  _lte?: InputMaybe<Scalars['timestamptz']>;
  _neq?: InputMaybe<Scalars['timestamptz']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']>>;
};

/** columns and relationships of "token" */
export type Token = {
  __typename?: 'token';
  /** An object relationship */
  asset: Asset;
  assetId: Scalars['Int'];
  decimals: Scalars['Int'];
  id: Scalars['Int'];
  name?: Maybe<Scalars['String']>;
  symbol?: Maybe<Scalars['String']>;
  thumbnail?: Maybe<Scalars['String']>;
};

/** aggregated selection of "token" */
export type Token_Aggregate = {
  __typename?: 'token_aggregate';
  aggregate?: Maybe<Token_Aggregate_Fields>;
  nodes: Array<Token>;
};

/** aggregate fields of "token" */
export type Token_Aggregate_Fields = {
  __typename?: 'token_aggregate_fields';
  avg?: Maybe<Token_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Token_Max_Fields>;
  min?: Maybe<Token_Min_Fields>;
  stddev?: Maybe<Token_Stddev_Fields>;
  stddev_pop?: Maybe<Token_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Token_Stddev_Samp_Fields>;
  sum?: Maybe<Token_Sum_Fields>;
  var_pop?: Maybe<Token_Var_Pop_Fields>;
  var_samp?: Maybe<Token_Var_Samp_Fields>;
  variance?: Maybe<Token_Variance_Fields>;
};

/** aggregate fields of "token" */
export type Token_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Token_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "token" */
export type Token_Aggregate_Order_By = {
  avg?: InputMaybe<Token_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Token_Max_Order_By>;
  min?: InputMaybe<Token_Min_Order_By>;
  stddev?: InputMaybe<Token_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Token_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Token_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Token_Sum_Order_By>;
  var_pop?: InputMaybe<Token_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Token_Var_Samp_Order_By>;
  variance?: InputMaybe<Token_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Token_Avg_Fields = {
  __typename?: 'token_avg_fields';
  assetId?: Maybe<Scalars['Float']>;
  decimals?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "token" */
export type Token_Avg_Order_By = {
  assetId?: InputMaybe<Order_By>;
  decimals?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "token". All fields are combined with a logical 'AND'. */
export type Token_Bool_Exp = {
  _and?: InputMaybe<Array<Token_Bool_Exp>>;
  _not?: InputMaybe<Token_Bool_Exp>;
  _or?: InputMaybe<Array<Token_Bool_Exp>>;
  asset?: InputMaybe<Asset_Bool_Exp>;
  assetId?: InputMaybe<Int_Comparison_Exp>;
  decimals?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  symbol?: InputMaybe<String_Comparison_Exp>;
  thumbnail?: InputMaybe<String_Comparison_Exp>;
};

/** aggregate max on columns */
export type Token_Max_Fields = {
  __typename?: 'token_max_fields';
  assetId?: Maybe<Scalars['Int']>;
  decimals?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  symbol?: Maybe<Scalars['String']>;
  thumbnail?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "token" */
export type Token_Max_Order_By = {
  assetId?: InputMaybe<Order_By>;
  decimals?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  symbol?: InputMaybe<Order_By>;
  thumbnail?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Token_Min_Fields = {
  __typename?: 'token_min_fields';
  assetId?: Maybe<Scalars['Int']>;
  decimals?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  symbol?: Maybe<Scalars['String']>;
  thumbnail?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "token" */
export type Token_Min_Order_By = {
  assetId?: InputMaybe<Order_By>;
  decimals?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  symbol?: InputMaybe<Order_By>;
  thumbnail?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "token". */
export type Token_Order_By = {
  asset?: InputMaybe<Asset_Order_By>;
  assetId?: InputMaybe<Order_By>;
  decimals?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  symbol?: InputMaybe<Order_By>;
  thumbnail?: InputMaybe<Order_By>;
};

/** select columns of table "token" */
export enum Token_Select_Column {
  /** column name */
  AssetId = 'assetId',
  /** column name */
  Decimals = 'decimals',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Symbol = 'symbol',
  /** column name */
  Thumbnail = 'thumbnail',
}

/** aggregate stddev on columns */
export type Token_Stddev_Fields = {
  __typename?: 'token_stddev_fields';
  assetId?: Maybe<Scalars['Float']>;
  decimals?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "token" */
export type Token_Stddev_Order_By = {
  assetId?: InputMaybe<Order_By>;
  decimals?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Token_Stddev_Pop_Fields = {
  __typename?: 'token_stddev_pop_fields';
  assetId?: Maybe<Scalars['Float']>;
  decimals?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "token" */
export type Token_Stddev_Pop_Order_By = {
  assetId?: InputMaybe<Order_By>;
  decimals?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Token_Stddev_Samp_Fields = {
  __typename?: 'token_stddev_samp_fields';
  assetId?: Maybe<Scalars['Float']>;
  decimals?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "token" */
export type Token_Stddev_Samp_Order_By = {
  assetId?: InputMaybe<Order_By>;
  decimals?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Token_Sum_Fields = {
  __typename?: 'token_sum_fields';
  assetId?: Maybe<Scalars['Int']>;
  decimals?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "token" */
export type Token_Sum_Order_By = {
  assetId?: InputMaybe<Order_By>;
  decimals?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Token_Var_Pop_Fields = {
  __typename?: 'token_var_pop_fields';
  assetId?: Maybe<Scalars['Float']>;
  decimals?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "token" */
export type Token_Var_Pop_Order_By = {
  assetId?: InputMaybe<Order_By>;
  decimals?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Token_Var_Samp_Fields = {
  __typename?: 'token_var_samp_fields';
  assetId?: Maybe<Scalars['Float']>;
  decimals?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "token" */
export type Token_Var_Samp_Order_By = {
  assetId?: InputMaybe<Order_By>;
  decimals?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Token_Variance_Fields = {
  __typename?: 'token_variance_fields';
  assetId?: Maybe<Scalars['Float']>;
  decimals?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "token" */
export type Token_Variance_Order_By = {
  assetId?: InputMaybe<Order_By>;
  decimals?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** columns and relationships of "user" */
export type User = {
  __typename?: 'user';
  address: Scalars['String'];
  borrowRatio: Scalars['numeric'];
  /** An array relationship */
  borrower: Array<Liquidate_Tx>;
  /** An aggregate relationship */
  borrower_aggregate: Liquidate_Tx_Aggregate;
  liquidationCollateral: Scalars['numeric'];
  liquidationRatio: Scalars['numeric'];
  /** An array relationship */
  liquidator: Array<Liquidate_Tx>;
  /** An aggregate relationship */
  liquidator_aggregate: Liquidate_Tx_Aggregate;
  maxCollateral: Scalars['numeric'];
  outstandingBorrow: Scalars['numeric'];
  /** An array relationship */
  userBorrowTx: Array<Borrow_Tx>;
  /** An aggregate relationship */
  userBorrowTx_aggregate: Borrow_Tx_Aggregate;
  /** An array relationship */
  userFunds: Array<Funds>;
  /** An aggregate relationship */
  userFunds_aggregate: Funds_Aggregate;
  /** An array relationship */
  userRepayTx: Array<Repay_Tx>;
  /** An aggregate relationship */
  userRepayTx_aggregate: Repay_Tx_Aggregate;
  /** An array relationship */
  userSupplyTx: Array<Supply_Tx>;
  /** An aggregate relationship */
  userSupplyTx_aggregate: Supply_Tx_Aggregate;
  /** An array relationship */
  userWithdrawTx: Array<Withdraw_Tx>;
  /** An aggregate relationship */
  userWithdrawTx_aggregate: Withdraw_Tx_Aggregate;
};

/** columns and relationships of "user" */
export type UserBorrowerArgs = {
  distinct_on?: InputMaybe<Array<Liquidate_Tx_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Liquidate_Tx_Order_By>>;
  where?: InputMaybe<Liquidate_Tx_Bool_Exp>;
};

/** columns and relationships of "user" */
export type UserBorrower_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Liquidate_Tx_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Liquidate_Tx_Order_By>>;
  where?: InputMaybe<Liquidate_Tx_Bool_Exp>;
};

/** columns and relationships of "user" */
export type UserLiquidatorArgs = {
  distinct_on?: InputMaybe<Array<Liquidate_Tx_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Liquidate_Tx_Order_By>>;
  where?: InputMaybe<Liquidate_Tx_Bool_Exp>;
};

/** columns and relationships of "user" */
export type UserLiquidator_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Liquidate_Tx_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Liquidate_Tx_Order_By>>;
  where?: InputMaybe<Liquidate_Tx_Bool_Exp>;
};

/** columns and relationships of "user" */
export type UserUserBorrowTxArgs = {
  distinct_on?: InputMaybe<Array<Borrow_Tx_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Borrow_Tx_Order_By>>;
  where?: InputMaybe<Borrow_Tx_Bool_Exp>;
};

/** columns and relationships of "user" */
export type UserUserBorrowTx_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Borrow_Tx_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Borrow_Tx_Order_By>>;
  where?: InputMaybe<Borrow_Tx_Bool_Exp>;
};

/** columns and relationships of "user" */
export type UserUserFundsArgs = {
  distinct_on?: InputMaybe<Array<Funds_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Funds_Order_By>>;
  where?: InputMaybe<Funds_Bool_Exp>;
};

/** columns and relationships of "user" */
export type UserUserFunds_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Funds_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Funds_Order_By>>;
  where?: InputMaybe<Funds_Bool_Exp>;
};

/** columns and relationships of "user" */
export type UserUserRepayTxArgs = {
  distinct_on?: InputMaybe<Array<Repay_Tx_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Repay_Tx_Order_By>>;
  where?: InputMaybe<Repay_Tx_Bool_Exp>;
};

/** columns and relationships of "user" */
export type UserUserRepayTx_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Repay_Tx_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Repay_Tx_Order_By>>;
  where?: InputMaybe<Repay_Tx_Bool_Exp>;
};

/** columns and relationships of "user" */
export type UserUserSupplyTxArgs = {
  distinct_on?: InputMaybe<Array<Supply_Tx_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Supply_Tx_Order_By>>;
  where?: InputMaybe<Supply_Tx_Bool_Exp>;
};

/** columns and relationships of "user" */
export type UserUserSupplyTx_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Supply_Tx_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Supply_Tx_Order_By>>;
  where?: InputMaybe<Supply_Tx_Bool_Exp>;
};

/** columns and relationships of "user" */
export type UserUserWithdrawTxArgs = {
  distinct_on?: InputMaybe<Array<Withdraw_Tx_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Withdraw_Tx_Order_By>>;
  where?: InputMaybe<Withdraw_Tx_Bool_Exp>;
};

/** columns and relationships of "user" */
export type UserUserWithdrawTx_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Withdraw_Tx_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Withdraw_Tx_Order_By>>;
  where?: InputMaybe<Withdraw_Tx_Bool_Exp>;
};

/** aggregated selection of "user" */
export type User_Aggregate = {
  __typename?: 'user_aggregate';
  aggregate?: Maybe<User_Aggregate_Fields>;
  nodes: Array<User>;
};

/** aggregate fields of "user" */
export type User_Aggregate_Fields = {
  __typename?: 'user_aggregate_fields';
  avg?: Maybe<User_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<User_Max_Fields>;
  min?: Maybe<User_Min_Fields>;
  stddev?: Maybe<User_Stddev_Fields>;
  stddev_pop?: Maybe<User_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<User_Stddev_Samp_Fields>;
  sum?: Maybe<User_Sum_Fields>;
  var_pop?: Maybe<User_Var_Pop_Fields>;
  var_samp?: Maybe<User_Var_Samp_Fields>;
  variance?: Maybe<User_Variance_Fields>;
};

/** aggregate fields of "user" */
export type User_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<User_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type User_Avg_Fields = {
  __typename?: 'user_avg_fields';
  borrowRatio?: Maybe<Scalars['Float']>;
  liquidationCollateral?: Maybe<Scalars['Float']>;
  liquidationRatio?: Maybe<Scalars['Float']>;
  maxCollateral?: Maybe<Scalars['Float']>;
  outstandingBorrow?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "user". All fields are combined with a logical 'AND'. */
export type User_Bool_Exp = {
  _and?: InputMaybe<Array<User_Bool_Exp>>;
  _not?: InputMaybe<User_Bool_Exp>;
  _or?: InputMaybe<Array<User_Bool_Exp>>;
  address?: InputMaybe<String_Comparison_Exp>;
  borrowRatio?: InputMaybe<Numeric_Comparison_Exp>;
  borrower?: InputMaybe<Liquidate_Tx_Bool_Exp>;
  liquidationCollateral?: InputMaybe<Numeric_Comparison_Exp>;
  liquidationRatio?: InputMaybe<Numeric_Comparison_Exp>;
  liquidator?: InputMaybe<Liquidate_Tx_Bool_Exp>;
  maxCollateral?: InputMaybe<Numeric_Comparison_Exp>;
  outstandingBorrow?: InputMaybe<Numeric_Comparison_Exp>;
  userBorrowTx?: InputMaybe<Borrow_Tx_Bool_Exp>;
  userFunds?: InputMaybe<Funds_Bool_Exp>;
  userRepayTx?: InputMaybe<Repay_Tx_Bool_Exp>;
  userSupplyTx?: InputMaybe<Supply_Tx_Bool_Exp>;
  userWithdrawTx?: InputMaybe<Withdraw_Tx_Bool_Exp>;
};

/** aggregate max on columns */
export type User_Max_Fields = {
  __typename?: 'user_max_fields';
  address?: Maybe<Scalars['String']>;
  borrowRatio?: Maybe<Scalars['numeric']>;
  liquidationCollateral?: Maybe<Scalars['numeric']>;
  liquidationRatio?: Maybe<Scalars['numeric']>;
  maxCollateral?: Maybe<Scalars['numeric']>;
  outstandingBorrow?: Maybe<Scalars['numeric']>;
};

/** aggregate min on columns */
export type User_Min_Fields = {
  __typename?: 'user_min_fields';
  address?: Maybe<Scalars['String']>;
  borrowRatio?: Maybe<Scalars['numeric']>;
  liquidationCollateral?: Maybe<Scalars['numeric']>;
  liquidationRatio?: Maybe<Scalars['numeric']>;
  maxCollateral?: Maybe<Scalars['numeric']>;
  outstandingBorrow?: Maybe<Scalars['numeric']>;
};

/** Ordering options when selecting data from "user". */
export type User_Order_By = {
  address?: InputMaybe<Order_By>;
  borrowRatio?: InputMaybe<Order_By>;
  borrower_aggregate?: InputMaybe<Liquidate_Tx_Aggregate_Order_By>;
  liquidationCollateral?: InputMaybe<Order_By>;
  liquidationRatio?: InputMaybe<Order_By>;
  liquidator_aggregate?: InputMaybe<Liquidate_Tx_Aggregate_Order_By>;
  maxCollateral?: InputMaybe<Order_By>;
  outstandingBorrow?: InputMaybe<Order_By>;
  userBorrowTx_aggregate?: InputMaybe<Borrow_Tx_Aggregate_Order_By>;
  userFunds_aggregate?: InputMaybe<Funds_Aggregate_Order_By>;
  userRepayTx_aggregate?: InputMaybe<Repay_Tx_Aggregate_Order_By>;
  userSupplyTx_aggregate?: InputMaybe<Supply_Tx_Aggregate_Order_By>;
  userWithdrawTx_aggregate?: InputMaybe<Withdraw_Tx_Aggregate_Order_By>;
};

/** select columns of table "user" */
export enum User_Select_Column {
  /** column name */
  Address = 'address',
  /** column name */
  BorrowRatio = 'borrowRatio',
  /** column name */
  LiquidationCollateral = 'liquidationCollateral',
  /** column name */
  LiquidationRatio = 'liquidationRatio',
  /** column name */
  MaxCollateral = 'maxCollateral',
  /** column name */
  OutstandingBorrow = 'outstandingBorrow',
}

/** aggregate stddev on columns */
export type User_Stddev_Fields = {
  __typename?: 'user_stddev_fields';
  borrowRatio?: Maybe<Scalars['Float']>;
  liquidationCollateral?: Maybe<Scalars['Float']>;
  liquidationRatio?: Maybe<Scalars['Float']>;
  maxCollateral?: Maybe<Scalars['Float']>;
  outstandingBorrow?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type User_Stddev_Pop_Fields = {
  __typename?: 'user_stddev_pop_fields';
  borrowRatio?: Maybe<Scalars['Float']>;
  liquidationCollateral?: Maybe<Scalars['Float']>;
  liquidationRatio?: Maybe<Scalars['Float']>;
  maxCollateral?: Maybe<Scalars['Float']>;
  outstandingBorrow?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type User_Stddev_Samp_Fields = {
  __typename?: 'user_stddev_samp_fields';
  borrowRatio?: Maybe<Scalars['Float']>;
  liquidationCollateral?: Maybe<Scalars['Float']>;
  liquidationRatio?: Maybe<Scalars['Float']>;
  maxCollateral?: Maybe<Scalars['Float']>;
  outstandingBorrow?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type User_Sum_Fields = {
  __typename?: 'user_sum_fields';
  borrowRatio?: Maybe<Scalars['numeric']>;
  liquidationCollateral?: Maybe<Scalars['numeric']>;
  liquidationRatio?: Maybe<Scalars['numeric']>;
  maxCollateral?: Maybe<Scalars['numeric']>;
  outstandingBorrow?: Maybe<Scalars['numeric']>;
};

/** aggregate var_pop on columns */
export type User_Var_Pop_Fields = {
  __typename?: 'user_var_pop_fields';
  borrowRatio?: Maybe<Scalars['Float']>;
  liquidationCollateral?: Maybe<Scalars['Float']>;
  liquidationRatio?: Maybe<Scalars['Float']>;
  maxCollateral?: Maybe<Scalars['Float']>;
  outstandingBorrow?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type User_Var_Samp_Fields = {
  __typename?: 'user_var_samp_fields';
  borrowRatio?: Maybe<Scalars['Float']>;
  liquidationCollateral?: Maybe<Scalars['Float']>;
  liquidationRatio?: Maybe<Scalars['Float']>;
  maxCollateral?: Maybe<Scalars['Float']>;
  outstandingBorrow?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type User_Variance_Fields = {
  __typename?: 'user_variance_fields';
  borrowRatio?: Maybe<Scalars['Float']>;
  liquidationCollateral?: Maybe<Scalars['Float']>;
  liquidationRatio?: Maybe<Scalars['Float']>;
  maxCollateral?: Maybe<Scalars['Float']>;
  outstandingBorrow?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "withdraw_tx" */
export type Withdraw_Tx = {
  __typename?: 'withdraw_tx';
  amount: Scalars['numeric'];
  /** An object relationship */
  asset: Asset;
  assetId: Scalars['Int'];
  id: Scalars['Int'];
  timestamp?: Maybe<Scalars['timestamptz']>;
  /** An object relationship */
  user: User;
  userId: Scalars['String'];
};

/** aggregated selection of "withdraw_tx" */
export type Withdraw_Tx_Aggregate = {
  __typename?: 'withdraw_tx_aggregate';
  aggregate?: Maybe<Withdraw_Tx_Aggregate_Fields>;
  nodes: Array<Withdraw_Tx>;
};

/** aggregate fields of "withdraw_tx" */
export type Withdraw_Tx_Aggregate_Fields = {
  __typename?: 'withdraw_tx_aggregate_fields';
  avg?: Maybe<Withdraw_Tx_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Withdraw_Tx_Max_Fields>;
  min?: Maybe<Withdraw_Tx_Min_Fields>;
  stddev?: Maybe<Withdraw_Tx_Stddev_Fields>;
  stddev_pop?: Maybe<Withdraw_Tx_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Withdraw_Tx_Stddev_Samp_Fields>;
  sum?: Maybe<Withdraw_Tx_Sum_Fields>;
  var_pop?: Maybe<Withdraw_Tx_Var_Pop_Fields>;
  var_samp?: Maybe<Withdraw_Tx_Var_Samp_Fields>;
  variance?: Maybe<Withdraw_Tx_Variance_Fields>;
};

/** aggregate fields of "withdraw_tx" */
export type Withdraw_Tx_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Withdraw_Tx_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "withdraw_tx" */
export type Withdraw_Tx_Aggregate_Order_By = {
  avg?: InputMaybe<Withdraw_Tx_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Withdraw_Tx_Max_Order_By>;
  min?: InputMaybe<Withdraw_Tx_Min_Order_By>;
  stddev?: InputMaybe<Withdraw_Tx_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Withdraw_Tx_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Withdraw_Tx_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Withdraw_Tx_Sum_Order_By>;
  var_pop?: InputMaybe<Withdraw_Tx_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Withdraw_Tx_Var_Samp_Order_By>;
  variance?: InputMaybe<Withdraw_Tx_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Withdraw_Tx_Avg_Fields = {
  __typename?: 'withdraw_tx_avg_fields';
  amount?: Maybe<Scalars['Float']>;
  assetId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "withdraw_tx" */
export type Withdraw_Tx_Avg_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "withdraw_tx". All fields are combined with a logical 'AND'. */
export type Withdraw_Tx_Bool_Exp = {
  _and?: InputMaybe<Array<Withdraw_Tx_Bool_Exp>>;
  _not?: InputMaybe<Withdraw_Tx_Bool_Exp>;
  _or?: InputMaybe<Array<Withdraw_Tx_Bool_Exp>>;
  amount?: InputMaybe<Numeric_Comparison_Exp>;
  asset?: InputMaybe<Asset_Bool_Exp>;
  assetId?: InputMaybe<Int_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  timestamp?: InputMaybe<Timestamptz_Comparison_Exp>;
  user?: InputMaybe<User_Bool_Exp>;
  userId?: InputMaybe<String_Comparison_Exp>;
};

/** aggregate max on columns */
export type Withdraw_Tx_Max_Fields = {
  __typename?: 'withdraw_tx_max_fields';
  amount?: Maybe<Scalars['numeric']>;
  assetId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  timestamp?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "withdraw_tx" */
export type Withdraw_Tx_Max_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Withdraw_Tx_Min_Fields = {
  __typename?: 'withdraw_tx_min_fields';
  amount?: Maybe<Scalars['numeric']>;
  assetId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  timestamp?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "withdraw_tx" */
export type Withdraw_Tx_Min_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "withdraw_tx". */
export type Withdraw_Tx_Order_By = {
  amount?: InputMaybe<Order_By>;
  asset?: InputMaybe<Asset_Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  user?: InputMaybe<User_Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** select columns of table "withdraw_tx" */
export enum Withdraw_Tx_Select_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  AssetId = 'assetId',
  /** column name */
  Id = 'id',
  /** column name */
  Timestamp = 'timestamp',
  /** column name */
  UserId = 'userId',
}

/** aggregate stddev on columns */
export type Withdraw_Tx_Stddev_Fields = {
  __typename?: 'withdraw_tx_stddev_fields';
  amount?: Maybe<Scalars['Float']>;
  assetId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "withdraw_tx" */
export type Withdraw_Tx_Stddev_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Withdraw_Tx_Stddev_Pop_Fields = {
  __typename?: 'withdraw_tx_stddev_pop_fields';
  amount?: Maybe<Scalars['Float']>;
  assetId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "withdraw_tx" */
export type Withdraw_Tx_Stddev_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Withdraw_Tx_Stddev_Samp_Fields = {
  __typename?: 'withdraw_tx_stddev_samp_fields';
  amount?: Maybe<Scalars['Float']>;
  assetId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "withdraw_tx" */
export type Withdraw_Tx_Stddev_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Withdraw_Tx_Sum_Fields = {
  __typename?: 'withdraw_tx_sum_fields';
  amount?: Maybe<Scalars['numeric']>;
  assetId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "withdraw_tx" */
export type Withdraw_Tx_Sum_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Withdraw_Tx_Var_Pop_Fields = {
  __typename?: 'withdraw_tx_var_pop_fields';
  amount?: Maybe<Scalars['Float']>;
  assetId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "withdraw_tx" */
export type Withdraw_Tx_Var_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Withdraw_Tx_Var_Samp_Fields = {
  __typename?: 'withdraw_tx_var_samp_fields';
  amount?: Maybe<Scalars['Float']>;
  assetId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "withdraw_tx" */
export type Withdraw_Tx_Var_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Withdraw_Tx_Variance_Fields = {
  __typename?: 'withdraw_tx_variance_fields';
  amount?: Maybe<Scalars['Float']>;
  assetId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "withdraw_tx" */
export type Withdraw_Tx_Variance_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

export type AllMarketsQueryQueryVariables = Exact<{ [key: string]: never; }>;

export type AllMarketsQueryQuery = { __typename?: 'query_root', token: Array<{ __typename?: 'token', name?: string | null | undefined, symbol?: string | null | undefined, thumbnail?: string | null | undefined, id: number, asset: { __typename?: 'asset', contractAddress: string, isFa2: boolean, tokenId: number, totalSupply: any, totalBorrowed: any, rates: Array<{ __typename?: 'rates', supply_apy: any, borrow_apy: any }> } }> };

export type HomeQueryQueryVariables = Exact<{ [key: string]: never; }>;

export type HomeQueryQuery = { __typename?: 'query_root', token: Array<{ __typename?: 'token', name?: string | null | undefined, symbol?: string | null | undefined, thumbnail?: string | null | undefined, id: number, asset: { __typename?: 'asset', contractAddress: string, collateralFactor: any, tokenId: number, totalLiquid: any, isFa2: boolean, rates: Array<{ __typename?: 'rates', supply_apy: any, borrow_apy: any, utilization_rate: any }> } }> };

export type MarketsSupplyInfoQueryVariables = Exact<{ [key: string]: never; }>;

export type MarketsSupplyInfoQuery = { __typename?: 'query_root', dailyStats: Array<{ __typename?: 'daily_stats', supplyVolume: any }>, token: Array<{ __typename?: 'token', name?: string | null | undefined, symbol?: string | null | undefined, thumbnail?: string | null | undefined, id: number, asset: { __typename?: 'asset', contractAddress: string, tokenId: number, isFa2: boolean, totalSupply: any } }> };

export type MarketsBorrowedInfoQueryVariables = Exact<{ [key: string]: never; }>;

export type MarketsBorrowedInfoQuery = { __typename?: 'query_root', dailyStats: Array<{ __typename?: 'daily_stats', borrowVolume: any }>, token: Array<{ __typename?: 'token', name?: string | null | undefined, symbol?: string | null | undefined, thumbnail?: string | null | undefined, id: number, asset: { __typename?: 'asset', contractAddress: string, tokenId: number, isFa2: boolean, totalSupply: any } }> };

export const AllMarketsQueryDocument = gql`
    query AllMarketsQuery {
  token {
    name
    symbol
    thumbnail
    id
    asset {
      contractAddress
      isFa2
      tokenId
      totalSupply
      totalBorrowed
      rates {
        supply_apy
        borrow_apy
      }
    }
  }
}
    `;

/**
 * __useAllMarketsQueryQuery__
 *
 * To run a query within a React component, call `useAllMarketsQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllMarketsQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllMarketsQueryQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllMarketsQueryQuery(baseOptions?: Apollo.QueryHookOptions<AllMarketsQueryQuery, AllMarketsQueryQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<AllMarketsQueryQuery, AllMarketsQueryQueryVariables>(AllMarketsQueryDocument, options);
}
export function useAllMarketsQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllMarketsQueryQuery, AllMarketsQueryQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<AllMarketsQueryQuery, AllMarketsQueryQueryVariables>(AllMarketsQueryDocument, options);
}
export type AllMarketsQueryQueryHookResult = ReturnType<typeof useAllMarketsQueryQuery>;
export type AllMarketsQueryLazyQueryHookResult = ReturnType<typeof useAllMarketsQueryLazyQuery>;
export type AllMarketsQueryQueryResult = Apollo.QueryResult<AllMarketsQueryQuery, AllMarketsQueryQueryVariables>;
export const HomeQueryDocument = gql`
    query HomeQuery {
  token {
    name
    symbol
    thumbnail
    id
    asset {
      contractAddress
      rates {
        supply_apy
        borrow_apy
        utilization_rate
      }
      collateralFactor
      tokenId
      totalLiquid
      isFa2
    }
  }
}
    `;

/**
 * __useHomeQueryQuery__
 *
 * To run a query within a React component, call `useHomeQueryQuery` and pass it any options that fit your needs.
 * When your component renders, `useHomeQueryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHomeQueryQuery({
 *   variables: {
 *   },
 * });
 */
export function useHomeQueryQuery(baseOptions?: Apollo.QueryHookOptions<HomeQueryQuery, HomeQueryQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<HomeQueryQuery, HomeQueryQueryVariables>(HomeQueryDocument, options);
}
export function useHomeQueryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HomeQueryQuery, HomeQueryQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<HomeQueryQuery, HomeQueryQueryVariables>(HomeQueryDocument, options);
}
export type HomeQueryQueryHookResult = ReturnType<typeof useHomeQueryQuery>;
export type HomeQueryLazyQueryHookResult = ReturnType<typeof useHomeQueryLazyQuery>;
export type HomeQueryQueryResult = Apollo.QueryResult<HomeQueryQuery, HomeQueryQueryVariables>;
export const MarketsSupplyInfoDocument = gql`
    query MarketsSupplyInfo {
  dailyStats {
    supplyVolume
  }
  token(order_by: {asset: {totalSupply: desc}}, limit: 3) {
    name
    symbol
    thumbnail
    id
    asset {
      contractAddress
      tokenId
      isFa2
      totalSupply
    }
  }
}
    `;

/**
 * __useMarketsSupplyInfoQuery__
 *
 * To run a query within a React component, call `useMarketsSupplyInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useMarketsSupplyInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMarketsSupplyInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useMarketsSupplyInfoQuery(baseOptions?: Apollo.QueryHookOptions<MarketsSupplyInfoQuery, MarketsSupplyInfoQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MarketsSupplyInfoQuery, MarketsSupplyInfoQueryVariables>(MarketsSupplyInfoDocument, options);
}
export function useMarketsSupplyInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MarketsSupplyInfoQuery, MarketsSupplyInfoQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MarketsSupplyInfoQuery, MarketsSupplyInfoQueryVariables>(MarketsSupplyInfoDocument, options);
}
export type MarketsSupplyInfoQueryHookResult = ReturnType<typeof useMarketsSupplyInfoQuery>;
export type MarketsSupplyInfoLazyQueryHookResult = ReturnType<typeof useMarketsSupplyInfoLazyQuery>;
export type MarketsSupplyInfoQueryResult = Apollo.QueryResult<MarketsSupplyInfoQuery, MarketsSupplyInfoQueryVariables>;
export const MarketsBorrowedInfoDocument = gql`
    query MarketsBorrowedInfo {
  dailyStats {
    borrowVolume
  }
  token(order_by: {asset: {totalBorrowed: desc}}, limit: 3) {
    name
    symbol
    thumbnail
    id
    asset {
      contractAddress
      tokenId
      isFa2
      totalSupply
    }
  }
}
    `;

/**
 * __useMarketsBorrowedInfoQuery__
 *
 * To run a query within a React component, call `useMarketsBorrowedInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useMarketsBorrowedInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMarketsBorrowedInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useMarketsBorrowedInfoQuery(baseOptions?: Apollo.QueryHookOptions<MarketsBorrowedInfoQuery, MarketsBorrowedInfoQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MarketsBorrowedInfoQuery, MarketsBorrowedInfoQueryVariables>(MarketsBorrowedInfoDocument, options);
}
export function useMarketsBorrowedInfoLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MarketsBorrowedInfoQuery, MarketsBorrowedInfoQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MarketsBorrowedInfoQuery, MarketsBorrowedInfoQueryVariables>(MarketsBorrowedInfoDocument, options);
}
export type MarketsBorrowedInfoQueryHookResult = ReturnType<typeof useMarketsBorrowedInfoQuery>;
export type MarketsBorrowedInfoLazyQueryHookResult = ReturnType<typeof useMarketsBorrowedInfoLazyQuery>;
export type MarketsBorrowedInfoQueryResult = Apollo.QueryResult<MarketsBorrowedInfoQuery, MarketsBorrowedInfoQueryVariables>;

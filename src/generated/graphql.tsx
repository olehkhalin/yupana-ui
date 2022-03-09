import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
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
  assetUserBorrow: Array<User_Borrow>;
  /** An aggregate relationship */
  assetUserBorrow_aggregate: User_Borrow_Aggregate;
  /** An array relationship */
  assetUserSupply: Array<User_Supply>;
  /** An aggregate relationship */
  assetUserSupply_aggregate: User_Supply_Aggregate;
  /** An array relationship */
  assetWithdrawTx: Array<Withdraw_Tx>;
  /** An aggregate relationship */
  assetWithdrawTx_aggregate: Withdraw_Tx_Aggregate;
  borrowIndex: Scalars['numeric'];
  /** An array relationship */
  collateralAsset: Array<Liquidate_Tx>;
  /** An aggregate relationship */
  collateralAsset_aggregate: Liquidate_Tx_Aggregate;
  collateralFactor: Scalars['numeric'];
  contractAddress: Scalars['String'];
  dailyBorrow: Scalars['numeric'];
  dailySupply: Scalars['numeric'];
  /** An object relationship */
  interestModel: Interest_Model;
  interestModelId: Scalars['String'];
  interestUpdateTime?: Maybe<Scalars['timestamptz']>;
  isFa2: Scalars['Boolean'];
  lastPrice: Scalars['numeric'];
  /** An array relationship */
  liquidatedAsset: Array<Liquidate_Tx>;
  /** An aggregate relationship */
  liquidatedAsset_aggregate: Liquidate_Tx_Aggregate;
  liquidationThreshold: Scalars['numeric'];
  /** An array relationship */
  prediction: Array<Asset_Prediction>;
  /** An aggregate relationship */
  prediction_aggregate: Asset_Prediction_Aggregate;
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
  usdBorrow: Scalars['numeric'];
  usdSupply: Scalars['numeric'];
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
export type AssetAssetUserBorrowArgs = {
  distinct_on?: InputMaybe<Array<User_Borrow_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Borrow_Order_By>>;
  where?: InputMaybe<User_Borrow_Bool_Exp>;
};


/** columns and relationships of "asset" */
export type AssetAssetUserBorrow_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Borrow_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Borrow_Order_By>>;
  where?: InputMaybe<User_Borrow_Bool_Exp>;
};


/** columns and relationships of "asset" */
export type AssetAssetUserSupplyArgs = {
  distinct_on?: InputMaybe<Array<User_Supply_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Supply_Order_By>>;
  where?: InputMaybe<User_Supply_Bool_Exp>;
};


/** columns and relationships of "asset" */
export type AssetAssetUserSupply_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Supply_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Supply_Order_By>>;
  where?: InputMaybe<User_Supply_Bool_Exp>;
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
export type AssetPredictionArgs = {
  distinct_on?: InputMaybe<Array<Asset_Prediction_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Asset_Prediction_Order_By>>;
  where?: InputMaybe<Asset_Prediction_Bool_Exp>;
};


/** columns and relationships of "asset" */
export type AssetPrediction_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Asset_Prediction_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Asset_Prediction_Order_By>>;
  where?: InputMaybe<Asset_Prediction_Bool_Exp>;
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
  borrowIndex?: Maybe<Scalars['Float']>;
  collateralFactor?: Maybe<Scalars['Float']>;
  dailyBorrow?: Maybe<Scalars['Float']>;
  dailySupply?: Maybe<Scalars['Float']>;
  lastPrice?: Maybe<Scalars['Float']>;
  liquidationThreshold?: Maybe<Scalars['Float']>;
  reserveFactor?: Maybe<Scalars['Float']>;
  reserves?: Maybe<Scalars['Float']>;
  tokenId?: Maybe<Scalars['Float']>;
  totalBorrowed?: Maybe<Scalars['Float']>;
  totalLiquid?: Maybe<Scalars['Float']>;
  totalSupply?: Maybe<Scalars['Float']>;
  usdBorrow?: Maybe<Scalars['Float']>;
  usdSupply?: Maybe<Scalars['Float']>;
  ytoken?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "asset" */
export type Asset_Avg_Order_By = {
  borrowIndex?: InputMaybe<Order_By>;
  collateralFactor?: InputMaybe<Order_By>;
  dailyBorrow?: InputMaybe<Order_By>;
  dailySupply?: InputMaybe<Order_By>;
  lastPrice?: InputMaybe<Order_By>;
  liquidationThreshold?: InputMaybe<Order_By>;
  reserveFactor?: InputMaybe<Order_By>;
  reserves?: InputMaybe<Order_By>;
  tokenId?: InputMaybe<Order_By>;
  totalBorrowed?: InputMaybe<Order_By>;
  totalLiquid?: InputMaybe<Order_By>;
  totalSupply?: InputMaybe<Order_By>;
  usdBorrow?: InputMaybe<Order_By>;
  usdSupply?: InputMaybe<Order_By>;
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
  assetUserBorrow?: InputMaybe<User_Borrow_Bool_Exp>;
  assetUserSupply?: InputMaybe<User_Supply_Bool_Exp>;
  assetWithdrawTx?: InputMaybe<Withdraw_Tx_Bool_Exp>;
  borrowIndex?: InputMaybe<Numeric_Comparison_Exp>;
  collateralAsset?: InputMaybe<Liquidate_Tx_Bool_Exp>;
  collateralFactor?: InputMaybe<Numeric_Comparison_Exp>;
  contractAddress?: InputMaybe<String_Comparison_Exp>;
  dailyBorrow?: InputMaybe<Numeric_Comparison_Exp>;
  dailySupply?: InputMaybe<Numeric_Comparison_Exp>;
  interestModel?: InputMaybe<Interest_Model_Bool_Exp>;
  interestModelId?: InputMaybe<String_Comparison_Exp>;
  interestUpdateTime?: InputMaybe<Timestamptz_Comparison_Exp>;
  isFa2?: InputMaybe<Boolean_Comparison_Exp>;
  lastPrice?: InputMaybe<Numeric_Comparison_Exp>;
  liquidatedAsset?: InputMaybe<Liquidate_Tx_Bool_Exp>;
  liquidationThreshold?: InputMaybe<Numeric_Comparison_Exp>;
  prediction?: InputMaybe<Asset_Prediction_Bool_Exp>;
  rates?: InputMaybe<Rates_Bool_Exp>;
  reserveFactor?: InputMaybe<Numeric_Comparison_Exp>;
  reserves?: InputMaybe<Numeric_Comparison_Exp>;
  tokenId?: InputMaybe<Int_Comparison_Exp>;
  tokens?: InputMaybe<Token_Bool_Exp>;
  totalBorrowed?: InputMaybe<Numeric_Comparison_Exp>;
  totalLiquid?: InputMaybe<Numeric_Comparison_Exp>;
  totalSupply?: InputMaybe<Numeric_Comparison_Exp>;
  usdBorrow?: InputMaybe<Numeric_Comparison_Exp>;
  usdSupply?: InputMaybe<Numeric_Comparison_Exp>;
  ytoken?: InputMaybe<Int_Comparison_Exp>;
};

/** aggregate max on columns */
export type Asset_Max_Fields = {
  __typename?: 'asset_max_fields';
  borrowIndex?: Maybe<Scalars['numeric']>;
  collateralFactor?: Maybe<Scalars['numeric']>;
  contractAddress?: Maybe<Scalars['String']>;
  dailyBorrow?: Maybe<Scalars['numeric']>;
  dailySupply?: Maybe<Scalars['numeric']>;
  interestModelId?: Maybe<Scalars['String']>;
  interestUpdateTime?: Maybe<Scalars['timestamptz']>;
  lastPrice?: Maybe<Scalars['numeric']>;
  liquidationThreshold?: Maybe<Scalars['numeric']>;
  reserveFactor?: Maybe<Scalars['numeric']>;
  reserves?: Maybe<Scalars['numeric']>;
  tokenId?: Maybe<Scalars['Int']>;
  totalBorrowed?: Maybe<Scalars['numeric']>;
  totalLiquid?: Maybe<Scalars['numeric']>;
  totalSupply?: Maybe<Scalars['numeric']>;
  usdBorrow?: Maybe<Scalars['numeric']>;
  usdSupply?: Maybe<Scalars['numeric']>;
  ytoken?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "asset" */
export type Asset_Max_Order_By = {
  borrowIndex?: InputMaybe<Order_By>;
  collateralFactor?: InputMaybe<Order_By>;
  contractAddress?: InputMaybe<Order_By>;
  dailyBorrow?: InputMaybe<Order_By>;
  dailySupply?: InputMaybe<Order_By>;
  interestModelId?: InputMaybe<Order_By>;
  interestUpdateTime?: InputMaybe<Order_By>;
  lastPrice?: InputMaybe<Order_By>;
  liquidationThreshold?: InputMaybe<Order_By>;
  reserveFactor?: InputMaybe<Order_By>;
  reserves?: InputMaybe<Order_By>;
  tokenId?: InputMaybe<Order_By>;
  totalBorrowed?: InputMaybe<Order_By>;
  totalLiquid?: InputMaybe<Order_By>;
  totalSupply?: InputMaybe<Order_By>;
  usdBorrow?: InputMaybe<Order_By>;
  usdSupply?: InputMaybe<Order_By>;
  ytoken?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Asset_Min_Fields = {
  __typename?: 'asset_min_fields';
  borrowIndex?: Maybe<Scalars['numeric']>;
  collateralFactor?: Maybe<Scalars['numeric']>;
  contractAddress?: Maybe<Scalars['String']>;
  dailyBorrow?: Maybe<Scalars['numeric']>;
  dailySupply?: Maybe<Scalars['numeric']>;
  interestModelId?: Maybe<Scalars['String']>;
  interestUpdateTime?: Maybe<Scalars['timestamptz']>;
  lastPrice?: Maybe<Scalars['numeric']>;
  liquidationThreshold?: Maybe<Scalars['numeric']>;
  reserveFactor?: Maybe<Scalars['numeric']>;
  reserves?: Maybe<Scalars['numeric']>;
  tokenId?: Maybe<Scalars['Int']>;
  totalBorrowed?: Maybe<Scalars['numeric']>;
  totalLiquid?: Maybe<Scalars['numeric']>;
  totalSupply?: Maybe<Scalars['numeric']>;
  usdBorrow?: Maybe<Scalars['numeric']>;
  usdSupply?: Maybe<Scalars['numeric']>;
  ytoken?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "asset" */
export type Asset_Min_Order_By = {
  borrowIndex?: InputMaybe<Order_By>;
  collateralFactor?: InputMaybe<Order_By>;
  contractAddress?: InputMaybe<Order_By>;
  dailyBorrow?: InputMaybe<Order_By>;
  dailySupply?: InputMaybe<Order_By>;
  interestModelId?: InputMaybe<Order_By>;
  interestUpdateTime?: InputMaybe<Order_By>;
  lastPrice?: InputMaybe<Order_By>;
  liquidationThreshold?: InputMaybe<Order_By>;
  reserveFactor?: InputMaybe<Order_By>;
  reserves?: InputMaybe<Order_By>;
  tokenId?: InputMaybe<Order_By>;
  totalBorrowed?: InputMaybe<Order_By>;
  totalLiquid?: InputMaybe<Order_By>;
  totalSupply?: InputMaybe<Order_By>;
  usdBorrow?: InputMaybe<Order_By>;
  usdSupply?: InputMaybe<Order_By>;
  ytoken?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "asset". */
export type Asset_Order_By = {
  assetBorrowTx_aggregate?: InputMaybe<Borrow_Tx_Aggregate_Order_By>;
  assetRepayTx_aggregate?: InputMaybe<Repay_Tx_Aggregate_Order_By>;
  assetSupplyTx_aggregate?: InputMaybe<Supply_Tx_Aggregate_Order_By>;
  assetUserBorrow_aggregate?: InputMaybe<User_Borrow_Aggregate_Order_By>;
  assetUserSupply_aggregate?: InputMaybe<User_Supply_Aggregate_Order_By>;
  assetWithdrawTx_aggregate?: InputMaybe<Withdraw_Tx_Aggregate_Order_By>;
  borrowIndex?: InputMaybe<Order_By>;
  collateralAsset_aggregate?: InputMaybe<Liquidate_Tx_Aggregate_Order_By>;
  collateralFactor?: InputMaybe<Order_By>;
  contractAddress?: InputMaybe<Order_By>;
  dailyBorrow?: InputMaybe<Order_By>;
  dailySupply?: InputMaybe<Order_By>;
  interestModel?: InputMaybe<Interest_Model_Order_By>;
  interestModelId?: InputMaybe<Order_By>;
  interestUpdateTime?: InputMaybe<Order_By>;
  isFa2?: InputMaybe<Order_By>;
  lastPrice?: InputMaybe<Order_By>;
  liquidatedAsset_aggregate?: InputMaybe<Liquidate_Tx_Aggregate_Order_By>;
  liquidationThreshold?: InputMaybe<Order_By>;
  prediction_aggregate?: InputMaybe<Asset_Prediction_Aggregate_Order_By>;
  rates_aggregate?: InputMaybe<Rates_Aggregate_Order_By>;
  reserveFactor?: InputMaybe<Order_By>;
  reserves?: InputMaybe<Order_By>;
  tokenId?: InputMaybe<Order_By>;
  tokens_aggregate?: InputMaybe<Token_Aggregate_Order_By>;
  totalBorrowed?: InputMaybe<Order_By>;
  totalLiquid?: InputMaybe<Order_By>;
  totalSupply?: InputMaybe<Order_By>;
  usdBorrow?: InputMaybe<Order_By>;
  usdSupply?: InputMaybe<Order_By>;
  ytoken?: InputMaybe<Order_By>;
};

/** columns and relationships of "asset_prediction" */
export type Asset_Prediction = {
  __typename?: 'asset_prediction';
  /** An object relationship */
  asset: Asset;
  assetId: Scalars['Int'];
  borrowIndex: Scalars['numeric'];
  id: Scalars['Int'];
  updateTime?: Maybe<Scalars['timestamptz']>;
};

/** aggregated selection of "asset_prediction" */
export type Asset_Prediction_Aggregate = {
  __typename?: 'asset_prediction_aggregate';
  aggregate?: Maybe<Asset_Prediction_Aggregate_Fields>;
  nodes: Array<Asset_Prediction>;
};

/** aggregate fields of "asset_prediction" */
export type Asset_Prediction_Aggregate_Fields = {
  __typename?: 'asset_prediction_aggregate_fields';
  avg?: Maybe<Asset_Prediction_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Asset_Prediction_Max_Fields>;
  min?: Maybe<Asset_Prediction_Min_Fields>;
  stddev?: Maybe<Asset_Prediction_Stddev_Fields>;
  stddev_pop?: Maybe<Asset_Prediction_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Asset_Prediction_Stddev_Samp_Fields>;
  sum?: Maybe<Asset_Prediction_Sum_Fields>;
  var_pop?: Maybe<Asset_Prediction_Var_Pop_Fields>;
  var_samp?: Maybe<Asset_Prediction_Var_Samp_Fields>;
  variance?: Maybe<Asset_Prediction_Variance_Fields>;
};


/** aggregate fields of "asset_prediction" */
export type Asset_Prediction_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Asset_Prediction_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "asset_prediction" */
export type Asset_Prediction_Aggregate_Order_By = {
  avg?: InputMaybe<Asset_Prediction_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Asset_Prediction_Max_Order_By>;
  min?: InputMaybe<Asset_Prediction_Min_Order_By>;
  stddev?: InputMaybe<Asset_Prediction_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Asset_Prediction_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Asset_Prediction_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Asset_Prediction_Sum_Order_By>;
  var_pop?: InputMaybe<Asset_Prediction_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Asset_Prediction_Var_Samp_Order_By>;
  variance?: InputMaybe<Asset_Prediction_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Asset_Prediction_Avg_Fields = {
  __typename?: 'asset_prediction_avg_fields';
  assetId?: Maybe<Scalars['Float']>;
  borrowIndex?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "asset_prediction" */
export type Asset_Prediction_Avg_Order_By = {
  assetId?: InputMaybe<Order_By>;
  borrowIndex?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "asset_prediction". All fields are combined with a logical 'AND'. */
export type Asset_Prediction_Bool_Exp = {
  _and?: InputMaybe<Array<Asset_Prediction_Bool_Exp>>;
  _not?: InputMaybe<Asset_Prediction_Bool_Exp>;
  _or?: InputMaybe<Array<Asset_Prediction_Bool_Exp>>;
  asset?: InputMaybe<Asset_Bool_Exp>;
  assetId?: InputMaybe<Int_Comparison_Exp>;
  borrowIndex?: InputMaybe<Numeric_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  updateTime?: InputMaybe<Timestamptz_Comparison_Exp>;
};

/** aggregate max on columns */
export type Asset_Prediction_Max_Fields = {
  __typename?: 'asset_prediction_max_fields';
  assetId?: Maybe<Scalars['Int']>;
  borrowIndex?: Maybe<Scalars['numeric']>;
  id?: Maybe<Scalars['Int']>;
  updateTime?: Maybe<Scalars['timestamptz']>;
};

/** order by max() on columns of table "asset_prediction" */
export type Asset_Prediction_Max_Order_By = {
  assetId?: InputMaybe<Order_By>;
  borrowIndex?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updateTime?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Asset_Prediction_Min_Fields = {
  __typename?: 'asset_prediction_min_fields';
  assetId?: Maybe<Scalars['Int']>;
  borrowIndex?: Maybe<Scalars['numeric']>;
  id?: Maybe<Scalars['Int']>;
  updateTime?: Maybe<Scalars['timestamptz']>;
};

/** order by min() on columns of table "asset_prediction" */
export type Asset_Prediction_Min_Order_By = {
  assetId?: InputMaybe<Order_By>;
  borrowIndex?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updateTime?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "asset_prediction". */
export type Asset_Prediction_Order_By = {
  asset?: InputMaybe<Asset_Order_By>;
  assetId?: InputMaybe<Order_By>;
  borrowIndex?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  updateTime?: InputMaybe<Order_By>;
};

/** select columns of table "asset_prediction" */
export enum Asset_Prediction_Select_Column {
  /** column name */
  AssetId = 'assetId',
  /** column name */
  BorrowIndex = 'borrowIndex',
  /** column name */
  Id = 'id',
  /** column name */
  UpdateTime = 'updateTime'
}

/** aggregate stddev on columns */
export type Asset_Prediction_Stddev_Fields = {
  __typename?: 'asset_prediction_stddev_fields';
  assetId?: Maybe<Scalars['Float']>;
  borrowIndex?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "asset_prediction" */
export type Asset_Prediction_Stddev_Order_By = {
  assetId?: InputMaybe<Order_By>;
  borrowIndex?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Asset_Prediction_Stddev_Pop_Fields = {
  __typename?: 'asset_prediction_stddev_pop_fields';
  assetId?: Maybe<Scalars['Float']>;
  borrowIndex?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "asset_prediction" */
export type Asset_Prediction_Stddev_Pop_Order_By = {
  assetId?: InputMaybe<Order_By>;
  borrowIndex?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Asset_Prediction_Stddev_Samp_Fields = {
  __typename?: 'asset_prediction_stddev_samp_fields';
  assetId?: Maybe<Scalars['Float']>;
  borrowIndex?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "asset_prediction" */
export type Asset_Prediction_Stddev_Samp_Order_By = {
  assetId?: InputMaybe<Order_By>;
  borrowIndex?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Asset_Prediction_Sum_Fields = {
  __typename?: 'asset_prediction_sum_fields';
  assetId?: Maybe<Scalars['Int']>;
  borrowIndex?: Maybe<Scalars['numeric']>;
  id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "asset_prediction" */
export type Asset_Prediction_Sum_Order_By = {
  assetId?: InputMaybe<Order_By>;
  borrowIndex?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Asset_Prediction_Var_Pop_Fields = {
  __typename?: 'asset_prediction_var_pop_fields';
  assetId?: Maybe<Scalars['Float']>;
  borrowIndex?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "asset_prediction" */
export type Asset_Prediction_Var_Pop_Order_By = {
  assetId?: InputMaybe<Order_By>;
  borrowIndex?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Asset_Prediction_Var_Samp_Fields = {
  __typename?: 'asset_prediction_var_samp_fields';
  assetId?: Maybe<Scalars['Float']>;
  borrowIndex?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "asset_prediction" */
export type Asset_Prediction_Var_Samp_Order_By = {
  assetId?: InputMaybe<Order_By>;
  borrowIndex?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Asset_Prediction_Variance_Fields = {
  __typename?: 'asset_prediction_variance_fields';
  assetId?: Maybe<Scalars['Float']>;
  borrowIndex?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "asset_prediction" */
export type Asset_Prediction_Variance_Order_By = {
  assetId?: InputMaybe<Order_By>;
  borrowIndex?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** select columns of table "asset" */
export enum Asset_Select_Column {
  /** column name */
  BorrowIndex = 'borrowIndex',
  /** column name */
  CollateralFactor = 'collateralFactor',
  /** column name */
  ContractAddress = 'contractAddress',
  /** column name */
  DailyBorrow = 'dailyBorrow',
  /** column name */
  DailySupply = 'dailySupply',
  /** column name */
  InterestModelId = 'interestModelId',
  /** column name */
  InterestUpdateTime = 'interestUpdateTime',
  /** column name */
  IsFa2 = 'isFa2',
  /** column name */
  LastPrice = 'lastPrice',
  /** column name */
  LiquidationThreshold = 'liquidationThreshold',
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
  UsdBorrow = 'usdBorrow',
  /** column name */
  UsdSupply = 'usdSupply',
  /** column name */
  Ytoken = 'ytoken'
}

/** aggregate stddev on columns */
export type Asset_Stddev_Fields = {
  __typename?: 'asset_stddev_fields';
  borrowIndex?: Maybe<Scalars['Float']>;
  collateralFactor?: Maybe<Scalars['Float']>;
  dailyBorrow?: Maybe<Scalars['Float']>;
  dailySupply?: Maybe<Scalars['Float']>;
  lastPrice?: Maybe<Scalars['Float']>;
  liquidationThreshold?: Maybe<Scalars['Float']>;
  reserveFactor?: Maybe<Scalars['Float']>;
  reserves?: Maybe<Scalars['Float']>;
  tokenId?: Maybe<Scalars['Float']>;
  totalBorrowed?: Maybe<Scalars['Float']>;
  totalLiquid?: Maybe<Scalars['Float']>;
  totalSupply?: Maybe<Scalars['Float']>;
  usdBorrow?: Maybe<Scalars['Float']>;
  usdSupply?: Maybe<Scalars['Float']>;
  ytoken?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "asset" */
export type Asset_Stddev_Order_By = {
  borrowIndex?: InputMaybe<Order_By>;
  collateralFactor?: InputMaybe<Order_By>;
  dailyBorrow?: InputMaybe<Order_By>;
  dailySupply?: InputMaybe<Order_By>;
  lastPrice?: InputMaybe<Order_By>;
  liquidationThreshold?: InputMaybe<Order_By>;
  reserveFactor?: InputMaybe<Order_By>;
  reserves?: InputMaybe<Order_By>;
  tokenId?: InputMaybe<Order_By>;
  totalBorrowed?: InputMaybe<Order_By>;
  totalLiquid?: InputMaybe<Order_By>;
  totalSupply?: InputMaybe<Order_By>;
  usdBorrow?: InputMaybe<Order_By>;
  usdSupply?: InputMaybe<Order_By>;
  ytoken?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Asset_Stddev_Pop_Fields = {
  __typename?: 'asset_stddev_pop_fields';
  borrowIndex?: Maybe<Scalars['Float']>;
  collateralFactor?: Maybe<Scalars['Float']>;
  dailyBorrow?: Maybe<Scalars['Float']>;
  dailySupply?: Maybe<Scalars['Float']>;
  lastPrice?: Maybe<Scalars['Float']>;
  liquidationThreshold?: Maybe<Scalars['Float']>;
  reserveFactor?: Maybe<Scalars['Float']>;
  reserves?: Maybe<Scalars['Float']>;
  tokenId?: Maybe<Scalars['Float']>;
  totalBorrowed?: Maybe<Scalars['Float']>;
  totalLiquid?: Maybe<Scalars['Float']>;
  totalSupply?: Maybe<Scalars['Float']>;
  usdBorrow?: Maybe<Scalars['Float']>;
  usdSupply?: Maybe<Scalars['Float']>;
  ytoken?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "asset" */
export type Asset_Stddev_Pop_Order_By = {
  borrowIndex?: InputMaybe<Order_By>;
  collateralFactor?: InputMaybe<Order_By>;
  dailyBorrow?: InputMaybe<Order_By>;
  dailySupply?: InputMaybe<Order_By>;
  lastPrice?: InputMaybe<Order_By>;
  liquidationThreshold?: InputMaybe<Order_By>;
  reserveFactor?: InputMaybe<Order_By>;
  reserves?: InputMaybe<Order_By>;
  tokenId?: InputMaybe<Order_By>;
  totalBorrowed?: InputMaybe<Order_By>;
  totalLiquid?: InputMaybe<Order_By>;
  totalSupply?: InputMaybe<Order_By>;
  usdBorrow?: InputMaybe<Order_By>;
  usdSupply?: InputMaybe<Order_By>;
  ytoken?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Asset_Stddev_Samp_Fields = {
  __typename?: 'asset_stddev_samp_fields';
  borrowIndex?: Maybe<Scalars['Float']>;
  collateralFactor?: Maybe<Scalars['Float']>;
  dailyBorrow?: Maybe<Scalars['Float']>;
  dailySupply?: Maybe<Scalars['Float']>;
  lastPrice?: Maybe<Scalars['Float']>;
  liquidationThreshold?: Maybe<Scalars['Float']>;
  reserveFactor?: Maybe<Scalars['Float']>;
  reserves?: Maybe<Scalars['Float']>;
  tokenId?: Maybe<Scalars['Float']>;
  totalBorrowed?: Maybe<Scalars['Float']>;
  totalLiquid?: Maybe<Scalars['Float']>;
  totalSupply?: Maybe<Scalars['Float']>;
  usdBorrow?: Maybe<Scalars['Float']>;
  usdSupply?: Maybe<Scalars['Float']>;
  ytoken?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "asset" */
export type Asset_Stddev_Samp_Order_By = {
  borrowIndex?: InputMaybe<Order_By>;
  collateralFactor?: InputMaybe<Order_By>;
  dailyBorrow?: InputMaybe<Order_By>;
  dailySupply?: InputMaybe<Order_By>;
  lastPrice?: InputMaybe<Order_By>;
  liquidationThreshold?: InputMaybe<Order_By>;
  reserveFactor?: InputMaybe<Order_By>;
  reserves?: InputMaybe<Order_By>;
  tokenId?: InputMaybe<Order_By>;
  totalBorrowed?: InputMaybe<Order_By>;
  totalLiquid?: InputMaybe<Order_By>;
  totalSupply?: InputMaybe<Order_By>;
  usdBorrow?: InputMaybe<Order_By>;
  usdSupply?: InputMaybe<Order_By>;
  ytoken?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Asset_Sum_Fields = {
  __typename?: 'asset_sum_fields';
  borrowIndex?: Maybe<Scalars['numeric']>;
  collateralFactor?: Maybe<Scalars['numeric']>;
  dailyBorrow?: Maybe<Scalars['numeric']>;
  dailySupply?: Maybe<Scalars['numeric']>;
  lastPrice?: Maybe<Scalars['numeric']>;
  liquidationThreshold?: Maybe<Scalars['numeric']>;
  reserveFactor?: Maybe<Scalars['numeric']>;
  reserves?: Maybe<Scalars['numeric']>;
  tokenId?: Maybe<Scalars['Int']>;
  totalBorrowed?: Maybe<Scalars['numeric']>;
  totalLiquid?: Maybe<Scalars['numeric']>;
  totalSupply?: Maybe<Scalars['numeric']>;
  usdBorrow?: Maybe<Scalars['numeric']>;
  usdSupply?: Maybe<Scalars['numeric']>;
  ytoken?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "asset" */
export type Asset_Sum_Order_By = {
  borrowIndex?: InputMaybe<Order_By>;
  collateralFactor?: InputMaybe<Order_By>;
  dailyBorrow?: InputMaybe<Order_By>;
  dailySupply?: InputMaybe<Order_By>;
  lastPrice?: InputMaybe<Order_By>;
  liquidationThreshold?: InputMaybe<Order_By>;
  reserveFactor?: InputMaybe<Order_By>;
  reserves?: InputMaybe<Order_By>;
  tokenId?: InputMaybe<Order_By>;
  totalBorrowed?: InputMaybe<Order_By>;
  totalLiquid?: InputMaybe<Order_By>;
  totalSupply?: InputMaybe<Order_By>;
  usdBorrow?: InputMaybe<Order_By>;
  usdSupply?: InputMaybe<Order_By>;
  ytoken?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Asset_Var_Pop_Fields = {
  __typename?: 'asset_var_pop_fields';
  borrowIndex?: Maybe<Scalars['Float']>;
  collateralFactor?: Maybe<Scalars['Float']>;
  dailyBorrow?: Maybe<Scalars['Float']>;
  dailySupply?: Maybe<Scalars['Float']>;
  lastPrice?: Maybe<Scalars['Float']>;
  liquidationThreshold?: Maybe<Scalars['Float']>;
  reserveFactor?: Maybe<Scalars['Float']>;
  reserves?: Maybe<Scalars['Float']>;
  tokenId?: Maybe<Scalars['Float']>;
  totalBorrowed?: Maybe<Scalars['Float']>;
  totalLiquid?: Maybe<Scalars['Float']>;
  totalSupply?: Maybe<Scalars['Float']>;
  usdBorrow?: Maybe<Scalars['Float']>;
  usdSupply?: Maybe<Scalars['Float']>;
  ytoken?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "asset" */
export type Asset_Var_Pop_Order_By = {
  borrowIndex?: InputMaybe<Order_By>;
  collateralFactor?: InputMaybe<Order_By>;
  dailyBorrow?: InputMaybe<Order_By>;
  dailySupply?: InputMaybe<Order_By>;
  lastPrice?: InputMaybe<Order_By>;
  liquidationThreshold?: InputMaybe<Order_By>;
  reserveFactor?: InputMaybe<Order_By>;
  reserves?: InputMaybe<Order_By>;
  tokenId?: InputMaybe<Order_By>;
  totalBorrowed?: InputMaybe<Order_By>;
  totalLiquid?: InputMaybe<Order_By>;
  totalSupply?: InputMaybe<Order_By>;
  usdBorrow?: InputMaybe<Order_By>;
  usdSupply?: InputMaybe<Order_By>;
  ytoken?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Asset_Var_Samp_Fields = {
  __typename?: 'asset_var_samp_fields';
  borrowIndex?: Maybe<Scalars['Float']>;
  collateralFactor?: Maybe<Scalars['Float']>;
  dailyBorrow?: Maybe<Scalars['Float']>;
  dailySupply?: Maybe<Scalars['Float']>;
  lastPrice?: Maybe<Scalars['Float']>;
  liquidationThreshold?: Maybe<Scalars['Float']>;
  reserveFactor?: Maybe<Scalars['Float']>;
  reserves?: Maybe<Scalars['Float']>;
  tokenId?: Maybe<Scalars['Float']>;
  totalBorrowed?: Maybe<Scalars['Float']>;
  totalLiquid?: Maybe<Scalars['Float']>;
  totalSupply?: Maybe<Scalars['Float']>;
  usdBorrow?: Maybe<Scalars['Float']>;
  usdSupply?: Maybe<Scalars['Float']>;
  ytoken?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "asset" */
export type Asset_Var_Samp_Order_By = {
  borrowIndex?: InputMaybe<Order_By>;
  collateralFactor?: InputMaybe<Order_By>;
  dailyBorrow?: InputMaybe<Order_By>;
  dailySupply?: InputMaybe<Order_By>;
  lastPrice?: InputMaybe<Order_By>;
  liquidationThreshold?: InputMaybe<Order_By>;
  reserveFactor?: InputMaybe<Order_By>;
  reserves?: InputMaybe<Order_By>;
  tokenId?: InputMaybe<Order_By>;
  totalBorrowed?: InputMaybe<Order_By>;
  totalLiquid?: InputMaybe<Order_By>;
  totalSupply?: InputMaybe<Order_By>;
  usdBorrow?: InputMaybe<Order_By>;
  usdSupply?: InputMaybe<Order_By>;
  ytoken?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Asset_Variance_Fields = {
  __typename?: 'asset_variance_fields';
  borrowIndex?: Maybe<Scalars['Float']>;
  collateralFactor?: Maybe<Scalars['Float']>;
  dailyBorrow?: Maybe<Scalars['Float']>;
  dailySupply?: Maybe<Scalars['Float']>;
  lastPrice?: Maybe<Scalars['Float']>;
  liquidationThreshold?: Maybe<Scalars['Float']>;
  reserveFactor?: Maybe<Scalars['Float']>;
  reserves?: Maybe<Scalars['Float']>;
  tokenId?: Maybe<Scalars['Float']>;
  totalBorrowed?: Maybe<Scalars['Float']>;
  totalLiquid?: Maybe<Scalars['Float']>;
  totalSupply?: Maybe<Scalars['Float']>;
  usdBorrow?: Maybe<Scalars['Float']>;
  usdSupply?: Maybe<Scalars['Float']>;
  ytoken?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "asset" */
export type Asset_Variance_Order_By = {
  borrowIndex?: InputMaybe<Order_By>;
  collateralFactor?: InputMaybe<Order_By>;
  dailyBorrow?: InputMaybe<Order_By>;
  dailySupply?: InputMaybe<Order_By>;
  lastPrice?: InputMaybe<Order_By>;
  liquidationThreshold?: InputMaybe<Order_By>;
  reserveFactor?: InputMaybe<Order_By>;
  reserves?: InputMaybe<Order_By>;
  tokenId?: InputMaybe<Order_By>;
  totalBorrowed?: InputMaybe<Order_By>;
  totalLiquid?: InputMaybe<Order_By>;
  totalSupply?: InputMaybe<Order_By>;
  usdBorrow?: InputMaybe<Order_By>;
  usdSupply?: InputMaybe<Order_By>;
  ytoken?: InputMaybe<Order_By>;
};

/** columns and relationships of "borrow_prediction" */
export type Borrow_Prediction = {
  __typename?: 'borrow_prediction';
  borrow: Scalars['numeric'];
  borrowIndex: Scalars['numeric'];
  id: Scalars['Int'];
  lastUpdateTime?: Maybe<Scalars['timestamptz']>;
  /** An object relationship */
  userBorrow: User_Borrow;
  userBorrowId: Scalars['Int'];
};

/** aggregated selection of "borrow_prediction" */
export type Borrow_Prediction_Aggregate = {
  __typename?: 'borrow_prediction_aggregate';
  aggregate?: Maybe<Borrow_Prediction_Aggregate_Fields>;
  nodes: Array<Borrow_Prediction>;
};

/** aggregate fields of "borrow_prediction" */
export type Borrow_Prediction_Aggregate_Fields = {
  __typename?: 'borrow_prediction_aggregate_fields';
  avg?: Maybe<Borrow_Prediction_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<Borrow_Prediction_Max_Fields>;
  min?: Maybe<Borrow_Prediction_Min_Fields>;
  stddev?: Maybe<Borrow_Prediction_Stddev_Fields>;
  stddev_pop?: Maybe<Borrow_Prediction_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Borrow_Prediction_Stddev_Samp_Fields>;
  sum?: Maybe<Borrow_Prediction_Sum_Fields>;
  var_pop?: Maybe<Borrow_Prediction_Var_Pop_Fields>;
  var_samp?: Maybe<Borrow_Prediction_Var_Samp_Fields>;
  variance?: Maybe<Borrow_Prediction_Variance_Fields>;
};


/** aggregate fields of "borrow_prediction" */
export type Borrow_Prediction_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Borrow_Prediction_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "borrow_prediction" */
export type Borrow_Prediction_Aggregate_Order_By = {
  avg?: InputMaybe<Borrow_Prediction_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Borrow_Prediction_Max_Order_By>;
  min?: InputMaybe<Borrow_Prediction_Min_Order_By>;
  stddev?: InputMaybe<Borrow_Prediction_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Borrow_Prediction_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Borrow_Prediction_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Borrow_Prediction_Sum_Order_By>;
  var_pop?: InputMaybe<Borrow_Prediction_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Borrow_Prediction_Var_Samp_Order_By>;
  variance?: InputMaybe<Borrow_Prediction_Variance_Order_By>;
};

/** aggregate avg on columns */
export type Borrow_Prediction_Avg_Fields = {
  __typename?: 'borrow_prediction_avg_fields';
  borrow?: Maybe<Scalars['Float']>;
  borrowIndex?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  userBorrowId?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "borrow_prediction" */
export type Borrow_Prediction_Avg_Order_By = {
  borrow?: InputMaybe<Order_By>;
  borrowIndex?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  userBorrowId?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "borrow_prediction". All fields are combined with a logical 'AND'. */
export type Borrow_Prediction_Bool_Exp = {
  _and?: InputMaybe<Array<Borrow_Prediction_Bool_Exp>>;
  _not?: InputMaybe<Borrow_Prediction_Bool_Exp>;
  _or?: InputMaybe<Array<Borrow_Prediction_Bool_Exp>>;
  borrow?: InputMaybe<Numeric_Comparison_Exp>;
  borrowIndex?: InputMaybe<Numeric_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  lastUpdateTime?: InputMaybe<Timestamptz_Comparison_Exp>;
  userBorrow?: InputMaybe<User_Borrow_Bool_Exp>;
  userBorrowId?: InputMaybe<Int_Comparison_Exp>;
};

/** aggregate max on columns */
export type Borrow_Prediction_Max_Fields = {
  __typename?: 'borrow_prediction_max_fields';
  borrow?: Maybe<Scalars['numeric']>;
  borrowIndex?: Maybe<Scalars['numeric']>;
  id?: Maybe<Scalars['Int']>;
  lastUpdateTime?: Maybe<Scalars['timestamptz']>;
  userBorrowId?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "borrow_prediction" */
export type Borrow_Prediction_Max_Order_By = {
  borrow?: InputMaybe<Order_By>;
  borrowIndex?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  lastUpdateTime?: InputMaybe<Order_By>;
  userBorrowId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Borrow_Prediction_Min_Fields = {
  __typename?: 'borrow_prediction_min_fields';
  borrow?: Maybe<Scalars['numeric']>;
  borrowIndex?: Maybe<Scalars['numeric']>;
  id?: Maybe<Scalars['Int']>;
  lastUpdateTime?: Maybe<Scalars['timestamptz']>;
  userBorrowId?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "borrow_prediction" */
export type Borrow_Prediction_Min_Order_By = {
  borrow?: InputMaybe<Order_By>;
  borrowIndex?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  lastUpdateTime?: InputMaybe<Order_By>;
  userBorrowId?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "borrow_prediction". */
export type Borrow_Prediction_Order_By = {
  borrow?: InputMaybe<Order_By>;
  borrowIndex?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  lastUpdateTime?: InputMaybe<Order_By>;
  userBorrow?: InputMaybe<User_Borrow_Order_By>;
  userBorrowId?: InputMaybe<Order_By>;
};

/** select columns of table "borrow_prediction" */
export enum Borrow_Prediction_Select_Column {
  /** column name */
  Borrow = 'borrow',
  /** column name */
  BorrowIndex = 'borrowIndex',
  /** column name */
  Id = 'id',
  /** column name */
  LastUpdateTime = 'lastUpdateTime',
  /** column name */
  UserBorrowId = 'userBorrowId'
}

/** aggregate stddev on columns */
export type Borrow_Prediction_Stddev_Fields = {
  __typename?: 'borrow_prediction_stddev_fields';
  borrow?: Maybe<Scalars['Float']>;
  borrowIndex?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  userBorrowId?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "borrow_prediction" */
export type Borrow_Prediction_Stddev_Order_By = {
  borrow?: InputMaybe<Order_By>;
  borrowIndex?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  userBorrowId?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Borrow_Prediction_Stddev_Pop_Fields = {
  __typename?: 'borrow_prediction_stddev_pop_fields';
  borrow?: Maybe<Scalars['Float']>;
  borrowIndex?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  userBorrowId?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "borrow_prediction" */
export type Borrow_Prediction_Stddev_Pop_Order_By = {
  borrow?: InputMaybe<Order_By>;
  borrowIndex?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  userBorrowId?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Borrow_Prediction_Stddev_Samp_Fields = {
  __typename?: 'borrow_prediction_stddev_samp_fields';
  borrow?: Maybe<Scalars['Float']>;
  borrowIndex?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  userBorrowId?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "borrow_prediction" */
export type Borrow_Prediction_Stddev_Samp_Order_By = {
  borrow?: InputMaybe<Order_By>;
  borrowIndex?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  userBorrowId?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Borrow_Prediction_Sum_Fields = {
  __typename?: 'borrow_prediction_sum_fields';
  borrow?: Maybe<Scalars['numeric']>;
  borrowIndex?: Maybe<Scalars['numeric']>;
  id?: Maybe<Scalars['Int']>;
  userBorrowId?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "borrow_prediction" */
export type Borrow_Prediction_Sum_Order_By = {
  borrow?: InputMaybe<Order_By>;
  borrowIndex?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  userBorrowId?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Borrow_Prediction_Var_Pop_Fields = {
  __typename?: 'borrow_prediction_var_pop_fields';
  borrow?: Maybe<Scalars['Float']>;
  borrowIndex?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  userBorrowId?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "borrow_prediction" */
export type Borrow_Prediction_Var_Pop_Order_By = {
  borrow?: InputMaybe<Order_By>;
  borrowIndex?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  userBorrowId?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Borrow_Prediction_Var_Samp_Fields = {
  __typename?: 'borrow_prediction_var_samp_fields';
  borrow?: Maybe<Scalars['Float']>;
  borrowIndex?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  userBorrowId?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "borrow_prediction" */
export type Borrow_Prediction_Var_Samp_Order_By = {
  borrow?: InputMaybe<Order_By>;
  borrowIndex?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  userBorrowId?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Borrow_Prediction_Variance_Fields = {
  __typename?: 'borrow_prediction_variance_fields';
  borrow?: Maybe<Scalars['Float']>;
  borrowIndex?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  userBorrowId?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "borrow_prediction" */
export type Borrow_Prediction_Variance_Order_By = {
  borrow?: InputMaybe<Order_By>;
  borrowIndex?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  userBorrowId?: InputMaybe<Order_By>;
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
  usdAmount: Scalars['numeric'];
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
  usdAmount?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "borrow_tx" */
export type Borrow_Tx_Avg_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  usdAmount?: InputMaybe<Order_By>;
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
  usdAmount?: InputMaybe<Numeric_Comparison_Exp>;
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
  usdAmount?: Maybe<Scalars['numeric']>;
  userId?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "borrow_tx" */
export type Borrow_Tx_Max_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  usdAmount?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Borrow_Tx_Min_Fields = {
  __typename?: 'borrow_tx_min_fields';
  amount?: Maybe<Scalars['numeric']>;
  assetId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  timestamp?: Maybe<Scalars['timestamptz']>;
  usdAmount?: Maybe<Scalars['numeric']>;
  userId?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "borrow_tx" */
export type Borrow_Tx_Min_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  usdAmount?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "borrow_tx". */
export type Borrow_Tx_Order_By = {
  amount?: InputMaybe<Order_By>;
  asset?: InputMaybe<Asset_Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  usdAmount?: InputMaybe<Order_By>;
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
  UsdAmount = 'usdAmount',
  /** column name */
  UserId = 'userId'
}

/** aggregate stddev on columns */
export type Borrow_Tx_Stddev_Fields = {
  __typename?: 'borrow_tx_stddev_fields';
  amount?: Maybe<Scalars['Float']>;
  assetId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  usdAmount?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "borrow_tx" */
export type Borrow_Tx_Stddev_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  usdAmount?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Borrow_Tx_Stddev_Pop_Fields = {
  __typename?: 'borrow_tx_stddev_pop_fields';
  amount?: Maybe<Scalars['Float']>;
  assetId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  usdAmount?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "borrow_tx" */
export type Borrow_Tx_Stddev_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  usdAmount?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Borrow_Tx_Stddev_Samp_Fields = {
  __typename?: 'borrow_tx_stddev_samp_fields';
  amount?: Maybe<Scalars['Float']>;
  assetId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  usdAmount?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "borrow_tx" */
export type Borrow_Tx_Stddev_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  usdAmount?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Borrow_Tx_Sum_Fields = {
  __typename?: 'borrow_tx_sum_fields';
  amount?: Maybe<Scalars['numeric']>;
  assetId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  usdAmount?: Maybe<Scalars['numeric']>;
};

/** order by sum() on columns of table "borrow_tx" */
export type Borrow_Tx_Sum_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  usdAmount?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Borrow_Tx_Var_Pop_Fields = {
  __typename?: 'borrow_tx_var_pop_fields';
  amount?: Maybe<Scalars['Float']>;
  assetId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  usdAmount?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "borrow_tx" */
export type Borrow_Tx_Var_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  usdAmount?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Borrow_Tx_Var_Samp_Fields = {
  __typename?: 'borrow_tx_var_samp_fields';
  amount?: Maybe<Scalars['Float']>;
  assetId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  usdAmount?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "borrow_tx" */
export type Borrow_Tx_Var_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  usdAmount?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Borrow_Tx_Variance_Fields = {
  __typename?: 'borrow_tx_variance_fields';
  amount?: Maybe<Scalars['Float']>;
  assetId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  usdAmount?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "borrow_tx" */
export type Borrow_Tx_Variance_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  usdAmount?: InputMaybe<Order_By>;
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
  SupplyVolume = 'supplyVolume'
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
  UpdatedAt = 'updatedAt'
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
  UpdatedAt = 'updatedAt'
}

/** columns and relationships of "dipdup_head_status" */
export type Dipdup_Head_Status = {
  __typename?: 'dipdup_head_status';
  name?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

/** aggregated selection of "dipdup_head_status" */
export type Dipdup_Head_Status_Aggregate = {
  __typename?: 'dipdup_head_status_aggregate';
  aggregate?: Maybe<Dipdup_Head_Status_Aggregate_Fields>;
  nodes: Array<Dipdup_Head_Status>;
};

/** aggregate fields of "dipdup_head_status" */
export type Dipdup_Head_Status_Aggregate_Fields = {
  __typename?: 'dipdup_head_status_aggregate_fields';
  count: Scalars['Int'];
  max?: Maybe<Dipdup_Head_Status_Max_Fields>;
  min?: Maybe<Dipdup_Head_Status_Min_Fields>;
};


/** aggregate fields of "dipdup_head_status" */
export type Dipdup_Head_Status_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Dipdup_Head_Status_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "dipdup_head_status". All fields are combined with a logical 'AND'. */
export type Dipdup_Head_Status_Bool_Exp = {
  _and?: InputMaybe<Array<Dipdup_Head_Status_Bool_Exp>>;
  _not?: InputMaybe<Dipdup_Head_Status_Bool_Exp>;
  _or?: InputMaybe<Array<Dipdup_Head_Status_Bool_Exp>>;
  name?: InputMaybe<String_Comparison_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
};

/** aggregate max on columns */
export type Dipdup_Head_Status_Max_Fields = {
  __typename?: 'dipdup_head_status_max_fields';
  name?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Dipdup_Head_Status_Min_Fields = {
  __typename?: 'dipdup_head_status_min_fields';
  name?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
};

/** Ordering options when selecting data from "dipdup_head_status". */
export type Dipdup_Head_Status_Order_By = {
  name?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
};

/** select columns of table "dipdup_head_status" */
export enum Dipdup_Head_Status_Select_Column {
  /** column name */
  Name = 'name',
  /** column name */
  Status = 'status'
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
  UpdatedAt = 'updatedAt'
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
  UpdatedAt = 'updatedAt'
}

/** columns and relationships of "global_factors" */
export type Global_Factors = {
  __typename?: 'global_factors';
  closeFactor: Scalars['numeric'];
  id: Scalars['Int'];
  liquidationIncentive: Scalars['numeric'];
  priceFeedProxy: Scalars['String'];
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
};

/** Boolean expression to filter rows from the table "global_factors". All fields are combined with a logical 'AND'. */
export type Global_Factors_Bool_Exp = {
  _and?: InputMaybe<Array<Global_Factors_Bool_Exp>>;
  _not?: InputMaybe<Global_Factors_Bool_Exp>;
  _or?: InputMaybe<Array<Global_Factors_Bool_Exp>>;
  closeFactor?: InputMaybe<Numeric_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  liquidationIncentive?: InputMaybe<Numeric_Comparison_Exp>;
  priceFeedProxy?: InputMaybe<String_Comparison_Exp>;
  yupanaContract?: InputMaybe<String_Comparison_Exp>;
};

/** aggregate max on columns */
export type Global_Factors_Max_Fields = {
  __typename?: 'global_factors_max_fields';
  closeFactor?: Maybe<Scalars['numeric']>;
  id?: Maybe<Scalars['Int']>;
  liquidationIncentive?: Maybe<Scalars['numeric']>;
  priceFeedProxy?: Maybe<Scalars['String']>;
  yupanaContract?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Global_Factors_Min_Fields = {
  __typename?: 'global_factors_min_fields';
  closeFactor?: Maybe<Scalars['numeric']>;
  id?: Maybe<Scalars['Int']>;
  liquidationIncentive?: Maybe<Scalars['numeric']>;
  priceFeedProxy?: Maybe<Scalars['String']>;
  yupanaContract?: Maybe<Scalars['String']>;
};

/** Ordering options when selecting data from "global_factors". */
export type Global_Factors_Order_By = {
  closeFactor?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  liquidationIncentive?: InputMaybe<Order_By>;
  priceFeedProxy?: InputMaybe<Order_By>;
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
  PriceFeedProxy = 'priceFeedProxy',
  /** column name */
  YupanaContract = 'yupanaContract'
}

/** aggregate stddev on columns */
export type Global_Factors_Stddev_Fields = {
  __typename?: 'global_factors_stddev_fields';
  closeFactor?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  liquidationIncentive?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Global_Factors_Stddev_Pop_Fields = {
  __typename?: 'global_factors_stddev_pop_fields';
  closeFactor?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  liquidationIncentive?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Global_Factors_Stddev_Samp_Fields = {
  __typename?: 'global_factors_stddev_samp_fields';
  closeFactor?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  liquidationIncentive?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Global_Factors_Sum_Fields = {
  __typename?: 'global_factors_sum_fields';
  closeFactor?: Maybe<Scalars['numeric']>;
  id?: Maybe<Scalars['Int']>;
  liquidationIncentive?: Maybe<Scalars['numeric']>;
};

/** aggregate var_pop on columns */
export type Global_Factors_Var_Pop_Fields = {
  __typename?: 'global_factors_var_pop_fields';
  closeFactor?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  liquidationIncentive?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Global_Factors_Var_Samp_Fields = {
  __typename?: 'global_factors_var_samp_fields';
  closeFactor?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  liquidationIncentive?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Global_Factors_Variance_Fields = {
  __typename?: 'global_factors_variance_fields';
  closeFactor?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  liquidationIncentive?: Maybe<Scalars['Float']>;
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
  Rate = 'rate'
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
  Timestamp = 'timestamp'
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
  decimals: Scalars['numeric'];
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
  decimals?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  ytoken?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "oracle_price". All fields are combined with a logical 'AND'. */
export type Oracle_Price_Bool_Exp = {
  _and?: InputMaybe<Array<Oracle_Price_Bool_Exp>>;
  _not?: InputMaybe<Oracle_Price_Bool_Exp>;
  _or?: InputMaybe<Array<Oracle_Price_Bool_Exp>>;
  decimals?: InputMaybe<Numeric_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  price?: InputMaybe<Numeric_Comparison_Exp>;
  ytoken?: InputMaybe<Int_Comparison_Exp>;
};

/** aggregate max on columns */
export type Oracle_Price_Max_Fields = {
  __typename?: 'oracle_price_max_fields';
  decimals?: Maybe<Scalars['numeric']>;
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['numeric']>;
  ytoken?: Maybe<Scalars['Int']>;
};

/** aggregate min on columns */
export type Oracle_Price_Min_Fields = {
  __typename?: 'oracle_price_min_fields';
  decimals?: Maybe<Scalars['numeric']>;
  name?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['numeric']>;
  ytoken?: Maybe<Scalars['Int']>;
};

/** Ordering options when selecting data from "oracle_price". */
export type Oracle_Price_Order_By = {
  decimals?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  price?: InputMaybe<Order_By>;
  ytoken?: InputMaybe<Order_By>;
};

/** select columns of table "oracle_price" */
export enum Oracle_Price_Select_Column {
  /** column name */
  Decimals = 'decimals',
  /** column name */
  Name = 'name',
  /** column name */
  Price = 'price',
  /** column name */
  Ytoken = 'ytoken'
}

/** aggregate stddev on columns */
export type Oracle_Price_Stddev_Fields = {
  __typename?: 'oracle_price_stddev_fields';
  decimals?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  ytoken?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Oracle_Price_Stddev_Pop_Fields = {
  __typename?: 'oracle_price_stddev_pop_fields';
  decimals?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  ytoken?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Oracle_Price_Stddev_Samp_Fields = {
  __typename?: 'oracle_price_stddev_samp_fields';
  decimals?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  ytoken?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Oracle_Price_Sum_Fields = {
  __typename?: 'oracle_price_sum_fields';
  decimals?: Maybe<Scalars['numeric']>;
  price?: Maybe<Scalars['numeric']>;
  ytoken?: Maybe<Scalars['Int']>;
};

/** aggregate var_pop on columns */
export type Oracle_Price_Var_Pop_Fields = {
  __typename?: 'oracle_price_var_pop_fields';
  decimals?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  ytoken?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Oracle_Price_Var_Samp_Fields = {
  __typename?: 'oracle_price_var_samp_fields';
  decimals?: Maybe<Scalars['Float']>;
  price?: Maybe<Scalars['Float']>;
  ytoken?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Oracle_Price_Variance_Fields = {
  __typename?: 'oracle_price_variance_fields';
  decimals?: Maybe<Scalars['Float']>;
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
  DescNullsLast = 'desc_nulls_last'
}

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "asset" */
  asset: Array<Asset>;
  /** fetch aggregated fields from the table: "asset" */
  assetAggregate: Asset_Aggregate;
  /** fetch data from the table: "asset" using primary key columns */
  assetByPk?: Maybe<Asset>;
  /** fetch data from the table: "asset_prediction" */
  assetPrediction: Array<Asset_Prediction>;
  /** fetch aggregated fields from the table: "asset_prediction" */
  assetPredictionAggregate: Asset_Prediction_Aggregate;
  /** fetch data from the table: "asset_prediction" using primary key columns */
  assetPredictionByPk?: Maybe<Asset_Prediction>;
  /** fetch data from the table: "borrow_prediction" */
  borrowPrediction: Array<Borrow_Prediction>;
  /** fetch aggregated fields from the table: "borrow_prediction" */
  borrowPredictionAggregate: Borrow_Prediction_Aggregate;
  /** fetch data from the table: "borrow_prediction" using primary key columns */
  borrowPredictionByPk?: Maybe<Borrow_Prediction>;
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
  /** fetch data from the table: "dipdup_head_status" */
  dipdupHeadStatus: Array<Dipdup_Head_Status>;
  /** fetch aggregated fields from the table: "dipdup_head_status" */
  dipdupHeadStatusAggregate: Dipdup_Head_Status_Aggregate;
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
  /** An array relationship */
  userBorrow: Array<User_Borrow>;
  /** fetch aggregated fields from the table: "user_borrow" */
  userBorrowAggregate: User_Borrow_Aggregate;
  /** fetch data from the table: "user_borrow" using primary key columns */
  userBorrowByPk?: Maybe<User_Borrow>;
  /** fetch data from the table: "user" using primary key columns */
  userByPk?: Maybe<User>;
  /** fetch data from the table: "user_supply" */
  userSupply: Array<User_Supply>;
  /** fetch aggregated fields from the table: "user_supply" */
  userSupplyAggregate: User_Supply_Aggregate;
  /** fetch data from the table: "user_supply" using primary key columns */
  userSupplyByPk?: Maybe<User_Supply>;
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


export type Query_RootAssetPredictionArgs = {
  distinct_on?: InputMaybe<Array<Asset_Prediction_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Asset_Prediction_Order_By>>;
  where?: InputMaybe<Asset_Prediction_Bool_Exp>;
};


export type Query_RootAssetPredictionAggregateArgs = {
  distinct_on?: InputMaybe<Array<Asset_Prediction_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Asset_Prediction_Order_By>>;
  where?: InputMaybe<Asset_Prediction_Bool_Exp>;
};


export type Query_RootAssetPredictionByPkArgs = {
  id: Scalars['Int'];
};


export type Query_RootBorrowPredictionArgs = {
  distinct_on?: InputMaybe<Array<Borrow_Prediction_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Borrow_Prediction_Order_By>>;
  where?: InputMaybe<Borrow_Prediction_Bool_Exp>;
};


export type Query_RootBorrowPredictionAggregateArgs = {
  distinct_on?: InputMaybe<Array<Borrow_Prediction_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Borrow_Prediction_Order_By>>;
  where?: InputMaybe<Borrow_Prediction_Bool_Exp>;
};


export type Query_RootBorrowPredictionByPkArgs = {
  id: Scalars['Int'];
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


export type Query_RootDipdupHeadStatusArgs = {
  distinct_on?: InputMaybe<Array<Dipdup_Head_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Dipdup_Head_Status_Order_By>>;
  where?: InputMaybe<Dipdup_Head_Status_Bool_Exp>;
};


export type Query_RootDipdupHeadStatusAggregateArgs = {
  distinct_on?: InputMaybe<Array<Dipdup_Head_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Dipdup_Head_Status_Order_By>>;
  where?: InputMaybe<Dipdup_Head_Status_Bool_Exp>;
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


export type Query_RootUserBorrowArgs = {
  distinct_on?: InputMaybe<Array<User_Borrow_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Borrow_Order_By>>;
  where?: InputMaybe<User_Borrow_Bool_Exp>;
};


export type Query_RootUserBorrowAggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Borrow_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Borrow_Order_By>>;
  where?: InputMaybe<User_Borrow_Bool_Exp>;
};


export type Query_RootUserBorrowByPkArgs = {
  id: Scalars['Int'];
};


export type Query_RootUserByPkArgs = {
  address: Scalars['String'];
};


export type Query_RootUserSupplyArgs = {
  distinct_on?: InputMaybe<Array<User_Supply_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Supply_Order_By>>;
  where?: InputMaybe<User_Supply_Bool_Exp>;
};


export type Query_RootUserSupplyAggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Supply_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Supply_Order_By>>;
  where?: InputMaybe<User_Supply_Bool_Exp>;
};


export type Query_RootUserSupplyByPkArgs = {
  id: Scalars['Int'];
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
  UtilizationRate = 'utilization_rate'
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
  usdAmount: Scalars['numeric'];
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
  usdAmount?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "repay_tx" */
export type Repay_Tx_Avg_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  usdAmount?: InputMaybe<Order_By>;
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
  usdAmount?: InputMaybe<Numeric_Comparison_Exp>;
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
  usdAmount?: Maybe<Scalars['numeric']>;
  userId?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "repay_tx" */
export type Repay_Tx_Max_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  usdAmount?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Repay_Tx_Min_Fields = {
  __typename?: 'repay_tx_min_fields';
  amount?: Maybe<Scalars['numeric']>;
  assetId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  timestamp?: Maybe<Scalars['timestamptz']>;
  usdAmount?: Maybe<Scalars['numeric']>;
  userId?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "repay_tx" */
export type Repay_Tx_Min_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  usdAmount?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "repay_tx". */
export type Repay_Tx_Order_By = {
  amount?: InputMaybe<Order_By>;
  asset?: InputMaybe<Asset_Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  usdAmount?: InputMaybe<Order_By>;
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
  UsdAmount = 'usdAmount',
  /** column name */
  UserId = 'userId'
}

/** aggregate stddev on columns */
export type Repay_Tx_Stddev_Fields = {
  __typename?: 'repay_tx_stddev_fields';
  amount?: Maybe<Scalars['Float']>;
  assetId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  usdAmount?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "repay_tx" */
export type Repay_Tx_Stddev_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  usdAmount?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Repay_Tx_Stddev_Pop_Fields = {
  __typename?: 'repay_tx_stddev_pop_fields';
  amount?: Maybe<Scalars['Float']>;
  assetId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  usdAmount?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "repay_tx" */
export type Repay_Tx_Stddev_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  usdAmount?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Repay_Tx_Stddev_Samp_Fields = {
  __typename?: 'repay_tx_stddev_samp_fields';
  amount?: Maybe<Scalars['Float']>;
  assetId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  usdAmount?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "repay_tx" */
export type Repay_Tx_Stddev_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  usdAmount?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Repay_Tx_Sum_Fields = {
  __typename?: 'repay_tx_sum_fields';
  amount?: Maybe<Scalars['numeric']>;
  assetId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  usdAmount?: Maybe<Scalars['numeric']>;
};

/** order by sum() on columns of table "repay_tx" */
export type Repay_Tx_Sum_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  usdAmount?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Repay_Tx_Var_Pop_Fields = {
  __typename?: 'repay_tx_var_pop_fields';
  amount?: Maybe<Scalars['Float']>;
  assetId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  usdAmount?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "repay_tx" */
export type Repay_Tx_Var_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  usdAmount?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Repay_Tx_Var_Samp_Fields = {
  __typename?: 'repay_tx_var_samp_fields';
  amount?: Maybe<Scalars['Float']>;
  assetId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  usdAmount?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "repay_tx" */
export type Repay_Tx_Var_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  usdAmount?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Repay_Tx_Variance_Fields = {
  __typename?: 'repay_tx_variance_fields';
  amount?: Maybe<Scalars['Float']>;
  assetId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  usdAmount?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "repay_tx" */
export type Repay_Tx_Variance_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  usdAmount?: InputMaybe<Order_By>;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "asset" */
  asset: Array<Asset>;
  /** fetch aggregated fields from the table: "asset" */
  assetAggregate: Asset_Aggregate;
  /** fetch data from the table: "asset" using primary key columns */
  assetByPk?: Maybe<Asset>;
  /** fetch data from the table: "asset_prediction" */
  assetPrediction: Array<Asset_Prediction>;
  /** fetch aggregated fields from the table: "asset_prediction" */
  assetPredictionAggregate: Asset_Prediction_Aggregate;
  /** fetch data from the table: "asset_prediction" using primary key columns */
  assetPredictionByPk?: Maybe<Asset_Prediction>;
  /** fetch data from the table: "borrow_prediction" */
  borrowPrediction: Array<Borrow_Prediction>;
  /** fetch aggregated fields from the table: "borrow_prediction" */
  borrowPredictionAggregate: Borrow_Prediction_Aggregate;
  /** fetch data from the table: "borrow_prediction" using primary key columns */
  borrowPredictionByPk?: Maybe<Borrow_Prediction>;
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
  /** fetch data from the table: "dipdup_head_status" */
  dipdupHeadStatus: Array<Dipdup_Head_Status>;
  /** fetch aggregated fields from the table: "dipdup_head_status" */
  dipdupHeadStatusAggregate: Dipdup_Head_Status_Aggregate;
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
  /** An array relationship */
  userBorrow: Array<User_Borrow>;
  /** fetch aggregated fields from the table: "user_borrow" */
  userBorrowAggregate: User_Borrow_Aggregate;
  /** fetch data from the table: "user_borrow" using primary key columns */
  userBorrowByPk?: Maybe<User_Borrow>;
  /** fetch data from the table: "user" using primary key columns */
  userByPk?: Maybe<User>;
  /** fetch data from the table: "user_supply" */
  userSupply: Array<User_Supply>;
  /** fetch aggregated fields from the table: "user_supply" */
  userSupplyAggregate: User_Supply_Aggregate;
  /** fetch data from the table: "user_supply" using primary key columns */
  userSupplyByPk?: Maybe<User_Supply>;
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


export type Subscription_RootAssetPredictionArgs = {
  distinct_on?: InputMaybe<Array<Asset_Prediction_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Asset_Prediction_Order_By>>;
  where?: InputMaybe<Asset_Prediction_Bool_Exp>;
};


export type Subscription_RootAssetPredictionAggregateArgs = {
  distinct_on?: InputMaybe<Array<Asset_Prediction_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Asset_Prediction_Order_By>>;
  where?: InputMaybe<Asset_Prediction_Bool_Exp>;
};


export type Subscription_RootAssetPredictionByPkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootBorrowPredictionArgs = {
  distinct_on?: InputMaybe<Array<Borrow_Prediction_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Borrow_Prediction_Order_By>>;
  where?: InputMaybe<Borrow_Prediction_Bool_Exp>;
};


export type Subscription_RootBorrowPredictionAggregateArgs = {
  distinct_on?: InputMaybe<Array<Borrow_Prediction_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Borrow_Prediction_Order_By>>;
  where?: InputMaybe<Borrow_Prediction_Bool_Exp>;
};


export type Subscription_RootBorrowPredictionByPkArgs = {
  id: Scalars['Int'];
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


export type Subscription_RootDipdupHeadStatusArgs = {
  distinct_on?: InputMaybe<Array<Dipdup_Head_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Dipdup_Head_Status_Order_By>>;
  where?: InputMaybe<Dipdup_Head_Status_Bool_Exp>;
};


export type Subscription_RootDipdupHeadStatusAggregateArgs = {
  distinct_on?: InputMaybe<Array<Dipdup_Head_Status_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Dipdup_Head_Status_Order_By>>;
  where?: InputMaybe<Dipdup_Head_Status_Bool_Exp>;
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


export type Subscription_RootUserBorrowArgs = {
  distinct_on?: InputMaybe<Array<User_Borrow_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Borrow_Order_By>>;
  where?: InputMaybe<User_Borrow_Bool_Exp>;
};


export type Subscription_RootUserBorrowAggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Borrow_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Borrow_Order_By>>;
  where?: InputMaybe<User_Borrow_Bool_Exp>;
};


export type Subscription_RootUserBorrowByPkArgs = {
  id: Scalars['Int'];
};


export type Subscription_RootUserByPkArgs = {
  address: Scalars['String'];
};


export type Subscription_RootUserSupplyArgs = {
  distinct_on?: InputMaybe<Array<User_Supply_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Supply_Order_By>>;
  where?: InputMaybe<User_Supply_Bool_Exp>;
};


export type Subscription_RootUserSupplyAggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Supply_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Supply_Order_By>>;
  where?: InputMaybe<User_Supply_Bool_Exp>;
};


export type Subscription_RootUserSupplyByPkArgs = {
  id: Scalars['Int'];
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
  usdAmount: Scalars['numeric'];
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
  usdAmount?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "supply_tx" */
export type Supply_Tx_Avg_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  usdAmount?: InputMaybe<Order_By>;
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
  usdAmount?: InputMaybe<Numeric_Comparison_Exp>;
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
  usdAmount?: Maybe<Scalars['numeric']>;
  userId?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "supply_tx" */
export type Supply_Tx_Max_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  usdAmount?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Supply_Tx_Min_Fields = {
  __typename?: 'supply_tx_min_fields';
  amount?: Maybe<Scalars['numeric']>;
  assetId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  timestamp?: Maybe<Scalars['timestamptz']>;
  usdAmount?: Maybe<Scalars['numeric']>;
  userId?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "supply_tx" */
export type Supply_Tx_Min_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  usdAmount?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "supply_tx". */
export type Supply_Tx_Order_By = {
  amount?: InputMaybe<Order_By>;
  asset?: InputMaybe<Asset_Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  usdAmount?: InputMaybe<Order_By>;
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
  UsdAmount = 'usdAmount',
  /** column name */
  UserId = 'userId'
}

/** aggregate stddev on columns */
export type Supply_Tx_Stddev_Fields = {
  __typename?: 'supply_tx_stddev_fields';
  amount?: Maybe<Scalars['Float']>;
  assetId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  usdAmount?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "supply_tx" */
export type Supply_Tx_Stddev_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  usdAmount?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Supply_Tx_Stddev_Pop_Fields = {
  __typename?: 'supply_tx_stddev_pop_fields';
  amount?: Maybe<Scalars['Float']>;
  assetId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  usdAmount?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "supply_tx" */
export type Supply_Tx_Stddev_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  usdAmount?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Supply_Tx_Stddev_Samp_Fields = {
  __typename?: 'supply_tx_stddev_samp_fields';
  amount?: Maybe<Scalars['Float']>;
  assetId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  usdAmount?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "supply_tx" */
export type Supply_Tx_Stddev_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  usdAmount?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Supply_Tx_Sum_Fields = {
  __typename?: 'supply_tx_sum_fields';
  amount?: Maybe<Scalars['numeric']>;
  assetId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  usdAmount?: Maybe<Scalars['numeric']>;
};

/** order by sum() on columns of table "supply_tx" */
export type Supply_Tx_Sum_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  usdAmount?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Supply_Tx_Var_Pop_Fields = {
  __typename?: 'supply_tx_var_pop_fields';
  amount?: Maybe<Scalars['Float']>;
  assetId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  usdAmount?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "supply_tx" */
export type Supply_Tx_Var_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  usdAmount?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Supply_Tx_Var_Samp_Fields = {
  __typename?: 'supply_tx_var_samp_fields';
  amount?: Maybe<Scalars['Float']>;
  assetId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  usdAmount?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "supply_tx" */
export type Supply_Tx_Var_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  usdAmount?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Supply_Tx_Variance_Fields = {
  __typename?: 'supply_tx_variance_fields';
  amount?: Maybe<Scalars['Float']>;
  assetId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  usdAmount?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "supply_tx" */
export type Supply_Tx_Variance_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  usdAmount?: InputMaybe<Order_By>;
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
  Thumbnail = 'thumbnail'
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
  netApy: Scalars['numeric'];
  outstandingBorrow: Scalars['numeric'];
  totalBorrowUsd: Scalars['numeric'];
  totalSupplyUsd: Scalars['numeric'];
  /** An array relationship */
  userBorrow: Array<User_Borrow>;
  /** An array relationship */
  userBorrowTx: Array<Borrow_Tx>;
  /** An aggregate relationship */
  userBorrowTx_aggregate: Borrow_Tx_Aggregate;
  /** An aggregate relationship */
  userBorrow_aggregate: User_Borrow_Aggregate;
  /** An array relationship */
  userRepayTx: Array<Repay_Tx>;
  /** An aggregate relationship */
  userRepayTx_aggregate: Repay_Tx_Aggregate;
  /** fetch data from the table: "user_supply" */
  userSupply: Array<User_Supply>;
  /** An array relationship */
  userSupplyTx: Array<Supply_Tx>;
  /** An aggregate relationship */
  userSupplyTx_aggregate: Supply_Tx_Aggregate;
  /** An aggregate relationship */
  userSupply_aggregate: User_Supply_Aggregate;
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
export type UserUserBorrowArgs = {
  distinct_on?: InputMaybe<Array<User_Borrow_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Borrow_Order_By>>;
  where?: InputMaybe<User_Borrow_Bool_Exp>;
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
export type UserUserBorrow_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Borrow_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Borrow_Order_By>>;
  where?: InputMaybe<User_Borrow_Bool_Exp>;
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
export type UserUserSupplyArgs = {
  distinct_on?: InputMaybe<Array<User_Supply_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Supply_Order_By>>;
  where?: InputMaybe<User_Supply_Bool_Exp>;
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
export type UserUserSupply_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Supply_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<User_Supply_Order_By>>;
  where?: InputMaybe<User_Supply_Bool_Exp>;
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
  netApy?: Maybe<Scalars['Float']>;
  outstandingBorrow?: Maybe<Scalars['Float']>;
  totalBorrowUsd?: Maybe<Scalars['Float']>;
  totalSupplyUsd?: Maybe<Scalars['Float']>;
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
  netApy?: InputMaybe<Numeric_Comparison_Exp>;
  outstandingBorrow?: InputMaybe<Numeric_Comparison_Exp>;
  totalBorrowUsd?: InputMaybe<Numeric_Comparison_Exp>;
  totalSupplyUsd?: InputMaybe<Numeric_Comparison_Exp>;
  userBorrow?: InputMaybe<User_Borrow_Bool_Exp>;
  userBorrowTx?: InputMaybe<Borrow_Tx_Bool_Exp>;
  userRepayTx?: InputMaybe<Repay_Tx_Bool_Exp>;
  userSupply?: InputMaybe<User_Supply_Bool_Exp>;
  userSupplyTx?: InputMaybe<Supply_Tx_Bool_Exp>;
  userWithdrawTx?: InputMaybe<Withdraw_Tx_Bool_Exp>;
};

/** columns and relationships of "user_borrow" */
export type User_Borrow = {
  __typename?: 'user_borrow';
  /** An object relationship */
  asset: Asset;
  assetId: Scalars['Int'];
  borrow: Scalars['numeric'];
  borrowIndex: Scalars['numeric'];
  id: Scalars['Int'];
  interestUpdateTime?: Maybe<Scalars['timestamptz']>;
  /** An array relationship */
  prediction: Array<Borrow_Prediction>;
  /** An aggregate relationship */
  prediction_aggregate: Borrow_Prediction_Aggregate;
  /** An object relationship */
  user: User;
  userId: Scalars['String'];
};


/** columns and relationships of "user_borrow" */
export type User_BorrowPredictionArgs = {
  distinct_on?: InputMaybe<Array<Borrow_Prediction_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Borrow_Prediction_Order_By>>;
  where?: InputMaybe<Borrow_Prediction_Bool_Exp>;
};


/** columns and relationships of "user_borrow" */
export type User_BorrowPrediction_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Borrow_Prediction_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  order_by?: InputMaybe<Array<Borrow_Prediction_Order_By>>;
  where?: InputMaybe<Borrow_Prediction_Bool_Exp>;
};

/** aggregated selection of "user_borrow" */
export type User_Borrow_Aggregate = {
  __typename?: 'user_borrow_aggregate';
  aggregate?: Maybe<User_Borrow_Aggregate_Fields>;
  nodes: Array<User_Borrow>;
};

/** aggregate fields of "user_borrow" */
export type User_Borrow_Aggregate_Fields = {
  __typename?: 'user_borrow_aggregate_fields';
  avg?: Maybe<User_Borrow_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<User_Borrow_Max_Fields>;
  min?: Maybe<User_Borrow_Min_Fields>;
  stddev?: Maybe<User_Borrow_Stddev_Fields>;
  stddev_pop?: Maybe<User_Borrow_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<User_Borrow_Stddev_Samp_Fields>;
  sum?: Maybe<User_Borrow_Sum_Fields>;
  var_pop?: Maybe<User_Borrow_Var_Pop_Fields>;
  var_samp?: Maybe<User_Borrow_Var_Samp_Fields>;
  variance?: Maybe<User_Borrow_Variance_Fields>;
};


/** aggregate fields of "user_borrow" */
export type User_Borrow_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<User_Borrow_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "user_borrow" */
export type User_Borrow_Aggregate_Order_By = {
  avg?: InputMaybe<User_Borrow_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<User_Borrow_Max_Order_By>;
  min?: InputMaybe<User_Borrow_Min_Order_By>;
  stddev?: InputMaybe<User_Borrow_Stddev_Order_By>;
  stddev_pop?: InputMaybe<User_Borrow_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<User_Borrow_Stddev_Samp_Order_By>;
  sum?: InputMaybe<User_Borrow_Sum_Order_By>;
  var_pop?: InputMaybe<User_Borrow_Var_Pop_Order_By>;
  var_samp?: InputMaybe<User_Borrow_Var_Samp_Order_By>;
  variance?: InputMaybe<User_Borrow_Variance_Order_By>;
};

/** aggregate avg on columns */
export type User_Borrow_Avg_Fields = {
  __typename?: 'user_borrow_avg_fields';
  assetId?: Maybe<Scalars['Float']>;
  borrow?: Maybe<Scalars['Float']>;
  borrowIndex?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "user_borrow" */
export type User_Borrow_Avg_Order_By = {
  assetId?: InputMaybe<Order_By>;
  borrow?: InputMaybe<Order_By>;
  borrowIndex?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "user_borrow". All fields are combined with a logical 'AND'. */
export type User_Borrow_Bool_Exp = {
  _and?: InputMaybe<Array<User_Borrow_Bool_Exp>>;
  _not?: InputMaybe<User_Borrow_Bool_Exp>;
  _or?: InputMaybe<Array<User_Borrow_Bool_Exp>>;
  asset?: InputMaybe<Asset_Bool_Exp>;
  assetId?: InputMaybe<Int_Comparison_Exp>;
  borrow?: InputMaybe<Numeric_Comparison_Exp>;
  borrowIndex?: InputMaybe<Numeric_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  interestUpdateTime?: InputMaybe<Timestamptz_Comparison_Exp>;
  prediction?: InputMaybe<Borrow_Prediction_Bool_Exp>;
  user?: InputMaybe<User_Bool_Exp>;
  userId?: InputMaybe<String_Comparison_Exp>;
};

/** aggregate max on columns */
export type User_Borrow_Max_Fields = {
  __typename?: 'user_borrow_max_fields';
  assetId?: Maybe<Scalars['Int']>;
  borrow?: Maybe<Scalars['numeric']>;
  borrowIndex?: Maybe<Scalars['numeric']>;
  id?: Maybe<Scalars['Int']>;
  interestUpdateTime?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "user_borrow" */
export type User_Borrow_Max_Order_By = {
  assetId?: InputMaybe<Order_By>;
  borrow?: InputMaybe<Order_By>;
  borrowIndex?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  interestUpdateTime?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type User_Borrow_Min_Fields = {
  __typename?: 'user_borrow_min_fields';
  assetId?: Maybe<Scalars['Int']>;
  borrow?: Maybe<Scalars['numeric']>;
  borrowIndex?: Maybe<Scalars['numeric']>;
  id?: Maybe<Scalars['Int']>;
  interestUpdateTime?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "user_borrow" */
export type User_Borrow_Min_Order_By = {
  assetId?: InputMaybe<Order_By>;
  borrow?: InputMaybe<Order_By>;
  borrowIndex?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  interestUpdateTime?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "user_borrow". */
export type User_Borrow_Order_By = {
  asset?: InputMaybe<Asset_Order_By>;
  assetId?: InputMaybe<Order_By>;
  borrow?: InputMaybe<Order_By>;
  borrowIndex?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  interestUpdateTime?: InputMaybe<Order_By>;
  prediction_aggregate?: InputMaybe<Borrow_Prediction_Aggregate_Order_By>;
  user?: InputMaybe<User_Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** select columns of table "user_borrow" */
export enum User_Borrow_Select_Column {
  /** column name */
  AssetId = 'assetId',
  /** column name */
  Borrow = 'borrow',
  /** column name */
  BorrowIndex = 'borrowIndex',
  /** column name */
  Id = 'id',
  /** column name */
  InterestUpdateTime = 'interestUpdateTime',
  /** column name */
  UserId = 'userId'
}

/** aggregate stddev on columns */
export type User_Borrow_Stddev_Fields = {
  __typename?: 'user_borrow_stddev_fields';
  assetId?: Maybe<Scalars['Float']>;
  borrow?: Maybe<Scalars['Float']>;
  borrowIndex?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "user_borrow" */
export type User_Borrow_Stddev_Order_By = {
  assetId?: InputMaybe<Order_By>;
  borrow?: InputMaybe<Order_By>;
  borrowIndex?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type User_Borrow_Stddev_Pop_Fields = {
  __typename?: 'user_borrow_stddev_pop_fields';
  assetId?: Maybe<Scalars['Float']>;
  borrow?: Maybe<Scalars['Float']>;
  borrowIndex?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "user_borrow" */
export type User_Borrow_Stddev_Pop_Order_By = {
  assetId?: InputMaybe<Order_By>;
  borrow?: InputMaybe<Order_By>;
  borrowIndex?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type User_Borrow_Stddev_Samp_Fields = {
  __typename?: 'user_borrow_stddev_samp_fields';
  assetId?: Maybe<Scalars['Float']>;
  borrow?: Maybe<Scalars['Float']>;
  borrowIndex?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "user_borrow" */
export type User_Borrow_Stddev_Samp_Order_By = {
  assetId?: InputMaybe<Order_By>;
  borrow?: InputMaybe<Order_By>;
  borrowIndex?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type User_Borrow_Sum_Fields = {
  __typename?: 'user_borrow_sum_fields';
  assetId?: Maybe<Scalars['Int']>;
  borrow?: Maybe<Scalars['numeric']>;
  borrowIndex?: Maybe<Scalars['numeric']>;
  id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "user_borrow" */
export type User_Borrow_Sum_Order_By = {
  assetId?: InputMaybe<Order_By>;
  borrow?: InputMaybe<Order_By>;
  borrowIndex?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type User_Borrow_Var_Pop_Fields = {
  __typename?: 'user_borrow_var_pop_fields';
  assetId?: Maybe<Scalars['Float']>;
  borrow?: Maybe<Scalars['Float']>;
  borrowIndex?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "user_borrow" */
export type User_Borrow_Var_Pop_Order_By = {
  assetId?: InputMaybe<Order_By>;
  borrow?: InputMaybe<Order_By>;
  borrowIndex?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type User_Borrow_Var_Samp_Fields = {
  __typename?: 'user_borrow_var_samp_fields';
  assetId?: Maybe<Scalars['Float']>;
  borrow?: Maybe<Scalars['Float']>;
  borrowIndex?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "user_borrow" */
export type User_Borrow_Var_Samp_Order_By = {
  assetId?: InputMaybe<Order_By>;
  borrow?: InputMaybe<Order_By>;
  borrowIndex?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type User_Borrow_Variance_Fields = {
  __typename?: 'user_borrow_variance_fields';
  assetId?: Maybe<Scalars['Float']>;
  borrow?: Maybe<Scalars['Float']>;
  borrowIndex?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "user_borrow" */
export type User_Borrow_Variance_Order_By = {
  assetId?: InputMaybe<Order_By>;
  borrow?: InputMaybe<Order_By>;
  borrowIndex?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
};

/** aggregate max on columns */
export type User_Max_Fields = {
  __typename?: 'user_max_fields';
  address?: Maybe<Scalars['String']>;
  borrowRatio?: Maybe<Scalars['numeric']>;
  liquidationCollateral?: Maybe<Scalars['numeric']>;
  liquidationRatio?: Maybe<Scalars['numeric']>;
  maxCollateral?: Maybe<Scalars['numeric']>;
  netApy?: Maybe<Scalars['numeric']>;
  outstandingBorrow?: Maybe<Scalars['numeric']>;
  totalBorrowUsd?: Maybe<Scalars['numeric']>;
  totalSupplyUsd?: Maybe<Scalars['numeric']>;
};

/** aggregate min on columns */
export type User_Min_Fields = {
  __typename?: 'user_min_fields';
  address?: Maybe<Scalars['String']>;
  borrowRatio?: Maybe<Scalars['numeric']>;
  liquidationCollateral?: Maybe<Scalars['numeric']>;
  liquidationRatio?: Maybe<Scalars['numeric']>;
  maxCollateral?: Maybe<Scalars['numeric']>;
  netApy?: Maybe<Scalars['numeric']>;
  outstandingBorrow?: Maybe<Scalars['numeric']>;
  totalBorrowUsd?: Maybe<Scalars['numeric']>;
  totalSupplyUsd?: Maybe<Scalars['numeric']>;
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
  netApy?: InputMaybe<Order_By>;
  outstandingBorrow?: InputMaybe<Order_By>;
  totalBorrowUsd?: InputMaybe<Order_By>;
  totalSupplyUsd?: InputMaybe<Order_By>;
  userBorrowTx_aggregate?: InputMaybe<Borrow_Tx_Aggregate_Order_By>;
  userBorrow_aggregate?: InputMaybe<User_Borrow_Aggregate_Order_By>;
  userRepayTx_aggregate?: InputMaybe<Repay_Tx_Aggregate_Order_By>;
  userSupplyTx_aggregate?: InputMaybe<Supply_Tx_Aggregate_Order_By>;
  userSupply_aggregate?: InputMaybe<User_Supply_Aggregate_Order_By>;
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
  NetApy = 'netApy',
  /** column name */
  OutstandingBorrow = 'outstandingBorrow',
  /** column name */
  TotalBorrowUsd = 'totalBorrowUsd',
  /** column name */
  TotalSupplyUsd = 'totalSupplyUsd'
}

/** aggregate stddev on columns */
export type User_Stddev_Fields = {
  __typename?: 'user_stddev_fields';
  borrowRatio?: Maybe<Scalars['Float']>;
  liquidationCollateral?: Maybe<Scalars['Float']>;
  liquidationRatio?: Maybe<Scalars['Float']>;
  maxCollateral?: Maybe<Scalars['Float']>;
  netApy?: Maybe<Scalars['Float']>;
  outstandingBorrow?: Maybe<Scalars['Float']>;
  totalBorrowUsd?: Maybe<Scalars['Float']>;
  totalSupplyUsd?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type User_Stddev_Pop_Fields = {
  __typename?: 'user_stddev_pop_fields';
  borrowRatio?: Maybe<Scalars['Float']>;
  liquidationCollateral?: Maybe<Scalars['Float']>;
  liquidationRatio?: Maybe<Scalars['Float']>;
  maxCollateral?: Maybe<Scalars['Float']>;
  netApy?: Maybe<Scalars['Float']>;
  outstandingBorrow?: Maybe<Scalars['Float']>;
  totalBorrowUsd?: Maybe<Scalars['Float']>;
  totalSupplyUsd?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type User_Stddev_Samp_Fields = {
  __typename?: 'user_stddev_samp_fields';
  borrowRatio?: Maybe<Scalars['Float']>;
  liquidationCollateral?: Maybe<Scalars['Float']>;
  liquidationRatio?: Maybe<Scalars['Float']>;
  maxCollateral?: Maybe<Scalars['Float']>;
  netApy?: Maybe<Scalars['Float']>;
  outstandingBorrow?: Maybe<Scalars['Float']>;
  totalBorrowUsd?: Maybe<Scalars['Float']>;
  totalSupplyUsd?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type User_Sum_Fields = {
  __typename?: 'user_sum_fields';
  borrowRatio?: Maybe<Scalars['numeric']>;
  liquidationCollateral?: Maybe<Scalars['numeric']>;
  liquidationRatio?: Maybe<Scalars['numeric']>;
  maxCollateral?: Maybe<Scalars['numeric']>;
  netApy?: Maybe<Scalars['numeric']>;
  outstandingBorrow?: Maybe<Scalars['numeric']>;
  totalBorrowUsd?: Maybe<Scalars['numeric']>;
  totalSupplyUsd?: Maybe<Scalars['numeric']>;
};

/** columns and relationships of "user_supply" */
export type User_Supply = {
  __typename?: 'user_supply';
  /** An object relationship */
  asset: Asset;
  assetId: Scalars['Int'];
  entered: Scalars['Boolean'];
  id: Scalars['Int'];
  supply: Scalars['numeric'];
  /** An object relationship */
  user: User;
  userId: Scalars['String'];
};

/** aggregated selection of "user_supply" */
export type User_Supply_Aggregate = {
  __typename?: 'user_supply_aggregate';
  aggregate?: Maybe<User_Supply_Aggregate_Fields>;
  nodes: Array<User_Supply>;
};

/** aggregate fields of "user_supply" */
export type User_Supply_Aggregate_Fields = {
  __typename?: 'user_supply_aggregate_fields';
  avg?: Maybe<User_Supply_Avg_Fields>;
  count: Scalars['Int'];
  max?: Maybe<User_Supply_Max_Fields>;
  min?: Maybe<User_Supply_Min_Fields>;
  stddev?: Maybe<User_Supply_Stddev_Fields>;
  stddev_pop?: Maybe<User_Supply_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<User_Supply_Stddev_Samp_Fields>;
  sum?: Maybe<User_Supply_Sum_Fields>;
  var_pop?: Maybe<User_Supply_Var_Pop_Fields>;
  var_samp?: Maybe<User_Supply_Var_Samp_Fields>;
  variance?: Maybe<User_Supply_Variance_Fields>;
};


/** aggregate fields of "user_supply" */
export type User_Supply_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<User_Supply_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "user_supply" */
export type User_Supply_Aggregate_Order_By = {
  avg?: InputMaybe<User_Supply_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<User_Supply_Max_Order_By>;
  min?: InputMaybe<User_Supply_Min_Order_By>;
  stddev?: InputMaybe<User_Supply_Stddev_Order_By>;
  stddev_pop?: InputMaybe<User_Supply_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<User_Supply_Stddev_Samp_Order_By>;
  sum?: InputMaybe<User_Supply_Sum_Order_By>;
  var_pop?: InputMaybe<User_Supply_Var_Pop_Order_By>;
  var_samp?: InputMaybe<User_Supply_Var_Samp_Order_By>;
  variance?: InputMaybe<User_Supply_Variance_Order_By>;
};

/** aggregate avg on columns */
export type User_Supply_Avg_Fields = {
  __typename?: 'user_supply_avg_fields';
  assetId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  supply?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "user_supply" */
export type User_Supply_Avg_Order_By = {
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  supply?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "user_supply". All fields are combined with a logical 'AND'. */
export type User_Supply_Bool_Exp = {
  _and?: InputMaybe<Array<User_Supply_Bool_Exp>>;
  _not?: InputMaybe<User_Supply_Bool_Exp>;
  _or?: InputMaybe<Array<User_Supply_Bool_Exp>>;
  asset?: InputMaybe<Asset_Bool_Exp>;
  assetId?: InputMaybe<Int_Comparison_Exp>;
  entered?: InputMaybe<Boolean_Comparison_Exp>;
  id?: InputMaybe<Int_Comparison_Exp>;
  supply?: InputMaybe<Numeric_Comparison_Exp>;
  user?: InputMaybe<User_Bool_Exp>;
  userId?: InputMaybe<String_Comparison_Exp>;
};

/** aggregate max on columns */
export type User_Supply_Max_Fields = {
  __typename?: 'user_supply_max_fields';
  assetId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  supply?: Maybe<Scalars['numeric']>;
  userId?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "user_supply" */
export type User_Supply_Max_Order_By = {
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  supply?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type User_Supply_Min_Fields = {
  __typename?: 'user_supply_min_fields';
  assetId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  supply?: Maybe<Scalars['numeric']>;
  userId?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "user_supply" */
export type User_Supply_Min_Order_By = {
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  supply?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "user_supply". */
export type User_Supply_Order_By = {
  asset?: InputMaybe<Asset_Order_By>;
  assetId?: InputMaybe<Order_By>;
  entered?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  supply?: InputMaybe<Order_By>;
  user?: InputMaybe<User_Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** select columns of table "user_supply" */
export enum User_Supply_Select_Column {
  /** column name */
  AssetId = 'assetId',
  /** column name */
  Entered = 'entered',
  /** column name */
  Id = 'id',
  /** column name */
  Supply = 'supply',
  /** column name */
  UserId = 'userId'
}

/** aggregate stddev on columns */
export type User_Supply_Stddev_Fields = {
  __typename?: 'user_supply_stddev_fields';
  assetId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  supply?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "user_supply" */
export type User_Supply_Stddev_Order_By = {
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  supply?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type User_Supply_Stddev_Pop_Fields = {
  __typename?: 'user_supply_stddev_pop_fields';
  assetId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  supply?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "user_supply" */
export type User_Supply_Stddev_Pop_Order_By = {
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  supply?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type User_Supply_Stddev_Samp_Fields = {
  __typename?: 'user_supply_stddev_samp_fields';
  assetId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  supply?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "user_supply" */
export type User_Supply_Stddev_Samp_Order_By = {
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  supply?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type User_Supply_Sum_Fields = {
  __typename?: 'user_supply_sum_fields';
  assetId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  supply?: Maybe<Scalars['numeric']>;
};

/** order by sum() on columns of table "user_supply" */
export type User_Supply_Sum_Order_By = {
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  supply?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type User_Supply_Var_Pop_Fields = {
  __typename?: 'user_supply_var_pop_fields';
  assetId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  supply?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "user_supply" */
export type User_Supply_Var_Pop_Order_By = {
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  supply?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type User_Supply_Var_Samp_Fields = {
  __typename?: 'user_supply_var_samp_fields';
  assetId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  supply?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "user_supply" */
export type User_Supply_Var_Samp_Order_By = {
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  supply?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type User_Supply_Variance_Fields = {
  __typename?: 'user_supply_variance_fields';
  assetId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  supply?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "user_supply" */
export type User_Supply_Variance_Order_By = {
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  supply?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type User_Var_Pop_Fields = {
  __typename?: 'user_var_pop_fields';
  borrowRatio?: Maybe<Scalars['Float']>;
  liquidationCollateral?: Maybe<Scalars['Float']>;
  liquidationRatio?: Maybe<Scalars['Float']>;
  maxCollateral?: Maybe<Scalars['Float']>;
  netApy?: Maybe<Scalars['Float']>;
  outstandingBorrow?: Maybe<Scalars['Float']>;
  totalBorrowUsd?: Maybe<Scalars['Float']>;
  totalSupplyUsd?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type User_Var_Samp_Fields = {
  __typename?: 'user_var_samp_fields';
  borrowRatio?: Maybe<Scalars['Float']>;
  liquidationCollateral?: Maybe<Scalars['Float']>;
  liquidationRatio?: Maybe<Scalars['Float']>;
  maxCollateral?: Maybe<Scalars['Float']>;
  netApy?: Maybe<Scalars['Float']>;
  outstandingBorrow?: Maybe<Scalars['Float']>;
  totalBorrowUsd?: Maybe<Scalars['Float']>;
  totalSupplyUsd?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type User_Variance_Fields = {
  __typename?: 'user_variance_fields';
  borrowRatio?: Maybe<Scalars['Float']>;
  liquidationCollateral?: Maybe<Scalars['Float']>;
  liquidationRatio?: Maybe<Scalars['Float']>;
  maxCollateral?: Maybe<Scalars['Float']>;
  netApy?: Maybe<Scalars['Float']>;
  outstandingBorrow?: Maybe<Scalars['Float']>;
  totalBorrowUsd?: Maybe<Scalars['Float']>;
  totalSupplyUsd?: Maybe<Scalars['Float']>;
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
  usdAmount: Scalars['numeric'];
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
  usdAmount?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "withdraw_tx" */
export type Withdraw_Tx_Avg_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  usdAmount?: InputMaybe<Order_By>;
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
  usdAmount?: InputMaybe<Numeric_Comparison_Exp>;
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
  usdAmount?: Maybe<Scalars['numeric']>;
  userId?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "withdraw_tx" */
export type Withdraw_Tx_Max_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  usdAmount?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Withdraw_Tx_Min_Fields = {
  __typename?: 'withdraw_tx_min_fields';
  amount?: Maybe<Scalars['numeric']>;
  assetId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  timestamp?: Maybe<Scalars['timestamptz']>;
  usdAmount?: Maybe<Scalars['numeric']>;
  userId?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "withdraw_tx" */
export type Withdraw_Tx_Min_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  usdAmount?: InputMaybe<Order_By>;
  userId?: InputMaybe<Order_By>;
};

/** Ordering options when selecting data from "withdraw_tx". */
export type Withdraw_Tx_Order_By = {
  amount?: InputMaybe<Order_By>;
  asset?: InputMaybe<Asset_Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  timestamp?: InputMaybe<Order_By>;
  usdAmount?: InputMaybe<Order_By>;
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
  UsdAmount = 'usdAmount',
  /** column name */
  UserId = 'userId'
}

/** aggregate stddev on columns */
export type Withdraw_Tx_Stddev_Fields = {
  __typename?: 'withdraw_tx_stddev_fields';
  amount?: Maybe<Scalars['Float']>;
  assetId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  usdAmount?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "withdraw_tx" */
export type Withdraw_Tx_Stddev_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  usdAmount?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Withdraw_Tx_Stddev_Pop_Fields = {
  __typename?: 'withdraw_tx_stddev_pop_fields';
  amount?: Maybe<Scalars['Float']>;
  assetId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  usdAmount?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "withdraw_tx" */
export type Withdraw_Tx_Stddev_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  usdAmount?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Withdraw_Tx_Stddev_Samp_Fields = {
  __typename?: 'withdraw_tx_stddev_samp_fields';
  amount?: Maybe<Scalars['Float']>;
  assetId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  usdAmount?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "withdraw_tx" */
export type Withdraw_Tx_Stddev_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  usdAmount?: InputMaybe<Order_By>;
};

/** aggregate sum on columns */
export type Withdraw_Tx_Sum_Fields = {
  __typename?: 'withdraw_tx_sum_fields';
  amount?: Maybe<Scalars['numeric']>;
  assetId?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  usdAmount?: Maybe<Scalars['numeric']>;
};

/** order by sum() on columns of table "withdraw_tx" */
export type Withdraw_Tx_Sum_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  usdAmount?: InputMaybe<Order_By>;
};

/** aggregate var_pop on columns */
export type Withdraw_Tx_Var_Pop_Fields = {
  __typename?: 'withdraw_tx_var_pop_fields';
  amount?: Maybe<Scalars['Float']>;
  assetId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  usdAmount?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "withdraw_tx" */
export type Withdraw_Tx_Var_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  usdAmount?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Withdraw_Tx_Var_Samp_Fields = {
  __typename?: 'withdraw_tx_var_samp_fields';
  amount?: Maybe<Scalars['Float']>;
  assetId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  usdAmount?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "withdraw_tx" */
export type Withdraw_Tx_Var_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  usdAmount?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Withdraw_Tx_Variance_Fields = {
  __typename?: 'withdraw_tx_variance_fields';
  amount?: Maybe<Scalars['Float']>;
  assetId?: Maybe<Scalars['Float']>;
  id?: Maybe<Scalars['Float']>;
  usdAmount?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "withdraw_tx" */
export type Withdraw_Tx_Variance_Order_By = {
  amount?: InputMaybe<Order_By>;
  assetId?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  usdAmount?: InputMaybe<Order_By>;
};

export type LiquidationPositionsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
}>;


export type LiquidationPositionsQuery = { __typename?: 'query_root', user: Array<{ __typename?: 'user', address: string, outstandingBorrow: any, liquidationRatio: any, borrowedAssets: Array<{ __typename?: 'user_borrow', asset: { __typename?: 'asset', contractAddress: string, isFa2: boolean, tokenId: number, tokens: Array<{ __typename?: 'token', name?: string | null | undefined, symbol?: string | null | undefined, thumbnail?: string | null | undefined, decimals: number }> } }>, collateralAssets: Array<{ __typename?: 'user_supply', asset: { __typename?: 'asset', contractAddress: string, isFa2: boolean, tokenId: number, tokens: Array<{ __typename?: 'token', name?: string | null | undefined, symbol?: string | null | undefined, thumbnail?: string | null | undefined, decimals: number }> } }> }>, userAggregate: { __typename?: 'user_aggregate', aggregate?: { __typename?: 'user_aggregate_fields', count: number } | null | undefined } };

export type MarketOverviewQueryVariables = Exact<{ [key: string]: never; }>;


export type MarketOverviewQuery = { __typename?: 'query_root', assetAggregate: { __typename?: 'asset_aggregate', aggregate?: { __typename?: 'asset_aggregate_fields', sum?: { __typename?: 'asset_sum_fields', usdSupply?: any | null | undefined, usdBorrow?: any | null | undefined } | null | undefined } | null | undefined }, dailyStats: Array<{ __typename?: 'daily_stats', supplyVolume: any, borrowVolume: any }>, suppliersCount: { __typename?: 'user_supply_aggregate', aggregate?: { __typename?: 'user_supply_aggregate_fields', count: number } | null | undefined }, borowersCount: { __typename?: 'user_borrow_aggregate', aggregate?: { __typename?: 'user_borrow_aggregate_fields', count: number } | null | undefined }, supplyAssets: Array<{ __typename?: 'asset', contractAddress: string, isFa2: boolean, tokenId: number, usdSupply: any, tokens: Array<{ __typename?: 'token', name?: string | null | undefined, symbol?: string | null | undefined, thumbnail?: string | null | undefined, decimals: number }> }>, borrowAssets: Array<{ __typename?: 'asset', contractAddress: string, isFa2: boolean, tokenId: number, usdBorrow: any, tokens: Array<{ __typename?: 'token', name?: string | null | undefined, symbol?: string | null | undefined, thumbnail?: string | null | undefined, decimals: number }> }> };

export type MarketsDetailsQueryVariables = Exact<{
  yToken: Scalars['Int'];
}>;


export type MarketsDetailsQuery = { __typename?: 'query_root', asset: Array<{ __typename?: 'asset', ytoken: number, contractAddress: string, isFa2: boolean, tokenId: number, liquidationThreshold: any, totalSupply: any, totalBorrowed: any, totalLiquid: any, collateralFactor: any, reserves: any, reserveFactor: any, tokens: Array<{ __typename?: 'token', name?: string | null | undefined, symbol?: string | null | undefined, thumbnail?: string | null | undefined, decimals: number }>, rates: Array<{ __typename?: 'rates', supply_apy: any, borrow_apy: any, utilization_rate: any, exchange_rate: any }>, interestModel: { __typename?: 'interest_model', rate: any, multiplier: any, jumpMultiplier: any, kink: any }, borrowersCount: { __typename?: 'user_borrow_aggregate', aggregate?: { __typename?: 'user_borrow_aggregate_fields', count: number } | null | undefined }, suppliersCount: { __typename?: 'user_supply_aggregate', aggregate?: { __typename?: 'user_supply_aggregate_fields', count: number } | null | undefined } }>, oraclePrice: Array<{ __typename?: 'oracle_price', price: any, decimals: any }>, globalFactors: Array<{ __typename?: 'global_factors', liquidationIncentive: any }> };

export type AllAssetsQueryVariables = Exact<{ [key: string]: never; }>;


export type AllAssetsQuery = { __typename?: 'query_root', asset: Array<{ __typename?: 'asset', ytoken: number, contractAddress: string, isFa2: boolean, tokenId: number, totalLiquid: any, totalSupply: any, totalBorrowed: any, reserves: any, reserveFactor: any, collateralFactor: any, liquidationThreshold: any, interestUpdateTime?: any | null | undefined, borrowIndex: any, tokens: Array<{ __typename?: 'token', name?: string | null | undefined, symbol?: string | null | undefined, decimals: number, thumbnail?: string | null | undefined }>, rates: Array<{ __typename?: 'rates', supply_apy: any, borrow_apy: any, borrow_rate: any, utilization_rate: any }>, suppliersCount: { __typename?: 'user_supply_aggregate', aggregate?: { __typename?: 'user_supply_aggregate_fields', count: number } | null | undefined }, borrowersCount: { __typename?: 'user_borrow_aggregate', aggregate?: { __typename?: 'user_borrow_aggregate_fields', count: number } | null | undefined } }> };

export type GlobalFactorsQueryVariables = Exact<{ [key: string]: never; }>;


export type GlobalFactorsQuery = { __typename?: 'query_root', globalFactors: Array<{ __typename?: 'global_factors', yupanaContract: string, priceFeedProxy: string }> };

export type LiquidateQueryVariables = Exact<{
  address?: InputMaybe<Scalars['String']>;
}>;


export type LiquidateQuery = { __typename?: 'query_root', user: Array<{ __typename?: 'user', address: string, liquidationRatio: any, borrowedAssets: Array<{ __typename?: 'user_borrow', borrow: any, asset: { __typename?: 'asset', ytoken: number, contractAddress: string, isFa2: boolean, tokenId: number, tokens: Array<{ __typename?: 'token', name?: string | null | undefined, symbol?: string | null | undefined, thumbnail?: string | null | undefined, decimals: number }> } }>, collateralAssets: Array<{ __typename?: 'user_supply', supply: any, asset: { __typename?: 'asset', ytoken: number, contractAddress: string, isFa2: boolean, tokenId: number, tokens: Array<{ __typename?: 'token', name?: string | null | undefined, symbol?: string | null | undefined, thumbnail?: string | null | undefined, decimals: number }> } }> }>, globalFactors: Array<{ __typename?: 'global_factors', liquidationIncentive: any, closeFactor: any }> };

export type OraclePriceQueryVariables = Exact<{ [key: string]: never; }>;


export type OraclePriceQuery = { __typename?: 'query_root', oraclePrice: Array<{ __typename?: 'oracle_price', ytoken: number, price: any, decimals: any }> };

export type UserBorrowAssetsQueryVariables = Exact<{
  account?: InputMaybe<Scalars['String']>;
}>;


export type UserBorrowAssetsQuery = { __typename?: 'query_root', userBorrow: Array<{ __typename?: 'user_borrow', assetId: number, borrow: any, borrowIndex: any }> };

export type UserSupplyAssetsQueryVariables = Exact<{
  account?: InputMaybe<Scalars['String']>;
}>;


export type UserSupplyAssetsQuery = { __typename?: 'query_root', userSupply: Array<{ __typename?: 'user_supply', assetId: number, supply: any, entered: boolean }> };


export const LiquidationPositionsDocument = gql`
    query LiquidationPositions($limit: Int, $offset: Int) {
  user(
    limit: $limit
    offset: $offset
    where: {liquidationRatio: {_neq: "0", _lte: "1000000000000000000"}}
  ) {
    address
    outstandingBorrow
    liquidationRatio
    borrowedAssets: userBorrow(where: {borrow: {_gt: "0"}}) {
      asset {
        contractAddress
        isFa2
        tokenId
        tokens {
          name
          symbol
          thumbnail
          decimals
        }
      }
    }
    collateralAssets: userSupply(where: {entered: {_eq: true}}) {
      asset {
        contractAddress
        isFa2
        tokenId
        tokens {
          name
          symbol
          thumbnail
          decimals
        }
      }
    }
  }
  userAggregate(
    where: {liquidationRatio: {_neq: "0", _lte: "1000000000000000000"}}
  ) {
    aggregate {
      count
    }
  }
}
    `;

/**
 * __useLiquidationPositionsQuery__
 *
 * To run a query within a React component, call `useLiquidationPositionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useLiquidationPositionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLiquidationPositionsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useLiquidationPositionsQuery(baseOptions?: Apollo.QueryHookOptions<LiquidationPositionsQuery, LiquidationPositionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LiquidationPositionsQuery, LiquidationPositionsQueryVariables>(LiquidationPositionsDocument, options);
      }
export function useLiquidationPositionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LiquidationPositionsQuery, LiquidationPositionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LiquidationPositionsQuery, LiquidationPositionsQueryVariables>(LiquidationPositionsDocument, options);
        }
export type LiquidationPositionsQueryHookResult = ReturnType<typeof useLiquidationPositionsQuery>;
export type LiquidationPositionsLazyQueryHookResult = ReturnType<typeof useLiquidationPositionsLazyQuery>;
export type LiquidationPositionsQueryResult = Apollo.QueryResult<LiquidationPositionsQuery, LiquidationPositionsQueryVariables>;
export const MarketOverviewDocument = gql`
    query MarketOverview {
  assetAggregate {
    aggregate {
      sum {
        usdSupply
        usdBorrow
      }
    }
  }
  dailyStats {
    supplyVolume
    borrowVolume
  }
  suppliersCount: userSupplyAggregate(
    where: {supply: {_gt: "0"}}
    distinct_on: userId
  ) {
    aggregate {
      count
    }
  }
  borowersCount: userBorrowAggregate(
    where: {borrow: {_gt: "0"}}
    distinct_on: userId
  ) {
    aggregate {
      count
    }
  }
  supplyAssets: asset(order_by: {usdSupply: desc}) {
    contractAddress
    isFa2
    tokenId
    tokens {
      name
      symbol
      thumbnail
      decimals
    }
    usdSupply
  }
  borrowAssets: asset(order_by: {usdBorrow: desc}) {
    contractAddress
    isFa2
    tokenId
    tokens {
      name
      symbol
      thumbnail
      decimals
    }
    usdBorrow
  }
}
    `;

/**
 * __useMarketOverviewQuery__
 *
 * To run a query within a React component, call `useMarketOverviewQuery` and pass it any options that fit your needs.
 * When your component renders, `useMarketOverviewQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMarketOverviewQuery({
 *   variables: {
 *   },
 * });
 */
export function useMarketOverviewQuery(baseOptions?: Apollo.QueryHookOptions<MarketOverviewQuery, MarketOverviewQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MarketOverviewQuery, MarketOverviewQueryVariables>(MarketOverviewDocument, options);
      }
export function useMarketOverviewLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MarketOverviewQuery, MarketOverviewQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MarketOverviewQuery, MarketOverviewQueryVariables>(MarketOverviewDocument, options);
        }
export type MarketOverviewQueryHookResult = ReturnType<typeof useMarketOverviewQuery>;
export type MarketOverviewLazyQueryHookResult = ReturnType<typeof useMarketOverviewLazyQuery>;
export type MarketOverviewQueryResult = Apollo.QueryResult<MarketOverviewQuery, MarketOverviewQueryVariables>;
export const MarketsDetailsDocument = gql`
    query MarketsDetails($yToken: Int!) {
  asset(where: {ytoken: {_eq: $yToken}}) {
    ytoken
    contractAddress
    isFa2
    tokenId
    liquidationThreshold
    tokens {
      name
      symbol
      thumbnail
      decimals
    }
    totalSupply
    totalBorrowed
    rates {
      supply_apy
      borrow_apy
      utilization_rate
      exchange_rate
    }
    totalLiquid
    collateralFactor
    reserves
    reserveFactor
    interestModel {
      rate
      multiplier
      jumpMultiplier
      kink
    }
    borrowersCount: assetUserBorrow_aggregate(
      where: {borrow: {_gt: "1000000000000000000"}}
      distinct_on: userId
    ) {
      aggregate {
        count
      }
    }
    suppliersCount: assetUserSupply_aggregate(
      where: {supply: {_gt: "1000000000000000000"}}
      distinct_on: userId
    ) {
      aggregate {
        count
      }
    }
    liquidationThreshold
  }
  oraclePrice(where: {ytoken: {_eq: $yToken}}) {
    price
    decimals
  }
  globalFactors {
    liquidationIncentive
  }
}
    `;

/**
 * __useMarketsDetailsQuery__
 *
 * To run a query within a React component, call `useMarketsDetailsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMarketsDetailsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMarketsDetailsQuery({
 *   variables: {
 *      yToken: // value for 'yToken'
 *   },
 * });
 */
export function useMarketsDetailsQuery(baseOptions: Apollo.QueryHookOptions<MarketsDetailsQuery, MarketsDetailsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MarketsDetailsQuery, MarketsDetailsQueryVariables>(MarketsDetailsDocument, options);
      }
export function useMarketsDetailsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MarketsDetailsQuery, MarketsDetailsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MarketsDetailsQuery, MarketsDetailsQueryVariables>(MarketsDetailsDocument, options);
        }
export type MarketsDetailsQueryHookResult = ReturnType<typeof useMarketsDetailsQuery>;
export type MarketsDetailsLazyQueryHookResult = ReturnType<typeof useMarketsDetailsLazyQuery>;
export type MarketsDetailsQueryResult = Apollo.QueryResult<MarketsDetailsQuery, MarketsDetailsQueryVariables>;
export const AllAssetsDocument = gql`
    query AllAssets {
  asset(order_by: {ytoken: asc}) {
    ytoken
    contractAddress
    isFa2
    tokenId
    tokens {
      name
      symbol
      decimals
      thumbnail
    }
    totalLiquid
    totalSupply
    totalBorrowed
    reserves
    reserveFactor
    collateralFactor
    liquidationThreshold
    rates {
      supply_apy
      borrow_apy
      borrow_rate
      utilization_rate
    }
    interestUpdateTime
    borrowIndex
    suppliersCount: assetUserSupply_aggregate(
      where: {supply: {_gt: "0"}}
      distinct_on: userId
    ) {
      aggregate {
        count
      }
    }
    borrowersCount: assetUserBorrow_aggregate(
      where: {borrow: {_gt: "0"}}
      distinct_on: userId
    ) {
      aggregate {
        count
      }
    }
  }
}
    `;

/**
 * __useAllAssetsQuery__
 *
 * To run a query within a React component, call `useAllAssetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllAssetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllAssetsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAllAssetsQuery(baseOptions?: Apollo.QueryHookOptions<AllAssetsQuery, AllAssetsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllAssetsQuery, AllAssetsQueryVariables>(AllAssetsDocument, options);
      }
export function useAllAssetsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllAssetsQuery, AllAssetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllAssetsQuery, AllAssetsQueryVariables>(AllAssetsDocument, options);
        }
export type AllAssetsQueryHookResult = ReturnType<typeof useAllAssetsQuery>;
export type AllAssetsLazyQueryHookResult = ReturnType<typeof useAllAssetsLazyQuery>;
export type AllAssetsQueryResult = Apollo.QueryResult<AllAssetsQuery, AllAssetsQueryVariables>;
export const GlobalFactorsDocument = gql`
    query GlobalFactors {
  globalFactors {
    yupanaContract
    priceFeedProxy
  }
}
    `;

/**
 * __useGlobalFactorsQuery__
 *
 * To run a query within a React component, call `useGlobalFactorsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGlobalFactorsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGlobalFactorsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGlobalFactorsQuery(baseOptions?: Apollo.QueryHookOptions<GlobalFactorsQuery, GlobalFactorsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GlobalFactorsQuery, GlobalFactorsQueryVariables>(GlobalFactorsDocument, options);
      }
export function useGlobalFactorsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GlobalFactorsQuery, GlobalFactorsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GlobalFactorsQuery, GlobalFactorsQueryVariables>(GlobalFactorsDocument, options);
        }
export type GlobalFactorsQueryHookResult = ReturnType<typeof useGlobalFactorsQuery>;
export type GlobalFactorsLazyQueryHookResult = ReturnType<typeof useGlobalFactorsLazyQuery>;
export type GlobalFactorsQueryResult = Apollo.QueryResult<GlobalFactorsQuery, GlobalFactorsQueryVariables>;
export const LiquidateDocument = gql`
    query Liquidate($address: String) {
  user(
    where: {address: {_eq: $address}, liquidationRatio: {_neq: "0", _lte: "1000000000000000000"}}
  ) {
    address
    liquidationRatio
    borrowedAssets: userBorrow(where: {borrow: {_gt: "0"}}) {
      asset {
        ytoken
        contractAddress
        isFa2
        tokenId
        tokens {
          name
          symbol
          thumbnail
          decimals
        }
      }
      borrow
    }
    collateralAssets: userSupply(where: {entered: {_eq: true}}) {
      asset {
        ytoken
        contractAddress
        isFa2
        tokenId
        tokens {
          name
          symbol
          thumbnail
          decimals
        }
      }
      supply
    }
  }
  globalFactors {
    liquidationIncentive
    closeFactor
  }
}
    `;

/**
 * __useLiquidateQuery__
 *
 * To run a query within a React component, call `useLiquidateQuery` and pass it any options that fit your needs.
 * When your component renders, `useLiquidateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLiquidateQuery({
 *   variables: {
 *      address: // value for 'address'
 *   },
 * });
 */
export function useLiquidateQuery(baseOptions?: Apollo.QueryHookOptions<LiquidateQuery, LiquidateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LiquidateQuery, LiquidateQueryVariables>(LiquidateDocument, options);
      }
export function useLiquidateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LiquidateQuery, LiquidateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LiquidateQuery, LiquidateQueryVariables>(LiquidateDocument, options);
        }
export type LiquidateQueryHookResult = ReturnType<typeof useLiquidateQuery>;
export type LiquidateLazyQueryHookResult = ReturnType<typeof useLiquidateLazyQuery>;
export type LiquidateQueryResult = Apollo.QueryResult<LiquidateQuery, LiquidateQueryVariables>;
export const OraclePriceDocument = gql`
    query OraclePrice {
  oraclePrice {
    ytoken
    price
    decimals
  }
}
    `;

/**
 * __useOraclePriceQuery__
 *
 * To run a query within a React component, call `useOraclePriceQuery` and pass it any options that fit your needs.
 * When your component renders, `useOraclePriceQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOraclePriceQuery({
 *   variables: {
 *   },
 * });
 */
export function useOraclePriceQuery(baseOptions?: Apollo.QueryHookOptions<OraclePriceQuery, OraclePriceQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<OraclePriceQuery, OraclePriceQueryVariables>(OraclePriceDocument, options);
      }
export function useOraclePriceLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<OraclePriceQuery, OraclePriceQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<OraclePriceQuery, OraclePriceQueryVariables>(OraclePriceDocument, options);
        }
export type OraclePriceQueryHookResult = ReturnType<typeof useOraclePriceQuery>;
export type OraclePriceLazyQueryHookResult = ReturnType<typeof useOraclePriceLazyQuery>;
export type OraclePriceQueryResult = Apollo.QueryResult<OraclePriceQuery, OraclePriceQueryVariables>;
export const UserBorrowAssetsDocument = gql`
    query UserBorrowAssets($account: String) {
  userBorrow(where: {userId: {_eq: $account}}, order_by: {asset: {ytoken: asc}}) {
    assetId
    borrow
    borrowIndex
  }
}
    `;

/**
 * __useUserBorrowAssetsQuery__
 *
 * To run a query within a React component, call `useUserBorrowAssetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserBorrowAssetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserBorrowAssetsQuery({
 *   variables: {
 *      account: // value for 'account'
 *   },
 * });
 */
export function useUserBorrowAssetsQuery(baseOptions?: Apollo.QueryHookOptions<UserBorrowAssetsQuery, UserBorrowAssetsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserBorrowAssetsQuery, UserBorrowAssetsQueryVariables>(UserBorrowAssetsDocument, options);
      }
export function useUserBorrowAssetsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserBorrowAssetsQuery, UserBorrowAssetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserBorrowAssetsQuery, UserBorrowAssetsQueryVariables>(UserBorrowAssetsDocument, options);
        }
export type UserBorrowAssetsQueryHookResult = ReturnType<typeof useUserBorrowAssetsQuery>;
export type UserBorrowAssetsLazyQueryHookResult = ReturnType<typeof useUserBorrowAssetsLazyQuery>;
export type UserBorrowAssetsQueryResult = Apollo.QueryResult<UserBorrowAssetsQuery, UserBorrowAssetsQueryVariables>;
export const UserSupplyAssetsDocument = gql`
    query UserSupplyAssets($account: String) {
  userSupply(where: {userId: {_eq: $account}}, order_by: {asset: {ytoken: asc}}) {
    assetId
    supply
    entered
  }
}
    `;

/**
 * __useUserSupplyAssetsQuery__
 *
 * To run a query within a React component, call `useUserSupplyAssetsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserSupplyAssetsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserSupplyAssetsQuery({
 *   variables: {
 *      account: // value for 'account'
 *   },
 * });
 */
export function useUserSupplyAssetsQuery(baseOptions?: Apollo.QueryHookOptions<UserSupplyAssetsQuery, UserSupplyAssetsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserSupplyAssetsQuery, UserSupplyAssetsQueryVariables>(UserSupplyAssetsDocument, options);
      }
export function useUserSupplyAssetsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserSupplyAssetsQuery, UserSupplyAssetsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserSupplyAssetsQuery, UserSupplyAssetsQueryVariables>(UserSupplyAssetsDocument, options);
        }
export type UserSupplyAssetsQueryHookResult = ReturnType<typeof useUserSupplyAssetsQuery>;
export type UserSupplyAssetsLazyQueryHookResult = ReturnType<typeof useUserSupplyAssetsLazyQuery>;
export type UserSupplyAssetsQueryResult = Apollo.QueryResult<UserSupplyAssetsQuery, UserSupplyAssetsQueryVariables>;
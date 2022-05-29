import BigNumber from "bignumber.js";

import {
  COLLATERAL_PRECISION,
  ORACLE_PRICE_PRECISION,
  STANDARD_PRECISION,
} from "constants/defaults";
import { convertUnits, getPrettyPercent } from "utils/helpers/amount";

export const calculateAssetBorrowLimitPercent = (
  borrow: BigNumber,
  oraclePrice: {
    price: string;
    decimals: number;
  },
  maxCollateral: BigNumber
) => {
  const borrowInUsd = convertUnits(borrow, STANDARD_PRECISION)
    .div(oraclePrice.decimals)
    .multipliedBy(convertUnits(oraclePrice.price, ORACLE_PRICE_PRECISION));
  const maxC = convertUnits(maxCollateral, COLLATERAL_PRECISION);
  return getPrettyPercent(borrowInUsd.div(maxC).multipliedBy(1e2));
};

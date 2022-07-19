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
    precision: number;
  },
  maxCollateral: BigNumber
) => {
  const borrowInUsd = convertUnits(borrow, STANDARD_PRECISION)
    .div(oraclePrice.precision)
    .multipliedBy(
      convertUnits(
        new BigNumber(oraclePrice.price).multipliedBy(oraclePrice.precision),
        ORACLE_PRICE_PRECISION
      )
    );
  const maxC = convertUnits(maxCollateral, COLLATERAL_PRECISION);
  return getPrettyPercent(borrowInUsd.div(maxC).multipliedBy(1e2));
};

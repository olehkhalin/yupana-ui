import React, { FC, useCallback, useMemo } from "react";
import { useReactiveVar } from "@apollo/client";

import { STANDARD_PRECISION } from "constants/defaults";
import { useOraclePriceQuery } from "generated/graphql";
import { AssetsResponseData } from "types/asset";
import { convertUnits, getPrettyPercent } from "utils/helpers/amount";
import { calculateAssetBorrowLimitPercent } from "utils/helpers/api";
import { globalVariablesVar } from "utils/cache";
import { AssetName } from "components/common/AssetName";
import { TableCard } from "components/common/TableCard";
import { BalanceAmount } from "components/common/BalanceAmount";
import { BorrowTableDropdown } from "components/tables/TableDropdown";

import s from "./Cards.module.sass";

type YourBorrowAssetsProps = {
  data?: AssetsResponseData;
  tableName: string;
  loading?: boolean;
};

export const YourBorrowAssets: FC<YourBorrowAssetsProps> = ({
  data,
  tableName,
  loading,
}) => {
  const { data: oraclePrices } = useOraclePriceQuery();
  const { maxCollateral } = useReactiveVar(globalVariablesVar);

  const preparedData = useMemo(
    () =>
      (data ?? [0, 1, 2]).map((el: any) => ({
        key: el.yToken ?? el,
        asset: el.asset,
        data: [
          {
            title: "Asset",
            content: (
              <AssetName
                asset={loading ? undefined : el.asset}
                theme="secondary"
                logoClassName={s.logo}
              />
            ),
            isLogo: true,
          },
          {
            title: "Borrow APY",
            content: loading
              ? "—"
              : getPrettyPercent(
                  convertUnits(
                    el.rates.borrowApy,
                    STANDARD_PRECISION
                  ).multipliedBy(1e2)
                ),
          },
          {
            title: "Wallet",
            content: loading ? (
              "—"
            ) : (
              <BalanceAmount
                asset={el.asset}
                isMinified
                preloaderTheme="secondary"
                tooltipTheme="secondary"
                sizeT="small"
              />
            ),
          },
          {
            title: "Borrow limit",
            content: () => {
              if (loading) {
                return "—";
              }

              if (oraclePrices) {
                const oraclePrice = oraclePrices.oraclePrice.find(
                  ({ ytoken }) => ytoken === el.yToken
                );
                if (oraclePrice) {
                  return calculateAssetBorrowLimitPercent(
                    el.borrowWithInterest,
                    oraclePrice,
                    maxCollateral
                  );
                }
              }

              return getPrettyPercent(0);
            },
          },
        ],
        subComponent: {
          yToken: el.yToken,
          asset: el.asset,
          borrowWithInterest: el.borrowWithInterest,
          totalLiquid: el.totalLiquid,
        },
      })),
    [data, loading, maxCollateral, oraclePrices]
  );

  const renderRowSubComponent = useCallback(
    ({ yToken, asset, borrowWithInterest, totalLiquid }) => (
      <BorrowTableDropdown
        theme="secondary"
        yToken={yToken}
        asset={asset}
        borrow={borrowWithInterest}
        liquidity={totalLiquid}
        tableName={tableName}
      />
    ),
    [tableName]
  );

  return (
    <>
      {preparedData.map((item) => (
        <TableCard
          theme="secondary"
          loading={loading}
          key={item.key}
          data={item.data}
          asset={item.asset}
          subComponent={item.subComponent}
          renderRowSubComponent={renderRowSubComponent}
          tableName={tableName}
        />
      ))}
    </>
  );
};

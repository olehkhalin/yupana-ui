import React, { FC, useCallback, useMemo } from "react";

import { STANDARD_PRECISION } from "constants/defaults";
import { AssetsResponseData } from "types/asset";
import { convertUnits, getPrettyPercent } from "utils/helpers/amount";
import { AssetName } from "components/common/AssetName";
import { TableCard } from "components/common/TableCard";
import { BalanceAmount } from "components/common/BalanceAmount";
import { SupplyTableDropdown } from "components/tables/TableDropdown";

import s from "./Cards.module.sass";

type SupplyAssetsProps = {
  data?: AssetsResponseData;
  loading?: boolean;
};

export const SupplyAssets: FC<SupplyAssetsProps> = ({ data, loading }) => {
  const preparedData = useMemo(
    () =>
      (data ?? [0, 1, 2]).map((el: any) => ({
        key: el.yToken ?? el,
        data: [
          {
            title: "Asset",
            content: (
              <AssetName
                asset={loading ? undefined : el.asset}
                theme="primary"
                logoClassName={s.logo}
              />
            ),
            isLogo: true,
          },
          {
            title: "Supply APY",
            content: loading
              ? "—"
              : getPrettyPercent(
                  convertUnits(
                    el.rates.supplyApy,
                    STANDARD_PRECISION
                  ).multipliedBy(1e2)
                ),
          },
          {
            title: "Collateral Factor",
            content: loading
              ? "—"
              : getPrettyPercent(
                  convertUnits(
                    el.collateralFactor,
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
                sizeT="small"
                asset={el.asset}
                isMinified
                preloaderClassName={s.balance}
              />
            ),
          },
        ],
        subComponent: {
          yToken: el.yToken,
          asset: el.asset,
          supplyWithInterest: el.supplyWithInterest,
          collateralFactor: el.collateralFactor,
          isCollateral: el.isCollateral,
          totalLiquid: el.totalLiquid,
        },
      })),
    [data, loading]
  );

  const renderRowSubComponent = useCallback(
    ({
      yToken,
      asset,
      collateralFactor,
      supplyWithInterest,
      totalLiquid,
      isCollateral,
    }) => (
      <SupplyTableDropdown
        yToken={yToken}
        asset={asset}
        collateralFactor={collateralFactor}
        supply={supplyWithInterest}
        totalLiquid={totalLiquid}
        isCollateral={isCollateral}
        isCommon
      />
    ),
    []
  );

  return (
    <>
      {preparedData.map((item) => (
        <TableCard
          loading={loading}
          key={item.key}
          data={item.data}
          subComponent={item.subComponent}
          renderRowSubComponent={renderRowSubComponent}
        />
      ))}
    </>
  );
};

import React, { FC, useCallback, useMemo } from "react";

import { STANDARD_PRECISION } from "constants/defaults";
import { AssetsResponseData } from "types/asset";
import { convertUnits, getPrettyPercent } from "utils/helpers/amount";
import { AssetName } from "components/common/AssetName";
import { TableCard } from "components/common/TableCard";
import { BalanceAmount } from "components/common/BalanceAmount";
import { CollateralSwitcher } from "components/common/CollateralSwitcher";
import { SupplyTableDropdown } from "components/tables/TableDropdown";

import s from "./Cards.module.sass";

type YourSupplyAssetsProps = {
  data?: AssetsResponseData;
  loading?: boolean;
};

export const YourSupplyAssets: FC<YourSupplyAssetsProps> = ({
  data,
  loading,
}) => {
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
            title: "Wallet",
            content: loading ? (
              "—"
            ) : (
              <BalanceAmount asset={el.asset} isMinified />
            ),
          },
          {
            title: "Collateral",
            content: loading ? (
              "—"
            ) : (
              <CollateralSwitcher
                asset={el.asset}
                yToken={el.yToken}
                isCollateral={el.isCollateral}
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
        },
      })),
    [data, loading]
  );

  const renderRowSubComponent = useCallback(
    ({ yToken, asset, collateralFactor, supplyWithInterest, isCollateral }) => (
      <SupplyTableDropdown
        yToken={yToken}
        asset={asset}
        collateralFactor={collateralFactor}
        supply={supplyWithInterest}
        isCollateral={isCollateral}
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

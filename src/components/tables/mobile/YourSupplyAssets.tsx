import React, { FC, useCallback, useMemo } from "react";
import BigNumber from "bignumber.js";

import { STANDARD_PRECISION, WTEZ_CONTRACT } from "constants/defaults";
import { AssetsResponseData } from "types/asset";
import { convertUnits, getPrettyPercent } from "utils/helpers/amount";
import { getSliceAssetName } from "utils/helpers/asset";
import { AssetName } from "components/common/AssetName";
import { TableCard } from "components/common/TableCard";
import { CollateralSwitcher } from "components/common/CollateralSwitcher";
import { PrettyAmount } from "components/common/PrettyAmount";
import { AttentionText } from "components/common/AttentionText";
import { SupplyTableDropdown } from "components/tables/TableDropdown";

import s from "./Cards.module.sass";

type YourSupplyAssetsProps = {
  data?: AssetsResponseData;
  tableName: string;
  loading?: boolean;
};

export const YourSupplyAssets: FC<YourSupplyAssetsProps> = ({
  data,
  tableName,
  loading,
}) => {
  const preparedData = useMemo(
    () =>
      (data ?? [0, 1, 2]).map((el: any) => ({
        key: el.yToken ?? el,
        asset: el.asset,
        data: [
          {
            title: "Asset",
            content:
              !loading && el.asset.contractAddress === WTEZ_CONTRACT ? (
                <AttentionText
                  text={
                    <AssetName
                      asset={loading ? undefined : el.asset}
                      theme="primary"
                      logoClassName={s.logo}
                    />
                  }
                  title="Wrapped XTZ"
                  description="Yupana.Finance lending protocol only works with FA1.2 and FA2 tokens. However, the protocol team developed the 1:1 Wrapped Tezos FA2 token. So you transfer XTZ to the protocol and the protocol automatically wraps your XTZ in Wrapped Tezos FA2 token and Supply it in the protocol. Withdraw, Borrow, and Repay occur in the same way. The user doesn't work directly with the wrap, Yupana does all the magic itself."
                  attentionSize="small"
                />
              ) : (
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
            title: "Supplied",
            content: loading ? (
              "—"
            ) : (
              <PrettyAmount
                amount={convertUnits(
                  convertUnits(el.supplyWithInterest, STANDARD_PRECISION) ??
                    new BigNumber(0),
                  el.asset.decimals,
                  true
                )}
                currency={getSliceAssetName(el.asset)}
                isMinified
              />
            ),
          },
          {
            title: "Collateral",
            content: loading ? (
              "—"
            ) : el.collateralFactor.eq(0) ? (
              ""
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
        tableName={tableName}
      />
    ),
    [tableName]
  );

  return (
    <>
      {preparedData.map((item) => (
        <TableCard
          loading={loading}
          key={item.key}
          data={item.data}
          asset={item.asset}
          subComponent={item.subComponent}
          renderRowSubComponent={renderRowSubComponent}
          tableName={tableName}
          tableKey="your_supply"
        />
      ))}
    </>
  );
};

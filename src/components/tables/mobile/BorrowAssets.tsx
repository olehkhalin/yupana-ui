import React, { FC, useCallback, useMemo } from "react";

import { STANDARD_PRECISION, WTEZ_CONTRACT } from "constants/defaults";
import { AssetsResponseData } from "types/asset";
import { convertUnits, getPrettyPercent } from "utils/helpers/amount";
import { getSliceAssetName } from "utils/helpers/asset";
import { AssetName } from "components/common/AssetName";
import { TableCard } from "components/common/TableCard";
import { PrettyAmount } from "components/common/PrettyAmount";
import { AttentionText } from "components/common/AttentionText";
import { BorrowTableDropdown } from "components/tables/TableDropdown";

import s from "./Cards.module.sass";

type BorrowAssetsProps = {
  data?: AssetsResponseData;
  tableName: string;
  loading?: boolean;
};

export const BorrowAssets: FC<BorrowAssetsProps> = ({
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
                      theme="secondary"
                      logoClassName={s.logo}
                    />
                  }
                  title="Wrapped XTZ"
                  description="Yupana.Finance lending protocol only works with FA1.2 and FA2 tokens. However, the protocol team developed the 1:1 Wrapped Tezos FA2 token. So you transfer XTZ to the protocol and the protocol automatically wraps your XTZ in Wrapped Tezos FA2 token and Supply it in the protocol. Withdraw, Borrow, and Repay occur in the same way. The user doesn't work directly with the wrap, Yupana does all the magic itself."
                  theme="secondary"
                  attentionSize="small"
                />
              ) : (
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
            title: "Utilisation rate",
            content: loading
              ? "—"
              : getPrettyPercent(
                  convertUnits(el.rates.utilizationRate, STANDARD_PRECISION)
                ),
          },
          {
            title: "Liquidity",
            content: loading ? (
              "—"
            ) : (
              <PrettyAmount
                amount={convertUnits(
                  convertUnits(el.totalLiquid, STANDARD_PRECISION),
                  el.asset.decimals,
                  true
                )}
                currency={getSliceAssetName(el.asset)}
                isMinified
                tooltipTheme="secondary"
              />
            ),
          },
        ],
        subComponent: {
          yToken: el.yToken,
          asset: el.asset,
          borrowWithInterest: el.borrowWithInterest,
          totalLiquid: el.totalLiquid,
        },
      })),
    [data, loading]
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
          tableKey="borrow"
        />
      ))}
    </>
  );
};

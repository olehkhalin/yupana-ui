import React, { FC, useCallback, useMemo } from "react";

import { STANDARD_PRECISION } from "constants/defaults";
import { AssetsResponseData } from "types/asset";
import { convertUnits, getPrettyPercent } from "utils/helpers/amount";
import { getSliceAssetName } from "utils/helpers/asset";
import { AssetName } from "components/common/AssetName";
import { TableCard } from "components/common/TableCard";
import { PrettyAmount } from "components/common/PrettyAmount";
import { BorrowTableDropdown } from "components/tables/TableDropdown";

import s from "./Cards.module.sass";

type BorrowAssetsProps = {
  data?: AssetsResponseData;
  loading?: boolean;
};

export const BorrowAssets: FC<BorrowAssetsProps> = ({ data, loading }) => {
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
      />
    ),
    []
  );

  return (
    <>
      {preparedData.map((item) => (
        <TableCard
          theme="secondary"
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

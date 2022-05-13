import React, { FC, useCallback, useMemo } from "react";
import BigNumber from "bignumber.js";

import { events } from "constants/analytics";
import { ORACLE_PRICE_PRECISION, STANDARD_PRECISION } from "constants/defaults";
import { AssetsResponseData, AssetType } from "types/asset";
import { getAssetName } from "utils/helpers/asset";
import { AnalyticsEventCategory } from "utils/analytics/analytics-event";
import { convertUnits, getPrettyPercent } from "utils/helpers/amount";
import { useAnalytics } from "hooks/useAnalytics";
import { AssetName } from "components/common/AssetName";
import { TableCard } from "components/common/TableCard";
import { PrettyAmount } from "components/common/PrettyAmount";
import { AppRoutes } from "routes/main-routes";
import { useOraclePriceQuery } from "generated/graphql";

import s from "./Cards.module.sass";

type MarketsProps = {
  data?: AssetsResponseData;
  loading?: boolean;
};

export const Markets: FC<MarketsProps> = ({ data, loading }) => {
  const { data: oraclePrices } = useOraclePriceQuery();
  const { trackEvent } = useAnalytics();

  const handleEventTrack = useCallback(
    (asset: AssetType) => {
      trackEvent(events.markets.details, AnalyticsEventCategory.MARKETS, {
        asset: getAssetName(asset),
      });
    },
    [trackEvent]
  );

  const calculateUsdTotals = useCallback(
    (
      total: BigNumber,
      yToken: number,
      asset: AssetType,
      exchangeRate?: BigNumber
    ) => {
      const oraclePrice = oraclePrices
        ? oraclePrices.oraclePrice.find(({ ytoken }) => ytoken === yToken) ?? {
            price: new BigNumber(0),
            decimals: 0,
          }
        : {
            price: new BigNumber(0),
            decimals: 0,
          };

      return convertUnits(
        convertUnits(total.multipliedBy(exchangeRate ?? 1), STANDARD_PRECISION),
        asset.decimals
      )
        .multipliedBy(convertUnits(oraclePrice.price, ORACLE_PRICE_PRECISION))
        .multipliedBy(oraclePrice.decimals);
    },
    [oraclePrices]
  );

  const preparedData = useMemo(
    () =>
      (data ?? [0, 1, 2]).map((el: any) => ({
        key: el.yToken ?? el,
        href: `${AppRoutes.MARKETS}/${el.yToken}`,
        asset: el.asset,
        data: [
          {
            title: "Market",
            content: (
              <AssetName
                asset={loading ? undefined : el.asset}
                loading={loading}
                href={`${AppRoutes.MARKETS}/${el.yToken}`}
                theme="tertiary"
                onClick={() => handleEventTrack(el.asset)}
              />
            ),
            isLogo: true,
          },
          {
            title: "Total Supply",
            content: loading ? (
              "—"
            ) : (
              <PrettyAmount
                amount={calculateUsdTotals(
                  el.totalSupply,
                  el.yToken,
                  el.asset,
                  el.exchangeRate
                )}
                isConvertable
                className={s.blue}
                theme="primary"
              />
            ),
            rowClassName: s.blue,
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
            rowClassName: s.blue,
          },
          {
            title: "# of supplier",
            content: loading ? "—" : el.numberOfSuppliers,
            rowClassName: s.blue,
          },
          {
            title: "Total borrow",
            content: loading ? (
              "—"
            ) : (
              <PrettyAmount
                amount={calculateUsdTotals(
                  el.totalBorrowed,
                  el.yToken,
                  el.asset
                )}
                isConvertable
                theme="secondary"
              />
            ),
            rowClassName: s.yellow,
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
            rowClassName: s.yellow,
          },
          {
            title: "# of borrowers",
            content: loading ? "—" : el.numberOfBorrowers,
            rowClassName: s.yellow,
          },
        ],
      })),
    [calculateUsdTotals, data, handleEventTrack, loading]
  );

  return (
    <>
      {preparedData.map((item) => (
        <TableCard
          theme="tertiary"
          loading={loading}
          key={item.key}
          data={item.data}
          href={item.href}
          asset={item.asset}
        />
      ))}
    </>
  );
};

import React, { FC, useMemo } from "react";

import { getPrettyPercent } from "utils/helpers/amount";
import { shortize } from "utils/helpers/asset";
import { TableCard } from "components/common/TableCard";
import { PrettyAmount } from "components/common/PrettyAmount";
import { AttentionText } from "components/common/AttentionText";
import { LiquidateData } from "components/tables/containers";

import s from "./Cards.module.sass";

type LiquidateProps = {
  data?: LiquidateData;
  loading?: boolean;
};

export const Liquidate: FC<LiquidateProps> = ({ data, loading }) => {
  const preparedData = useMemo(
    () =>
      (data ?? [0]).map((el: any) => ({
        key: el.borrowerAddress ?? el,
        asset: el.asset,
        data: [
          {
            title: "Total Borrow",
            content: loading ? (
              "—"
            ) : (
              <PrettyAmount
                amount={el.totalBorrowed}
                isConvertable
                theme="secondary"
              />
            ),
            rowClassName: s.yellow,
          },
          {
            title: "Borrowed asset",
            content:
              loading || !el.borrowedAssetsNames
                ? "—"
                : el.borrowedAssetsNames.join(", "),
            rowClassName: s.yellow,
          },
          {
            title: "Collateral asset",
            content:
              loading || !el.collateralAssetsNames
                ? "—"
                : el.collateralAssetsNames.join(", "),
            rowClassName: s.blue,
          },
          {
            title: (
              <AttentionText
                text="Health factor"
                title="Health factor"
                description="The health factor represents the safety of your loan derived from the proportion of collateral versus amount borrowed. Keep it above 1 to avoid liquidation."
                theme="secondary"
              />
            ),
            content: loading ? "—" : getPrettyPercent(el.healthFactor),
            rowClassName: s.yellow,
          },
          {
            title: "Borrower address",
            content: loading ? "—" : shortize(el.borrowerAddress),
            rowClassName: s.yellow,
          },
        ],
      })),
    [data, loading]
  );

  return (
    <>
      {preparedData.map((item) => (
        <TableCard
          theme="tertiary"
          loading={loading}
          key={item.key}
          data={item.data}
          className={s.liquidate}
        />
      ))}
    </>
  );
};

import React, { FC, useMemo } from "react";

import { getPrettyPercent } from "utils/helpers/amount";
import { TableCard } from "components/common/TableCard";
import { PrettyAmount } from "components/common/PrettyAmount";
import { MarketsDetailsInfo } from "components/tables/containers/MarketsDetails";

import s from "./Cards.module.sass";

type MarketsDetailsProps = {
  data?: MarketsDetailsInfo[];
  loading?: boolean;
};

export const MarketsDetails: FC<MarketsDetailsProps> = ({ data, loading }) => {
  const preparedData = useMemo(
    () =>
      (data ?? [0]).map((el: any) => ({
        key: el.yToken ?? el,
        data: [
          {
            title: "Total Supply",
            content: loading ? (
              "—"
            ) : (
              <PrettyAmount amount={el.totalSupply} isConvertable />
            ),
            rowClassName: s.blue,
          },
          {
            title: "Supply APY",
            content: loading ? "—" : getPrettyPercent(el.supplyApy),
            rowClassName: s.blue,
          },
          {
            title: "# of supplier",
            content: loading ? "—" : el.numberOfSupplier,
            rowClassName: s.blue,
          },
          {
            title: "Total borrow",
            content: loading ? (
              "—"
            ) : (
              <PrettyAmount amount={el.totalBorrow} isConvertable />
            ),
            rowClassName: s.yellow,
          },
          {
            title: "Borrow APY",
            content: loading ? "—" : getPrettyPercent(el.borrowApy),
            rowClassName: s.yellow,
          },
          {
            title: "# of borrowers",
            content: loading ? "—" : el.numberOfBorrowers,
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
          className={s.marketsDetails}
        />
      ))}
    </>
  );
};

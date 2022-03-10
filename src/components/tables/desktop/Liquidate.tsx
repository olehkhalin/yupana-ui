import React, { FC, useMemo } from "react";
import { Cell } from "react-table";
import cx from "classnames";

import { shortize } from "utils/helpers/asset";
import { getPrettyPercent } from "utils/helpers/amount";
import { Table } from "components/ui/Table";
import { AttentionText } from "components/common/AttentionText";
import { PrettyAmount } from "components/common/PrettyAmount";
import { LiquidateData } from "components/tables/containers";

import s from "./Tables.module.sass";

type LiquidateProps = {
  data?: LiquidateData;
  loading?: boolean;
  className?: string;
};

export const Liquidate: FC<LiquidateProps> = ({ data, loading, className }) => {
  const columns = useMemo(
    () => [
      {
        Header: () => <span className={s.white}>Borrower address</span>,
        accessor: "borrowerAddress",
        Cell: ({ cell: { value } }: { cell: Cell }) => (
          <div className={cx(s.address, s.white, s.noShadow)}>
            {loading ? "—" : shortize(value)}
          </div>
        ),
      },
      {
        Header: () => <span className={s.yellow}>Total Borrow</span>,
        accessor: "totalBorrowed",
        Cell: ({ cell: { value } }: { cell: Cell }) => (
          <span className={s.yellow}>
            {loading ? (
              "—"
            ) : (
              <PrettyAmount amount={value} theme="secondary" isConvertable />
            )}
          </span>
        ),
      },
      {
        Header: () => (
          <div className={cx(s.wrapper, s.yellow)}>
            <AttentionText
              text="Health factor"
              title="Health factor"
              description="The health factor represents the safety of your loan derived from the proportion of collateral versus amount borrowed. Keep it above 1 to avoid liquidation."
              theme="secondary"
            />
          </div>
        ),
        accessor: "healthFactor",
        Cell: ({ cell: { value } }: { cell: Cell }) => (
          <span className={s.yellow}>
            {loading ? "—" : getPrettyPercent(value)}
          </span>
        ),
      },
      {
        Header: () => <span className={s.yellow}>Borrowed asset</span>,
        accessor: "borrowedAssetsNames",
        Cell: ({ cell: { value } }: { cell: Cell }) => (
          <span className={s.yellow}>
            {loading || !value ? "—" : value.join(", ")}
          </span>
        ),
      },
      {
        Header: () => <span className={s.blue}>Collateral asset</span>,
        accessor: "collateralAssetsNames",
        Cell: ({ cell: { value } }: { cell: Cell }) => (
          <span className={s.blue}>
            {loading || !value ? "—" : value.join(", ")}
          </span>
        ),
      },
    ],
    [loading]
  );

  return (
    <Table
      theme="tertiary"
      columns={columns}
      data={data ?? [0]}
      loading={loading}
      tableClassName={s.bigTableLiquidate}
      rowClassName={s.liquidateRow}
      className={cx(s.bigTableWrapper, className)}
    />
  );
};

import React, { FC, useMemo } from "react";
import { Cell } from "react-table";
import cx from "classnames";

import { getPrettyPercent } from "utils/helpers/amount";
import { Table } from "components/ui/Table";
import { PrettyAmount } from "components/common/PrettyAmount";
import { MarketsDetailsInfo } from "components/tables/containers/MarketsDetails";

import s from "./Tables.module.sass";

type MarketsDetailsProps = {
  data?: MarketsDetailsInfo[];
  loading?: boolean;
  className?: string;
};

export const MarketsDetails: FC<MarketsDetailsProps> = ({
  data,
  loading,
  className,
}) => {
  const columns = useMemo(
    () => [
      {
        Header: () => <span className={s.blue}>Total Supply</span>,
        accessor: "totalSupply",
        Cell: ({ cell: { value } }: { cell: Cell }) => (
          <span className={s.blue}>
            {loading ? (
              "—"
            ) : (
              <PrettyAmount amount={value} theme="primary" isConvertable />
            )}
          </span>
        ),
      },
      {
        Header: () => <span className={s.blue}>Supply APY</span>,
        accessor: "supplyApy",
        Cell: ({ cell: { value } }: { cell: Cell }) => (
          <span className={s.blue}>
            {loading ? "—" : getPrettyPercent(value)}
          </span>
        ),
      },
      {
        Header: () => <span className={s.blue}># of supplier</span>,
        accessor: "numberOfSupplier",
        Cell: ({ cell: { value } }: { cell: Cell }) => (
          <span className={s.blue}>{loading ? "—" : value}</span>
        ),
      },
      {
        Header: () => <span className={s.yellow}>Total borrow</span>,
        accessor: "totalBorrow",
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
        Header: () => <span className={s.yellow}>Borrow APY</span>,
        accessor: "borrowApy",
        Cell: ({ cell: { value } }: { cell: Cell }) => (
          <span className={s.yellow}>
            {loading ? "—" : getPrettyPercent(value)}
          </span>
        ),
      },
      {
        Header: () => <span className={s.yellow}># of borrowers</span>,
        accessor: "numberOfBorrowers",
        Cell: ({ cell: { value } }: { cell: Cell }) => (
          <span className={s.yellow}>{loading ? "—" : value}</span>
        ),
      },
    ],
    [loading]
  );

  return (
    <Table
      columns={columns}
      theme="tertiary"
      data={data ?? [0]}
      loading={loading}
      emptyText="There is no market details"
      tableClassName={s.bigTable}
      rowClassName={s.marketsDetailsRow}
      className={cx(s.bigTableWrapper, className)}
    />
  );
};

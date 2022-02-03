import React, { useCallback, useMemo } from "react";
import { Cell, Row } from "react-table";

import { STANDARD_PRECISION } from "constants/defaults";
import { AssetsResponseData } from "types/asset";
import { convertUnits, getPrettyPercent } from "utils/helpers/amount";
import { Table } from "components/ui/Table";
import { AssetName } from "components/common/AssetName";
import { BalanceAmount } from "components/common/BalanceAmount";
import { DropdownArrow } from "components/tables/DropdownArrow";
import { BorrowTableDropdown } from "components/tables/TableDropdown";

import s from "./Tables.module.sass";

type YourBorrowAssetsProps = {
  data?: AssetsResponseData;
  loading?: boolean;
  className?: string;
};

export const YourBorrowAssets: React.FC<YourBorrowAssetsProps> = ({
  data,
  loading,
  className,
}) => {
  const columns = useMemo(
    () => [
      {
        Header: "Asset",
        accessor: "asset",
        Cell: ({ cell: { value }, row }: { cell: Cell; row: Row }) => (
          <AssetName
            theme="secondary"
            asset={loading ? undefined : { ...value }}
            loading={loading}
            {...row.getToggleRowExpandedProps()}
          />
        ),
      },
      {
        Header: "Borrow APY",
        accessor: "rates.borrowApy",
        Cell: ({ cell: { value } }: { cell: Cell }) =>
          loading
            ? "—"
            : getPrettyPercent(
                convertUnits(value, STANDARD_PRECISION).multipliedBy(1e2)
              ),
      },
      {
        Header: "Wallet",
        id: "wallet",
        accessor: "asset",
        Cell: ({ cell: { value } }: { cell: Cell }) =>
          loading ? (
            "—"
          ) : (
            <BalanceAmount
              asset={value}
              isMinified
              preloaderTheme="secondary"
            />
          ),
      },
      {
        Header: "Borrow limit",
        accessor: "rates.utilizationRate",
        Cell: ({ cell: { value } }: { cell: Cell }) =>
          loading
            ? "—"
            : getPrettyPercent(convertUnits(value, STANDARD_PRECISION)),
      },
      {
        Header: () => null,
        id: "expander",
        Cell: ({ row }: { row: Row }) => (
          <DropdownArrow
            theme="secondary"
            active={row.isExpanded}
            className={s.icon}
            loading={loading}
            {...row.getToggleRowExpandedProps()}
          />
        ),
      },
    ],
    [loading]
  );
  const renderRowSubComponent = useCallback(
    ({
      row: {
        original: { yToken, asset, borrow, totalLiquid },
      },
    }) => (
      <BorrowTableDropdown
        theme="secondary"
        yToken={yToken}
        asset={asset}
        borrow={borrow}
        liquidity={totalLiquid}
      />
    ),
    []
  );

  return (
    <Table
      theme="secondary"
      columns={columns}
      data={data ?? [0, 1, 2]}
      emptyText="You have no borrowed assets"
      loading={loading}
      rowClassName={s.ownAssetsRow}
      className={className}
      renderRowSubComponent={renderRowSubComponent}
    />
  );
};

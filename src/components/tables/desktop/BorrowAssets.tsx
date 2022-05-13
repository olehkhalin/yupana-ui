import React, { FC, useCallback, useMemo } from "react";
import BigNumber from "bignumber.js";
import { Cell, Row } from "react-table";

import { STANDARD_PRECISION } from "constants/defaults";
import { AssetsResponseData, AssetType } from "types/asset";
import { getSliceAssetName } from "utils/helpers/asset";
import { convertUnits, getPrettyPercent } from "utils/helpers/amount";
import { Table } from "components/ui/Table";
import { AssetName } from "components/common/AssetName";
import { PrettyAmount } from "components/common/PrettyAmount";
import { DropdownArrow } from "components/tables/DropdownArrow";
import { BorrowTableDropdown } from "components/tables/TableDropdown";

import s from "./Tables.module.sass";

type BorrowAssetsProps = {
  data?: AssetsResponseData;
  tableName: string;
  loading?: boolean;
  className?: string;
};

export const BorrowAssets: FC<BorrowAssetsProps> = ({
  data,
  tableName,
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
        Header: "Utilisation rate",
        accessor: "rates.utilizationRate",
        Cell: ({ cell: { value } }: { cell: Cell }) =>
          loading
            ? "—"
            : getPrettyPercent(convertUnits(value, STANDARD_PRECISION)),
      },
      {
        Header: "Liquidity",
        accessor: (row: { totalLiquid: BigNumber; asset: AssetType }) => ({
          totalLiquid: row.totalLiquid,
          asset: row.asset,
        }),
        Cell: ({ cell: { value } }: { cell: Cell }) =>
          loading ? (
            "—"
          ) : (
            <PrettyAmount
              amount={convertUnits(
                convertUnits(value.totalLiquid, STANDARD_PRECISION),
                value.asset.decimals,
                true
              )}
              currency={getSliceAssetName(value.asset)}
              isMinified
              tooltipTheme="secondary"
            />
          ),
      },
      {
        Header: () => null,
        id: "expander",
        Cell: ({ row }: { row: Row }) => (
          <DropdownArrow
            theme="secondary"
            tableName={tableName}
            tableKey="borrow"
            asset={(row.original as any).asset}
            active={row.isExpanded}
            className={s.icon}
            loading={loading}
            {...row.getToggleRowExpandedProps()}
          />
        ),
      },
    ],
    [loading, tableName]
  );
  const renderRowSubComponent = useCallback(
    ({
      row: {
        original: { yToken, asset, borrowWithInterest, totalLiquid },
      },
    }) => (
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
    <Table
      theme="secondary"
      columns={columns}
      data={data ?? [0, 1, 2]}
      loading={loading}
      emptyText="There is no borrow assets"
      rowClassName={s.borrowRow}
      className={className}
      renderRowSubComponent={renderRowSubComponent}
    />
  );
};

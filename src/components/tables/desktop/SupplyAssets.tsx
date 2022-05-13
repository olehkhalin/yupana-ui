import React, { FC, useCallback, useMemo } from "react";
import { Cell, Row } from "react-table";
import cx from "classnames";

import { STANDARD_PRECISION } from "constants/defaults";
import { AssetsResponseData } from "types/asset";
import { convertUnits, getPrettyPercent } from "utils/helpers/amount";
import { Table } from "components/ui/Table";
import { Tooltip } from "components/ui/Tooltip";
import { AssetName } from "components/common/AssetName";
import { BalanceAmount } from "components/common/BalanceAmount";
import { DropdownArrow } from "components/tables/DropdownArrow";
import { SupplyTableDropdown } from "components/tables/TableDropdown";

import s from "./Tables.module.sass";

type SupplyAssetsProps = {
  data?: AssetsResponseData;
  tableName: string;
  loading?: boolean;
  className?: string;
};

export const SupplyAssets: FC<SupplyAssetsProps> = ({
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
            theme="primary"
            asset={loading ? undefined : { ...value }}
            loading={loading}
            {...row.getToggleRowExpandedProps()}
          />
        ),
      },
      {
        Header: "Supply APY",
        accessor: "rates.supplyApy",
        Cell: ({ cell: { value } }: { cell: Cell }) =>
          loading
            ? "—"
            : getPrettyPercent(
                convertUnits(value, STANDARD_PRECISION).multipliedBy(1e2)
              ),
      },
      {
        Header: () => (
          <Tooltip content="Collateral Factor">
            <>Coll. Fact.</>
          </Tooltip>
        ),
        accessor: "collateralFactor",
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
          loading ? "—" : <BalanceAmount asset={value} isMinified />,
      },
      {
        Header: () => null,
        id: "expander",
        Cell: ({ row }: { row: Row }) => {
          return (
            <DropdownArrow
              active={row.isExpanded}
              asset={(row.original as any).asset}
              tableName={tableName}
              tableKey="supply"
              className={s.icon}
              loading={loading}
              {...row.getToggleRowExpandedProps()}
            />
          );
        },
      },
    ],
    [loading, tableName]
  );
  const renderRowSubComponent = useCallback(
    ({
      row: {
        original: {
          yToken,
          asset,
          supplyWithInterest,
          totalLiquid,
          collateralFactor,
          isCollateral,
        },
      },
    }) => (
      <SupplyTableDropdown
        yToken={yToken}
        asset={asset}
        collateralFactor={collateralFactor}
        supply={supplyWithInterest}
        totalLiquid={totalLiquid}
        isCollateral={isCollateral}
        isCommon
        tableName={tableName}
      />
    ),
    [tableName]
  );

  return (
    <Table
      columns={columns}
      data={data ?? [0, 1, 2]}
      loading={loading}
      emptyText="There is no supply assets"
      rowClassName={s.supplyRow}
      className={cx(s.root, className)}
      renderRowSubComponent={renderRowSubComponent}
    />
  );
};

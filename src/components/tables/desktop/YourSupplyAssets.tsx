import React, { useCallback, useMemo } from "react";
import { Cell, Row } from "react-table";

import { STANDARD_PRECISION } from "constants/defaults";
import { AssetsResponseData } from "types/asset";
import { convertUnits, getPrettyPercent } from "utils/helpers/amount";
import { Table } from "components/ui/Table";
import { AssetName } from "components/common/AssetName";
import { CollateralSwitcher } from "components/common/CollateralSwitcher";
import { BalanceAmount } from "components/common/BalanceAmount";
import { DropdownArrow } from "components/tables/DropdownArrow";
import { SupplyTableDropdown } from "components/tables/TableDropdown";

import s from "./Tables.module.sass";

type YourSupplyAssetsProps = {
  data?: AssetsResponseData;
  loading?: boolean;
  className?: string;
};

export const YourSupplyAssets: React.FC<YourSupplyAssetsProps> = ({
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
        Header: "Wallet",
        id: "wallet",
        accessor: "asset",
        Cell: ({ cell: { value } }: { cell: Cell }) =>
          loading ? "—" : <BalanceAmount asset={value} isMinified />,
      },
      {
        Header: "Collateral",
        accessor: (row: { isCollateral: boolean; yToken: number }) => ({
          isCollateral: row.isCollateral,
          yToken: row.yToken,
        }),
        Cell: ({ cell: { value } }: { cell: Cell }) =>
          loading ? (
            "—"
          ) : (
            <CollateralSwitcher
              yToken={value.yToken}
              isCollateral={value.isCollateral}
            />
          ),
      },
      {
        Header: () => null,
        id: "expander",
        Cell: ({ row }: { row: Row }) => (
          <DropdownArrow
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
        original: { yToken, asset, supply, collateralFactor, isCollateral },
      },
    }) => (
      <SupplyTableDropdown
        yToken={yToken}
        asset={asset}
        collateralFactor={collateralFactor}
        supply={supply}
        isCollateral={isCollateral}
      />
    ),
    []
  );

  return (
    <Table
      columns={columns}
      data={data ?? [0, 1, 2]}
      loading={loading}
      emptyText="You have no supplied assets"
      rowClassName={s.ownAssetsRow}
      className={className}
      renderRowSubComponent={renderRowSubComponent}
    />
  );
};

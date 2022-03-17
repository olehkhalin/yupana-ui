import React, { FC, useCallback, useMemo } from "react";
import BigNumber from "bignumber.js";
import { Cell, Row } from "react-table";
import cx from "classnames";

import { STANDARD_PRECISION } from "constants/defaults";
import { AssetsResponseData, AssetsResponseItem } from "types/asset";
import { getSliceAssetName } from "utils/helpers/asset";
import { convertUnits, getPrettyPercent } from "utils/helpers/amount";
import { Table } from "components/ui/Table";
import { PrettyAmount } from "components/common/PrettyAmount";
import { AssetName } from "components/common/AssetName";
import { DropdownArrow } from "components/tables/DropdownArrow";
import { SupplyTableDropdown } from "components/tables/TableDropdown";

import s from "./Tables.module.sass";
import { Tooltip } from "components/ui/Tooltip";
import { TextWithTooltip } from "components/common/TextWithTooltip";

type SupplyAssetsProps = {
  data?: AssetsResponseData;
  loading?: boolean;
  className?: string;
};

export const SupplyAssets: FC<SupplyAssetsProps> = ({
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
        Header: () => (
          <TextWithTooltip
            text="Coll. Fact."
            tooltipContent="Collateral Factor"
          />
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
        Header: "Supplied",
        id: "supply",
        accessor: ({ supply, asset }: AssetsResponseItem) =>
          loading ? (
            "—"
          ) : (
            <PrettyAmount
              amount={convertUnits(
                convertUnits(supply, STANDARD_PRECISION) ?? new BigNumber(0),
                asset.decimals,
                true
              )}
              currency={getSliceAssetName(asset)}
              isMinified
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
      />
    ),
    []
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

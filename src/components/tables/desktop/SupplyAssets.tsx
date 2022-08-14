import React, { FC, useCallback, useMemo } from "react";
import { Cell, Row } from "react-table";
import cx from "classnames";

import { STANDARD_PRECISION, WTEZ_CONTRACT } from "constants/defaults";
import { AssetsResponseData } from "types/asset";
import { convertUnits, getPrettyPercent } from "utils/helpers/amount";
import { Table } from "components/ui/Table";
import { Tooltip } from "components/ui/Tooltip";
import { AssetName } from "components/common/AssetName";
import { BalanceAmount } from "components/common/BalanceAmount";
import { AttentionText } from "components/common/AttentionText";
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
        Cell: ({ cell: { value }, row }: { cell: Cell; row: Row }) => {
          return !loading && value.contractAddress === WTEZ_CONTRACT ? (
            <AttentionText
              text={
                <AssetName
                  theme="primary"
                  asset={loading ? undefined : { ...value }}
                  loading={loading}
                  {...row.getToggleRowExpandedProps()}
                />
              }
              title="Wrapped XTZ"
              description="Yupana.Finance lending protocol only works with FA1.2 and FA2 tokens. However, the protocol team developed the 1:1 Wrapped Tezos FA2 token. So you transfer XTZ to the protocol and the protocol automatically wraps your XTZ in Wrapped Tezos FA2 token and Supply it in the protocol. Withdraw, Borrow, and Repay occur in the same way. The user doesn't work directly with the wrap, Yupana does all the magic itself."
              attentionSize="small"
            />
          ) : (
            <AssetName
              theme="primary"
              asset={loading ? undefined : { ...value }}
              loading={loading}
              {...row.getToggleRowExpandedProps()}
            />
          );
        },
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
      emptyText="There are no supply assets"
      rowClassName={s.supplyRow}
      className={cx(s.root, className)}
      renderRowSubComponent={renderRowSubComponent}
    />
  );
};

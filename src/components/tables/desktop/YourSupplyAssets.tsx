import React, { FC, useCallback, useMemo } from "react";
import { Cell, Row } from "react-table";
import BigNumber from "bignumber.js";

import { STANDARD_PRECISION, WTEZ_CONTRACT } from "constants/defaults";
import { AssetsResponseData, AssetType } from "types/asset";
import { convertUnits, getPrettyPercent } from "utils/helpers/amount";
import { getSliceAssetName } from "utils/helpers/asset";
import { Table } from "components/ui/Table";
import { PrettyAmount } from "components/common/PrettyAmount";
import { AssetName } from "components/common/AssetName";
import { CollateralSwitcher } from "components/common/CollateralSwitcher";
import { AttentionText } from "components/common/AttentionText";
import { DropdownArrow } from "components/tables/DropdownArrow";
import { SupplyTableDropdown } from "components/tables/TableDropdown";

import s from "./Tables.module.sass";

type YourSupplyAssetsProps = {
  data?: AssetsResponseData;
  tableName: string;
  loading?: boolean;
  className?: string;
};

export const YourSupplyAssets: FC<YourSupplyAssetsProps> = ({
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
        Cell: ({ cell: { value }, row }: { cell: Cell; row: Row }) =>
          !loading && value.contractAddress === WTEZ_CONTRACT ? (
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
        Header: "Supplied",
        id: "supply",
        accessor: (row: {
          asset: AssetType;
          supplyWithInterest: BigNumber;
        }) => ({
          asset: row.asset,
          supply: row.supplyWithInterest,
        }),
        Cell: ({ cell: { value } }: { cell: Cell }) =>
          loading ? (
            "—"
          ) : (
            <PrettyAmount
              amount={convertUnits(
                convertUnits(value.supply, STANDARD_PRECISION) ??
                  new BigNumber(0),
                value.asset.decimals,
                true
              )}
              currency={getSliceAssetName(value.asset)}
              isMinified
            />
          ),
      },
      {
        Header: "Collateral",
        accessor: (row: {
          asset: AssetType;
          isCollateral: boolean;
          yToken: number;
          collateralFactor: BigNumber;
        }) => ({
          asset: row.asset,
          yToken: row.yToken,
          isCollateral: row.isCollateral,
          collateralFactor: row.collateralFactor,
        }),
        Cell: ({ cell: { value } }: { cell: Cell }) =>
          loading ? (
            "—"
          ) : value.collateralFactor.eq(0) ? (
            ""
          ) : (
            <CollateralSwitcher
              asset={value.asset}
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
            tableName={tableName}
            tableKey="your_supply"
            asset={(row.original as any).asset}
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
      emptyText="You have no supplied assets"
      rowClassName={s.ownAssetsRow}
      className={className}
      renderRowSubComponent={renderRowSubComponent}
    />
  );
};

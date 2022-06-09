import React, { FC, useCallback, useMemo } from "react";
import { Cell, Row } from "react-table";
import { useReactiveVar } from "@apollo/client";
import BigNumber from "bignumber.js";

import { STANDARD_PRECISION, WTEZ_CONTRACT } from "constants/defaults";
import { AssetsResponseData, AssetsResponseItem } from "types/asset";
import { getSliceAssetName } from "utils/helpers/asset";
import { convertUnits, getPrettyPercent } from "utils/helpers/amount";
import { globalVariablesVar } from "utils/cache";
import { calculateAssetBorrowLimitPercent } from "utils/helpers/api";
import { useOraclePriceQuery } from "generated/graphql";
import { Table } from "components/ui/Table";
import { PrettyAmount } from "components/common/PrettyAmount";
import { AssetName } from "components/common/AssetName";
import { AttentionText } from "components/common/AttentionText";
import { DropdownArrow } from "components/tables/DropdownArrow";
import { BorrowTableDropdown } from "components/tables/TableDropdown";

import s from "./Tables.module.sass";

type YourBorrowAssetsProps = {
  data?: AssetsResponseData;
  tableName: string;
  loading?: boolean;
  className?: string;
};

export const YourBorrowAssets: FC<YourBorrowAssetsProps> = ({
  data,
  tableName,
  loading,
  className,
}) => {
  const { data: oraclePrices } = useOraclePriceQuery();
  const { maxCollateral } = useReactiveVar(globalVariablesVar);

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
                  theme="secondary"
                  asset={loading ? undefined : { ...value }}
                  loading={loading}
                  {...row.getToggleRowExpandedProps()}
                />
              }
              title="Wrapped XTZ"
              description="Yupana.Finance lending protocol only works with FA1.2 and FA2 tokens. However, the protocol team developed the 1:1 Wrapped Tezos FA2 token. So you transfer XTZ to the protocol and the protocol automatically wraps your XTZ in Wrapped Tezos FA2 token and Supply it in the protocol. Withdraw, Borrow, and Repay occur in the same way. The user doesn't work directly with the wrap, Yupana does all the magic herself."
              theme="secondary"
              attentionSize="small"
            />
          ) : (
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
        Header: "Borrowed",
        id: "borrow",
        accessor: ({ borrowWithInterest, asset }: AssetsResponseItem) =>
          loading ? (
            "—"
          ) : (
            <PrettyAmount
              amount={convertUnits(
                convertUnits(borrowWithInterest, STANDARD_PRECISION) ??
                  new BigNumber(0),
                asset.decimals,
                true
              )}
              currency={getSliceAssetName(asset)}
              isMinified
              theme="secondary"
              tooltipTheme="secondary"
            />
          ),
      },
      {
        Header: "Borrow limit",
        accessor: (row: { borrowWithInterest: BigNumber; yToken: number }) => ({
          borrowWithInterest: row.borrowWithInterest,
          yToken: row.yToken,
        }),
        Cell: ({ cell: { value } }: { cell: Cell }) => {
          if (loading) {
            return "—";
          }

          if (oraclePrices) {
            const oraclePrice = oraclePrices.oraclePrice.find(
              ({ ytoken }) => ytoken === value.yToken
            );
            if (oraclePrice) {
              return calculateAssetBorrowLimitPercent(
                value.borrowWithInterest,
                oraclePrice,
                maxCollateral
              );
            }
          }

          return getPrettyPercent(0);
        },
      },
      {
        Header: () => null,
        id: "expander",
        Cell: ({ row }: { row: Row }) => (
          <DropdownArrow
            theme="secondary"
            tableName={tableName}
            tableKey="your_borrow"
            asset={(row.original as any).asset}
            active={row.isExpanded}
            className={s.icon}
            loading={loading}
            {...row.getToggleRowExpandedProps()}
          />
        ),
      },
    ],
    [loading, maxCollateral, oraclePrices, tableName]
  );
  const renderRowSubComponent = useCallback(
    ({
      row: {
        original: {
          yToken,
          asset,
          borrowWithInterest,
          borrowInterestReserves,
          totalLiquid,
        },
      },
    }) => (
      <BorrowTableDropdown
        theme="secondary"
        yToken={yToken}
        asset={asset}
        borrow={borrowWithInterest}
        borrowInterestReserves={borrowInterestReserves}
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
      emptyText="You have no borrowed assets"
      loading={loading}
      rowClassName={s.ownAssetsRow}
      className={className}
      renderRowSubComponent={renderRowSubComponent}
    />
  );
};

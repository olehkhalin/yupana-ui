import React, { FC, useCallback, useMemo } from "react";
import { Cell, Row } from "react-table";
import { useReactiveVar } from "@apollo/client";
import BigNumber from "bignumber.js";

import { STANDARD_PRECISION } from "constants/defaults";
import { AssetsResponseData, AssetsResponseItem } from "types/asset";
import { getSliceAssetName } from "utils/helpers/asset";
import { convertUnits, getPrettyPercent } from "utils/helpers/amount";
import { globalVariablesVar } from "utils/cache";
import { calculateAssetBorrowLimitPercent } from "utils/helpers/api";
import { useOraclePriceQuery } from "generated/graphql";
import { Table } from "components/ui/Table";
import { PrettyAmount } from "components/common/PrettyAmount";
import { AssetName } from "components/common/AssetName";
import { DropdownArrow } from "components/tables/DropdownArrow";
import { BorrowTableDropdown } from "components/tables/TableDropdown";

import s from "./Tables.module.sass";

type YourBorrowAssetsProps = {
  data?: AssetsResponseData;
  loading?: boolean;
  className?: string;
};

export const YourBorrowAssets: FC<YourBorrowAssetsProps> = ({
  data,
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
        Header: "Borrowed",
        id: "borrow",
        accessor: ({ borrow, asset }: AssetsResponseItem) =>
          loading ? (
            "—"
          ) : (
            <PrettyAmount
              amount={convertUnits(
                convertUnits(borrow, STANDARD_PRECISION) ?? new BigNumber(0),
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
            active={row.isExpanded}
            className={s.icon}
            loading={loading}
            {...row.getToggleRowExpandedProps()}
          />
        ),
      },
    ],
    [loading, maxCollateral, oraclePrices]
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

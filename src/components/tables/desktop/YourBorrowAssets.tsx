import React, { useCallback, useMemo } from "react";
import { Cell, Row } from "react-table";
import BigNumber from "bignumber.js";

import { STANDARD_PRECISION } from "constants/defaults";
import { AssetsResponseData, AssetType } from "types/asset";
import { convertUnits, getPrettyPercent } from "utils/helpers/amount";
import { getSliceAssetName } from "utils/helpers/asset";
import { Table } from "components/ui/Table";
import { AssetName } from "components/common/AssetName";
import { PrettyAmount } from "components/common/PrettyAmount";
import { DropdownArrow } from "components/tables/DropdownArrow";

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
            : getPrettyPercent(convertUnits(value, STANDARD_PRECISION)),
      },
      {
        Header: "Wallet",
        accessor: (row: { wallet: BigNumber; asset: AssetType }) => ({
          wallet: row.wallet,
          asset: row.asset,
        }),
        Cell: ({ cell: { value } }: { cell: Cell }) =>
          loading ? (
            "—"
          ) : (
            <PrettyAmount
              amount={convertUnits(value.wallet, value.asset.decimals)}
              currency={getSliceAssetName(value.asset)}
              isMinified
              tooltipTheme="secondary"
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
            {...row.getToggleRowExpandedProps()}
          />
        ),
      },
    ],
    [loading]
  );
  const renderRowSubComponent = useCallback(() => <>Test</>, []);

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

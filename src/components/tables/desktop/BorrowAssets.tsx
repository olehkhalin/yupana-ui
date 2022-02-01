import React, { useMemo } from "react";
import BigNumber from "bignumber.js";
import { Cell } from "react-table";

import { STANDARD_PRECISION } from "constants/defaults";
import { AssetsResponseData, AssetType } from "types/asset";
import { getSliceAssetName } from "utils/helpers/asset";
import { convertUnits, getPrettyPercent } from "utils/helpers/amount";
import { Table } from "components/ui/Table";
import { AssetName } from "components/common/AssetName";
import { PrettyAmount } from "components/common/PrettyAmount";

import s from "./Tables.module.sass";

type BorrowAssetsProps = {
  data?: AssetsResponseData;
  loading?: boolean;
  className?: string;
};

export const BorrowAssets: React.FC<BorrowAssetsProps> = ({
  data,
  loading,
  className,
}) => {
  const columns = useMemo(
    () => [
      {
        Header: "Asset",
        accessor: "asset",
        Cell: ({ cell: { value } }: { cell: Cell }) => (
          <AssetName
            theme="secondary"
            asset={loading ? undefined : { ...value }}
            loading={loading}
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
                value.asset.decimals
              )}
              currency={getSliceAssetName(value.asset)}
              isMinified
            />
          ),
      },
      {
        Header: () => null,
        id: "expander",
      },
    ],
    [loading]
  );

  return (
    <Table
      theme="secondary"
      columns={columns}
      data={data}
      loading={loading}
      emptyText="There is no borrow assets"
      rowClassName={s.borrowRow}
      className={className}
    />
  );
};

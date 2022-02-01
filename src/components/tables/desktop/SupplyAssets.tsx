import React, { useMemo } from "react";
import BigNumber from "bignumber.js";
import { Cell } from "react-table";
import cx from "classnames";

import { STANDARD_PRECISION } from "constants/defaults";
import { AssetsResponseData, AssetType } from "types/asset";
import { getSliceAssetName } from "utils/helpers/asset";
import { convertUnits, getPrettyPercent } from "utils/helpers/amount";
import { Table } from "components/ui/Table";
import { AssetName } from "components/common/AssetName";
import { PrettyAmount } from "components/common/PrettyAmount";

import s from "./Tables.module.sass";

type SupplyAssetsProps = {
  data?: AssetsResponseData;
  loading?: boolean;
  className?: string;
};

export const SupplyAssets: React.FC<SupplyAssetsProps> = ({
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
            theme="primary"
            asset={loading ? undefined : { ...value }}
            loading={loading}
          />
        ),
      },
      {
        Header: "Supply APY",
        accessor: "rates.supplyApy",
        Cell: ({ cell: { value } }: { cell: Cell }) =>
          loading
            ? "—"
            : getPrettyPercent(convertUnits(value, STANDARD_PRECISION)),
      },
      {
        Header: "Collateral Factor",
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
      columns={columns}
      data={data}
      loading={loading}
      emptyText="There is no supply assets"
      rowClassName={s.supplyRow}
      className={cx(s.root, className)}
    />
  );
};

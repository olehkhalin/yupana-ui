import React, { FC, useEffect, useMemo, useState } from "react";
import { Cell } from "react-table";
import BigNumber from "bignumber.js";

import { AssetType } from "types/asset";
import { LiquidateDetailsBorrowedAssets } from "types/liquidate-details";
import { convertUnits } from "utils/helpers/amount";
import { getAssetName } from "utils/helpers/asset";
import { useLiquidateData } from "hooks/useLiquidateData";
import { Table } from "components/ui/Table";
import { Radio } from "components/ui/Radio";
import { AssetName } from "components/common/AssetName";
import { PrettyAmount } from "components/common/PrettyAmount";

import s from "./Tables.module.sass";

type RepayBorrowProps = {
  data?: LiquidateDetailsBorrowedAssets;
  loading?: boolean;
  className?: string;
};

export const RepayBorrow: FC<RepayBorrowProps> = ({
  data,
  loading,
  className,
}) => {
  const [selectedItem, setSelectedItem] = useState<number | undefined>(
    undefined
  );
  const { liquidateData, setBorrowedAssetYToken } = useLiquidateData();

  useEffect(() => {
    if (selectedItem !== undefined) {
      setBorrowedAssetYToken(selectedItem);
    }
  }, [selectedItem, setBorrowedAssetYToken]);

  useEffect(() => {
    if (liquidateData && liquidateData.brrowedAssetYToken !== undefined) {
      setSelectedItem(liquidateData.brrowedAssetYToken);
    }
  }, [liquidateData]);

  const columns = useMemo(
    () => [
      {
        Header: "Borrowed Asset",
        id: "yToken",
        accessor: (row: { yToken: number; asset: AssetType }) => ({
          yToken: row.yToken,
          asset: row.asset,
        }),
        Cell: ({ cell: { value } }: { cell: Cell }) => (
          <>
            <Radio
              active={selectedItem === value.yToken}
              theme="secondary"
              className={s.radio}
            />
            <AssetName
              theme="secondary"
              asset={loading ? undefined : { ...value.asset }}
              loading={loading}
            />
          </>
        ),
      },
      {
        Header: () => <span className={s.yellow}>Price of borrowed asset</span>,
        accessor: "price",
        Cell: ({ cell: { value } }: { cell: Cell }) =>
          loading ? (
            "—"
          ) : (
            <PrettyAmount
              amount={value}
              theme="secondary"
              tooltipTheme="secondary"
              isConvertable
            />
          ),
      },
      {
        Header: () => <span className={s.yellow}>Amount of debt</span>,
        id: "amountOfBorrowed",
        accessor: (row: {
          amountOfBorrowed: BigNumber;
          asset: AssetType;
          price: BigNumber;
        }) => ({
          amountOfBorrowed: row.amountOfBorrowed,
          asset: row.asset,
          price: row.price,
        }),
        Cell: ({ cell: { value } }: { cell: Cell }) => (
          <div>
            <div className={s.amount}>
              {loading ? (
                "—"
              ) : (
                <PrettyAmount
                  amount={convertUnits(
                    value.amountOfBorrowed,
                    value.asset.decimals,
                    true
                  )}
                  tooltipTheme="secondary"
                  currency={getAssetName(value.asset)}
                />
              )}
            </div>
            <div className={s.amountUsd}>
              {loading ? (
                "—"
              ) : (
                <PrettyAmount
                  amount={convertUnits(
                    value.amountOfBorrowed,
                    value.asset.decimals
                  ).multipliedBy(value.price)}
                  isConvertable
                  size="superExtraSmall"
                  theme="secondary"
                  tooltipTheme="secondary"
                />
              )}
            </div>
          </div>
        ),
      },
      {
        Header: () => <span className={s.yellow}>MAX Liquidate</span>,
        id: "maxLiquidate",
        accessor: (row: {
          maxLiquidate: BigNumber;
          asset: AssetType;
          price: BigNumber;
        }) => ({
          maxLiquidate: row.maxLiquidate,
          asset: row.asset,
          price: row.price,
        }),
        Cell: ({ cell: { value } }: { cell: Cell }) => (
          <div>
            <div className={s.amount}>
              {loading ? (
                "—"
              ) : (
                <PrettyAmount
                  amount={convertUnits(
                    value.maxLiquidate,
                    value.asset.decimals,
                    true
                  )}
                  currency={getAssetName(value.asset)}
                  tooltipTheme="secondary"
                />
              )}
            </div>
            <div className={s.amountUsd}>
              {loading ? (
                "—"
              ) : (
                <PrettyAmount
                  amount={convertUnits(
                    value.maxLiquidate,
                    value.asset.decimals
                  ).multipliedBy(value.price)}
                  isConvertable
                  size="superExtraSmall"
                  theme="secondary"
                  tooltipTheme="secondary"
                />
              )}
            </div>
          </div>
        ),
      },
    ],
    [loading, selectedItem]
  );

  return (
    <Table
      theme="octonary"
      columns={columns}
      data={data ?? [0, 1]}
      loading={loading}
      selectedItem={selectedItem}
      setSelectedItem={setSelectedItem}
      rowClassName={s.repayRow}
      theadClassName={s.repayThead}
      className={className}
    />
  );
};

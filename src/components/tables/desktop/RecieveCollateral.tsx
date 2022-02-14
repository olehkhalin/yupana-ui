import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import BigNumber from "bignumber.js";
import { Cell } from "react-table";

import { AssetType } from "types/asset";
import { LiquidateDetailsCollateralAssets } from "types/liquidate-details";
import { convertUnits } from "utils/helpers/amount";
import { getAssetName } from "utils/helpers/asset";
import { useLiquidateData } from "hooks/useLiquidateData";
import { useLiquidateDetails } from "hooks/useLiquidateDetails";
import { Table } from "components/ui/Table";
import { Radio } from "components/ui/Radio";
import { AssetName } from "components/common/AssetName";
import { PrettyAmount } from "components/common/PrettyAmount";

import s from "./Tables.module.sass";

type ReceiveCollateralProps = {
  data: LiquidateDetailsCollateralAssets | number[];
  loading?: boolean;
  className?: string;
};

export const ReceiveCollateral: FC<ReceiveCollateralProps> = ({
  data,
  loading,
  className,
}) => {
  // @ts-ignore
  const { borrowerAddress }: { borrowerAddress: string } = useParams();
  const [selectedItem, setSelectedItem] = useState<number | undefined>(
    undefined
  );
  const { data: liquidateAllData } = useLiquidateDetails(borrowerAddress);
  const { liquidateData, setCollateralAssetYToken } = useLiquidateData();

  useEffect(() => {
    if (selectedItem !== undefined) {
      setCollateralAssetYToken(selectedItem);
    }
  }, [selectedItem, setCollateralAssetYToken]);

  const calculateMaxBonus = useCallback(
    (amountOfSupplied: BigNumber, asset: AssetType, price: BigNumber) => {
      if (
        !(
          liquidateData &&
          liquidateData.brrowedAssetYToken !== undefined &&
          liquidateAllData
        )
      ) {
        return undefined;
      }
      const borrowedAssetObject = liquidateAllData.borrowedAssets.find(
        ({ yToken }) => yToken === liquidateData.brrowedAssetYToken
      );
      if (!borrowedAssetObject) {
        return undefined;
      }
      const liquidBonus = liquidateAllData.liquidationIncentive;
      const {
        maxLiquidate,
        asset: borrowedAsset,
        price: borrowedPrice,
      } = borrowedAssetObject;
      const maxLiquidateUsd = convertUnits(
        maxLiquidate,
        borrowedAsset.decimals
      ).multipliedBy(borrowedPrice);
      const amountOfSuppliedUsd = convertUnits(
        amountOfSupplied,
        asset.decimals
      ).multipliedBy(price);
      if (
        maxLiquidateUsd <
        amountOfSuppliedUsd.plus(
          amountOfSuppliedUsd.multipliedBy(new BigNumber(1).minus(liquidBonus))
        )
      ) {
        return convertUnits(
          maxLiquidateUsd.multipliedBy(liquidBonus.minus(1)).div(price),
          -asset.decimals
        );
      }
      return amountOfSupplied
        .div(liquidBonus.minus(1).plus(1))
        .multipliedBy(liquidBonus.minus(1));
    },
    [liquidateAllData, liquidateData]
  );

  const columns = useMemo(
    () => [
      {
        Header: "Asset",
        id: "yToken",
        accessor: (row: { yToken: number; asset: AssetType }) => ({
          yToken: row.yToken,
          asset: row.asset,
        }),
        Cell: ({ cell: { value } }: { cell: Cell }) => (
          <>
            <Radio active={selectedItem === value.yToken} className={s.radio} />
            <AssetName
              theme="primary"
              asset={loading ? undefined : { ...value.asset }}
              loading={loading}
            />
          </>
        ),
      },
      {
        Header: () => <span className={s.blue}>Price of receive asset</span>,
        accessor: "price",
        Cell: ({ cell: { value } }: { cell: Cell }) =>
          loading ? "—" : <PrettyAmount amount={value} isConvertable />,
      },
      {
        Header: () => <span className={s.blue}>Amount of supplied</span>,
        id: "amountOfSupplied",
        accessor: (row: {
          amountOfSupplied: BigNumber;
          asset: AssetType;
          price: BigNumber;
        }) => ({
          amountOfSupplied: row.amountOfSupplied,
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
                    value.amountOfSupplied,
                    value.asset.decimals,
                    true
                  )}
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
                    value.amountOfSupplied,
                    value.asset.decimals
                  ).multipliedBy(value.price)}
                  isConvertable
                />
              )}
            </div>
          </div>
        ),
      },
      {
        Header: () => <span className={s.blue}>MAX Bonus</span>,
        id: "maxBonus",
        accessor: (row: {
          amountOfSupplied: BigNumber;
          asset: AssetType;
          price: BigNumber;
        }) => ({
          amountOfSupplied: row.amountOfSupplied,
          asset: row.asset,
          price: row.price,
        }),
        Cell: ({ cell: { value } }: { cell: Cell }) => {
          let maxBonus: undefined | BigNumber = undefined;
          if (!loading) {
            maxBonus = calculateMaxBonus(
              value.amountOfSupplied,
              value.asset,
              value.price
            );
          }

          return (
            <div>
              <div className={s.amount}>
                {loading || maxBonus === undefined ? (
                  "—"
                ) : (
                  <PrettyAmount
                    amount={convertUnits(maxBonus, value.asset.decimals, true)}
                    currency={getAssetName(value.asset)}
                  />
                )}
              </div>
              <div className={s.amountUsd}>
                {loading || maxBonus === undefined ? (
                  "—"
                ) : (
                  <PrettyAmount
                    amount={convertUnits(
                      maxBonus,
                      value.asset.decimals
                    ).multipliedBy(value.price)}
                    isConvertable
                  />
                )}
              </div>
            </div>
          );
        },
      },
    ],
    [calculateMaxBonus, loading, selectedItem]
  );

  return (
    <Table
      theme="quinary"
      columns={columns}
      data={data}
      loading={loading}
      selectedItem={selectedItem}
      setSelectedItem={setSelectedItem}
      rowClassName={s.repayRow}
      theadClassName={s.repayThead}
      className={className}
    />
  );
};

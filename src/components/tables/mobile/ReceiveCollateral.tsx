import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import BigNumber from "bignumber.js";
import cx from "classnames";

import { LiquidateDetailsCollateralAssets } from "types/liquidate-details";
import { AssetType } from "types/asset";
import { convertUnits } from "utils/helpers/amount";
import { getAssetName } from "utils/helpers/asset";
import { useLiquidateData } from "hooks/useLiquidateData";
import { useLiquidateDetails } from "hooks/useLiquidateDetails";
import { Radio } from "components/ui/Radio";
import { TableCard } from "components/common/TableCard";
import { PrettyAmount } from "components/common/PrettyAmount";
import { AssetName } from "components/common/AssetName";

import s from "./Cards.module.sass";

type ReceiveCollateralProps = {
  data?: LiquidateDetailsCollateralAssets;
  loading?: boolean;
};

export const ReceiveCollateral: FC<ReceiveCollateralProps> = ({
  data,
  loading,
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

  useEffect(() => {
    if (liquidateData && liquidateData.collateralAssetYToken !== undefined) {
      setSelectedItem(liquidateData.collateralAssetYToken);
    }
  }, [liquidateData]);

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

  const preparedData = useMemo(
    () =>
      (data ?? [0, 1]).map((el: any) => ({
        yToken: el.yToken,
        key: `receive-asset-${el.yToken ?? el}`,
        data: [
          {
            title: "Receive asset",
            content: (
              <>
                <Radio
                  active={selectedItem === el.yToken}
                  theme="primary"
                  className={s.radio}
                />
                <AssetName
                  asset={loading ? undefined : el.asset}
                  theme="primary"
                  logoClassName={s.logo}
                />
              </>
            ),
            isLogo: true,
          },
          {
            title: "Price of receive asset",
            content: loading ? (
              "—"
            ) : (
              <PrettyAmount
                amount={el.price}
                isConvertable
                className={s.amount}
                theme="primary"
              />
            ),
          },
          {
            title: "Amount of supplied",
            content: (
              <div>
                <div className={s.amount}>
                  {loading ? (
                    "—"
                  ) : (
                    <PrettyAmount
                      amount={convertUnits(
                        el.amountOfSupplied,
                        el.asset.decimals,
                        true
                      )}
                      currency={getAssetName(el.asset)}
                      theme="primary"
                    />
                  )}
                </div>
                <div className={s.amountUsd}>
                  {loading ? (
                    "—"
                  ) : (
                    <PrettyAmount
                      amount={convertUnits(
                        el.amountOfSupplied,
                        el.asset.decimals
                      ).multipliedBy(el.price)}
                      isConvertable
                      theme="primary"
                      size="extraSmall"
                    />
                  )}
                </div>
              </div>
            ),
          },
          {
            title: "MAX Bonus",
            content: () => {
              let maxBonus: undefined | BigNumber = undefined;
              if (!loading) {
                maxBonus = calculateMaxBonus(
                  el.amountOfSupplied,
                  el.asset,
                  el.price
                );
              }

              return (
                <div>
                  <div className={s.amount}>
                    {loading || maxBonus === undefined ? (
                      "—"
                    ) : (
                      <PrettyAmount
                        amount={convertUnits(maxBonus, el.asset.decimals, true)}
                        currency={getAssetName(el.asset)}
                        theme="primary"
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
                          el.asset.decimals
                        ).multipliedBy(el.price)}
                        isConvertable
                        theme="primary"
                        size="extraSmall"
                      />
                    )}
                  </div>
                </div>
              );
            },
          },
        ],
      })),
    [calculateMaxBonus, data, loading, selectedItem]
  );

  return (
    <>
      {preparedData.map((item) => (
        <TableCard
          theme="primary"
          loading={loading}
          key={item.key}
          data={item.data}
          yToken={item.yToken}
          handleClick={setSelectedItem}
          className={cx(s.receiveCollateral, {
            [s.active]: selectedItem === item.yToken,
          })}
        />
      ))}
    </>
  );
};

import React, { FC, useEffect, useMemo, useState } from "react";
import cx from "classnames";

import { LiquidateDetailsBorrowedAssets } from "types/liquidate-details";
import { convertUnits } from "utils/helpers/amount";
import { getAssetName } from "utils/helpers/asset";
import { useLiquidateData } from "hooks/useLiquidateData";
import { Radio } from "components/ui/Radio";
import { TableCard } from "components/common/TableCard";
import { PrettyAmount } from "components/common/PrettyAmount";
import { AssetName } from "components/common/AssetName";

import s from "./Cards.module.sass";

type RepayBorrowProps = {
  data?: LiquidateDetailsBorrowedAssets;
  loading?: boolean;
};

export const RepayBorrow: FC<RepayBorrowProps> = ({ data, loading }) => {
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

  const preparedData = useMemo(
    () =>
      (data ?? [0, 1]).map((el: any) => ({
        yToken: el.yToken,
        key: el.yToken ?? el,
        data: [
          {
            title: "Borrowed Asset",
            content: (
              <>
                <Radio
                  active={selectedItem === el.yToken}
                  theme="secondary"
                  className={s.radio}
                />
                <AssetName
                  asset={loading ? undefined : el.asset}
                  theme="secondary"
                  logoClassName={s.logo}
                />
              </>
            ),
            isLogo: true,
          },
          {
            title: "Price of borrowed asset",
            content: loading ? (
              "—"
            ) : (
              <PrettyAmount
                amount={el.price}
                isConvertable
                className={s.amount}
                theme="secondary"
              />
            ),
          },
          {
            title: "Amount of debt",
            content: (
              <div>
                <div className={s.amount}>
                  {loading ? (
                    "—"
                  ) : (
                    <PrettyAmount
                      amount={convertUnits(
                        el.amountOfBorrowed,
                        el.asset.decimals,
                        true
                      )}
                      currency={getAssetName(el.asset)}
                      theme="secondary"
                    />
                  )}
                </div>
                <div className={s.amountUsd}>
                  {loading ? (
                    "—"
                  ) : (
                    <PrettyAmount
                      amount={convertUnits(
                        el.amountOfBorrowed,
                        el.asset.decimals
                      ).multipliedBy(el.price)}
                      isConvertable
                      theme="secondary"
                      size="extraSmall"
                    />
                  )}
                </div>
              </div>
            ),
          },
          {
            title: "MAX Liquidate",
            content: (
              <div>
                <div className={s.amount}>
                  {loading ? (
                    "—"
                  ) : (
                    <PrettyAmount
                      amount={convertUnits(
                        el.maxLiquidate,
                        el.asset.decimals,
                        true
                      )}
                      currency={getAssetName(el.asset)}
                      theme="secondary"
                    />
                  )}
                </div>
                <div className={s.amountUsd}>
                  {loading ? (
                    "—"
                  ) : (
                    <PrettyAmount
                      amount={convertUnits(
                        el.maxLiquidate,
                        el.asset.decimals
                      ).multipliedBy(el.price)}
                      isConvertable
                      theme="secondary"
                      size="extraSmall"
                    />
                  )}
                </div>
              </div>
            ),
          },
        ],
      })),
    [data, loading, selectedItem]
  );

  return (
    <>
      {preparedData.map((item) => (
        <TableCard
          theme="secondary"
          loading={loading}
          key={item.key}
          data={item.data}
          yToken={item.yToken}
          handleClick={setSelectedItem}
          className={cx(s.repayBorrow, {
            [s.active]: selectedItem === item.yToken,
          })}
        />
      ))}
    </>
  );
};

import React, { FC, useState, useCallback, useEffect } from "react";
import BigNumber from "bignumber.js";
import useSWR from "swr";
import cx from "classnames";

import { STANDARD_PRECISION } from "constants/defaults";
import { DOCS_LINKS } from "constants/docs";
import { AssetType } from "types/asset";
import { getUserBalance } from "utils/dapp/helpers";
import { useWiderThanMdesktop } from "utils/helpers";
import { useAccountPkh, useTezos } from "utils/dapp";
import { useAssets } from "hooks/useAssets";
import { useAssetsBalance } from "hooks/useAssetsBalance";
import { CreditProcessModalProvider } from "hooks/useCreditProcessModal";
import { Section } from "components/common/Section";
import { AssetsSwitcher } from "components/common/AssetsSwitcher";
import {
  BorrowAssets,
  SupplyAssets,
  YourBorrowAssets,
  YourSupplyAssets,
} from "components/tables/containers";
import { CreditProcessModal } from "components/modals/CreditProcessModal";

import s from "./AllAssets.module.sass";

type AssetsProps = {
  className?: string;
};

export const AllAssets: FC<AssetsProps> = ({ className }) => {
  const accountPkh = useAccountPkh();
  const tezos = useTezos();
  const isWiderThanMdesktop = useWiderThanMdesktop();
  const [isAssetSwitcherActive, setIsAssetSwitcherActive] = useState(true);
  const { updateAssetsBalance, setBalanceLoading } = useAssetsBalance();

  const { data, loading, error } = useAssets();

  const getBalance = useCallback(
    async (asset: AssetType) => {
      let wallet = new BigNumber(0);
      if (!!accountPkh && !!tezos) {
        wallet =
          (await getUserBalance(
            tezos,
            asset.contractAddress,
            asset.tokenId,
            accountPkh
          )) ?? 0;
      }
      return wallet;
    },
    [accountPkh, tezos]
  );

  const getAssetsBalance = useCallback(() => {
    return Promise.all(
      data
        ? data?.assets.map(async ({ asset }) => {
            const balance = await getBalance(asset);
            return {
              asset: asset,
              balance,
            };
          })
        : []
    );
  }, [data, getBalance]);

  const { data: balanceData, error: balanceError } = useSWR(
    ["assets-balance", accountPkh, data],
    getAssetsBalance
  );

  useEffect(() => {
    if (balanceData && balanceData.length && !balanceError) {
      updateAssetsBalance(balanceData);
      setBalanceLoading(false);
    } else if (
      (balanceData === null || balanceData === undefined) &&
      !balanceError
    ) {
      setBalanceLoading(true);
    }
  }, [balanceData, data, updateAssetsBalance, setBalanceLoading, balanceError]);

  if (error) {
    return <></>;
  }

  return (
    <CreditProcessModalProvider>
      {!isWiderThanMdesktop && (
        <AssetsSwitcher
          active={isAssetSwitcherActive}
          setActive={setIsAssetSwitcherActive}
          className={s.switcher}
        />
      )}

      {accountPkh && (
        <div className={cx(s.root, className)}>
          <Section
            title="Your supply assets"
            className={cx(s.col, {
              [s.show]: isAssetSwitcherActive && !isWiderThanMdesktop,
            })}
          >
            <YourSupplyAssets
              data={data?.supplyAssets.filter(({ supply }) =>
                supply.gte(new BigNumber(10).pow(STANDARD_PRECISION))
              )}
              loading={loading}
            />
          </Section>

          <Section
            title="Your borrow assets"
            theme="secondary"
            className={cx(s.col, {
              [s.show]: !isAssetSwitcherActive && !isWiderThanMdesktop,
            })}
          >
            <YourBorrowAssets
              data={data?.borrowAssets.filter(({ borrowWithInterest }) =>
                borrowWithInterest.gte(
                  new BigNumber(10).pow(STANDARD_PRECISION)
                )
              )}
              loading={loading}
            />
          </Section>
        </div>
      )}

      <div className={cx(s.root, className)}>
        <Section
          title="Supply assets"
          link={{
            label: "docs: supplying assets",
            link: DOCS_LINKS.supplyingAssets,
            external: true,
          }}
          className={cx(s.col, {
            [s.show]: isAssetSwitcherActive && !isWiderThanMdesktop,
          })}
        >
          <SupplyAssets data={data?.assets} loading={loading} />
        </Section>

        <Section
          title="Borrow assets"
          link={{
            label: "docs: borrowing assets",
            link: DOCS_LINKS.borrowingAssets,
            external: true,
          }}
          theme="secondary"
          className={cx(s.col, {
            [s.show]: !isAssetSwitcherActive && !isWiderThanMdesktop,
          })}
        >
          <BorrowAssets data={data?.assets} loading={loading} />
        </Section>
      </div>
      <CreditProcessModal />
    </CreditProcessModalProvider>
  );
};

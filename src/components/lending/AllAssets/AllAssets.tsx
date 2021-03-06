import React, { FC, useState } from "react";
import BigNumber from "bignumber.js";
import cx from "classnames";

import { STANDARD_PRECISION } from "constants/defaults";
import { DOCS_LINKS } from "constants/docs";
import { useWiderThanMdesktop } from "utils/helpers";
import { useAccountPkh } from "utils/dapp";
import { useAssets } from "hooks/useAssets";
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
  const isWiderThanMdesktop = useWiderThanMdesktop();
  const [isAssetSwitcherActive, setIsAssetSwitcherActive] = useState(true);

  const { data, loading, error } = useAssets();

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
        <section className={cx(s.root, className)}>
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
        </section>
      )}

      <section className={cx(s.root, className)}>
        <Section
          title="Supply assets"
          link={{
            label: "docs: supplying assets",
            link: DOCS_LINKS.supplyingAssets,
            name: "supplying",
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
            name: "borrowing",
            external: true,
          }}
          theme="secondary"
          className={cx(s.col, {
            [s.show]: !isAssetSwitcherActive && !isWiderThanMdesktop,
          })}
        >
          <BorrowAssets data={data?.assets} loading={loading} />
        </Section>
      </section>
      <CreditProcessModal />
    </CreditProcessModalProvider>
  );
};

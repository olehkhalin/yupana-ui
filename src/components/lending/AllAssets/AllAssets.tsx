import React, { useState } from "react";
import cx from "classnames";

import { useWiderThanMdesktop } from "utils/helpers";
import { useAssetsWithWallet } from "hooks/useAssetsWithWallet";
import { Section } from "components/common/Section";
import { AssetsSwitcher } from "components/common/AssetsSwitcher";
import { BorrowAssets, SupplyAssets } from "components/tables/desktop";

import s from "./AllAssets.module.sass";

type AssetsProps = {
  className?: string;
};

export const AllAssets: React.FC<AssetsProps> = ({ className }) => {
  const isWiderThanMdesktop = useWiderThanMdesktop();
  const [isAssetSwitcherActive, setIsAssetSwitcherActive] = useState(true);

  const { data, loading, error } = useAssetsWithWallet();

  if (error) {
    return <></>;
  }

  return (
    <>
      {!isWiderThanMdesktop && (
        <AssetsSwitcher
          active={isAssetSwitcherActive}
          setActive={setIsAssetSwitcherActive}
          className={s.switcher}
        />
      )}
      <div className={cx(s.root, className)}>
        <Section
          title="Supply assets"
          link={{
            label: "docs: supplying assets",
            link: "/",
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
            link: "/",
          }}
          theme="secondary"
          className={cx(s.col, {
            [s.show]: !isAssetSwitcherActive && !isWiderThanMdesktop,
          })}
        >
          <BorrowAssets data={data?.assets} loading={loading} />
        </Section>
      </div>
    </>
  );
};

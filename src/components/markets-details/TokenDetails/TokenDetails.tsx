import React, { FC } from "react";
import cx from "classnames";
import BigNumber from "bignumber.js";

import { getAssetName } from "utils/helpers/asset";
import { AssetType } from "types/asset";
import { Section } from "components/common/Section";
import { AssetLogo } from "components/common/AssetLogo";
import { PrettyAmount } from "components/common/PrettyAmount";
import { MarketsDetails, MarketsDetailsInfo } from "components/tables/desktop";

import s from "./TokenDetails.module.sass";

type TokenDetailsProps = {
  asset: AssetType;
  data: MarketsDetailsInfo[];
  price: BigNumber;
  className?: string;
};

export const TokenDetails: FC<TokenDetailsProps> = ({
  asset,
  data,
  price,
  className,
}) => {
  return (
    <Section className={cx(s.root, className)}>
      <div className={s.tokenWrapper}>
        <div className={s.token}>
          <AssetLogo
            logo={{
              name: asset.name,
              thumbnail: asset.thumbnail,
            }}
            sizeT="large"
            theme="tertiary"
            className={s.logo}
          />

          <h1 className={s.name}>{getAssetName(asset, true)}</h1>
        </div>
        <div className={s.price}>
          Price: <PrettyAmount amount={price} isConvertable />
        </div>
      </div>

      <MarketsDetails data={data} />
    </Section>
  );
};

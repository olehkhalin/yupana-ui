import React, { FC } from "react";
import cx from "classnames";

import { useWiderThanMphone } from "utils/helpers";
import { Preloader } from "components/ui/Preloader";
import { Section } from "components/common/Section";
import { AssetLogo } from "components/common/AssetLogo";
import { MarketsDetails } from "components/tables/desktop";

import s from "./TokenDetails.module.sass";

type TokenDetailsLoadingProps = {
  className?: string;
};

export const TokenDetailsLoading: FC<TokenDetailsLoadingProps> = ({
  className,
}) => {
  const iwWiderThanMphone = useWiderThanMphone();

  return (
    <Section className={cx(s.root, className)}>
      <div className={s.tokenWrapper}>
        <div className={s.token}>
          <AssetLogo sizeT="large" theme="tertiary" className={s.logo} />

          <h1 className={cx(s.name, s.loadingContainer)}>
            <Preloader sizeT={iwWiderThanMphone ? "large" : "fluent"} />
          </h1>
        </div>
        <div className={cx(s.price, s.loadingContainer)}>
          <Preloader
            theme="primary"
            sizeT={iwWiderThanMphone ? "large" : "fluent"}
          />
        </div>
      </div>

      <MarketsDetails loading />
    </Section>
  );
};

import React from 'react';
import cx from 'classnames';

import { getPrettyAmount } from 'utils/getPrettyAmount';
import { getTokenName } from 'utils/getTokenName';
import { TokenMetadataInterface } from 'types/token';
import { Section } from 'components/common/Section';
import { TokenLogo } from 'components/ui/TokenLogo';
import { Preloader } from 'components/ui/Preloader';
import { TokenData } from 'components/tables/containers/TokenData';

import s from './TokenDetails.module.sass';

type TokenDetailsProps = {
  asset: TokenMetadataInterface
  data: any[]
  loading: boolean
  className?: string
};

export const TokenDetails: React.FC<TokenDetailsProps> = ({
  asset,
  data,
  loading,
  className,
}) => (
  <Section className={cx(s.root, className)}>
    <div className={s.tokenWrapper}>
      <div className={s.token}>
        <TokenLogo
          logo={{
            name: asset.name,
            thumbnailUri: asset.thumbnailUri,
          }}
          sizeT="large"
          theme="primary"
          loading={loading}
          className={s.logo}
        />
        <h1 className={s.name}>
          {!loading
            ? `${getTokenName(asset, true)}`
            : (
              <Preloader
                sizeT="large"
              />
            )}
        </h1>
      </div>
      <div className={s.price}>
        {!loading
          ? `Price: ${getPrettyAmount({ value: 4.20, currency: '$' })}`
          : (
            <Preloader
              theme="primary"
              sizeT="large"
            />
          )}
      </div>
    </div>

    <TokenData
      data={data}
      loading={loading}
    />
  </Section>
);

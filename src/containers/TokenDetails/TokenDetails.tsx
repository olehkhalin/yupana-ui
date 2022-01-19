import React from 'react';
import cx from 'classnames';

import { useCurrency } from 'providers/CurrencyProvider';
import { useWiderThanMphone } from 'utils/helpers';
import { getTokenName } from 'utils/helpers/token';
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
}) => {
  const { tezosPrice, convertPriceByBasicCurrency } = useCurrency();
  const iwWiderThanMphone = useWiderThanMphone();

  return (
    <Section className={cx(s.root, className)}>
      <div className={s.tokenWrapper}>
        <div className={s.token}>
          <TokenLogo
            logo={{
              name: asset.name,
              thumbnailUri: asset.thumbnailUri,
            }}
            sizeT="large"
            theme="tertiary"
            loading={loading}
            className={s.logo}
          />
          <h1 className={s.name}>
            {!loading
              ? `${getTokenName(asset, true)}`
              : (
                <Preloader
                  sizeT={iwWiderThanMphone ? 'large' : 'fluent'}
                />
              )}
          </h1>
        </div>
        <div className={s.price}>
          {!loading
            ? `Price: ${convertPriceByBasicCurrency(tezosPrice)}`
            : (
              <Preloader
                theme="primary"
                sizeT={iwWiderThanMphone ? 'large' : 'fluent'}
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
};

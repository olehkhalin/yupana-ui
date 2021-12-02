import React, { useMemo } from 'react';
import cx from 'classnames';

import { getPrettyAmount } from 'utils/getPrettyAmount';
import { getTokenName } from 'utils/getTokenName';
import { Section } from 'components/common/Section';
import { TokenLogo } from 'components/ui/TokenLogo';
import { TokenData } from 'components/tables/containers/TokenData';
import { TOKEN_DETAILS_DATA } from 'components/temp-data/tables/markets-details';

import s from './TokenDetails.module.sass';

type TokenDetailsProps = {
  className?: string
};

export const TokenDetails: React.FC<TokenDetailsProps> = ({
  className,
}) => {
  const tokenData = useMemo(() => ({
    ...TOKEN_DETAILS_DATA[0],
  }), []);

  return (
    <Section className={cx(s.root, className)}>
      <div className={s.tokenWrapper}>
        <div className={s.token}>
          <TokenLogo
            logo={{
              name: tokenData.asset.name,
              thumbnailUri: tokenData.asset.thumbnailUri,
            }}
            sizeT="large"
            className={s.logo}
          />
          <h1 className={s.name}>
            {`${getTokenName(tokenData.asset, true)}`}
          </h1>
        </div>
        <div className={s.price}>
          {`Price: ${getPrettyAmount({ value: 4.20, currency: '$' })}`}
        </div>
      </div>

      <TokenData
        data={TOKEN_DETAILS_DATA}
      />
    </Section>
  );
};

import React, { useMemo } from 'react';
import cx from 'classnames';

import { useCurrency } from 'providers/CurrencyProvider';
import { convertTokenPrice } from 'utils/helpers/amount/convertTokenPrice';
import { getTokenName } from 'utils/helpers/token';
import { TokenMetadataInterface } from 'types/token';
import { Section } from 'components/common/Section';
import { TokenLogo } from 'components/ui/TokenLogo';
import { TokenData } from 'components/tables/containers/TokenData';

import { useOraclePrices } from 'providers/OraclePricesProvider';
import s from './TokenDetails.module.sass';

type TokenDetailsProps = {
  asset: TokenMetadataInterface
  data: any[]
  className?: string
};

export const TokenDetails: React.FC<TokenDetailsProps> = ({
  asset,
  data,
  className,
}) => {
  const { oraclePrices } = useOraclePrices();
  const { convertPriceByBasicCurrency } = useCurrency();

  const tokenPrice = useMemo(() => {
    if (oraclePrices) {
      const token = oraclePrices[data[0].yToken];
      return convertPriceByBasicCurrency(convertTokenPrice(token.price, token.decimals));
    }

    return '0';
  }, [convertPriceByBasicCurrency, data, oraclePrices]);

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
            className={s.logo}
          />
          <h1 className={s.name}>
            {`${getTokenName(asset, true)}`}
          </h1>
        </div>
        <div className={s.price}>
          {`Price: ${tokenPrice}`}
        </div>
      </div>

      <TokenData
        data={data}
      />
    </Section>
  );
};

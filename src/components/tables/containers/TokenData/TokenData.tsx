import React from 'react';

import { getUniqueKey } from 'utils/getUniqueKey';
import { useWiderThanLphone } from 'utils/getMediaQuery';
import { MarketsCard } from 'components/tables/components/mobile';
import { MarketsDetails } from 'components/tables/components/desktop';

type TokenDataProps = {
  data: any[]
  loading: boolean
  className?: string
};

export const TokenData: React.FC<TokenDataProps> = ({
  data,
  loading,
  className,
}) => {
  const isWiderThanLphone = useWiderThanLphone();

  if (isWiderThanLphone) {
    return (
      <MarketsDetails
        data={data}
        loading={loading}
        className={className}
      />
    );
  }

  return (
    <>
      {
        data.map(({
          asset: tokenMetadata, ...rest
        }) => (
          <MarketsCard
            key={getUniqueKey()}
            details
            {...tokenMetadata}
            {...rest}
          />
        ))
      }
    </>
  );
};

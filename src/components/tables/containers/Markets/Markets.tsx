import React from 'react';

import { getUniqueKey } from 'utils/getUniqueKey';
import { useWiderThanLphone } from 'utils/getMediaQuery';
import { MarketsCard } from 'components/tables/components/mobile';
import { Markets as MarketsDesktop } from 'components/tables/components/desktop';

type MarketsProps = {
  data: any[]
  className?: string
};

export const Markets: React.FC<MarketsProps> = ({
  data,
  className,
}) => {
  const isWiderThanLphone = useWiderThanLphone();

  if (isWiderThanLphone) {
    return (
      <MarketsDesktop
        data={data}
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
            details={false}
            {...tokenMetadata}
            {...rest}
          />
        ))
      }
    </>
  );
};

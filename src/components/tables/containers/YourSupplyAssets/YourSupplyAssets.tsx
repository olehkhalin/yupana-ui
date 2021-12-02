import React from 'react';

import { getUniqueKey } from 'utils/getUniqueKey';
import { useWiderThanLphone } from 'utils/getMediaQuery';
import { YourSupplyAssetsCard, YourSupplyAssetsEmptyCard } from 'components/tables/components/mobile';
import { YourSupplyAssets as YourSupplyAssetsDesktop } from 'components/tables/components/desktop';

type YourSupplyAssetsProps = {
  data: any[]
  className?: string
};

export const YourSupplyAssets: React.FC<YourSupplyAssetsProps> = ({
  data,
  className,
}) => {
  const isWiderThanLphone = useWiderThanLphone();

  if (isWiderThanLphone) {
    return (
      <YourSupplyAssetsDesktop
        data={data}
        className={className}
      />
    );
  }

  return (
    <div className={className}>
      {
        data && data.length ? data.map(({
          asset: tokenMetadata, ...rest
        }) => (
          <YourSupplyAssetsCard
            key={getUniqueKey()}
            {...tokenMetadata}
            {...rest}
          />
        )) : (
          <YourSupplyAssetsEmptyCard />
        )
      }
    </div>
  );
};

import React from 'react';

import { getUniqueKey } from 'utils/getUniqueKey';
import { useLphoneOrWider } from 'utils/getMediaQuery';
import { YourSupplyAssetsCard } from 'components/tables/components/mobile';
import { YourSupplyAssets as YourSupplyAssetsDesktop } from 'components/tables/components/desktop';

type YourSupplyAssetsProps = {
  data: any[]
  className?: string
};

export const YourSupplyAssets: React.FC<YourSupplyAssetsProps> = ({
  data,
  className,
}) => {
  const isLphoneOrWider = useLphoneOrWider();

  if (isLphoneOrWider) {
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
        data.map(({
          asset: tokenMetadata, ...rest
        }) => (
          <YourSupplyAssetsCard
            key={getUniqueKey()}
            {...tokenMetadata}
            {...rest}
          />
        ))
      }
    </div>
  );
};
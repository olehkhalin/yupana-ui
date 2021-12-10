import React from 'react';

import { getUniqueKey } from 'utils/getUniqueKey';
import { useWiderThanLphone } from 'utils/getMediaQuery';
import { SupplyAssetsCard } from 'components/tables/components/mobile';
import { SupplyAssets as SupplyAssetsDesktop } from 'components/tables/components//desktop';

type SupplyAssetsProps = {
  data: any[]
  loading: boolean
  className?: string
};

export const SupplyAssets: React.FC<SupplyAssetsProps> = ({
  data,
  loading,
  className,
}) => {
  const isWiderThanLphone = useWiderThanLphone();

  if (isWiderThanLphone) {
    return (
      <SupplyAssetsDesktop
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
          <SupplyAssetsCard
            key={getUniqueKey()}
            loading={loading}
            {...tokenMetadata}
            {...rest}
          />
        ))
      }
    </>
  );
};

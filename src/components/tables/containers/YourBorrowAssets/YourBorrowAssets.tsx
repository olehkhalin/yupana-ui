import React from 'react';

import { getUniqueKey } from 'utils/getUniqueKey';
import { useWiderThanLphone } from 'utils/getMediaQuery';
import { YourBorrowAssetsCard, YourBorrowAssetsEmptyCard } from 'components/tables/components/mobile';
import { YourBorrowAssets as YourBorrowAssetsDesktop } from 'components/tables/components/desktop';

type YourBorrowAssetsProps = {
  data: any[]
  loading: boolean
  className?: string
};

export const YourBorrowAssets: React.FC<YourBorrowAssetsProps> = ({
  data,
  loading,
  className,
}) => {
  const isWiderThanLphone = useWiderThanLphone();

  if (isWiderThanLphone) {
    return (
      <YourBorrowAssetsDesktop
        data={data}
        loading={loading}
        className={className}
      />
    );
  }

  return (
    <>
      {
        data && data.length ? data.map(({
          asset: tokenMetadata, ...rest
        }) => (
          <YourBorrowAssetsCard
            key={getUniqueKey()}
            loading={loading}
            {...tokenMetadata}
            {...rest}
          />
        )) : (
          <YourBorrowAssetsEmptyCard />
        )
      }
    </>
  );
};

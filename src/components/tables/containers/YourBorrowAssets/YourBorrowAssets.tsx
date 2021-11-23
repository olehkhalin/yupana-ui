import React from 'react';

import { getUniqueKey } from 'utils/getUniqueKey';
import { useLphoneOrWider } from 'utils/getMediaQuery';
import { YourBorrowAssetsCard, YourBorrowAssetsEmptyCard } from 'components/tables/components/mobile';
import { YourBorrowAssets as YourBorrowAssetsDesktop } from 'components/tables/components/desktop';

type YourBorrowAssetsProps = {
  data: any[]
  className?: string
};

export const YourBorrowAssets: React.FC<YourBorrowAssetsProps> = ({
  data,
  className,
}) => {
  const isLphoneOrWider = useLphoneOrWider();

  if (isLphoneOrWider) {
    return (
      <YourBorrowAssetsDesktop
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
          <YourBorrowAssetsCard
            key={getUniqueKey()}
            {...tokenMetadata}
            {...rest}
          />
        )) : (
          <YourBorrowAssetsEmptyCard />
        )
      }
    </div>
  );
};

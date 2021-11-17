import React from 'react';

import { getUniqueKey } from 'utils/getUniqueKey';
import { useLphoneOrWider } from 'utils/getMediaQuery';
import { BorrowAssetsCard } from 'components/tables/components/mobile';
import { BorrowAssets as BorrowAssetsDesktop } from 'components/tables/components/desktop';

type BorrowAssetsProps = {
  data: any[]
  className?: string
};

export const BorrowAssets: React.FC<BorrowAssetsProps> = ({
  data,
  className,
}) => {
  const isLphoneOrWider = useLphoneOrWider();

  if (isLphoneOrWider) {
    return (
      <BorrowAssetsDesktop
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
          <BorrowAssetsCard
            key={getUniqueKey()}
            {...tokenMetadata}
            {...rest}
          />
        ))
      }
    </div>
  );
};

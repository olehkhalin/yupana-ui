import React from 'react';

import { getUniqueKey } from 'utils/getUniqueKey';
import { useWiderThanLphone } from 'utils/getMediaQuery';
import { YourBorrowAssetsCard } from 'components/tables/components/mobile';
import { YourBorrowAssets as YourBorrowAssetsDesktop } from 'components/tables/components/desktop';

type YourBorrowAssetsProps = {
  data: any[]
  className?: string
};

export const YourBorrowAssets: React.FC<YourBorrowAssetsProps> = ({
  data,
  className,
}) => {
  const isWiderThanLphone = useWiderThanLphone();

  if (isWiderThanLphone) {
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
        data.map(({
          asset: tokenMetadata, ...rest
        }) => (
          <YourBorrowAssetsCard
            key={getUniqueKey()}
            {...tokenMetadata}
            {...rest}
          />
        ))
      }
    </div>
  );
};

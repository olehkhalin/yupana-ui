import React from 'react';

import { useWiderThanLphone } from 'utils/helpers';
import { BorrowAssetsCard } from 'components/tables/components/mobile';
import { BorrowAssets as BorrowAssetsDesktop } from 'components/tables/components/desktop';

type BorrowAssetsProps = {
  data: any[]
  loading: boolean
  className?: string
};

export const BorrowAssets: React.FC<BorrowAssetsProps> = ({
  data,
  loading,
  className,
}) => {
  const isWiderThanLphone = useWiderThanLphone();

  if (isWiderThanLphone) {
    return (
      <BorrowAssetsDesktop
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
          <BorrowAssetsCard
            key={rest.yToken}
            loading={loading}
            {...tokenMetadata}
            {...rest}
          />
        ))
      }
    </>
  );
};

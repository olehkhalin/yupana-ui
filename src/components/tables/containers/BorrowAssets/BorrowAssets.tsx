import React from 'react';

import { getUniqueKey } from 'utils/getUniqueKey';
import { useWiderThanLphone } from 'utils/getMediaQuery';
import { BorrowAssetsCard } from 'components/tables/components/mobile';
import { BorrowAssets as BorrowAssetsDesktop } from 'components/tables/components/desktop';
import { AssetsType } from 'containers/Assets';

type BorrowAssetsProps = {
  data: AssetsType[]
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

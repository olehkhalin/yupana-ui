import React from 'react';
import cx from 'classnames';

import { getUniqueKey } from 'utils/getUniqueKey';
import { useLphoneOrWider } from 'utils/getMediaQuery';
import { YourBorrowAssetsCard } from 'components/tables/components/mobile';
import { YourBorrowAssets as YourBorrowAssetsDesktop } from 'components/tables/components/desktop';

import s from './YourBorrowAssets.module.sass';

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
    <div className={cx(s.root, className)}>
      {
        data.map(({
          asset: tokenMetadata, ...rest
        }) => (
          <YourBorrowAssetsCard
            key={getUniqueKey()}
            {...tokenMetadata}
            {...rest}
            className={s.item}
          />
        ))
      }
    </div>
  );
};

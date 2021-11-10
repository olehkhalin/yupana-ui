import React from 'react';
import cx from 'classnames';

import { getUniqueKey } from 'utils/getUniqueKey';
import { useLphoneOrWider } from 'utils/getMediaQuery';
import { BorrowAssetsCard } from 'components/tables/components/mobile';
import { BorrowAssets as BorrowAssetsDesktop } from 'components/tables/components/desktop';

import s from './BorrowAssets.module.sass';

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
    <div className={cx(s.root, className)}>
      {
        data.map((el) => (
          <BorrowAssetsCard
            key={getUniqueKey()}
            {...el}
            className={s.item}
          />
        ))
      }
    </div>
  );
};
